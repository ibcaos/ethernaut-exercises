import { ethers, run } from "hardhat";
import { DeployFunction, Deployment } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { BasicContractWithProxy } from "../typechain";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const basicContractWithProxy = await deploy("BasicContractWithProxy", {
    from: deployer,
    args: [],
    log: true,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        init: {
          methodName: "initialize",
          args: [],
        },
      },
    },
    waitConfirmations: 10,
  });

  console.log("BasicContractWithProxy deployed at: ", basicContractWithProxy.address);
  delay(5000);
  const basicContractWithProxyImpl = await deployments.get("BasicContractWithProxy_Implementation");
  const basicContractWithProxyDeployment: Deployment = await deployments.get("BasicContractWithProxy");
  const basicContractWithProxyDeployed: BasicContractWithProxy = await ethers.getContractAt(
    "BasicContractWithProxy",
    basicContractWithProxyDeployment.address
  );

  await run("verify:verify", {
    address: basicContractWithProxyImpl.address,
    contract: "contracts/tokens/BasicContractWithProxy.sol:BasicContractWithProxy",
  });

};

deploy.tags = ["BasicContractWithProxy"];
export default deploy;