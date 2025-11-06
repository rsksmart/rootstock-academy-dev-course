const { expect } = require('chai');
const { ethers } = require('hardhat');

async function deployContract(contractName, ...params) {
  const contractFactory = await ethers.getContractFactory(contractName);
  const smartContract = await contractFactory.deploy(...params);
  await smartContract.waitForDeployment();
  return smartContract;
}

describe('OneMilNftPixels - buy pixel - success', () => {
  let deployAcct;
  let lunaToken;
  let oneMilNftPixels;

  const pixel1001Id = 1001;
  const pixelDefaultColour = '0xff00ff';
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

  it('should allow to buy pixel 1001 and make it purple', async () => {
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
    const tx = lunaToken[transferAndCallSignature](
      oneMilNftPixels.target,
      tokenAmount,
      callData,
    );
    await expect(tx)
      .to.emit(oneMilNftPixels, 'Transfer')
      .withArgs(ethers.ZeroAddress, deployAcct.address, pixel1001Id);
  });

  it('should have set the colour of pixel 1001 after buy', async () => {
    const pixel1001 = await oneMilNftPixels.pixels(pixel1001Id);
    expect(pixel1001.colour).to.equal(pixelDefaultColour);
  });

  it('should have set the price of pixel 1001 after buy', async () => {
    const pixel1001 = await oneMilNftPixels.pixels(pixel1001Id);
    expect(pixel1001.price).to.equal(tokenAmount);
  });

  it('should have update owner of pixel 1001 after buy', async () => {
    expect(await oneMilNftPixels.ownerOf(pixel1001Id)).to.equal(
      deployAcct.address,
    );
  });

  it('should have increased balance of contract after buy', async () => {
    expect(await lunaToken.balanceOf(oneMilNftPixels.target)).to.equal(
      tokenAmount,
    );
  });
});
