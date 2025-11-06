const { expect } = require('chai');
const { ethers } = require('hardhat');

async function deployContract(contractName, ...params) {
  const contractFactory = await ethers.getContractFactory(contractName);
  const smartContract = await contractFactory.deploy(...params);
  await smartContract.waitForDeployment();
  return smartContract;
}

describe('OneMilNftPixels - admin by owner - success', () => {
  let deployAcct;
  let lunaToken;
  let oneMilNftPixels;

  const tokensTotalSupply = 1e7;
  const minPriceIncrementOld = 10; // Lunas
  const updatePriceOld = 10;
  const minPriceIncrementNew = 20;
  const updatePriceNew = 20;
  const tokenAmount = 100;

  before(async () => {
    [deployAcct] = await ethers.getSigners();
    lunaToken = await deployContract('LunaToken', tokensTotalSupply);
    oneMilNftPixels = await deployContract(
      'OneMilNftPixels',
      lunaToken.target,
    );
  });

  it('OneMilNftPixels contract should receive some tokens', async () => {
    const pixel1001Id = 1001;
    const pixelDefaultColour = '0xff00ff';
    const transferAndCallSignature = 'transferAndCall(address,uint256,bytes)';

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
    expect(await lunaToken.balanceOf(oneMilNftPixels.target)).to.equal(
      tokenAmount,
    );
  });

  it('should allow owner to perform admin function - without withdrawal', async () => {
    await expect(
      oneMilNftPixels.ownerAdmin(false, minPriceIncrementNew, updatePriceNew),
    ).to.emit(oneMilNftPixels, 'OwnerAdmin');
  });

  it('should update to new min price increment after owner admin', async () => {
    expect(await oneMilNftPixels.minPriceIncrement()).to.equal(
      minPriceIncrementNew,
    );
  });

  it('should update to new update price after owner admin', async () => {
    expect(await oneMilNftPixels.updatePrice()).to.equal(updatePriceNew);
  });

  it('should have same balance in contract after owner admin without withdrawal', async () => {
    expect(await lunaToken.balanceOf(oneMilNftPixels.target)).to.equal(
      tokenAmount,
    );
  });

  it('should allow owner to perform admin function with withdrawal', async () => {
    await expect(
      oneMilNftPixels
        .connect(deployAcct)
        .ownerAdmin(true, minPriceIncrementOld, updatePriceOld),
    ).to.emit(oneMilNftPixels, 'OwnerAdmin');
  });

  it('should have zero balance in contract after owner admin with withdrawal', async () => {
    expect(await lunaToken.balanceOf(oneMilNftPixels.target)).to.equal(0);
  });

  it('deployer account should receive Lunas from NFT after the withdrowal', async () => {
    expect(await lunaToken.balanceOf(deployAcct.address)).to.equal(
      tokensTotalSupply,
    );
  });
});
