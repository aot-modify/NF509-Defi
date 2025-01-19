var contractAddress = '';
var network = "";
let networkDisplay = "";
var explorerUrl = "";
var userAccount = '';
var warning = "";
let abi = [{}];
window.addEventListener('load', function() {
    // Modern dapp browsers...
    if (window.ethereum) {
        web3 = new Web3(ethereum);
        try { 
          // Request account access if needed
          ethereum.enable().then(result => {
            // Now you can start your app & access web3 freely:
            startApp()
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
          warning = 'please switch to your selected network';
      }
      $("#eth_network").html(networkDisplay);
      $("#warning").text(warning);
      $("#candidateContractAddress").val(contractAddress);
      
      web3.eth.getAccounts().then(accounts => {
        userAccount = accounts[0];
        $("#eth_address").text(userAccount);
        reloadInfo();
      })
    })
  }

  function openContractOnEtherScan() {
    let address = $("#candidateContractAddress").val()
    let url = 'https://' + network + '.etherscan.io/address/' + address
    window.open(url,'_blank');
  }

  function openUserAddressOnEtherScan() {
    let url = 'https://' + network + '.etherscan.io/address/' + userAccount
    window.open(url,'_blank');
  }