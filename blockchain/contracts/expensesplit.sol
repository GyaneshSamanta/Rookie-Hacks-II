pragma solidity ^0.8.0;

contract Splitwise{
      mapping(address => mapping (address => int32)) public debts;
      address[] public users;
      int[] balance_logs;
      int[] deletion_logs;
      function lookup(address debtor, address creditor) public view returns (int32 ret){
          ret = debts[debtor][creditor];
      }

      function add_IOU(address creditor, int32 amount) public{
          addDebt(msg.sender, creditor, amount);
          balance_logs.push(amount); 
      }
      function addDebt(address debtor, address creditor , int32 amount) public{
          debts[debtor][creditor] += amount;
          addToUsers(creditor);
          addToUsers(debtor);
          balance_logs.push(amount);
      }
      function addToUsers(address add) private{
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