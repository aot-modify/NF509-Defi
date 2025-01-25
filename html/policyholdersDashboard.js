var contractAddress = '0x5dc301b3eDEDC2fc9F1dA54a0880deEE6Ec516Cc';
var network = "";
let networkDisplay = "";
var explorerUrl = "";
var userAccount = "";
var warning = "";

var userName ="";
var useridNumber ="";
var userContact ="";
var userWallet ="";

var userpolicyName ="";
var userterms ="";
var userpremium ="";
var userinsurer ="";

// let claimsData = [];
// var Hospital ="";
// var Amount = "";
// var Reason = "";
// var Approved = "";
// var Processed = "";

let abi = [
  {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},
  {
    "anonymous":false,"inputs":
    [
      {"indexed":true,"internalType":"address","name":"user","type":"address"},
      {"indexed":false,"internalType":"string","name":"role","type":"string"}
    ],
    "name":"Approved","type":"event"
  },{
    "anonymous":false,"inputs":
    [
      {"indexed":false,"internalType":"uint256","name":"claimId","type":"uint256"},
      {"indexed":false,"internalType":"bool","name":"approved","type":"bool"}
    ],
    "name":"ClaimProcessed","type":"event"
  },{
    "anonymous":false,"inputs":
    [
      {"indexed":false,"internalType":"uint256","name":"claimId","type":"uint256"},
      {"indexed":false,"internalType":"uint256","name":"policyId","type":"uint256"},
      {"indexed":false,"internalType":"address","name":"hospital","type":"address"}
    ],
    "name":"ClaimSubmitted","type":"event"
  },{
    "anonymous":false,"inputs":
    [
      {"indexed":true,"internalType":"address","name":"insurer","type":"address"},
      {"indexed":true,"internalType":"address","name":"hospital","type":"address"},
      {"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}
    ],
    "name":"FundsTransferred","type":"event"
  },{
    "anonymous":false,"inputs":
    [
      {"indexed":false,"internalType":"uint256","name":"policyId","type":"uint256"},
      {"indexed":false,"internalType":"string","name":"policyName","type":"string"},
      {"indexed":false,"internalType":"address","name":"insurer","type":"address"}
    ],
    "name":"PolicyCreated","type":"event"
  },{
    "anonymous":false,"inputs":
    [
      {"indexed":false,"internalType":"uint256","name":"policyId","type":"uint256"},
      {"indexed":false,"internalType":"address","name":"policyholder","type":"address"}
    ],
    "name":"PolicyPurchased","type":"event"
  },{
    "anonymous":false,"inputs":
    [
      {"indexed":true,"internalType":"address","name":"user","type":"address"},
      {"indexed":false,"internalType":"string","name":"role","type":"string"}
    ],
    "name":"Registered","type":"event"
  },{
    "inputs":[],"name":"admin","outputs":
    [
      {"internalType":"address","name":"","type":"address"}
    ],
    "stateMutability":"view","type":"function"
  },{
    "inputs":
    [
      {"internalType":"address","name":"hospitalAddress","type":"address"}
    ],
    "name":"approveHospital","outputs":[],"stateMutability":"nonpayable","type":"function"
  },{
    "inputs":[{"internalType":"address","name":"insurerAddress","type":"address"}],
    "name":"approveInsurer","outputs":[],"stateMutability":"nonpayable","type":"function"
  },{
    "inputs":[{"internalType":"address","name":"policyholderAddress","type":"address"}],
    "name":"approvePolicyholder","outputs":[],"stateMutability":"nonpayable","type":"function"
  },{
    "inputs":[],"name":"claimCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view","type":"function"
  },{
    "inputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "name":"claims","outputs":
    [
      {"internalType":"address","name":"hospital","type":"address"},
      {"internalType":"uint256","name":"amount","type":"uint256"},
      {"internalType":"string","name":"reason","type":"string"},
      {"internalType":"bool","name":"approved","type":"bool"},
      {"internalType":"bool","name":"processed","type":"bool"}
    ],
    "stateMutability":"view","type":"function"
  },{
    "inputs":
    [
      {"internalType":"string","name":"policyName","type":"string"},
      {"internalType":"string","name":"terms","type":"string"},
      {"internalType":"uint256","name":"premium","type":"uint256"}
    ],
    "name":"createPolicy","outputs":[],"stateMutability":"nonpayable","type":"function"
  },{
    "inputs":[],"name":"getHospitalCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"
  },{
    "inputs":[],"name":"getInsurerCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"
  },{
    "inputs":[],"name":"getPolicyholderCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"
  },{
    "inputs":[],"name":"hospitalCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"
  },{
    "inputs":[{"internalType":"address","name":"","type":"address"}],"name":"hospitals","outputs":
    [{"internalType":"string","name":"name","type":"string"},
    {"internalType":"string","name":"idNumber","type":"string"},
    {"internalType":"string","name":"contact","type":"string"},
    {"internalType":"address","name":"wallet","type":"address"},
    {"internalType":"bool","name":"isRegistered","type":"bool"},
    {"internalType":"bool","name":"isApproved","type":"bool"}],
    "stateMutability":"view","type":"function"},
    {"inputs":[],"name":"insurerCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view","type":"function"},{
    "inputs":[{"internalType":"address","name":"","type":"address"}],
    "name":"insurers","outputs":[{"internalType":"string","name":"name","type":"string"},{
    "internalType":"string","name":"idNumber","type":"string"},{
    "internalType":"string","name":"contact","type":"string"},{
    "internalType":"address","name":"wallet","type":"address"},{
    "internalType":"bool","name":"isRegistered","type":"bool"},{
    "internalType":"bool","name":"isApproved","type":"bool"}],"stateMutability":"view","type":"function"},{
    "inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"policies","outputs":[{"internalType":"string","name":"policyName","type":"string"},{
    "internalType":"string","name":"terms","type":"string"},{
    "internalType":"uint256","name":"premium","type":"uint256"},{
    "internalType":"address","name":"insurer","type":"address"}],"stateMutability":"view","type":"function"},{
    "inputs":[],"name":"policyCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"policyholderCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{
    "inputs":[{"internalType":"address","name":"","type":"address"}],"name":"policyholders","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"idNumber","type":"string"},{
    "internalType":"string","name":"contact","type":"string"},{
    "internalType":"address","name":"wallet","type":"address"},{
    "internalType":"bool","name":"isRegistered","type":"bool"},{
    "internalType":"bool","name":"isApproved","type":"bool"}],"stateMutability":"view","type":"function"},{
    "inputs":[{"internalType":"uint256","name":"claimId","type":"uint256"},{
    "internalType":"bool","name":"approve","type":"bool"}],"name":"processClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{
    "inputs":[{"internalType":"uint256","name":"policyId","type":"uint256"}],"name":"purchasePolicy","outputs":[],"stateMutability":"payable","type":"function"},{
    "inputs":[{"internalType":"string","name":"name","type":"string"},{
    "internalType":"string","name":"idNumber","type":"string"},{
    "internalType":"string","name":"contact","type":"string"},{
    "internalType":"address","name":"wallet","type":"address"}],"name":"registerAsHospital","outputs":[],"stateMutability":"nonpayable","type":"function"},{
    "inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"idNumber","type":"string"},{"internalType":"string","name":"contact","type":"string"},{"internalType":"address","name":"wallet","type":"address"}],"name":"registerAsInsurer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"idNumber","type":"string"},{"internalType":"string","name":"contact","type":"string"},{"internalType":"address","name":"wallet","type":"address"}],"name":"registerAsPolicyholder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"policyId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"reason","type":"string"}]
    ,"name":"submitClaim","outputs":[],"stateMutability":"nonpayable","type":"function"
  }
];

