import { BigNumber } from "ethers";
import { run, ethers } from "hardhat";
import { Address, DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const elevatorAddress: Address = "0xC394D3451c290f1270604041Bb0dB6cD56693838";

  const attack = await deploy("Building", {
    from: deployer,
    args: [elevatorAddress],
    log: true,
    waitConfirmations: 10,
  });

  console.log("Building deployed at: ", attack.address);

  await run("verify:verify", {
    address: elevatorAddress,
    contract: "contracts/Building/Building.sol:Building",
  });
};

deploy.tags = ["Building"];
export default deploy;
