// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title NFTMarketplace
 * @dev A simple marketplace contract that depends on a payment token
 * @notice This contract demonstrates deploying contracts with dependencies
 */
contract NFTMarketplace is Ownable, ReentrancyGuard {
    /// @notice The ERC20 token used for payments
    IERC20 public paymentToken;

    /// @notice The price oracle contract address
    address public priceOracle;

    /// @notice Listing fee in basis points (100 = 1%)
    uint256 public listingFeeBps;

    /// @notice Minimum listing price in payment tokens
    uint256 public minListingPrice;

    /// @notice Tracks if the marketplace is active
    bool public isActive;

    /// @dev Structure for a marketplace listing
    struct Listing {
        address seller;
        uint256 price;
        bool active;
    }

    /// @notice Mapping from listing ID to Listing
    mapping(uint256 => Listing) public listings;

    /// @notice Counter for listing IDs
    uint256 public nextListingId;

    // Events
    event ListingCreated(uint256 indexed listingId, address indexed seller, uint256 price);
    event ListingSold(uint256 indexed listingId, address indexed buyer, uint256 price);
    event ListingCancelled(uint256 indexed listingId);
    event PriceOracleUpdated(address indexed newOracle);
    event MarketplaceStatusChanged(bool isActive);

    /**
     * @dev Constructor sets the payment token address
     * @param _paymentToken Address of the ERC20 token for payments
     */
    constructor(address _paymentToken) Ownable(msg.sender) {
        require(_paymentToken != address(0), "Invalid token address");
        paymentToken = IERC20(_paymentToken);
        listingFeeBps = 250; // 2.5% fee
        minListingPrice = 1e18; // 1 token minimum
        isActive = true;
        nextListingId = 1;
    }

    /**
     * @dev Sets the price oracle address (called after deployment)
     * @param _priceOracle Address of the price oracle contract
     */
    function setPriceOracle(address _priceOracle) external onlyOwner {
        require(_priceOracle != address(0), "Invalid oracle address");
        priceOracle = _priceOracle;
        emit PriceOracleUpdated(_priceOracle);
    }

    /**
     * @dev Creates a new listing
     * @param price Price in payment tokens
     */
    function createListing(uint256 price) external nonReentrant returns (uint256) {
        require(isActive, "Marketplace is paused");
        require(price >= minListingPrice, "Price too low");

        uint256 listingId = nextListingId++;
        listings[listingId] = Listing({
            seller: msg.sender,
            price: price,
            active: true
        });

        emit ListingCreated(listingId, msg.sender, price);
        return listingId;
    }

    /**
     * @dev Purchases a listing
     * @param listingId ID of the listing to purchase
     */
    function purchase(uint256 listingId) external nonReentrant {
        require(isActive, "Marketplace is paused");
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing not active");
        require(listing.seller != msg.sender, "Cannot buy own listing");

        listing.active = false;

        uint256 fee = (listing.price * listingFeeBps) / 10000;
        uint256 sellerAmount = listing.price - fee;

        require(
            paymentToken.transferFrom(msg.sender, listing.seller, sellerAmount),
            "Payment to seller failed"
        );
        require(
            paymentToken.transferFrom(msg.sender, address(this), fee),
            "Fee payment failed"
        );

        emit ListingSold(listingId, msg.sender, listing.price);
    }

    /**
     * @dev Cancels a listing
     * @param listingId ID of the listing to cancel
     */
    function cancelListing(uint256 listingId) external {
        Listing storage listing = listings[listingId];
        require(listing.seller == msg.sender, "Not the seller");
        require(listing.active, "Listing not active");

        listing.active = false;
        emit ListingCancelled(listingId);
    }

    /**
     * @dev Pauses or unpauses the marketplace
     * @param _isActive New active status
     */
    function setMarketplaceStatus(bool _isActive) external onlyOwner {
        isActive = _isActive;
        emit MarketplaceStatusChanged(_isActive);
    }

    /**
     * @dev Updates the listing fee
     * @param _feeBps New fee in basis points
     */
    function setListingFee(uint256 _feeBps) external onlyOwner {
        require(_feeBps <= 1000, "Fee too high"); // Max 10%
        listingFeeBps = _feeBps;
    }

    /**
     * @dev Withdraws accumulated fees
     */
    function withdrawFees() external onlyOwner {
        uint256 balance = paymentToken.balanceOf(address(this));
        require(balance > 0, "No fees to withdraw");
        require(paymentToken.transfer(owner(), balance), "Transfer failed");
    }
}
