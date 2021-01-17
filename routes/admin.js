const admin = require('firebase-admin');
const sak = require('./sak.json');

admin.initializeApp({
    credential: admin.credential.cert(sak)
});

module.exports = { admin };