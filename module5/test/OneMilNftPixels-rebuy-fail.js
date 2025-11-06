const { expect } = require('chai');
const { ethers } = require('hardhat');

async function deployContract(contractName, ...params) {
  const contractFactory = await ethers.getContractFactory(contractName);
  const smartContract = await contractFactory.deploy(...params);
  await smartContract.waitForDeployment();
  return smartContract;
}

describe('OneMilNftPixels - re-buy pixel - failure', () => {
  let deployAcct;
  let buyer1Acct;
  let lunaToken;
  let oneMilNftPixels;

  const pixel1001Id = 1001;
  const pixel1001Price = 10;
  const pixelDefaultColour = '0xff00ff';
  const pixelYellowColor = '0xffff0a';
  const tokensTotalSupply = 1e7;
  const transferAndCallSignature = 'transferAndCall(address,uint256,bytes)';
  const tokenAmount = 10;

  before(async () => {
    [deployAcct, buyer1Acct] = await ethers.getSigners();
    lunaToken = await deployContract('LunaToken', tokensTotalSupply);
    oneMilNftPixels = await deployContract(
      'OneMilNftPixels',
      lunaToken.target,
    );
    // give some Lunas to another account
    await lunaToken
      .connect(deployAcct)
      .transfer(buyer1Acct.address, 100)
      .then((res) => res.wait());
  });

  it('pixel 1001 should already belong to the deployer', async () => {
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

  it('should not allow buyer1Acct to re-purchase pixel without payment', async () => {
    const sigHash = oneMilNftPixels.interface.getFunction('buy').selector;
    const callData = ethers.AbiCoder.defaultAbiCoder().encode(
      ['bytes4', 'uint24', 'bytes3', 'address', 'uint256'],
      [sigHash, pixel1001Id, pixelYellowColor, buyer1Acct.address, 0],
    );
    const tx = lunaToken[transferAndCallSignature](
      oneMilNftPixels.target,
      0,
      callData,
    );
    await expect(tx).to.be.revertedWith(
      'Stop fooling me! Are you going to pay?',
    );
  });

  it('should not allow buyer1Acct to re-purchase pixel with low payment', async () => {
    const sigHash = oneMilNftPixels.interface.getFunction('buy').selector;
    const callData = ethers.AbiCoder.defaultAbiCoder().encode(
      ['bytes4', 'address', 'uint24', 'bytes3', 'uint256'],
      [
        sigHash,
        buyer1Acct.address,
        pixel1001Id,
        pixelYellowColor,
        pixel1001Price + 1,
      ],
    );
    const tx = lunaToken[transferAndCallSignature](
      oneMilNftPixels.target,
      pixel1001Price + 1,
      callData,
    );
    await expect(tx).to.be.reverted;
  });

  it('should not have increased balance of contract after failed buy attempts', async () => {
    expect(await lunaToken.balanceOf(oneMilNftPixels.target)).to.equal(
      tokenAmount
    );
  });
});
