const express = require('express');

const { admin } = require('./admin');

const router = express.Router();

const ticket = async (req, res) => {
    ticket_info = {
        ongoing: true,
        consensus: null,
        blockhash: null,
        value: req.body.value,
        owner: req.body.accountId,
        tags: req.body.tags,
        description: req.body.description,
        contact: req.body.contact
    }
    ticket_doc = await admin.firestore().collection('tickets').add(ticket_info)
    owner_doc = await admin.firestore().collection('users').doc(req.body.accountId).update({
        tickets: admin.firestore.FieldValue.arrayUnion(ticket_doc.id)
    })
    possible_appraisers = []
    snapshot_users = await admin.firestore().collection('users').get();
    snapshot_users.forEach(doc => {
        if (doc.id != 'init') {
            sp_tags = doc.data().tags;
            if (doc.data().stake && doc.data().reputation > 0) {
                for (let i=0; i<req.body.tags.length; i++) {
                    ticket_tag = req.body.tags[i]
                    if (sp_tags.includes(ticket_tag) && !possible_appraisers.includes(doc.id)) {
                        if (doc.id != req.body.accountId) {
                            possible_appraisers.push(doc.id)
                        }
                    }
                }
            }
        }
    })
    final_appraisers = []
    console.log(possible_appraisers)
    for (let j=0; j<5; j++) {
        rand_indice = Math.floor(Math.random()*possible_appraisers.length)
        final_appraisers.push(possible_appraisers[rand_indice])
        possible_appraisers.splice(rand_indice, 1)
    }
    
    ticket_appraisers = {}
    for (let u=0; u<final_appraisers.length; u++) {
        f_a = final_appraisers[u]
        ticket_appraisers[f_a] = null;
    }

    new_ticket_doc = await admin.firestore().collection('tickets').doc(ticket_doc.id).update({
        appraisers: ticket_appraisers
    })

    for (let k=0; k<final_appraisers.length; k++) {
        doc_id = final_appraisers[k]
        previous_doc = await admin.firestore().collection('users').doc(doc_id).get();
        val = previous_doc.data().tickets_to_validate;
        val[ticket_doc.id] = null;
        console.log(val)
        new_doc = await admin.firestore().collection('users').doc(doc_id).update({
            tickets_to_validate: val
        });
    }

    res.send(final_appraisers);
}

router.post('/', ticket);

module.exports = router;

