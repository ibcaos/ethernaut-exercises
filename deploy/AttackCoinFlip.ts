import { run, ethers } from "hardhat";
import { Address, DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function (hre) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const coinFlipAddress: Address = "0xC2442b994a5cC72f36FD5548B7D3c22D9CE88eE9";

  const attackCoinFlip = await deploy("AttackCoinFlip", {
    from: deployer,
    args: [coinFlipAddress],
    log: true,
    waitConfirmations: 10,
  });

  console.log("🚀 AttackCoinFlip deployed at: ", attackCoinFlip.address);

  await run("verify:verify", {
    address: attackCoinFlip.address,
    contract: "contracts/CoinFlip/AttackCoinFlip.sol:AttackCoinFlip",
  });
};

deploy.tags = ["AttackCoinFlip"];
export default deploy;
