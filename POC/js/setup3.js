// Web3 and Smart Contract integration
window.addEventListener('load', async () => {
  // Disclaimer message
  const disclaimer = `
    Please take note that this is a beta version feature and is provided on an "as is" and "as available" basis.
    Etherscan does not give any warranties and will not be liable for any loss, direct or indirect through continued use of this feature.
  `;

  // Show disclaimer and wait for user confirmation
  const userAccepted = window.confirm(disclaimer);
  if (!userAccepted) {
    alert('You must accept the disclaimer to proceed.');
    return; // Exit if user clicks "Cancel"
  }

  // Check if Web3 or Ethereum object is available
  if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum);
    try {
      // Request access to accounts
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Fetch accounts and display short address
      const accounts = await web3.eth.getAccounts();
      const userAccount = accounts[0];
      console.log(`Connected Wallet: ${formatShortAddress(userAccount)}`);

      // Fetch network information
      const networkId = await web3.eth.net.getId();
      const networkName = getNetworkName(networkId);
      console.log(`Connected Network: ${networkName}`);

      // Alert for unsupported networks
      if (networkName === 'Unknown') {
        alert('You are connected to an unsupported network. Please switch to a supported network.');
        return;
      }

      // Configure Smart Contract
      const contractAddress = '0xE4c0F88FC5E8712B78847E28cf2fA2486a31b805'; // Replace with your contract address
      const contractABI =[
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "role",
              "type": "string"
            }
          ],
          "name": "Approved",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "claimId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "ClaimProcessed",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "claimId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "policyId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "hospital",
              "type": "address"
            }
          ],
          "name": "ClaimSubmitted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "insurer",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "hospital",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "FundsTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "policyId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "policyName",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "insurer",
              "type": "address"
            }
          ],
          "name": "PolicyCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "policyId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "policyholder",
              "type": "address"
            }
          ],
          "name": "PolicyPurchased",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "role",
              "type": "string"
            }
          ],
          "name": "Registered",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "admin",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "hospitalAddress",
              "type": "address"
            }
          ],
          "name": "approveHospital",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "insurerAddress",
              "type": "address"
            }
          ],
          "name": "approveInsurer",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "policyholderAddress",
              "type": "address"
            }
          ],
          "name": "approvePolicyholder",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "claimCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "claims",
          "outputs": [
            {
              "internalType": "address",
              "name": "hospital",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "reason",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "processed",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getAllHospitals",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "name",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "idNumber",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "contact",
                  "type": "string"
                },
                {
                  "internalType": "address",
                  "name": "wallet",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "isRegistered",
                  "type": "bool"
                },
                {
                  "internalType": "bool",
                  "name": "isApproved",
                  "type": "bool"
                }
              ],
              "internalType": "struct InsuranceSystem.User[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getAllInsurers",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "name",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "idNumber",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "contact",
                  "type": "string"
                },
                {
                  "internalType": "address",
                  "name": "wallet",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "isRegistered",
                  "type": "bool"
                },
                {
                  "internalType": "bool",
                  "name": "isApproved",
                  "type": "bool"
                }
              ],
              "internalType": "struct InsuranceSystem.User[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getAllPolicyholders",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "name",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "idNumber",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "contact",
                  "type": "string"
                },
                {
                  "internalType": "address",
                  "name": "wallet",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "isRegistered",
                  "type": "bool"
                },
                {
                  "internalType": "bool",
                  "name": "isApproved",
                  "type": "bool"
                }
              ],
              "internalType": "struct InsuranceSystem.User[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "hospitalCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "hospitals",
          "outputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "idNumber",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "contact",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "wallet",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "isRegistered",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isApproved",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "insurerCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "insurers",
          "outputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "idNumber",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "contact",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "wallet",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "isRegistered",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isApproved",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "policies",
          "outputs": [
            {
              "internalType": "string",
              "name": "policyName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "terms",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "premium",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "insurer",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "policyCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "policyholderCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "policyholders",
          "outputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "idNumber",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "contact",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "wallet",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "isRegistered",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isApproved",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "idNumber",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "contact",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "wallet",
              "type": "address"
            }
          ],
          "name": "registerAsHospital",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "idNumber",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "contact",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "wallet",
              "type": "address"
            }
          ],
          "name": "registerAsInsurer",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "idNumber",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "contact",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "wallet",
              "type": "address"
            }
          ],
          "name": "registerAsPolicyholder",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "registeredHospitals",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "registeredInsurers",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "registeredPolicyholders",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]; // Replace with your contract ABI
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      // Fetch and display Smart Contract data
      const insurerCount = await contract.methods.insurerCount().call();
      console.log(`Insurer Count: ${insurerCount}`);

      const hospitalCount = await contract.methods.hospitalCount().call();
      console.log(`Hospital Count: ${hospitalCount}`);

      const policyholderCount = await contract.methods.policyholderCount().call();
      console.log(`Policyholder Count: ${policyholderCount}`);

    } catch (error) {
      console.error('Error connecting to Ethereum:', error);
      alert('Failed to connect to Ethereum. Please check your wallet and network settings.\nError: ' + error.message);
    }
  } else {
    alert('Please install MetaMask or another Ethereum wallet extension.');
  }
});

// Helper function to map network ID to network name
function getNetworkName(networkId) {
  switch (networkId) {
    case 1:
      return 'Mainnet';
    case 3:
      return 'Ropsten';
    case 4:
      return 'Rinkeby';
    case 5:
      return 'Goerli';
    case 42:
      return 'Kovan';
    case 11155111:
      return 'Sepolia';
    case 5777:
      return 'Ganache';
    default:
      return 'Unknown';
  }
}

// Helper function to shorten Ethereum address
function formatShortAddress(address) {
  if (address && address.length > 10) {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }
  return address;
}
