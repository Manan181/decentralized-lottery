require("dotenv").config();
const hre = require("hardhat");
const { ethers } = hre;
const Raffle = require("../artifacts/contracts/Raffle.sol/Raffle.json");
const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
let signer;
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const getSigner = async () => {
    signer = await wallet.provider.getSigner(wallet.address);
    // [owner] = await ethers.getSigners();
    // accounts = await ethers.getSigners();
};
getSigner();

const RaffleContract = new ethers.Contract(process.env.CONTRACT_ADDRESS, Raffle.abi, provider);

module.exports = {
    enterRaffle: async (req, res) => {
        try {
            const senderPrivateKey = req.body.playerAddressPrivateKey;
            const wallet = new ethers.Wallet(senderPrivateKey, provider);
            const transactionResponse = await RaffleContract.connect(wallet).enterRaffle({
                value: "10000000000000000",
            });
            const transactionReceipt = await transactionResponse.wait();
            return res.status(200).send({ message: "Success", data: transactionReceipt });
        } catch (error) {
            return res.status(500).send({ message: "Something went wrong", error });
        }
    },

    checkUpkeep: async (req, res) => {
        try {
            const result = await RaffleContract.checkUpkeep();
            return res.status(200).send({ message: "Success", data: result });
        } catch (error) {
            return res.status(500).send({ message: "Something went wrong", error });
        }
    },

    getRaffleState: async (req, res) => {
        try {
            const raffleState = await RaffleContract.connect(signer).getRaffleState();
            return res.status(200).send({ message: "Success", data: raffleState });
        } catch (error) {
            return res.status(500).send({ message: "Something went wrong", error });
        }
    },

    getNumWords: async (req, res) => {
        try {
            const numWords = await RaffleContract.connect(signer).getNumWords();
            return res
                .status(200)
                .send({ message: "Success", data: { numWords: await numWords.toString() } });
        } catch (error) {
            return res.status(500).send({ message: "Something went wrong", error });
        }
    },

    getRequestConfirmations: async (req, res) => {
        try {
            const requestConfirmations = await RaffleContract.connect(
                signer
            ).getRequestConfirmations();
            return res
                .status(200)
                .send({
                    message: "Success",
                    data: { requestConfirmations: await requestConfirmations.toString() },
                });
        } catch (error) {
            return res.status(500).send({ message: "Something went wrong", error });
        }
    },

    getRecentWinner: async (req, res) => {
        try {
            const recentWinner = await RaffleContract.connect(signer).getRecentWinner();
            return res.status(200).send({ message: "Success", data: recentWinner });
        } catch (error) {
            return res.status(500).send({ message: "Something went wrong", error });
        }
    },

    getPlayer: async (req, res) => {
        try {
            const index = req.query.index;
            const player = await RaffleContract.connect(signer).getPlayer(index);
            return res.status(200).send({ message: "Success", data: player });
        } catch (error) {
            return res.status(500).send({ message: "Something went wrong", error });
        }
    },

    getLastTimeStamp: async (req, res) => {
        try {
            const lastTimeStamp = await RaffleContract.connect(signer).getLastTimeStamp();
            return res
                .status(200)
                .send({
                    message: "Success",
                    data: { lastTimeStamp: await lastTimeStamp.toString() },
                });
        } catch (error) {
            return res.status(500).send({ message: "Something went wrong", error });
        }
    },

    getInterval: async (req, res) => {
        try {
            const interval = await RaffleContract.connect(signer).getInterval();
            return res
                .status(200)
                .send({ message: "Success", data: { interval: await interval.toString() } });
        } catch (error) {
            return res.status(500).send({ message: "Something went wrong", error });
        }
    },

    getEntranceFee: async (req, res) => {
        try {
            const entranceFee = await RaffleContract.connect(signer).getEntranceFee();
            return res
                .status(200)
                .send({ message: "Success", data: { entranceFee: entranceFee.toString() } });
        } catch (error) {
            return res.status(500).send({ message: "Something went wrong", error });
        }
    },

    getNumberOfPlayers: async (req, res) => {
        try {
            const numberOfPlayers = await RaffleContract.connect(signer).getNumberOfPlayers();
            return res
                .status(200)
                .send({
                    message: "Success",
                    data: { numberOfPlayers: await numberOfPlayers.toString() },
                });
        } catch (error) {
            return res.status(500).send({ message: "Something went wrong", error });
        }
    },
};
