import { BigNumber } from "ethers";
import { run, ethers } from "hardhat";
import { Address, DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { GatekeeperOne } from "../typechain-types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const gateKeeperOneAddress = "0x76eAd5A3D1979768050574B6921bFDE8003bE30d";
  const gateKeeperOne: GatekeeperOne = await ethers.getContractAt("GatekeeperOne", gateKeeperOneAddress);

  const attack = await deploy("AttackGateKeeperOne", {
    from: deployer,
    args: [gateKeeperOne.address],
    log: true,
    waitConfirmations: 10,
  });

  console.log("AttackGateKeeperOne deployed at: ", attack.address);

  await run("verify:verify", {
    address: gateKeeperOneAddress,
    contract: "contracts/GatekeeperOne/AttackGateKeeperOne.sol:AttackGateKeeperOne",
  });
};

deploy.tags = ["GatekeeperOne"];
export default deploy;
