import { ethers } from "hardhat";
import { HelloEthernaut } from "../typechain-types";
import { Address } from "hardhat-deploy/types";

const CONTRACT_ADDRESS: Address = "0x7D3f8e46041DB198C23F9F2fB12297CEA49ad740";

const artifact = {
  "_format": "hh-sol-artifact-1",
  "contractName": "HelloEthernaut",
  "sourceName": "contracts/1-HelloEthernaut/HelloEthernaut.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "passkey",
          "type": "string"
        }
      ],
      "name": "authenticate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCleared",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "info",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "info1",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "param",
          "type": "string"
        }
      ],
      "name": "info2",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "info42",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "infoNum",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "method7123949",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "password",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "theMethodName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b506101ef806100206000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c8063aa613b2911610066578063aa613b29146100e5578063c253aebe146100d6578063d4c3cf44146100cf578063f0bc7081146100cf578063f157a1e3146100cf57600080fd5b80632133b6a9146100a3578063224b610b146100cf5780632cbd79a5146100cf578063370158ea146100cf5780633c848d78146100d6575b600080fd5b6100b96100b13660046100f9565b606092915050565b6040516100c6919061016b565b60405180910390f35b60606100b9565b604051600081526020016100c6565b6100f76100f33660046100f9565b5050565b005b6000806020838503121561010c57600080fd5b823567ffffffffffffffff8082111561012457600080fd5b818501915085601f83011261013857600080fd5b81358181111561014757600080fd5b86602082850101111561015957600080fd5b60209290920196919550909350505050565b600060208083528351808285015260005b818110156101985785810183015185820160400152820161017c565b506000604082860101526040601f19601f830116850101925050509291505056fea26469706673582212205e9aefb6ad25b5bd7b1f259de5274ec352bce1c7b8258950f1732181433c722264736f6c63430008110033",
  "deployedBytecode": "0x608060405234801561001057600080fd5b506004361061009e5760003560e01c8063aa613b2911610066578063aa613b29146100e5578063c253aebe146100d6578063d4c3cf44146100cf578063f0bc7081146100cf578063f157a1e3146100cf57600080fd5b80632133b6a9146100a3578063224b610b146100cf5780632cbd79a5146100cf578063370158ea146100cf5780633c848d78146100d6575b600080fd5b6100b96100b13660046100f9565b606092915050565b6040516100c6919061016b565b60405180910390f35b60606100b9565b604051600081526020016100c6565b6100f76100f33660046100f9565b5050565b005b6000806020838503121561010c57600080fd5b823567ffffffffffffffff8082111561012457600080fd5b818501915085601f83011261013857600080fd5b81358181111561014757600080fd5b86602082850101111561015957600080fd5b60209290920196919550909350505050565b600060208083528351808285015260005b818110156101985785810183015185820160400152820161017c565b506000604082860101526040601f19601f830116850101925050509291505056fea26469706673582212205e9aefb6ad25b5bd7b1f259de5274ec352bce1c7b8258950f1732181433c722264736f6c63430008110033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}


const main = async () => {
  const [deployer] = await ethers.getSigners();
  const helloEthernaut: HelloEthernaut = await ethers.getContractAtFromArtifact(artifact, CONTRACT_ADDRESS, deployer);

  const password = await helloEthernaut.password();
  const { status } = await helloEthernaut.authenticate(password).then(tx => tx.wait());

  console.log(`Operation successful: ${status === 1 ? '✅' : '❌'}`);
};

main().catch(error => {
  console.error('🚫', error);
});
