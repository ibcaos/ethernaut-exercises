import { run, ethers } from "hardhat";
import { Address, DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function (hre) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const preservationAddress: Address = "0xA5DB1DfEC68DF8d5fBDd46f02755108ecb7249d6";

  const attack = await deploy("AttackPreservation", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 10,
  });

  console.log("📞 AttackPreservation deployed at:", attack.address);

  await run("verify:verify", {
    address: preservationAddress,
    contract: "contracts/Preservation/AttackPreservation.sol:AttackPreservation",
  });
};

deploy.tags = ["Preservation"];
export default deploy;
