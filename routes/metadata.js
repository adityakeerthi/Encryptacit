const express = require('express');
const ethers = require('ethers');
const { abi, address } = require('../contract');

const URL = 'HTTP://127.0.0.1:7545';
const customHttpProvider = new ethers.providers.JsonRpcProvider(URL);
let Contract = new ethers.Contract(address, abi, customHttpProvider.getSigner(0));

const { admin } = require('./admin');

const router = express.Router();

const metadata = async (req, res) => {
    // req.body.accountId
    let account_info = await admin.firestore().collection('users').doc(req.body.accountId).get();
    let data = account_info.data()
    let rep = data.reputation;
    let new_stake = true
    if (rep < 0) {
        new_stake = false
    }
    let updating_stake = await admin.firestore().collection('users').doc(req.body.accountId).update({
        stake: new_stake
    })
    if (data) {
        res.send(data);
    } else {
        res.send(data);
    }
}

router.post('/', metadata);

module.exports = router;

