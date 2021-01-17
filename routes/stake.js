const express = require('express');

const { admin } = require('./admin');

const router = express.Router();

const stake = async (req, res) => {
    try {
        owner_doc = await admin.firestore().collection('users').doc(req.body.accountId).update({
            stake: true,
            reputation: 50
        })
    } catch (e) {
        res.status(404).send(e);
    }
    res.send(true);
}

router.post('/', stake);

module.exports = router;

