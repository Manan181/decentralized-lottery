require('dotenv').config();
const hre = require('hardhat');
const Raffle = require('../artifacts/contracts/Raffle.sol/Raffle.json');
const provider = new hre.ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
let signer, owner, accounts;

const getSigner = async () => {
    signer = await provider.getSigner();
	[owner] = await hre.ethers.getSigners();
	accounts = await hre.ethers.getSigners();
};
getSigner();

const RaffleContract = new hre.ethers.Contract(process.env.CONTRACT_ADDRESS, Raffle.abi, provider);

module.exports = {
    enterRaffle: async (req, res) => {
        try {
			const sender = req.body.playerAddress;
			const newSigner = await hre.ethers.getSigner(sender);
            const transactionResponse = await RaffleContract.connect(newSigner).enterRaffle({ value: '10000000000000000' });
			const transactionReceipt = await transactionResponse.wait();
            return res.status(200).send({ message: 'Success', data: transactionReceipt });
        } catch (error) {
            return res.status(500).send({ message: 'Something went wrong', error });
        }
    },
    
    checkUpkeep: async (req, res) => {
        try {
			const result = await RaffleContract.connect(accounts[0]).checkUpkeep();
			return res.status(200).send({ message: 'Success', data: result });
		} catch (error) {
			return res.status(500).send({ message: 'Something went wrong', error });
		}
    },
    
	getRaffleState: async (req, res) => {
		try {
			const raffleState = await RaffleContract.connect(accounts[0]).getRaffleState();
			return res.status(200).send({ message: 'Success', data: raffleState });
		} catch (error) {
			return res.status(500).send({ message: 'Something went wrong', error });
		}
	},

	getNumWords: async (req, res) => {
		try {
			const numWords = await RaffleContract.connect(accounts[0]).getNumWords();
			return res.status(200).send({ message: 'Success', data: { numWords: await numWords.toString() }});
		} catch (error) {
			return res.status(500).send({ message: 'Something went wrong', error });
		}
	},

	getRequestConfirmations: async (req, res) => {
		try {
            const requestConfirmations = await RaffleContract.connect(accounts[0]).getRequestConfirmations();
			return res.status(200).send({ message: 'Success', data: {requestConfirmations: await requestConfirmations.toString() } });
		} catch (error) {
            return res.status(500).send({ message: 'Something went wrong', error });
        }
	},

	getRecentWinner: async (req, res) => {
		try {
            const recentWinner = await RaffleContract.connect(accounts[0]).getRecentWinner();
			return res.status(200).send({ message: 'Success', data: recentWinner });
		} catch (error) {
            return res.status(500).send({ message: 'Something went wrong', error });
        }
	},

	getPlayer: async (req, res) => {
		try {
			const index = req.query.index;
            console.log("🚀 ~ file: raffle.controller.js:74 ~ getPlayer: ~ index:", index)
            const player = await RaffleContract.connect(accounts[0]).getPlayer(index);
			return res.status(200).send({ message: 'Success', data: player });
		} catch (error) {
            return res.status(500).send({ message: 'Something went wrong', error });
        }
	},

	getLastTimeStamp: async (req, res) => {
		try {
            const lastTimeStamp = await RaffleContract.connect(accounts[0]).getLastTimeStamp();
			return res.status(200).send({ message: 'Success', data: { lastTimeStamp: await lastTimeStamp.toString() } });
		} catch (error) {
            return res.status(500).send({ message: 'Something went wrong', error });
        }
	},

	getInterval: async (req, res) => {
		try {
            const interval = await RaffleContract.connect(accounts[0]).getInterval();
			return res.status(200).send({ message: 'Success', data: { interval: await interval.toString() } });
		} catch (error) {
            return res.status(500).send({ message: 'Something went wrong', error });
        }
	},

	getEntranceFee: async (req, res) => {
		try {
            const entranceFee = await RaffleContract.connect(accounts[0]).getEntranceFee();
			return res.status(200).send({ message: 'Success', data: { entranceFee: entranceFee.toString() } });
		} catch (error) {
            return res.status(500).send({ message: 'Something went wrong', error });
        }
	},

	getNumberOfPlayers: async (req, res) => {
		try {
            const numberOfPlayers = await RaffleContract.connect(accounts[0]).getNumberOfPlayers();
            return res.status(200).send({ message: 'Success', data: { numberOfPlayers: await numberOfPlayers.toString() } });
		} catch (error) {
            return res.status(500).send({ message: 'Something went wrong', error });
        }
	},
};
