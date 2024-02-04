import { ethers, upgrades } from "hardhat";
import { Contract, Signer } from "ethers";
import { expect } from "chai";

describe("BaseTest", async function () {
  let accounts: Signer[];
  let owner: Signer;
  let alice: Signer;
  let bob: Signer;

  let basicContractWithProxy;
  let basicContractWithProxyContract: Contract;

  let basicContractWithoutProxy;
  let basicContractWithoutProxyContract: Contract;

  before(async function () {
    accounts = await ethers.getSigners();
    owner = accounts[0];
    alice = accounts[1];
    bob = accounts[2];

    basicContractWithProxy = await ethers.getContractFactory("BasicContractWithProxy");
    basicContractWithProxyContract = await upgrades.deployProxy(basicContractWithProxy, []);

    basicContractWithoutProxy = await ethers.getContractFactory("BasicContractWithoutProxy");
    basicContractWithoutProxyContract = await basicContractWithoutProxy.deploy();
  });

  describe("Function: someFunction()", () => {
    describe("Modifiers and requires", () => {
      it("Description of the test", async () => {
      });
    });
    describe("Happy path", () => {
      it("Description of the test", async () => {
        expect(1).to.be.equal(1);
      });
    });
  });

});