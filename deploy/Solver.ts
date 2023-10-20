import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { MagicNum } from "../typechain-types";

const deploy: DeployFunction = async function (hre) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const { deploy } = deployments;

  const magicNumberAddress = "0xE9eB72325AcAFb2b3DA6d2fc038E56934b68b9c0";
  const magicNumber: MagicNum = await ethers.getContractAt("MagicNum", magicNumberAddress);

  console.log("🚀 Deploying Solver...");
  const solver = await deploy("Solver", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 10,
  });

  console.log(`🧩 Solver deployed at: ${solver.address}`);

  await magicNumber.setSolver(solver.address);
  
  // Uncomment the next lines if you want to verify the contract on etherscan
  // await run("verify:verify", {
  //   address: solver.address,
  //   contract: "contracts/MagicNumber/Solver.sol:Solver",
  // });
};

deploy.tags = ["Solver"];
export default deploy;
