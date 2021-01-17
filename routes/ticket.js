const express = require('express');

const { admin } = require('./admin');

const router = express.Router();

const ticket = async (req, res) => {
    ticket_info = {
        ongoing: true,
        value: req.body.value,
        owner: req.body.accountId,
    }
    ticket_doc = await admin.firestore().collection('tickets').add(ticket_info)
    owner_doc = await admin.firestore().collection('users').doc(req.body.accountId).update({
        tickets: admin.firestore.FieldValue.arrayUnion(ticket_doc.id)
    })

    res.send(true);
}

router.post('/', ticket);

module.exports = router;

