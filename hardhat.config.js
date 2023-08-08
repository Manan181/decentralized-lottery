require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("hardhat-contract-sizer");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;

const MNEMONIC = process.env.MNEMONIC;

// Your API key for Etherscan, obtain one at https://etherscan.io/
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const REPORT_GAS = process.env.REPORT_GAS || false;

module.exports = {
    defaultNetwork: "sepolia",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        ganache: {
            chainId: 1337,
            url: "http://127.0.0.1:7545",
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: {
                mnemonic: MNEMONIC,
            },
            saveDeployments: true,
            chainId: 11155111,
        },
    },
    etherscan: {
        apiKey: {
            sepolia: ETHERSCAN_API_KEY,
        },
        customChains: [],
    },
    gasReporter: {
        enabled: REPORT_GAS,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    },
    contractSizer: {
        runOnCompile: false,
        only: ["Raffle"],
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
        },
        player: {
            default: 1,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.7",
            },
        ],
    },
    mocha: {
        timeout: 500000, // 500 seconds max for running tests
    },
};
