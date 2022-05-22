pragma solidity ^0.8.0;

contract Splitfool{
      mapping(address => mapping (address => uint)) public debts;
      address[] public users;
      int[] balance_logs;
      int[] deletion_logs;
      function lookup(address debtor, address creditor) public view returns (uint ret){
          ret = debts[debtor][creditor];
      }

      function add_IOU(address creditor, uint amount) public{
          addDebt(msg.sender, creditor, amount);
          balance_logs.push(amount); 
      }
      function addDebt(address debtor, address creditor , uint amount) public{
          debts[debtor][creditor] += amount;
          addToUsers(creditor);
          addToUsers(debtor);
          balance_logs.push(amount);
      }
      function addToUsers(address add) public{
          for (uint i = 0; i < users.length; i++){
            if (users[i] == add)
                return;
            }
        users.push(add);
      }
    //   function getDepts(address from) public view returns (mapping (address => uint256) memory) {
    //      mapping(address => uint32) memory ret;
    //      return ret;
    //   }
    
    function getUsers() public view returns (address[] memory ret){
        ret = new address[](users.length);
        for (uint i = 0; i < users.length; i++){
            ret[i] = users[i];
        }
    }
      
}