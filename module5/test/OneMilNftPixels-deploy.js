const { expect } = require('chai');
const { ethers } = require('hardhat');

async function deployContract(contractName, ...params) {
  const contractFactory = await ethers.getContractFactory(contractName);
  const smartContract = await contractFactory.deploy(...params);
  await smartContract.waitForDeployment();
  return smartContract;
}

describe('OneMilNftPixels - upon deployment', () => {
  let deployAcct;
  let lunaToken;
  let oneMilNftPixels;

  before(async () => {
    [deployAcct] = await ethers.getSigners();
    lunaToken = await deployContract('LunaToken', 1e7);
    oneMilNftPixels = await deployContract(
      'OneMilNftPixels',
      lunaToken.target,
    );
  });

  it('should have an owner', async () => {
    expect(await oneMilNftPixels.owner()).to.equal(deployAcct.address);
  });

  it('NFT should have a zero Luna balance', async () => {
    expect(await lunaToken.balanceOf(oneMilNftPixels.target)).to.equal(0);
  });

  it('should have empty colour for pixel #0', async () => {
    const pixel0 = await oneMilNftPixels.pixels(0);
    expect(pixel0.colour).to.equal('0x000000');
  });

  it('should have zero price for pixel #0', async () => {
    const pixel0 = await oneMilNftPixels.pixels(0);
    expect(pixel0.price).to.equal(0);
  });

  it('should have no owner for pixel #0', async () => {
    await expect(oneMilNftPixels.ownerOf(0)).to.be.revertedWithCustomError(
      oneMilNftPixels,
      'ERC721NonexistentToken',
    );
  });

  it('should have Luna token as an accepted token', async () => {
    expect(await oneMilNftPixels.acceptedToken()).to.equal(lunaToken.target);
  });

  it('should NOT accept direct RBTC transfers', async () => {
    const txData = {
      to: oneMilNftPixels.target,
      value: 9999,
    };
    const tx = deployAcct.sendTransaction(txData).then((res) => res.wait());
    await expect(tx).to.be.revertedWith(
      'Accepts purchases in Luna tokens only',
    );
  });

  it('should fallback on an unknown function', async () => {
    const oneMilNftPixelsWithNonExistentFunction = new ethers.Contract(
      oneMilNftPixels.target,
      [...oneMilNftPixels.interface.fragments, 'function foo(uint)'],
      deployAcct,
    );
    const tx = oneMilNftPixelsWithNonExistentFunction.foo(10);
    await expect(tx).to.be.revertedWith('Unknown function call');
  });
});