window.addEventListener('load', function() {
  // Modern Dapp browsers...
  if (window.ethereum) {
    web3 = new Web3(ethereum);
    try { 
      // Request account access if needed
      ethereum.enable().then(result => {
        // Now you can start your app & access web3 freely:
        startApp();
      })
    }
    catch(err) {
      console.log(err);
    }
  }
  // Legacy dapp browsers, checking if Web3 has been injected by the browser (Mist/MetaMask)
  else if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3 = new Web3(web3.currentProvider);
    // Now you can start your app & access web3 freely:
    startApp();
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3 = new Web3( new Web3.providers.HttpProvider( "https://kovan.infura.io/v3/YOUR_INFURA_KEY" ));
    //web3 = new Web3( new Web3.providers.HttpProvider( "http://localhost:8545/" ));
    // web3 = new Web3( new Web3.providers.HttpProvider( "https://rpc.tch.in.th" ));
    // Now you can start your app & access web3 freely:
    startApp();
  }
})

// Get current network
function startApp() {
  web3.eth.net.getId().then(netId => {
    // web3.version.getNetwork((err, netId) => {
    console.log('netId: ' + netId)
    switch (netId) {
      case 1:
        network = 'Mainnet';
        networkDisplay = network;
        warning = 'please switch your network to Kovan or Thai Chain';
        explorerUrl = "https://" + network.toLowerCase() + ".etherscan.io/tx/"
        break
      case 2:
        network = 'Deprecated Morden';
        networkDisplay = network;
        warning = 'please switch your network to Kovan or Thai Chain';
        explorerUrl = "https://" + network.toLowerCase() + ".etherscan.io/tx/"
        break
      case 3:
        network = 'Ropsten';
        networkDisplay = network;
        warning = 'please switch your network to Kovan or Thai Chain';
        explorerUrl = "https://" + network.toLowerCase() + ".etherscan.io/tx/"
        break
      case 4:
        network = 'Rinkeby';
        networkDisplay = network;
        explorerUrl = "https://" + network.toLowerCase() + ".etherscan.io/tx/"
        break
      case 5:
        network = 'Goerli';
        networkDisplay = network;
        explorerUrl = "https://" + network.toLowerCase() + ".etherscan.io/tx/"
        break
      case 7:
        network = 'Thai Chain';
        networkDisplay = network;
        explorerUrl = "https://exp.tch.in.th/tx/"
        break
      case 42:
        network = 'Kovan';
        networkDisplay = network;
        explorerUrl = "https://" + network.toLowerCase() + ".etherscan.io/tx/"
        break
      case 420:
        network = 'Goerli-Optimism';
        networkDisplay = 'Goerli Optimism';
        explorerUrl = "https://" + network.toLowerCase() + ".etherscan.io/tx/"
        break
      case 1337:
        network = 'Kovan - Optimism';
        networkDisplay = '<strong>Kovan Optimism</strong><br/>(Level 2 Ethereum)';
        explorerUrl = "https://kovan-l2-explorer.surge.sh/tx/";
        break
      case 5777:
        network = 'Ganache';
        networkDisplay = network;
        break
      case 11155111:
        network = 'Sepolia';
        networkDisplay = network;
        break
      case 11155420:
        network = 'OP Sepolia';
        networkDisplay = network;
        break
      default:
        network = 'Unknown';
        networkDisplay = network;
        warning = 'Please switch to your selected network!!';
    }
      
    $("#eth_network").html(networkDisplay);
    $("#warning").text(warning);
    $("#ContractAddress").text(contractAddress);
      
    web3.eth.getAccounts().then(accounts => {
      userAccount = accounts[0];
      $("#eth_address").text(userAccount);
      reloadInfo();
    })
  })
}

