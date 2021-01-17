const express = require('express');

const { admin } = require('./admin');

const router = express.Router();

const addUser = async (req, res) => {
    user = await admin.firestore().collection('users').doc(req.body.accountId).get();
    // console.log(user);
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
            res.send(account_info);
        } catch (e) {
            res.status(404).send(e);
        }
        
    } else {

    }
}

const userExists = async (req, res) => {
    user = await admin.firestore().collection('users').doc(req.body.accountId).get();
    if (!user.data()){
        res.json({exists: false})
    } else{
        res.json({exists: true, data: user.data()})
    }
}

router.post('/', addUser); 
router.post('/exists', userExists); 

module.exports = router;