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

    // --- Arrays to hold user addresses ---
    address[] public insurerAddresses;
    address[] public hospitalAddresses;
    address[] public policyholderAddresses;

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
        insurerAddresses.push(msg.sender);
        insurerCount++;
        emit Registered(msg.sender, "Insurer");
    }

    function registerAsHospital(string memory name, string memory idNumber, string memory contact, address wallet) public {
        require(wallet != address(0), "Invalid wallet address.");
        hospitals[msg.sender] = User(name, idNumber, contact, wallet, true, false);
        hospitalAddresses.push(msg.sender);
        hospitalCount++;
        emit Registered(msg.sender, "Hospital");
    }

    function registerAsPolicyholder(string memory name, string memory idNumber, string memory contact, address wallet) public {
        require(wallet != address(0), "Invalid wallet address.");
        policyholders[msg.sender] = User(name, idNumber, contact, wallet, true, false);
        policyholderAddresses.push(msg.sender);
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

    // --- Get Functions to Retrieve User Data ---

    // Get list of approved insurers
    function getApprovedInsurers() public view returns (User[] memory) {
        uint256 approvedCount = 0;
        for (uint256 i = 0; i < insurerCount; i++) {
            if (insurers[insurerAddresses[i]].isApproved) {
                approvedCount++;
            }
        }
        
        User[] memory approvedInsurers = new User[](approvedCount);
        uint256 index = 0;
        for (uint256 i = 0; i < insurerCount; i++) {
            if (insurers[insurerAddresses[i]].isApproved) {
                approvedInsurers[index] = insurers[insurerAddresses[i]];
                index++;
            }
        }
        
        return approvedInsurers;
    }

    // Get list of not approved insurers
    function getNotApprovedInsurers() public view returns (User[] memory) {
        uint256 notApprovedCount = 0;
        for (uint256 i = 0; i < insurerCount; i++) {
            if (!insurers[insurerAddresses[i]].isApproved) {
                notApprovedCount++;
            }
        }
        
        User[] memory notApprovedInsurers = new User[](notApprovedCount);
        uint256 index = 0;
        for (uint256 i = 0; i < insurerCount; i++) {
            if (!insurers[insurerAddresses[i]].isApproved) {
                notApprovedInsurers[index] = insurers[insurerAddresses[i]];
                index++;
            }
        }
        
        return notApprovedInsurers;
    }

    // Get list of approved hospitals
    function getApprovedHospitals() public view returns (User[] memory) {
        uint256 approvedCount = 0;
        for (uint256 i = 0; i < hospitalCount; i++) {
            if (hospitals[hospitalAddresses[i]].isApproved) {
                approvedCount++;
            }
        }
        
        User[] memory approvedHospitals = new User[](approvedCount);
        uint256 index = 0;
        for (uint256 i = 0; i < hospitalCount; i++) {
            if (hospitals[hospitalAddresses[i]].isApproved) {
                approvedHospitals[index] = hospitals[hospitalAddresses[i]];
                index++;
            }
        }
        
        return approvedHospitals;
    }

    // Get list of not approved hospitals
    function getNotApprovedHospitals() public view returns (User[] memory) {
        uint256 notApprovedCount = 0;
        for (uint256 i = 0; i < hospitalCount; i++) {
            if (!hospitals[hospitalAddresses[i]].isApproved) {
                notApprovedCount++;
            }
        }
        
        User[] memory notApprovedHospitals = new User[](notApprovedCount);
        uint256 index = 0;
        for (uint256 i = 0; i < hospitalCount; i++) {
            if (!hospitals[hospitalAddresses[i]].isApproved) {
                notApprovedHospitals[index] = hospitals[hospitalAddresses[i]];
                index++;
            }
        }
        
        return notApprovedHospitals;
    }

    // Get list of approved policyholders
    function getApprovedPolicyholders() public view returns (User[] memory) {
        uint256 approvedCount = 0;
        for (uint256 i = 0; i < policyholderCount; i++) {
            if (policyholders[policyholderAddresses[i]].isApproved) {
                approvedCount++;
            }
        }
        
        User[] memory approvedPolicyholders = new User[](approvedCount);
        uint256 index = 0;
        for (uint256 i = 0; i < policyholderCount; i++) {
            if (policyholders[policyholderAddresses[i]].isApproved) {
                approvedPolicyholders[index] = policyholders[policyholderAddresses[i]];
                index++;
            }
        }
        
        return approvedPolicyholders;
    }

    // Get list of not approved policyholders
    function getNotApprovedPolicyholders() public view returns (User[] memory) {
        uint256 notApprovedCount = 0;
        for (uint256 i = 0; i < policyholderCount; i++) {
            if (!policyholders[policyholderAddresses[i]].isApproved) {
                notApprovedCount++;
            }
        }
        
        User[] memory notApprovedPolicyholders = new User[](notApprovedCount);
        uint256 index = 0;
        for (uint256 i = 0; i < policyholderCount; i++) {
            if (!policyholders[policyholderAddresses[i]].isApproved) {
                notApprovedPolicyholders[index] = policyholders[policyholderAddresses[i]];
                index++;
            }
        }
        
        return notApprovedPolicyholders;
    }

}
