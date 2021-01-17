const express = require('express');

const { admin } = require('./admin');

const router = express.Router();

const addUser = async (req, res) => {
    // res.send(req);
    user = await admin.firestore().collection('users').doc(req.body.accountId).get();
    console.log(user);
    if (!user.data()) {
        account_info = {
            username: req.body.username,
            region: req.body.region, // string in the following format: city, state/province, country
            tags: req.body.tags, // array of tags
            reputation: 0, 
            tickets: [],
            stake: false,
            tickets_to_validate: {}
        }
        try {
            admin.firestore().collection('users').doc(req.body.accountId).set(account_info)
        } catch (e) {
            res.status(404).send(e);
        }
        res.send(account_info);
    } else {

    }
}

router.post('/', addUser); 

module.exports = router;