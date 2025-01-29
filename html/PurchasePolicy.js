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

async function connectMetaMask() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      alert("Connected account: " + accounts[0]); // Display connected wallet
      location.reload();
    } catch (error) {
      console.error("MetaMask connection failed:", error);
      alert("Connection failed: " + error.message);
    }
  } else {
    alert("MetaMask is not installed. Please install MetaMask and try again.");
  }
}

async function loadPolicies() {
  const contract = getContract();
  let policies = [];
  try {
    const totalPolicies = await contract.methods.policyCount().call();
    const policyPromises = Array.from({ length: totalPolicies }, (_, i) =>
      contract.methods.policies(i).call().catch(error => {
        console.error(`Error fetching policy at index ${i}:`, error);
        return null; // Return null for failed fetch
      })
    );

    policies = (await Promise.all(policyPromises)).filter(policy => policy !== null);
  } catch (error) {
    console.error('Error loading policies:', error);
    alert('Error loading policies:', error.message);
  }

  const policiesSelect = document.getElementById('policies');
  policiesSelect.innerHTML = "";
  policies.forEach((policy, index) => {
    const option = document.createElement("option");
    option.value = index; // Use index as value to retrieve policy data later
    option.text = policy.policyName;
    policiesSelect.appendChild(option);
  });

  window.policiesData = policies;
  if (policies.length > 0) {
    policiesSelect.selectedIndex = 0;
    displayPolicyDetails(policies[0]);
    let insurer = await contract.methods.insurers(policies[0].insurer).call();
    displayInsurerDetails(insurer);
  }

  // // Add event listener for dropdown selection change
  // policiesSelect.addEventListener("change", function () {
  //   const selectedIndex = this.value;
  //   displayPolicyDetails(policies[selectedIndex]);
  // });
  // Add event listener to dropdown
  policiesSelect.addEventListener('change', async function() {
    const selectedPolicyIndex = this.value;
    const selectedPolicy = policies[selectedPolicyIndex];
    displayPolicyDetails(selectedPolicy);

    // Fetch and display insurer details
    insurer = await contract.methods.insurers(selectedPolicy.insurer).call();
    displayInsurerDetails(insurer);
    // alert("Selected policy: " + selectedPolicy.policyName);
  });
}

function displayPolicyDetails(policy) {
  if (!policy) return;
  document.getElementById("userpolicyName").textContent = policy.policyName;
  document.getElementById("userterms").textContent = policy.terms;
  document.getElementById("userpremium").textContent = policy.premium;
  document.getElementById("insurerWallet").textContent = policy.insurer;
}

function displayInsurerDetails(insurer) {
  $("#insurerName").text(insurer.name);
  $("#insurerID").text(insurer.idNumber);
  $("#insurerTel").text(insurer.contact);
}

function Purchasepolicy() {
  const contract = getContract();
  const policiesSelect = document.getElementById('policies');
  const selectedPolicyIndex = policiesSelect.value;
  const selectedPolicy = window.policiesData[selectedPolicyIndex];
  const policyId = selectedPolicyIndex;
  const amount = selectedPolicy.premium;

  contract.methods.purchasePolicy(policyId).send({ from: userAccount, value: amount })
    .on('transactionHash', function(hash) {
      alert('Transaction sent. Hash:', hash);
      window.location.href = "Login2.html";
    })
    .on('receipt', function(receipt) {
      alert('Transaction receipt:', receipt);
      window.location.href = "Login2.html";
    })
    .on('error', function(error) {
      alert('Transaction error:', error.message);
      window.location.href = "Login2.html";
    });
}

document.addEventListener('DOMContentLoaded', async function() {
  if (window.ethereum) {
    web3 = new Web3(ethereum);
    try {
      await ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      userAccount = accounts[0];
      loadPolicies();
    } catch (err) {
      console.error(err);
    }
  } else if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    const accounts = await web3.eth.getAccounts();
    userAccount = accounts[0];
    loadPolicies();
  } else {
    console.log('No web3? You should consider trying MetaMask!');
  }
});