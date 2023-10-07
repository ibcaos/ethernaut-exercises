import { BigNumber } from "ethers";
import { run, ethers } from "hardhat";
import { Address, DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const telephoneAddress: Address = "0xe38777C2b6DC75dD31b507CBa28d427a5D6C3C2d";

  const attack = await deploy("AttackTelephone", {
    from: deployer,
    args: [telephoneAddress],
    log: true,
    waitConfirmations: 10,
  });

  console.log("Attack deployed at: ", attack.address);

  await run("verify:verify", {
    address: telephoneAddress,
    contract: "contracts/Telephone/AttackTelephone.sol:AttackTelephone",
  });
};

deploy.tags = ["Telephone"];
export default deploy;
