pragma solidity ^0.8.0;

interface ISuperHonk {
  function count() external view returns (uint256);

  function honk() external;
}

contract SuperHonk is ISuperHonk {
    uint256 public count;

    event LoudSound(address indexed source);

    function honk()
      public
    {
        count += 1;
        emit LoudSound(msg.sender);
    }
}
