module.exports.abi = [
    {
      "inputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address payable",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "pay",
          "type": "uint256"
        }
      ],
      "name": "sendAPayment",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "validator1",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "validator2",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "validator3",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "validator4",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "validator5",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "author",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "consensous",
          "type": "bool"
        }
      ],
      "name": "publishBlock",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
module.exports.address = '0xf0978c2905e0C17aBe7794d7319B0092eA13844A';