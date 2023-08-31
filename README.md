![Hardhat](https://img.shields.io/badge/Hardhat-v2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.1-blue)
![Solidity](https://img.shields.io/badge/Solidity-v0.8-orange)
![License](https://img.shields.io/badge/License-MIT-green)

# 🛠 Hardhat Base Project for Smart Contract Development

This repository serves as a robust starting point for smart contract development using Hardhat. It comes pre-configured with essential contracts, scripts, and tests.

---

## 🚀 Quick Start

1. **Clone the Repository**
    ```
    git clone https://github.com/your-repo.git
    ```
2. **Install Dependencies**
    ``` 
    npm install
    ```

---

## 📦 Dependencies

The project comes with the following pre-installed packages:

- `TypeScript`
- `ts-node`
- `hardhat`
- `nomicfoundation/hardhat-toolbox`
- `hardhat-deploy`
- `openzeppelin/hardhat-upgrades`
- `openzeppelin/contracts-upgradeable`
- `solidity-docgen`
- `dotenv`

---

## 🗃 Project Structure

### `./contracts`

Contains two subfolders: `interfaces` and `tokens`, along with basic contracts—some utilizing proxies and some not.

### `./deploy`

Includes scripts for both deploying and verifying contracts, with examples to differentiate proxy-based and non-proxy deployments.

### `./gasReporter`

Stores automatically generated gas reports. The folder must be manually created as the gas reporter can't create it itself.

### `./scripts`

Features utility scripts, including one for interacting with deployed contracts and a `delay` function for real-world script execution.

### `./test`

Hosts a `test-helpers` folder with utilities like constants, snapshots, and time functions, along with basic test setups.

---

## 🖋 Commands

- `npm install`: Install all required dependencies.
- `npx hardhat compile`: Compile smart contracts.
- `npx hardhat test`: Run tests and generate gas reports.
- `npx hardhat coverage`: Display code coverage.
- `npx hardhat docgen`: Generate documentation from NatSpec comments.

---

## 🔒 .env Example

Sensitive data like API keys and private keys are stored in a `.env` file. Below is an example layout:

```env
# -----------------------------
# DEPLOYMENT PRIVATE KEYS
# -----------------------------
DEPLOYER_PRIVATE_KEY=

# -----------------------------
# API KEYS
# -----------------------------
ETHERSCAN_API_KEY=
BSCSCAN_API_KEY=
POLYGONSCAN_API_KEY=
INFURA_PROJECT_KEY=
COINMARKETCAP_API_KEY=

# -----------------------------
# RPC URL
# -----------------------------
BNB_TESTNET_RPC_URL=

# -----------------------------
# GAS REPORTER CONFIG
# -----------------------------
GAS_REPORTER_STATUS=true
GAS_REPORTER_CURRENCY=USD
GAS_REPORTER_GAS_PRICE=6
GAS_REPORTER_TOKEN=BNB
GAS_REPORTER_OUTPUT_REPORT=./gasReporter/GasReport.txt
GAS_REPORTER_COLORS=true
GAS_REPORTER_TIMESPENT=true

# -----------------------------
# OTHER CONFIG
# -----------------------------
```
## 🛡 .gitignore

Ensure your `.gitignore` file lists `.env` to prevent uploading sensitive information, even in a private repository.
