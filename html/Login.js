var contractAddress = '0x31CDf9D3AfBe06dF484411e80ef56cc8f72fAD0d';
var network = "";
let networkDisplay = "";
var explorerUrl = "";
var userAccount = "";
var warning = "";
var walletIDInput ="";
var citizenIDInput ="";
let abi = [
  {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"string","name":"role","type":"string"}],"name":"Approved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"claimId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ClaimProcessed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"claimId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"policyId","type":"uint256"},{"indexed":false,"internalType":"address","name":"hospital","type":"address"}],"name":"ClaimSubmitted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"insurer","type":"address"},{"indexed":true,"internalType":"address","name":"hospital","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"FundsTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"policyId","type":"uint256"},{"indexed":false,"internalType":"string","name":"policyName","type":"string"},{"indexed":false,"internalType":"address","name":"insurer","type":"address"}],"name":"PolicyCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"policyId","type":"uint256"},{"indexed":false,"internalType":"address","name":"policyholder","type":"address"}],"name":"PolicyPurchased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"string","name":"role","type":"string"}],"name":"Registered","type":"event"},
  {"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"hospitalAddress","type":"address"}],"name":"approveHospital","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"insurerAddress","type":"address"}],"name":"approveInsurer","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"policyholderAddress","type":"address"}],"name":"approvePolicyholder","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"claimCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"claims","outputs":[{"internalType":"address","name":"hospital","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"reason","type":"string"},{"internalType":"bool","name":"approved","type":"bool"},{"internalType":"bool","name":"processed","type":"bool"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"string","name":"policyName","type":"string"},{"internalType":"string","name":"terms","type":"string"},{"internalType":"uint256","name":"premium","type":"uint256"}],"name":"createPolicy","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"getAllHospitals","outputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"idNumber","type":"string"},{"internalType":"string","name":"contact","type":"string"},{"internalType":"address","name":"wallet","type":"address"},{"internalType":"bool","name":"isRegistered","type":"bool"},{"internalType":"bool","name":"isApproved","type":"bool"}],"internalType":"struct InsuranceSystem.User[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"getAllInsurers","outputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"idNumber","type":"string"},{"internalType":"string","name":"contact","type":"string"},{"internalType":"address","name":"wallet","type":"address"},{"internalType":"bool","name":"isRegistered","type":"bool"},{"internalType":"bool","name":"isApproved","type":"bool"}],"internalType":"struct InsuranceSystem.User[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"getAllPolicyholders","outputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"idNumber","type":"string"},{"internalType":"string","name":"contact","type":"string"},{"internalType":"address","name":"wallet","type":"address"},{"internalType":"bool","name":"isRegistered","type":"bool"},{"internalType":"bool","name":"isApproved","type":"bool"}],"internalType":"struct InsuranceSystem.User[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"getHospitalCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"getInsurerCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"getPolicyholderCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"hospitalAddresses","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"hospitalCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"hospitals","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"idNumber","type":"string"},{"internalType":"string","name":"contact","type":"string"},{"internalType":"address","name":"wallet","type":"address"},{"internalType":"bool","name":"isRegistered","type":"bool"},{"internalType":"bool","name":"isApproved","type":"bool"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"insurerAddresses","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"insurerCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"insurers","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"idNumber","type":"string"},{"internalType":"string","name":"contact","type":"string"},{"internalType":"address","name":"wallet","type":"address"},{"internalType":"bool","name":"isRegistered","type":"bool"},{"internalType":"bool","name":"isApproved","type":"bool"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"policies","outputs":[{"internalType":"string","name":"policyName","type":"string"},{"internalType":"string","name":"terms","type":"string"},{"internalType":"uint256","name":"premium","type":"uint256"},{"internalType":"address","name":"insurer","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"policyCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"policyholderAddresses","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"policyholderCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"policyholderPolicies","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"policyholders","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"idNumber","type":"string"},{"internalType":"string","name":"contact","type":"string"},{"internalType":"address","name":"wallet","type":"address"},{"internalType":"bool","name":"isRegistered","type":"bool"},{"internalType":"bool","name":"isApproved","type":"bool"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"claimId","type":"uint256"},{"internalType":"bool","name":"approve","type":"bool"}],"name":"processClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"policyId","type":"uint256"}],"name":"purchasePolicy","outputs":[],"stateMutability":"payable","type":"function"},
  {"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"idNumber","type":"string"},{"internalType":"string","name":"contact","type":"string"},{"internalType":"address","name":"wallet","type":"address"}],"name":"registerAsHospital","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"idNumber","type":"string"},{"internalType":"string","name":"contact","type":"string"},{"internalType":"address","name":"wallet","type":"address"}],"name":"registerAsInsurer","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"idNumber","type":"string"},{"internalType":"string","name":"contact","type":"string"},{"internalType":"address","name":"wallet","type":"address"}],"name":"registerAsPolicyholder","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"policyId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"reason","type":"string"}],"name":"submitClaim","outputs":[],"stateMutability":"nonpayable","type":"function"}
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
  }); // getbalance account
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

