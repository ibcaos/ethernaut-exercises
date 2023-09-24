import { BigNumber } from "ethers";
import { run, ethers } from "hardhat";
import { Address, DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const coinFlipAddress: Address = "0x23bE44305785E35D1c07a22998f862c294e27EaF";

  const basicContractWithoutProxy = await deploy("AttackCoinFlip", {
    from: deployer,
    args: [coinFlipAddress],
    log: true,
    waitConfirmations: 10,
  });

  console.log("AttackCoinFlip deployed at: ", basicContractWithoutProxy.address);

  await run("verify:verify", {
    address: basicContractWithoutProxy.address,
    contract: "contracts/CoinFlip/AttackCoinFlip.sol:AttackCoinFlip",
  });
};

deploy.tags = ["AttackCoinFlip"];
export default deploy;
