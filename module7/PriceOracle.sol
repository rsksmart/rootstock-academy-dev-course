// Sources flattened with hardhat v2.28.6 https://hardhat.org

// SPDX-License-Identifier: MIT

// File @openzeppelin/contracts/utils/Context.sol@v5.6.1

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v5.0.1) (utils/Context.sol)

pragma solidity ^0.8.20;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }

    function _contextSuffixLength() internal view virtual returns (uint256) {
        return 0;
    }
}


// File @openzeppelin/contracts/access/Ownable.sol@v5.6.1

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v5.0.0) (access/Ownable.sol)

pragma solidity ^0.8.20;

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * The initial owner is set to the address provided by the deployer. This can
 * later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    /**
     * @dev The caller account is not authorized to perform an operation.
     */
    error OwnableUnauthorizedAccount(address account);

    /**
     * @dev The owner is not a valid owner account. (eg. `address(0)`)
     */
    error OwnableInvalidOwner(address owner);

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.
     */
    constructor(address initialOwner) {
        if (initialOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(initialOwner);
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        if (owner() != _msgSender()) {
            revert OwnableUnauthorizedAccount(_msgSender());
        }
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        if (newOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}


// File contracts/PriceOracle.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.20;

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
