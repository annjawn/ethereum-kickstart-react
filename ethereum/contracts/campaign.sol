pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public{
        address campaignAddress = new Campaign(minimum,msg.sender); //creates and deploys a new contract
        deployedCampaigns.push(campaignAddress);
    }

    function getDeployedCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;

    //Search in mapping is constant time. Lookup by key is available
    //iterating is not possible just like Swift Dictionaries
    //the Key is not stored only the value is stored,
    //for a key that is not present in the map the value will always return default (0 if int/uint, false if bool, "" if string)
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator) public{
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable{
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient)
        public restricted{
            //reference types i.e. mapping inside of reference types i.e. structs
            //are not required during initialization (not sure why)
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        // Alternative Structure initialization syntax, but this should respect the order of the variables
        // inside the struct declaration... NOT RECOMMENDED
        // Request(description,value,address,false);

        requests.push(newRequest);
    }

    function approveRequest(uint index) public{
        //it's a storage variable since we want to manipulate the actual storage variable
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];

        //check for approval count
        require(request.approvalCount > (approversCount / 2));

        //check if request is not finalized
        require(!request.complete);

        //transfer the money to the recipient's address. Address types have a 'transfer' function
        request.recipient.transfer(request.value);

        //finalize request
        request.complete = true;
    }

    function getSummary() public view returns(uint, uint, uint, uint, address){
        return(
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
          );
    }

    function getRequestCount() public view returns(uint){
      return requests.length;
    }
}
