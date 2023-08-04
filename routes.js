const express = require('express');
const router = express.Router();
const raffleController = require('./controllers/raffle.controller');

router.post('/enterRaffle', raffleController.enterRaffle);

router.post('/checkUpkeep', raffleController.checkUpkeep);

router.get('/getRaffleState', raffleController.getRaffleState);

router.get('/getNumWords', raffleController.getNumWords);

router.get('/getRequestConfirmations', raffleController.getRequestConfirmations);

router.get('/getRecentWinner', raffleController.getRecentWinner);

router.get('/getPlayer', raffleController.getPlayer);

router.get('/getLastTimeStamp', raffleController.getLastTimeStamp);

router.get('/getInterval', raffleController.getInterval);

router.get('/getEntranceFee', raffleController.getEntranceFee);

router.get('/getNumberOfPlayers', raffleController.getNumberOfPlayers);

module.exports = router;
