const { expect } = require('chai');
const { ethers } = require('hardhat');

async function deployContract(contractName, ...params) {
  const contractFactory = await ethers.getContractFactory(contractName);
  const smartContract = await contractFactory.deploy(...params);
  await smartContract.waitForDeployment();
  return smartContract;
}

describe('OneMilNftPixels - re-buy pixel - success', () => {
  let deployAcct;
  let buyer1Acct;
  let lunaToken;
  let oneMilNftPixels;
  let rebuyTx;

  const pixel1001Id = 1001;
  const pixel1001Price = 10;
  const newPixel1001Price = pixel1001Price * 2;
  const pixelDefaultColour = '0xff00ff';
  const pixelYellowColor = '0xffff0a';
  const tokensTotalSupply = 1e7;
  const transferAndCallSignature = 'transferAndCall(address,uint256,bytes)';

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
    // give some money to another account to pay gas fee
    await deployAcct
      .sendTransaction({
        value: 1e15,
        to: buyer1Acct.address,
      })
      .then((res) => res.wait());
  });

  it('pixel 1001 should already belong to the deployer', async () => {
    const tokenAmount = 10;
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

  it('should allow buyer1Acct to buy pixel 1001 and make it yellow', async () => {
    const sigHash = oneMilNftPixels.interface.getFunction('buy').selector;
    const callData = ethers.AbiCoder.defaultAbiCoder().encode(
      ['bytes4', 'address', 'uint24', 'bytes3', 'uint256'],
      [
        sigHash,
        buyer1Acct.address,
        pixel1001Id,
        pixelYellowColor,
        newPixel1001Price,
      ],
    );
    rebuyTx = lunaToken
      .connect(buyer1Acct)
      [transferAndCallSignature](
        oneMilNftPixels.target,
        newPixel1001Price,
        callData,
      );
    await expect(rebuyTx)
      .to.emit(oneMilNftPixels, 'Transfer')
      .withArgs(deployAcct.address, buyer1Acct.address, pixel1001Id);
  });

  it('should have set the colour of pixel 1001 after purchase', async () => {
    const pixel1001 = await oneMilNftPixels.pixels(pixel1001Id);
    expect(pixel1001.colour).to.equal(pixelYellowColor);
  });

  it('should have set the price of pixel 1001 after purchase', async () => {
    const pixel1001 = await oneMilNftPixels.pixels(pixel1001Id);
    expect(pixel1001.price).to.equal(newPixel1001Price);
  });

  it('should have update owner of pixel 1001 after purchase', async () => {
    expect(await oneMilNftPixels.ownerOf(pixel1001Id)).to.equal(
      buyer1Acct.address,
    );
  });

  it('should have increased balance of contract after re-buy', async () => {
    expect(await lunaToken.balanceOf(oneMilNftPixels.target)).to.equal(
      pixel1001Price + newPixel1001Price,
    );
  });
});
