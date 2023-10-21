import { ethers, run } from "hardhat";
import { Address, DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function (hre) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const denialAddress: Address = "0x6Ca2A9dcFEaF64d7A8d871479930a58139a22DDE";

  // 🚀 Deploying our Denial contract
  const attack = await deploy("AttackDenial", {
    from: deployer,
    value: ethers.utils.parseEther("0.0001"),
    args: [denialAddress],
    log: true,
    waitConfirmations: 10,
  });

  console.log("🏰 Denial successfully deployed at:", attack.address);

  // 🔍 Verifying the contract on-chain
  // await run("verify:verify", {
  //   address: attack.address,
  //   contract: "contracts/Denial/AttackDenial.sol:AttackDenial",
  // });
};

deploy.tags = ["Denial"];
export default deploy;
