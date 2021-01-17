pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract Main {
    
    address initialCreator; 
    
    constructor() payable public {
        initialCreator = msg.sender;
    }
    
      function() external payable {

  }
  
     function sendAPayment(address payable  recipient, uint256 pay) public payable {
        require (msg.sender == initialCreator);
        require (address(this).balance > pay);
        recipient.transfer(pay);
    }
    
    function publishBlock(uint256 pay, address validator1, address validator2, address validator3, address validator4, address validator5, address author, bool consensous) public returns (uint256) {
        return block.number;
    }
  
}