// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PriceOracle
 * @dev A simple price oracle for the marketplace
 * @notice This contract demonstrates post-deployment configuration
 */
contract PriceOracle is Ownable {
    /// @notice Price of native token in USD (scaled by 1e8)
    uint256 public nativeTokenPrice;

    /// @notice Mapping of token address to price in USD (scaled by 1e8)
    mapping(address => uint256) public tokenPrices;

    /// @notice Last update timestamp
    uint256 public lastUpdateTime;

    /// @notice Minimum time between updates (in seconds)
    uint256 public updateCooldown;

    /// @notice Address authorized to update prices
    address public priceUpdater;

    // Events
    event PriceUpdated(address indexed token, uint256 price, uint256 timestamp);
    event NativePriceUpdated(uint256 price, uint256 timestamp);
    event PriceUpdaterChanged(address indexed newUpdater);

    /**
     * @dev Constructor sets initial configuration
     */
    constructor() Ownable(msg.sender) {
        updateCooldown = 1 hours;
        priceUpdater = msg.sender;
        lastUpdateTime = block.timestamp;
    }

    /**
     * @dev Modifier to check if caller can update prices
     */
    modifier onlyPriceUpdater() {
        require(
            msg.sender == priceUpdater || msg.sender == owner(),
            "Not authorized"
        );
        _;
    }

    /**
     * @dev Sets the price updater address
     * @param _updater New price updater address
     */
    function setPriceUpdater(address _updater) external onlyOwner {
        require(_updater != address(0), "Invalid address");
        priceUpdater = _updater;
        emit PriceUpdaterChanged(_updater);
    }

    /**
     * @dev Updates the native token price
     * @param _price New price in USD (scaled by 1e8)
     */
    function setNativeTokenPrice(uint256 _price) external onlyPriceUpdater {
        require(_price > 0, "Price must be positive");
        require(
            block.timestamp >= lastUpdateTime + updateCooldown,
            "Update cooldown not passed"
        );

        nativeTokenPrice = _price;
        lastUpdateTime = block.timestamp;
        emit NativePriceUpdated(_price, block.timestamp);
    }

    /**
     * @dev Updates an ERC20 token price
     * @param _token Token address
     * @param _price New price in USD (scaled by 1e8)
     */
    function setTokenPrice(address _token, uint256 _price) external onlyPriceUpdater {
        require(_token != address(0), "Invalid token address");
        require(_price > 0, "Price must be positive");

        tokenPrices[_token] = _price;
        emit PriceUpdated(_token, _price, block.timestamp);
    }

    /**
     * @dev Batch update multiple token prices
     * @param _tokens Array of token addresses
     * @param _prices Array of prices
     */
    function batchSetTokenPrices(
        address[] calldata _tokens,
        uint256[] calldata _prices
    ) external onlyPriceUpdater {
        require(_tokens.length == _prices.length, "Length mismatch");

        for (uint256 i = 0; i < _tokens.length; i++) {
            require(_tokens[i] != address(0), "Invalid token address");
            require(_prices[i] > 0, "Price must be positive");
            tokenPrices[_tokens[i]] = _prices[i];
            emit PriceUpdated(_tokens[i], _prices[i], block.timestamp);
        }
    }

    /**
     * @dev Gets the price of a token
     * @param _token Token address (address(0) for native token)
     * @return price Price in USD (scaled by 1e8)
     */
    function getPrice(address _token) external view returns (uint256) {
        if (_token == address(0)) {
            return nativeTokenPrice;
        }
        return tokenPrices[_token];
    }

    /**
     * @dev Updates the cooldown period
     * @param _cooldown New cooldown in seconds
     */
    function setUpdateCooldown(uint256 _cooldown) external onlyOwner {
        require(_cooldown >= 1 minutes, "Cooldown too short");
        require(_cooldown <= 1 days, "Cooldown too long");
        updateCooldown = _cooldown;
    }
}