function reloadInfo() {
  // Wallet
  try { 
      getBalance();
  }
  catch(err) {
      console.log(err);
  }
}

function getBalance() {
  web3.eth.getBalance(userAccount).then(result => {
      $("#balance").html(web3.utils.fromWei(result));
  });
}

function openContractOnEtherScan() {
  let url = 'https://' + network + '.etherscan.io/address/' + contractAddress
  window.open(url,'_blank');
}

function openUserAddressOnEtherScan() {
  let url = 'https://' + network + '.etherscan.io/address/' + userAccount
  window.open(url,'_blank');
}

function getContract() {
  let contract = new web3.eth.Contract(abi, contractAddress)
  return contract;
}

// function Test() {
//     alert("Test");
//     alert(userAccount);
// }

async function getPolicyholder() {
  let contract = getContract();
  const wallet = userAccount;

  if (!wallet) {
    alert("User account not found. Please make sure you are logged in.");
    return;
  }

  try {
    const dataInsurers = await contract.methods.insurers(wallet).call();
    // alert(wallet);
    userName = dataInsurers.name;
    useridNumber = dataInsurers.idNumber;
    userContact = dataInsurers.contact;
    userWallet = dataInsurers.wallet;
    // alert("Name: " + userName + "\nID Number: " + useridNumber + "\nContact: " + userContact + "\nWallet: " + userWallet);
    $("#userName").text(userName);
    $("#userID").text(useridNumber);
    $("#userContact").text(userContact);
    const shortenedWalletID = `${userWallet.slice(0, 8)}...${userWallet.slice(-8)}`; // Shorten text
    $("#userWallet").text(shortenedWalletID);

  } catch (error) {
    console.error(error);
    alert("Error fetching data. Check the console for details.")
  }
}

