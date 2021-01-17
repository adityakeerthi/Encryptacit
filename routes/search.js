const ethers = require('ethers');
const InputDataDecoder = require('ethereum-input-data-decoder');
const { abi, address } = require('../contract');
const decoder = new InputDataDecoder(abi);
var express = require('express');
var router = express.Router();

const URL = 'HTTP://127.0.0.1:7545';
const customHttpProvider = new ethers.providers.JsonRpcProvider(URL);

// let res = customHttpProvider.getBlockWithTransactions("0x517ee3a23e683c9d23646d998abcf06eda18121d0edc79c8a1deddd5ed9d5962").then( r => {
//     console.log(r)
// })
// let strr = '0xaf3e24f200000000000000000000000000000000000000000000000000000000000027100000000000000000000000009c3df261e050a0241acff7cc2cda07b65d9e359d0000000000000000000000007a427198d68cf92cfe1b1e1d6beeb46d84b50807000000000000000000000000520884c561c01296c99f52a2839004beacdc3c80000000000000000000000000a9b00221877d469831440d6554374cc0e9714801000000000000000000000000437bb59e889e3a98fb44a48e0fb9177a71c658b10000000000000000000000009c3df261e050a0241acff7cc2cda07b65d9e359d0000000000000000000000000000000000000000000000000000000000000001'
// // let originalText = ethers.utils.parseBytes32String(strr).then( r => {
// //     console.log(r);
// // })
// console.log('---------------------------------------------------------------')
// const data = `0xaf3e24f200000000000000000000000000000000000000000000000000000000000027100000000000000000000000009c3df261e050a0241acff7cc2cda07b65d9e359d0000000000000000000000007a427198d68cf92cfe1b1e1d6beeb46d84b50807000000000000000000000000520884c561c01296c99f52a2839004beacdc3c80000000000000000000000000a9b00221877d469831440d6554374cc0e9714801000000000000000000000000437bb59e889e3a98fb44a48e0fb9177a71c658b10000000000000000000000009c3df261e050a0241acff7cc2cda07b65d9e359d0000000000000000000000000000000000000000000000000000000000000001`;
 
// const result = decoder.decodeData(data);
 
// console.log(result);
// // console.log(res);


// let res = customHttpProvider.getBlockWithTransactions("0x517ee3a23e683c9d23646d998abcf06eda18121d0edc79c8a1deddd5ed9d5962").then( r => {
//     console.log(decoder.decodeData(r.transactions[0].data))
// })

/* GET home page. */
router.post('/', (req, res, next) => {
    customHttpProvider.getBlockWithTransactions(req.body.receipt).then(r => {
        result = decoder.decodeData(r.transactions[0].data).inputs

    res.send( {
        value: result[0],
        owner: result[6],
        consensous: result[7],
        validators: result.splice(1, 5),
    })
    })
});

module.exports = router;
