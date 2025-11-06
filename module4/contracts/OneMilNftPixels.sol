// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import 'erc-payable-token/contracts/token/ERC1363/IERC1363.sol';
import 'erc-payable-token/contracts/token/ERC1363/IERC1363Receiver.sol';

contract OneMilNftPixels is ERC721, Ownable, IERC1363Receiver {
    uint256 public minPriceIncrement;
    uint256 public updatePrice;
    uint256 public compensation;

    mapping(address => uint256) public compensationBalances;

    struct Pixel {
        bytes3 colour;
        uint256 price;
    }

    Pixel[1_000_000] public pixels;

    IERC1363 public acceptedToken;

    event Update(uint24 indexed tokenId);
    event OwnerAdmin();
    event WithdrawCompensation(address indexed to, uint256 amount);
    event TokensReceived(
        address indexed operator,
        address indexed sender,
        uint256 amount,
        bytes data
    );
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
        _withdrawCompensation(address(to));
    }

    // Non-clashing address-based variant:
    function withdrawCompensationTo(address to) public {
        _withdrawCompensation(to);
    }

    function _withdrawCompensation(address to) internal {
        uint256 due = compensationBalances[_msgSender()];
        require(due > 0, 'Insufficient compensation balance!');

        uint256 balance = IERC1363(acceptedToken).balanceOf(address(this));
        require(balance >= due, 'Insufficient balance!');

        // CEI: effects before interaction
        compensationBalances[_msgSender()] = 0;

        bool ok = acceptedToken.transfer(to, due);
        require(ok, 'withdraw failed');

        emit WithdrawCompensation(to, due);
    }

    function _buy(address sender, uint24 id, bytes3 colour, uint256 amount) internal {
        require(id < pixels.length, 'invalid id');

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

    function _update(address sender, uint24 id, bytes3 colour, uint256 amount) internal {
        require(id < pixels.length, 'invalid id');
        require(amount >= updatePrice, 'should pay update price');
        require(ERC721.ownerOf(id) == sender, 'only owner allowed');

        Pixel storage pixel = pixels[id];
        pixel.colour = colour;

        emit Update(id);
    }

    function buy(address sender, uint24 id, bytes3 colour, uint256 amount)
        public
        acceptedTokenOnly
    {
        _buy(sender, id, colour, amount);
    }

    function update(address sender, uint24 id, bytes3 colour, uint256 amount)
        public
        acceptedTokenOnly
    {
        _update(sender, id, colour, amount);
    }

    function ownerAdmin(
        bool withdrawAll,
        uint256 minPriceIncrementNew,
        uint256 updatePriceNew
    ) public onlyOwner {
        minPriceIncrement = minPriceIncrementNew;
        updatePrice = updatePriceNew;

        if (withdrawAll) {
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
     * @notice Handle receipt of ERC1363 tokens via whitelisted dispatcher.
     * Uses the *actual* `amount` argument, not a user-supplied value in `data`.
     *
     * data is expected to be: (bytes4 selector, address newOwner, uint24 pixelId, bytes3 colour)
     * where selector is either this.buy.selector or this.update.selector
     */
    function onTransferReceived(
        address operator,
        address sender,
        uint256 amount,
        bytes calldata data
    ) external override(IERC1363Receiver) acceptedTokenOnly returns (bytes4) {
        require(amount > 0, 'Stop fooling me! Are you going to pay?');

        emit TokensReceived(operator, sender, amount, data);

        (bytes4 selector, address newOwner, uint24 pixelId, bytes3 colour) =
            abi.decode(data, (bytes4, address, uint24, bytes3));

        if (selector == this.buy.selector) {
            _buy(newOwner, pixelId, colour, amount);
        } else if (selector == this.update.selector) {
            _update(newOwner, pixelId, colour, amount);
        } else {
            revert('invalid selector');
        }

        return IERC1363Receiver(this).onTransferReceived.selector;
    }

    receive() external payable {
        revert('Accepts purchases in Luna tokens only');
    }

    fallback() external {
        revert('Unknown function call');
    }
}