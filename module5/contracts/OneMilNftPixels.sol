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

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721)
        returns (bool)
    {
        return
            interfaceId == type(IERC1363Receiver).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function withdrawCompensation(IERC1363Receiver to) public {
    require(msg.sender == tx.origin, "Contracts not allowed");

    uint256 balance = acceptedToken.balanceOf(address(this));
    uint256 compensationBalance = compensationBalances[_msgSender()];

    require(balance >= compensationBalance, 'Insufficient balance!');
    require(compensationBalance > 0, 'Insufficient compensation balance!');

    compensationBalances[_msgSender()] = 0;

    bool withdrawalSuccess = acceptedToken.transfer(
        address(to),
        compensationBalance
    );

    require(withdrawalSuccess, 'withdraw failed');

    emit WithdrawCompensation(address(to), compensationBalance);
}

    function buy(address sender, uint24 id, bytes3 colour, uint256 amount) public acceptedTokenOnly {
        require(id < 1_000_000, 'Invalid pixel id');

        Pixel storage pixel = pixels[id];
        require(
            amount >= pixel.price + minPriceIncrement,
            'should increment on current price'
        );

        pixel.price = amount;
        pixel.colour = colour;

        address currentOwner = _ownerOf(id);
        if (currentOwner != address(0)) {
            compensationBalances[currentOwner] += compensation;
            _transfer(currentOwner, sender, id);
        } else {
            _safeMint(sender, id);
        }
    }

    function update(address sender, uint24 id, bytes3 colour, uint256 amount)
        public
        acceptedTokenOnly
    {
        require(id < 1_000_000, 'Invalid pixel id');
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

    function ownerAdmin(
        bool withdraw,
        uint256 minPriceIncrementNew,
        uint256 updatePriceNew
    ) public onlyOwner {
        minPriceIncrement = minPriceIncrementNew;
        updatePrice = updatePriceNew;
        if (withdraw) {
            uint256 balance = acceptedToken.balanceOf(address(this));
            if (balance > 0) {
                bool success = acceptedToken.transfer(
                    owner(),
                    balance
                );
                require(success, 'send failed');
            }
        }
        emit OwnerAdmin();
    }

    function onTransferReceived(
        address operator,
        address sender,
        uint256 amount,
        bytes calldata data
    ) external override acceptedTokenOnly returns (bytes4) {
        require(amount > 0, 'Stop fooling me! Are you going to pay?');

        emit TokensReceived(operator, sender, amount, data);

        _transferReceived(sender, amount, data);

        return IERC1363Receiver(this).onTransferReceived.selector;
    }

    function _transferReceived(
        address sender,
        uint256 realAmount,
        bytes memory _data
    ) private {
        (
            bytes4 selector,
            address newOwner,
            uint24 pixelId,
            bytes3 colour,
            uint256 declaredAmount
        ) = abi.decode(_data, (bytes4, address, uint24, bytes3, uint256));

        bytes4 buySelector = this.buy.selector;
        bytes4 updateSelector = this.update.selector;

        require(
            selector == buySelector || selector == updateSelector,
            'Call of an unknown function'
        );

        require(realAmount == declaredAmount, 'Amount mismatch');
        require(sender == newOwner, 'Sender mismatch');

        if (selector == buySelector) {
            buy(sender, pixelId, colour, realAmount);
        } else {
            update(sender, pixelId, colour, realAmount);
        }
    }

    receive() external payable {
        revert('Accepts purchases in Luna tokens only');
    }

    fallback() external {
        revert('Unknown function call');
    }
}