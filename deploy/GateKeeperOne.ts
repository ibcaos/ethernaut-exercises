import { run, ethers } from "hardhat";
import { Address, DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function (hre) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const gateKeeperOneAddress: Address = "0x76eAd5A3D1979768050574B6921bFDE8003bE30d";

  const attack = await deploy("AttackGateKeeperOne", {
    from: deployer,
    args: [gateKeeperOneAddress],
    log: true,
    waitConfirmations: 10,
  });

  console.log("🚧 AttackGateKeeperOne deployed at:", attack.address);

  await run("verify:verify", {
    address: gateKeeperOneAddress,
    contract: "contracts/GatekeeperOne/AttackGateKeeperOne.sol:AttackGateKeeperOne",
  });
};

deploy.tags = ["GatekeeperOne"];
export default deploy;
