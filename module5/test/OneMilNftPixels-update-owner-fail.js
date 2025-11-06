const { expect } = require('chai');
const { ethers } = require('hardhat');

async function deployContract(contractName, ...params) {
  const contractFactory = await ethers.getContractFactory(contractName);
  const smartContract = await contractFactory.deploy(...params);
  await smartContract.waitForDeployment();
  return smartContract;
}

describe('OneMilNftPixels - update pixel by owner - failure', () => {
  let deployAcct;
  let lunaToken;
  let oneMilNftPixels;

  const pixel1001Id = 1001;
  const pixelDefaultColour = '0xff00ff';
  const pixelYellowColor = '0xffff0a';
  const tokensTotalSupply = 1e7;
  const transferAndCallSignature = 'transferAndCall(address,uint256,bytes)';
  const tokenAmount = 10;

  before(async () => {
    [deployAcct] = await ethers.getSigners();
    lunaToken = await deployContract('LunaToken', tokensTotalSupply);
    oneMilNftPixels = await deployContract(
      'OneMilNftPixels',
      lunaToken.target,
    );
  });

  it('pixel 1001 should belong to the deployer', async () => {
    const sigHash = oneMilNftPixels.interface.getFunction('buy').selector;
    const callData = ethers.AbiCoder.defaultAbiCoder().encode(
      ['bytes4', 'address', 'uint24', 'bytes3', 'uint256'],
      [
        sigHash,
        deployAcct.address,
        pixel1001Id,
        pixelDefaultColour,
        tokenAmount,
      ],
    );
    await lunaToken[transferAndCallSignature](
      oneMilNftPixels.target,
      tokenAmount,
      callData,
    ).then((res) => res.wait());
    expect(await oneMilNftPixels.ownerOf(pixel1001Id)).to.equal(
      deployAcct.address,
    );
  });

  it('should not allow deployer to update pixel without payment', async () => {
    const zeroTokens = 0;
    const sigHash = oneMilNftPixels.interface.getFunction('update').selector;
    const callData = ethers.AbiCoder.defaultAbiCoder().encode(
      ['bytes4', 'address', 'uint24', 'bytes3', 'uint256'],
      [sigHash, deployAcct.address, pixel1001Id, pixelYellowColor, zeroTokens],
    );
    const tx = lunaToken[transferAndCallSignature](
      oneMilNftPixels.target,
      zeroTokens,
      callData,
    );
    await expect(tx).to.be.revertedWith(
      'Stop fooling me! Are you going to pay?',
    );
  });

  it('should not allow deployer to update pixel with low payment', async () => {
    const lowTokenAmount = 5;
    const sigHash = oneMilNftPixels.interface.getFunction('update').selector;
    const callData = ethers.AbiCoder.defaultAbiCoder().encode(
      ['bytes4', 'address', 'uint24', 'bytes3', 'uint256'],
      [
        sigHash,
        deployAcct.address,
        pixel1001Id,
        pixelYellowColor,
        lowTokenAmount,
      ],
    );
    const tx = lunaToken[transferAndCallSignature](
      oneMilNftPixels.target,
      lowTokenAmount,
      callData,
    );
    await expect(tx).to.be.reverted;
  });

  it('should not have increased balance of contract after failed buy attempts', async () => {
    expect(await lunaToken.balanceOf(oneMilNftPixels.target)).to.equal(
      tokenAmount,
    );
  });
});
