const express = require('express');

const { admin } = require('./admin');

const router = express.Router();

const retrievetickets = async (req, res) => {
    // req.body.accountId
    const account = await admin.firestore().collection('users').doc(req.body.accountId).get();
    const account_doc = account.data();
    proposed_tickets = account_doc.tickets;
    tickets_to_validate = account_doc.tickets_to_validate;
    api = {}
    api["tickets"] = {}
    api["tickets_to_validate"] = {}
    for (let i=0; i<proposed_tickets.length; i++) {
        ticket_id = proposed_tickets[i];
        ticket_id_doc = await admin.firestore().collection('tickets').doc(ticket_id).get();
        t_id_data = ticket_id_doc.data();
        api["tickets"][ticket_id] = t_id_data;
        owner_doc = await admin.firestore().collection('users').doc(api["tickets"][ticket_id]["owner"]).get();
        owner_data = owner_doc.data();
        api["tickets"][ticket_id]["owner"] = owner_data;
    }
    for (let key in tickets_to_validate) {
        ticket_id = key;
        ticket_id_doc = await admin.firestore().collection('tickets').doc(ticket_id).get();
        t_id_data = ticket_id_doc.data();
        api["tickets_to_validate"][ticket_id] = t_id_data;
        owner_doc = await admin.firestore().collection('users').doc(api["tickets_to_validate"][ticket_id]["owner"]).get();
        owner_data = owner_doc.data();
        api["tickets_to_validate"][ticket_id]["owner"] = owner_data;
    }
    res.send(api);
}

router.post('/', retrievetickets);

module.exports = router;