async function getPolicyholders() {
  let contract = getContract();
  const wallet = userAccount;

  if (!wallet) {
    alert("User account not found. Please make sure you are logged in.");
    return;
  }

  try {
    const dataPolicyholders = await contract.methods.policyholders(wallet).call();
    // alert(wallet);
    userName = dataPolicyholders.name;
    useridNumber = dataPolicyholders.idNumber;
    userContact = dataPolicyholders.contact;
    userWallet = dataPolicyholders.wallet;
    // alert("Name: " + userName + "\nID Number: " + useridNumber + "\nContact: " + userContact + "\nWallet: " + userWallet);
    $("#userName").text(userName);
    $("#userID").text(useridNumber);
    $("#userContact").text(userContact);
    const shortenedWalletID = `${userWallet.slice(0, 8)}...${userWallet.slice(-8)}`; // Shorten text
    $("#userWallet").text(shortenedWalletID);

  } catch (error) {
    console.error(error);
    alert("Error fetching data. Check the console for details.")
  }
}

async function getPolicyholdersPolicy() {
  let contract = getContract();
  const wallet = userAccount;

  if (!wallet) {
    alert("User account not found. Please make sure you are logged in.");
    return;
  }

  try {
    const dataPolicy = await contract.methods.policies(wallet).call();
    // alert(wallet);
    userpolicyName = dataPolicy.policyName;
    userterms = dataPolicy.terms;
    userpremium = dataPolicy.premium;
    userinsurer = dataPolicy.insurer;
    // alert("Policy Name: " + userpolicyName + "\nTerms: " + userterms + "\nPremium: " + userpremium + "\nInsurer: " + userinsurer);
    $("#userpolicyName").text(userpolicyName);
    $("#userterms").text(userterms);
    $("#userpremium").text(userpremium);
    $("#userinsurer").text(userinsurer);

  } catch (error) {
    console.error(error);
    alert("Error fetching data. Check the console for details.")
  }
}

async function fetchClaimsData() {
  let contract = getContract(); // Ensure you have a function to get the contract instance
  let claimsData = [];
  for (let i = 1; i <= 10; i++) {
    try {
      const dataInsurers = await contract.methods.claims(i).call();
      let claim = {
        id: i,
        Hospital: `${dataInsurers.hospital.slice(0, 8)}...${dataInsurers.hospital.slice(-8)}`,
        // Hospital: dataInsurers.hospital,
        Amount: dataInsurers.amount,
        Reason: dataInsurers.reason,
        Approved: dataInsurers.approved,
        Processed: dataInsurers.processed
      };
      claimsData.push(claim);
    } 
    catch (error) {
      console.error(`Error fetching data for claim ID ${i}:`, error);
      alert("Error fetching data. Check the console for details.")
    }
  }
  // Display the fetched data or process it as needed
  displayClaimsData(claimsData); // Example function to display data
}

function displayClaimsData(claimsData) {
  const claimsList = document.getElementById('claimsTable');
  claimsData.forEach(claim => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <th scope="row">${claim.id}</th>
      <td>${claim.Hospital}</td>
      <td>${claim.Amount}</td>
      <td>${claim.Reason}</td>
      <td>${claim.Approved}</td>
      <td>${claim.Processed}</td>
    `;
    claimsTable.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', async function() {
    if (window.ethereum) {
      web3 = new Web3(ethereum);
      try {
        await ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        userAccount = accounts[0];
        getPolicyholders();
        getBalance();
        getPolicyholdersPolicy();
        fetchClaimsData();
      } catch (err) {
        console.error(err);
      }
    } else if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
      const accounts = await web3.eth.getAccounts();
      userAccount = accounts[0];
      getPolicyholders();
      getBalance();
      getPolicyholdersPolicy();
      fetchClaimsData();
    } else {
      console.log('No web3? You should consider trying MetaMask!');
    }
  });