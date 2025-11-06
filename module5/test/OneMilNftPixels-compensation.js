const { expect } = require('chai');
const { ethers } = require('hardhat');

async function deployContract(contractName, ...params) {
  const contractFactory = await ethers.getContractFactory(contractName);
  const smartContract = await contractFactory.deploy(...params);
  await smartContract.waitForDeployment();
  return smartContract;
}

describe('OneMilNftPixels - compensations', () => {
  let deployAcct;
  let buyer1Acct;
  let lunaToken;
  let oneMilNftPixels;
  let rebuyTx;
  let buySigHash;

  const pixel1001Id = 1001;
  const pixel1001Price = 10;
  const newPixel1001Price = pixel1001Price * 2;
  const pixelDefaultColour = '0xff00ff';
  const tokensTotalSupply = 1e7;
  const transferAndCallSignature = 'transferAndCall(address,uint256,bytes)';
  const compensationAmount = 10; // Luna tokens

  before(async () => {
    [deployAcct, buyer1Acct] = await ethers.getSigners();
    lunaToken = await deployContract('LunaToken', tokensTotalSupply);
    oneMilNftPixels = await deployContract(
      'OneMilNftPixels',
      lunaToken.target,
    );
    buySigHash = oneMilNftPixels.interface.getFunction('buy').selector;
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
    const callData = ethers.AbiCoder.defaultAbiCoder().encode(
      ['bytes4', 'address', 'uint24', 'bytes3', 'uint256'],
      [
        buySigHash,
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

  it('should allow buyer1Acct to repurchase pixel 1001', async () => {
    const callData = ethers.AbiCoder.defaultAbiCoder().encode(
      ['bytes4', 'address', 'uint24', 'bytes3', 'uint256'],
      [
        buySigHash,
        buyer1Acct.address,
        pixel1001Id,
        pixelDefaultColour,
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

  it('deployer should receive a compensation for the overbought pixel', async () => {
    const compensation = await oneMilNftPixels.compensationBalances(
      deployAcct.address,
    );
    expect(compensation).to.equal(compensationAmount);
  });

  it('deployer should be able to withdraw the received compensation', async () => {
    await expect(() =>
      oneMilNftPixels.withdrawCompensation(deployAcct.address),
    ).to.changeTokenBalances(
      lunaToken,
      [oneMilNftPixels, deployAcct],
      [-compensationAmount, compensationAmount],
    );
  });
});
