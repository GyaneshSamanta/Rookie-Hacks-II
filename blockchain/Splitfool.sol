pragma solidity ^0.5.0;

contract Splitfool 
{

    string[] public transaction_ids;
    string[] public association_ids;
    struct Balance
    {
        uint256 bal;
        string association_id;
        
    }
    struct balance_logs
    {
        string[] blogs;
    }
    struct public deletion_logs;

    function retrieve(/*association id*/) view public returns(uint) // function to view balance
    { 
        //match association id and return balance
        
        if(/*asociation id == id in chain*/)
        {
            return balance;
        }
    }

    function update(/* association id, uint _data */) public //data is the new data entered by user
    {
        balance += _data;
        update_balance_logs();
    }

    function update_balance_logs(/* association id, value */) public
    {
        balance_logs //shitty thing I have to update data in new line in string array.  

    }

    function delete_entry(/*association id, transaction id */)
    {
        if(/*association id == id in chain*/)
        {
            // TBA
        }
        else
        return "Transaction not found";
    }
    
    function update_deletion_logs(/* association id */) public
    {   
        // delete last updation
        // call this function after every delete. 
        deletion_logs //shitty thing I have to update data in new line in string array.  

    }


}

