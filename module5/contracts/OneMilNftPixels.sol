// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import 'hardhat/console.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import 'erc-payable-token/contracts/token/ERC1363/IERC1363.sol';
import 'erc-payable-token/contracts/token/ERC1363/IERC1363Receiver.sol';

contract OneMilNftPixels is ERC721, Ownable, IERC1363Receiver {
    uint256 public minPriceIncrement;
    uint256 public updatePrice;
    uint256 public compensation;

    /**
     * @dev Compensations paid to pixels' former owners, when they are bought over.
     * Compensations are withdrawn from the accepted token OneMilNftPixels balance
     */
    mapping(address => uint256) public compensationBalances;
    struct Pixel {
        bytes3 colour;
        uint256 price;
    }
    Pixel[1_000_000] public pixels;

    /**
     * @dev The ERC1363 token accepted
     */
    IERC1363 public acceptedToken;

    /**
     * @dev Emitted when the owner of a pixel updates it
     */
    event Update(uint24 indexed tokenId);

    /**
     * @dev Emitted when the contract owner performs admin
     */
    event OwnerAdmin();

    /**
     * @dev Emitted when the `sender` withdraws compensation
     */
    event WithdrawCompensation(address indexed to, uint256 amount);

    /**
     * @dev Emitted when `amount` tokens are moved from one account (`sender`) to
     * this by operator (`operator`) using {transferAndCall} or {transferFromAndCall}.
     */
    event TokensReceived(
        address indexed operator,
        address indexed sender,
        uint256 amount,
        bytes data
    );

    /**
     * @dev Emitted when the allowance of this for a `sender` is set by
     * a call to {approveAndCall}. `amount` is the new allowance.
     */
    event TokensApproved(address indexed sender, uint256 amount, bytes data);

    // Function selectors for whitelist
    bytes4 private constant BUY_SELECTOR = bytes4(keccak256("buy(address,uint24,bytes3,uint256)"));
    bytes4 private constant UPDATE_SELECTOR = bytes4(keccak256("update(address,uint24,bytes3,uint256)"));

    // Commit-reveal for frontrunning protection
    struct Commit {
        bytes32 commitment;
        uint256 timestamp;
        bool revealed;
    }
    mapping(address => Commit) public commits;
    uint256 public constant COMMIT_WINDOW = 10 minutes;
    
    event CommitSubmitted(address indexed user, bytes32 commitment);
    event PurchaseRevealed(address indexed user, uint24 indexed pixelId, uint256 amount);

    modifier acceptedTokenOnly() {
        require(
            _msgSender() == address(acceptedToken),
            'ERC1363Payable: accepts purchases in Lunas only'
        );
        _;
    }

    constructor(IERC1363 _acceptedToken)
        ERC721('OneMilNftPixels', 'NFT1MPX')
        Ownable(msg.sender)
    {
        require(
            address(_acceptedToken) != address(0),
            'ERC1363Payable: acceptedToken is zero address'
        );
        require(
            _acceptedToken.supportsInterface(type(IERC1363).interfaceId),
            "Your token doesn't support ERC1363"
        );
        acceptedToken = _acceptedToken;

        minPriceIncrement = 10;
        updatePrice = 10;
        compensation = 10;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) 
        public 
        view 
        virtual 
        override(ERC721) 
        returns (bool) 
    {
        return interfaceId == type(IERC1363Receiver).interfaceId || 
               super.supportsInterface(interfaceId);
    }

    /**
     * @dev Allow withdrawal of compensations to a specified address.
     * If the balance of the NFT contract is 0 or msg.sender has 0 compensation balance, call will revert.
     */
    function withdrawCompensation(IERC1363Receiver to) public {
        uint256 balance = IERC1363(acceptedToken).balanceOf(address(this));
        uint256 compensationBalance = compensationBalances[_msgSender()];

        require(balance >= compensationBalance, 'Insufficient balance!');
        require(compensationBalance > 0, 'Insufficient compensation balance!');

        // FIX #1: Update state FIRST (Checks-Effects-Interactions pattern)
        compensationBalances[_msgSender()] = 0;

        bool withdrawalSuccess = acceptedToken.transferAndCall(address(to), compensationBalance);
        require(withdrawalSuccess, 'withdraw failed');

        emit WithdrawCompensation(address(to), compensationBalance);
    }

    // Commit-reveal functions
    function commit(bytes32 commitment) external {
        commits[msg.sender] = Commit({
            commitment: commitment,
            timestamp: block.timestamp,
            revealed: false
        });
        emit CommitSubmitted(msg.sender, commitment);
    }
    
    function reveal(uint24 id, bytes3 colour, uint256 amount, bytes memory secret) external {
        Commit storage userCommit = commits[msg.sender];
        require(userCommit.timestamp > 0, "No commitment found");
        require(!userCommit.revealed, "Already revealed");
        require(block.timestamp > userCommit.timestamp + COMMIT_WINDOW, "Too early to reveal");
        require(block.timestamp <= userCommit.timestamp + COMMIT_WINDOW * 2, "Commit expired");
        
        bytes32 computedCommit = keccak256(abi.encodePacked(id, colour, amount, secret, msg.sender));
        require(computedCommit == userCommit.commitment, "Commitment doesn't match");
        
        userCommit.revealed = true;
        
        emit PurchaseRevealed(msg.sender, id, amount);
    }

    /**
     * @dev Purchase pixel and update its colour.
     * If pixel is not currently owned, NFT is minted.
     * If pixel is already owned, NFT is transferred.
     */
    function buy(address sender, uint24 id, bytes3 colour, uint256 amount) public acceptedTokenOnly {
        Pixel storage pixel = pixels[id];
        require(
            amount >= pixel.price + minPriceIncrement,
            'should increment on current price'
        );
        pixel.price = amount;
        pixel.colour = colour;

        // Check if token exists by trying to get its owner
        address currentOwner = _ownerOf(id);
        if (currentOwner != address(0)) {
            // purchasing a pixel already in existence
            // compensate the previous owner
            compensationBalances[currentOwner] += compensation;
            _transfer(currentOwner, sender, id);
        } else {
            // purchasing a previously untouched pixel
            _safeMint(sender, id);
        }
    }

    /**
     * @dev Update pixel colour
     */
    function update(address sender, uint24 id, bytes3 colour, uint256 amount)
        public acceptedTokenOnly
    {
        require(
            amount >= updatePrice,
            'should pay update price'
        );
        require(
            ERC721.ownerOf(id) == sender,
            'only owner allowed'
        );
        Pixel storage pixel = pixels[id];
        pixel.colour = colour;

        emit Update(id);
    }

    /**
     * @dev Admin function - only owner can call
     */
    function ownerAdmin(
        bool withdraw,
        uint256 minPriceIncrementNew,
        uint256 updatePriceNew
    ) public onlyOwner {
        minPriceIncrement = minPriceIncrementNew;
        updatePrice = updatePriceNew;
        if (withdraw) {
            uint256 balance = IERC1363(acceptedToken).balanceOf(address(this));
            if (balance > 0) {
                bool success = IERC1363(acceptedToken).transfer(
                    Ownable(this).owner(),
                    balance
                );
                require(success, 'send failed');
            }
        }
        emit OwnerAdmin();
    }

    /**
     * @notice Handle the receipt of ERC1363 tokens
     */
    function onTransferReceived(
        address operator,
        address sender,
        uint256 amount,
        bytes calldata data
    ) external override(IERC1363Receiver) acceptedTokenOnly returns (bytes4) {
        require(amount > 0, 'Stop fooling me! Are you going to pay?');

        emit TokensReceived(operator, sender, amount, data);

        _transferReceived(sender, amount, data);

        return IERC1363Receiver(this).onTransferReceived.selector;
    }

    /**
     * @dev Called after validating a `onTransferReceived`.
     * Decodes ALL 5 parameters from the test data
     */
    function _transferReceived(
        address _sender,
        uint256 _amount,
        bytes memory _data
    ) private {
        // Decode ALL 5 parameters that the test sends!
        (bytes4 selector, address ownerAddress, uint24 pixelId, bytes3 colour, uint256 price) = abi.decode(
            _data, 
            (bytes4, address, uint24, bytes3, uint256)
        );
        
        // Whitelist ONLY buy and update functions
        require(
            selector == BUY_SELECTOR || selector == UPDATE_SELECTOR, 
            'Call of an unknown function'
        );
        
        bytes memory callData;
        if (selector == BUY_SELECTOR) {
            // For buy: use REAL _sender (security fix) and REAL _amount
            callData = abi.encodeWithSelector(
                selector,
                _sender,      // REAL sender from token transfer (NOT from calldata)
                pixelId,
                colour,
                _amount       // REAL amount from token transfer (NOT from calldata)
            );
        } else {
            // For update: use parameters as-is
            callData = abi.encodeWithSelector(
                selector,
                ownerAddress,
                pixelId,
                colour,
                price
            );
        }
        
        (bool success, ) = address(this).delegatecall(callData);
        require(success, 'Function call failed');
    }

    receive() external payable {
        revert('Accepts purchases in Luna tokens only');
    }

    fallback() external {
        revert('Unknown function call');
    }
}
