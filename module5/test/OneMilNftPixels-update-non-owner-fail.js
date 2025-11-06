const { expect } = require('chai');
const { ethers } = require('hardhat');

async function deployContract(contractName, ...params) {
  const contractFactory = await ethers.getContractFactory(contractName);
  const smartContract = await contractFactory.deploy(...params);
  await smartContract.waitForDeployment();
  return smartContract;
}

describe('OneMilNftPixels - update pixel by non-owner - failure', () => {
  let deployAcct;
  let buyerAcct;
  let lunaToken;
  let oneMilNftPixels;

  const pixel1001Id = 1001;
  const pixelDefaultColour = '0xff00ff';
  const pixelYellowColor = '0xffff0a';
  const tokensTotalSupply = 1e7;
  const transferAndCallSignature = 'transferAndCall(address,uint256,bytes)';
  const tokenAmount = 10;
  const pixelPrice = 10;
  const updatePrice = 10;

  before(async () => {
    [deployAcct, buyerAcct] = await ethers.getSigners();
    lunaToken = await deployContract('LunaToken', tokensTotalSupply);
    oneMilNftPixels = await deployContract(
      'OneMilNftPixels',
      lunaToken.target,
    );
    // give some Lunas to another account
    await lunaToken
      .connect(deployAcct)
      .transfer(buyerAcct.address, 100)
      .then((res) => res.wait());
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

  it('should not allow deployer to update unowned pixel', async () => {
    const unownedPixelId = 1002;
    const sigHash = oneMilNftPixels.interface.getFunction('update').selector;
    const callData = ethers.AbiCoder.defaultAbiCoder().encode(
      ['bytes4', 'address', 'uint24', 'bytes3', 'uint256'],
      [
        sigHash,
        deployAcct.address,
        unownedPixelId,
        pixelYellowColor,
        updatePrice,
      ],
    );
    const tx = lunaToken[transferAndCallSignature](
      oneMilNftPixels.target,
      updatePrice,
      callData,
    );
    await expect(tx).to.be.reverted;
  });

  it('should not allow buyers to update pixel 1001 that they do not own', async () => {
    const sigHash = oneMilNftPixels.interface.getFunction('update').selector;
    const callData = ethers.AbiCoder.defaultAbiCoder().encode(
      ['bytes4', 'address', 'uint24', 'bytes3', 'uint256'],
      [sigHash, buyerAcct.address, pixel1001Id, pixelYellowColor, updatePrice],
    );
    const tx = lunaToken
      .connect(buyerAcct)
      [transferAndCallSignature](
        oneMilNftPixels.target,
        updatePrice,
        callData,
      );
    await expect(tx).to.be.reverted;
  });

  it('should maintain the previous colour of pixel 1001 after failed update attempt', async () => {
    const pixel = await oneMilNftPixels.pixels(pixel1001Id);
    expect(pixel.colour).to.equal(pixelDefaultColour);
  });

  it('should maintain the previous price of pixel 1001 after failed update attempt', async () => {
    const pixel = await oneMilNftPixels.pixels(pixel1001Id);
    expect(pixel.price).to.equal(pixelPrice);
  });

  it('should maintain the previous owner of pixel 1001 after failed update attempt', async () => {
    expect(await oneMilNftPixels.ownerOf(pixel1001Id)).to.equal(
      deployAcct.address,
    );
  });
});
