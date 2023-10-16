import { run, ethers } from "hardhat";
import { Address, DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function (hre) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const gateKeeperTwoAddress: Address = "0xC88Ae7Ca2273F6bc5174F6375812f30E3f488E44";

  const attack = await deploy("AttackGateKeeperTwo", {
    from: deployer,
    args: [gateKeeperTwoAddress],
    log: true,
    waitConfirmations: 10,
  });

  console.log("🚨 AttackGateKeeperTwo deployed at:", attack.address);

  await run("verify:verify", {
    address: gateKeeperTwoAddress,
    contract: "contracts/GatekeeperTwo/AttackGateKeeperTwo.sol:AttackGateKeeperTwo",
  });
};

deploy.tags = ["GatekeeperTwo"];
export default deploy;
