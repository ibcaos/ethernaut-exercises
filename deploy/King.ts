import { run, ethers } from "hardhat";
import { Address, DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function (hre) {
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

  console.log("👑 AttackKing deployed at:", attack.address);

  await run("verify:verify", {
    address: kingAddress,
    contract: "contracts/King/AttackKing.sol:AttackKing",
  });
};

deploy.tags = ["King"];
export default deploy;
