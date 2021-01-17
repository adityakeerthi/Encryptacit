const express = require('express');
const ethers = require('ethers');
const { abi, address } = require('../contract');

const URL = 'HTTP://127.0.0.1:7545';
const customHttpProvider = new ethers.providers.JsonRpcProvider(URL);
let Contract = new ethers.Contract(address, abi, customHttpProvider.getSigner(0));

const { admin } = require('./admin');

const router = express.Router();

const CAD_to_WEI = (cad) => {

    return (cad*0.00063*1000000000000000000).toString();
}

const WEI_to_CAD = (wei) => {
    return ((wei/1000000000000000000)*1583.92).toString();
}

const vote = async (req, res) => {
    /*
    req.accountId
    req.ticketId
    req.value
    */
    ticket_doc = await admin.firestore().collection('tickets').doc(req.body.ticketId).get();
    original_value = ticket_doc.data().value;
    value_lower_bound = Math.round(original_value*0.94)
    value_upper_bound = Math.round(original_value*1.06)
    console.log(value_lower_bound, value_upper_bound)
    if (value_lower_bound <= req.body.value && req.body.value <= value_upper_bound) {
        console.log("POS")
        // its good
        owner_doc = await admin.firestore().collection('users').doc(req.body.accountId).get();
        tickets_val_1 = owner_doc.data().tickets_to_validate;
        tickets_val_1[req.body.ticketId] = true;
        new_owner_doc = await admin.firestore().collection('users').doc(req.body.accountId).update({
            tickets_to_validate: tickets_val_1
        })
        ticket_state_doc = await admin.firestore().collection('tickets').doc(req.body.ticketId).get();
        appraisers_new = ticket_state_doc.data().appraisers;
        appraisers_new[req.body.accountId] = true
        new_ticket_state_doc = await admin.firestore().collection('tickets').doc(req.body.ticketId).update({
            appraisers: appraisers_new
        })
    } else {
        console.log("NEG")
        // its not good
        owner_doc = await admin.firestore().collection('users').doc(req.body.accountId).get();
        tickets_val_1 = owner_doc.data().tickets_to_validate;
        tickets_val_1[req.body.ticketId] = false;
        new_owner_doc = await admin.firestore().collection('users').doc(req.body.accountId).update({
            tickets_to_validate: tickets_val_1
        })
        ticket_state_doc = await admin.firestore().collection('tickets').doc(req.body.ticketId).get();
        appraisers_new = ticket_state_doc.data().appraisers;
        appraisers_new[req.body.accountId] = false
        new_ticket_state_doc = await admin.firestore().collection('tickets').doc(req.body.ticketId).update({
            appraisers: appraisers_new
        })
    }

    voted = 0
    new_ticket_doc = await admin.firestore().collection('tickets').doc(req.body.ticketId).get();
    total_appraisers = new_ticket_doc.data().appraisers;
    for (let key in total_appraisers) {
        val = total_appraisers[key]
        if (val != null) {
            voted += 1;
        }
    }
    if (voted == 5) {
        ticket_doc = await admin.firestore().collection('tickets').doc(req.body.ticketId).update({
            ongoing: false
        })

        true_no = 0
        false_no = 0
        consensus = true
        new_ticket_doc = await admin.firestore().collection('tickets').doc(req.body.ticketId).get();
        total_appraisers = new_ticket_doc.data().appraisers;

        for (let key in total_appraisers) {
            let valorant = total_appraisers[key]
            if (valorant) {
                true_no += 1
            } else {
                false_no += 1
            }
        }
        if (true_no < false_no) {
            consensus = false
        }

        consensus_update = await admin.firestore().collection('tickets').doc(req.body.ticketId).update({
            consensus
        })

        if (consensus) {
            // good
            total_moola = new_ticket_doc.data().value * 0.05;
            equal_amount = (total_moola/true_no).toFixed(2);
            for (let key in total_appraisers) {
                val = total_appraisers[key]
                if (val) {
                    result = await Contract.sendAPayment(key, CAD_to_WEI(equal_amount));
                    user = await admin.firestore().collection('users').doc(req.body.accountId).update({
                        reputation: admin.firestore.FieldValue.increment(10)
                    })
                } else {
                    user = await admin.firestore().collection('users').doc(req.body.accountId).update({
                        reputation: admin.firestore.FieldValue.increment(-10)
                    })
                }
            }
            
        } else {
            // bad
            total_moola = new_ticket_doc.data().value * 0.05;
            equal_amount = (total_moola/false_no).toFixed(2);
            console.log(total_moola, equal_amount);
            for (let key in total_appraisers) {
                val = total_appraisers[key]
                if (val) {
                    result = await Contract.sendAPayment(key, CAD_to_WEI(equal_amount));
                    user = await admin.firestore().collection('users').doc(req.body.accountId).update({
                        reputation: admin.firestore.FieldValue.increment(10)
                    })
                } else {
                    user = await admin.firestore().collection('users').doc(req.body.accountId).update({
                        reputation: admin.firestore.FieldValue.increment(-10)
                    })
                }
            }
        }

        // await Contract.publishBlock(req.body.amount, req.body.v1, req.body.v2, req.body.v3, req.body.v4, req.body.v5, req.body.author, req.body.consensus);
        v = []
        for (let key in total_appraisers) {
            v.push(key);
        }
        block = await Contract.publishBlock(new_ticket_doc.data().value, v[0], v[1], v[2], v[3], v[4], req.body.accountId, consensus);
        blockhash = block.blockHash;

        ticket_blockhash = await admin.firestore().collection('tickets').doc(req.body.ticketId).update({
            blockhash
        });

        res.send(block);
    } 
}

router.post('/', vote);

module.exports = router;

