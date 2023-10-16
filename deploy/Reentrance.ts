import { run, ethers } from "hardhat";
import { Address, DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function (hre) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const reentranceAddress: Address = "0x6af1bf3271c7Efc977A77e69Fca2a55A180b8793";

  const attack = await deploy("AttackReentrance", {
    from: deployer,
    args: [reentranceAddress],
    value: ethers.utils.parseEther("0.0001"),
    log: true,
    waitConfirmations: 10,
  });

  console.log("🔄 AttackReentrance deployed at:", attack.address);

  await run("verify:verify", {
    address: reentranceAddress,
    contract: "contracts/Reentrance/AttackReentrance.sol:AttackReentrance",
  });
};

deploy.tags = ["Reentrance"];
export default deploy;