// async function getInsurerData() {
//   let contract = getContract();
//   const wallet = userAccount;
//   if (!web3.utils.isAddress(wallet)) {
//     alert("Invalid wallet address." + wallet);
//   }
//   try {
//     const data = await contract.methods.policyholders(wallet).call();
//     const userName = data.name;
//     const userID = data.idNumber;
//     const userContact = data.contact;
//     const userWallet = data.wallet;
//     const userRegistered = data.isRegistered;
//     const userApproved = data.isApproved;
//     alert("Name: " + userName + "\nID: " + userID + "\nContact: " + userContact + "\nWallet: " + userWallet + "\nRegistered: " + userRegistered + "\nApproved: " + userApproved);
//   } catch (error) {
//       console.error(error);
//       alert("Error fetching data. Check the console for details.");
//   }
// }

// async function logIn() {
//   let contract = getContract();
//   const wallet = userAccount;
//   const citizenID = document.getElementById("citizenID").value;

//   if (!web3.utils.isAddress(wallet)) {
//     alert("Invalid wallet address." + wallet);
//   } else if (wallet === "0x5674866dB643741c3e8Df8E528B2f6638c706B22") {
//     window.location.href = "AdminDashboard_v02.html";
//   } 
//   try {
//     const dataInsurers = await contract.methods.insurers(wallet).call();
//     const userIDInsurers = dataInsurers.idNumber;
//     const dataHospitals = await contract.methods.hospitals(wallet).call();
//     const userIDHospitals = dataHospitals.idNumber;
//     const dataPolicyholders = await contract.methods.policyholders(wallet).call();
//     const userIDPolicyholders = dataPolicyholders.idNumber;
//     if (citizenID === userIDInsurers && dataInsurers.isRegistered) {
//       alert("Login successful.");
//       window.location.href = "InsuredDashboard.html";
//     } else if (citizenID === userIDHospitals && dataHospitals.isRegistered) {
//       alert("Login successful.");
//       window.location.href = "HospitalDashboard.html";
//     } else if (citizenID === userIDPolicyholders && dataPolicyholders.isRegistered) {
//       alert("Login successful.");
//       window.location.href = "PolicyholdersDashboard.html";
//     } else {
//       alert("Login failed.\nPlease check your Citizen ID.");
//     }
//   } catch (error) {
//     console.error(error);
//     alert("Error fetching data. Check the console for details.")
//   }
// }

async function logIn() {
  let contract = getContract();
  const wallet = userAccount;
  const citizenID = document.getElementById("citizenID").value;
  let selectedTypes = document.getElementById("userType").value.toLowerCase();
  let loginSuccessful = false;
  let contractNumber = "x";

  if (!web3.utils.isAddress(wallet)) {
    alert("Invalid wallet address." + wallet);
  } else if (wallet === "0x5674866dB643741c3e8Df8E528B2f6638c706B22") {
    window.location.href = "AdminDashboard_v02.html";
  } 
  try {
    let login = await contract.methods[selectedTypes](wallet).call();
    const totalPolicy = await contract.methods.policyCount().call();
    for (let i = 0; i < totalPolicy; i++) {
      try {
        policyholderPolicies = await contract.methods.policyholderPolicies(wallet,i).call();
        contractNumber = i;
      } catch (error) {
      }
    }
    if (citizenID === login.idNumber && login.isRegistered && login.isApproved) {
      alert("Login successful.");
      loginSuccessful = true;
      if (contractNumber == "x" && selectedTypes == "policyholders") {
        alert("You have not purchased any policy yet.");
        window.location.href = "purchasePolicy.html";
      } else if (contractNumber != "x" && selectedTypes == "policyholders") {
        alert("You have purchased a policy.");
        window.location.href = `${selectedTypes.charAt(0).toUpperCase() + selectedTypes.slice(1)}Dashboard.html`;
      } else if (selectedTypes != "policyholders") {
        alert("You are " + selectedTypes);
        window.location.href = `${selectedTypes.charAt(0).toUpperCase() + selectedTypes.slice(1)}Dashboard.html`;
      }
    } else if (citizenID == login.idNumber && login.isRegistered && !login.isApproved) {
      alert("Login failed.\nAwaiting approval.");
      loginSuccessful = true;
    } else if (!loginSuccessful) {
      alert("Login failed.\nPlease check your citizen ID and membership.");
    }
  } catch (error) {
    console.error(error);
    alert("Error fetching data. Check the console for details."); 
  }
}

