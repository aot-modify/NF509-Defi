// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InsuranceSystem {
    // --- Structs ---
    struct Policy {
        string policyName;
        string terms;
        uint256 premium;
        address insurer;
    }

    struct Claim {
        address hospital;
        uint256 amount;
        string reason;
        bool approved;
        bool processed;
    }

    struct User {
        string name;
        string idNumber;
        string contact;
        address wallet;
        bool isRegistered;
        bool isApproved;
    }

    // --- Mappings ---
    mapping(address => User) public insurers;
    mapping(address => User) public hospitals;
    mapping(address => User) public policyholders;
    mapping(uint256 => Policy) public policies;
    mapping(uint256 => Claim) public claims;

    // --- Variables ---
    address public admin;
    uint256 public policyCount;
    uint256 public claimCount;
    uint256 public insurerCount;
    uint256 public hospitalCount;
    uint256 public policyholderCount;

    // --- Events ---
    event Registered(address indexed user, string role);
    event Approved(address indexed user, string role);
    event PolicyCreated(uint256 policyId, string policyName, address insurer);
    event PolicyPurchased(uint256 policyId, address policyholder);
    event ClaimSubmitted(uint256 claimId, uint256 policyId, address hospital);
    event ClaimProcessed(uint256 claimId, bool approved);
    event FundsTransferred(address indexed insurer, address indexed hospital, uint256 amount);

    // --- Modifiers ---
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action.");
        _;
    }

    modifier onlyApprovedInsurer() {
        require(insurers[msg.sender].isApproved, "Only approved insurers can perform this action.");
        _;
    }

    modifier onlyApprovedHospital() {
        require(hospitals[msg.sender].isApproved, "Only approved hospitals can perform this action.");
        _;
    }

    modifier onlyApprovedPolicyholder() {
        require(policyholders[msg.sender].isApproved, "Only approved policyholders can perform this action.");
        _;
    }

    // --- Constructor ---
    constructor() {
        admin = msg.sender;
    }

    // --- Registration Functions ---
    function registerAsInsurer(string memory name, string memory idNumber, string memory contact, address wallet) public {
        require(wallet != address(0), "Invalid wallet address.");
        insurers[msg.sender] = User(name, idNumber, contact, wallet, true, false);
        insurerCount++;
        emit Registered(msg.sender, "Insurer");
    }

    function registerAsHospital(string memory name, string memory idNumber, string memory contact, address wallet) public {
        require(wallet != address(0), "Invalid wallet address.");
        hospitals[msg.sender] = User(name, idNumber, contact, wallet, true, false);
        hospitalCount++;
        emit Registered(msg.sender, "Hospital");
    }

    function registerAsPolicyholder(string memory name, string memory idNumber, string memory contact, address wallet) public {
        require(wallet != address(0), "Invalid wallet address.");
        policyholders[msg.sender] = User(name, idNumber, contact, wallet, true, false);
        policyholderCount++;
        emit Registered(msg.sender, "Policyholder");
    }

    // --- Admin Approval Functions ---
    function approveInsurer(address insurerAddress) public onlyAdmin {
        require(insurers[insurerAddress].isRegistered, "Insurer not registered.");
        insurers[insurerAddress].isApproved = true;
        emit Approved(insurerAddress, "Insurer");
    }

    function approveHospital(address hospitalAddress) public onlyAdmin {
        require(hospitals[hospitalAddress].isRegistered, "Hospital not registered.");
        hospitals[hospitalAddress].isApproved = true;
        emit Approved(hospitalAddress, "Hospital");
    }

    function approvePolicyholder(address policyholderAddress) public onlyAdmin {
        require(policyholders[policyholderAddress].isRegistered, "Policyholder not registered.");
        policyholders[policyholderAddress].isApproved = true;
        emit Approved(policyholderAddress, "Policyholder");
    }

    // --- Insurer Functions ---
    function createPolicy(string memory policyName, string memory terms, uint256 premium) public onlyApprovedInsurer {
        policies[policyCount] = Policy(policyName, terms, premium, msg.sender);
        emit PolicyCreated(policyCount, policyName, msg.sender);
        policyCount++;
    }

    // --- Policyholder Functions ---
    function purchasePolicy(uint256 policyId) public payable onlyApprovedPolicyholder {
        Policy memory policy = policies[policyId];
        require(msg.value == policy.premium, "Incorrect premium amount sent.");
        emit PolicyPurchased(policyId, msg.sender);
    }

    // --- Hospital Functions ---
    function submitClaim(uint256 policyId, uint256 amount, string memory reason) public onlyApprovedHospital {
        claims[claimCount] = Claim(msg.sender, amount, reason, false, false);
        emit ClaimSubmitted(claimCount, policyId, msg.sender);
        claimCount++;
    }

    // --- Insurer approve Claim Functions ---
    function processClaim(uint256 claimId, bool approve) public onlyApprovedInsurer {
        Claim storage claim = claims[claimId];
        require(!claim.processed, "Claim already processed.");
        claim.processed = true;
        claim.approved = approve;

        if (approve) {
            // Find the insurer's wallet address
            address insurerWallet = policies[claimId].insurer;

            // Ensure the insurer has enough funds
            require(address(insurerWallet).balance >= claim.amount, "Insufficient insurer funds.");

            // Transfer funds from insurer to hospital
            payable(claim.hospital).transfer(claim.amount);

            emit FundsTransferred(insurerWallet, claim.hospital, claim.amount);
        }

        emit ClaimProcessed(claimId, approve);
    }

    // --- Get Counts ---
    function getInsurerCount() public view returns (uint256) {
        return insurerCount;
    }

    function getHospitalCount() public view returns (uint256) {
        return hospitalCount;
    }

    function getPolicyholderCount() public view returns (uint256) {
        return policyholderCount;
    }
}
