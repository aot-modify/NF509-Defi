window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
  
        const accounts = await web3.eth.getAccounts();
        const userAccount = accounts[0];
        const shortAddress = formatShortAddress(userAccount);
        document.getElementById('eth_address').innerText = shortAddress;
  
        const networkId = await web3.eth.net.getId();
        const networkName = getNetworkName(networkId);
        document.getElementById('eth_network').innerText = networkName;
  
        if (networkName === 'Unknown') {
          alert('You are connected to an unsupported network. Please switch to a supported network.');
        }
  
        // Replace this with your contract ABI and address
        const contractAddress = '0x5699b7fCFd6Dc71F8aF5343bAd5c770C20dc4aB0';
        const contractABI = [
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
              "inputs": [
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
                }
              ],
              "name": "createPolicy",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
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
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "claimId",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "approve",
                  "type": "bool"
                }
              ],
              "name": "processClaim",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "policyId",
                  "type": "uint256"
                }
              ],
              "name": "purchasePolicy",
              "outputs": [],
              "stateMutability": "payable",
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
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "policyId",
                  "type": "uint256"
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
                }
              ],
              "name": "submitClaim",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
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
              "name": "getHospitalCount",
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
              "name": "getInsurerCount",
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
              "name": "getPolicyholderCount",
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
            }
          ];
  
        const contract = new web3.eth.Contract(contractABI, contractAddress);
  
        // Fetch data for hospitals, insurers, and policyholders
        const hospitals = await contract.methods.getAllHospitals().call();
        updateTable('hospital-table', hospitals, 'hospital-pagination');
  
        const insurers = await contract.methods.getAllInsurers().call();
        updateTable('insurer-table', insurers, 'insurer-pagination');
  
        const policyholders = await contract.methods.getAllPolicyholders().call();
        updateTable('policyholder-table', policyholders, 'policyholder-pagination');
  
      } catch (error) {
        console.error('Error connecting to Ethereum:', error);
        alert('Failed to connect to Ethereum. Please check your wallet and network settings.');
      }
    } else {
      alert('Please install MetaMask or another Ethereum wallet extension.');
    }
  });
  
  function getNetworkName(networkId) {
    switch (networkId) {
      case 1: return 'Mainnet';
      case 3: return 'Ropsten';
      case 4: return 'Rinkeby';
      case 5: return 'Goerli';
      case 42: return 'Kovan';
      case 11155111: return 'Sepolia';
      case 5777: return 'Ganache';
      default: return 'Unknown';
    }
  }
  
  function formatShortAddress(address) {
    if (address && address.length > 10) {
      return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }
    return address;
  }
  
  function updateTable(tableId, data, paginationId) {
    const rowsPerPage = 10;
    let currentPage = 1;
  
    const tableBody = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    const paginationContainer = document.getElementById(paginationId);
  
    function renderTable(page) {
      currentPage = page;
      const startIndex = (page - 1) * rowsPerPage;
      const endIndex = Math.min(startIndex + rowsPerPage, data.length);
      tableBody.innerHTML = '';
  
      for (let i = startIndex; i < endIndex; i++) {
        const item = data[i];
        const row = tableBody.insertRow();
        const nameCell = row.insertCell(0);
        const idNumberCell = row.insertCell(1);
        const contractCell = row.insertCell(2);
        const walletCell = row.insertCell(3);
        const isRegisteredCell = row.insertCell(4);
        const isApprovedCell = row.insertCell(5);
  
        nameCell.textContent = item[0] || 'N/A';
        idNumberCell.textContent = item[1] || 'N/A';
        contractCell.textContent = item[2] || 'N/A';
        walletCell.textContent = item[3] || 'N/A';
        isRegisteredCell.textContent = item[4] ? 'Yes' : 'No';
        isApprovedCell.textContent = item[5] ? 'Yes' : 'No';
      }
  
      renderPagination();
    }
  
    function renderPagination() {
      const totalPages = Math.ceil(data.length / rowsPerPage);
      paginationContainer.innerHTML = '';
  
      const prevButton = document.createElement('button');
      prevButton.innerHTML = '&lt;';
      prevButton.disabled = currentPage === 1;
      prevButton.addEventListener('click', () => renderTable(currentPage - 1));
      paginationContainer.appendChild(prevButton);
  
      for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = i === currentPage ? 'active' : '';
        button.addEventListener('click', () => renderTable(i));
        paginationContainer.appendChild(button);
      }
  
      const nextButton = document.createElement('button');
      nextButton.innerHTML = '&gt;';
      nextButton.disabled = currentPage === totalPages;
      nextButton.addEventListener('click', () => renderTable(currentPage + 1));
      paginationContainer.appendChild(nextButton);
    }
  
    renderTable(1);
  }
  
  document.getElementById('data-selection').addEventListener('change', (e) => {
    const value = e.target.value;
    document.querySelectorAll('.section').forEach((section) => {
      section.style.display = 'none';
    });
  
    if (value === 'hospital') {
      document.getElementById('hospital-section').style.display = 'block';
    } else if (value === 'insurer') {
      document.getElementById('insurer-section').style.display = 'block';
    } else if (value === 'policyholder') {
      document.getElementById('policyholder-section').style.display = 'block';
    }
  });
  