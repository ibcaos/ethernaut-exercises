import { BigNumber } from "ethers";
import { run, ethers } from "hardhat";
import { Address, DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const kingAddress: Address = "0x752404e6066e1705015725465DCE81994D0Cd9cF";

  const attack = await deploy("AttackKing", {
    from: deployer,
    args: [kingAddress],
    log: true,
    waitConfirmations: 10,
  });

  console.log("Attack deployed at: ", attack.address);

  await run("verify:verify", {
    address: kingAddress,
    contract: "contracts/King/AttackKing.sol:AttackKing",
  });
};

deploy.tags = ["King"];
export default deploy;
