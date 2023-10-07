import { BigNumber } from "ethers";
import { run, ethers } from "hardhat";
import { Address, DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const forceAddress: Address = "0xDcBB276857C3fBF64b7A26179dA02B34133d5203";

  const attack = await deploy("AttackForce", {
    from: deployer,
    args: [forceAddress],
    log: true,
    waitConfirmations: 10,
  });

  console.log("Attack deployed at: ", attack.address);

  await run("verify:verify", {
    address: forceAddress,
    contract: "contracts/Force/AttackForce.sol:AttackForce",
  });
};

deploy.tags = ["Force"];
export default deploy;
