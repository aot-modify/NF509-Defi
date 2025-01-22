// Web3 and Smart Contract integration
window.addEventListener('load', async () => {
  // ตรวจสอบว่า Web3 หรือ Ethereum object ถูก inject หรือไม่
  if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum);
    try {
      // ขอสิทธิ์เข้าถึงบัญชีผู้ใช้
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // ดึงบัญชีผู้ใช้
      const accounts = await web3.eth.getAccounts();
      const userAccount = accounts[0];
      document.getElementById('eth_address').innerText = userAccount;

      // ดึงข้อมูลเครือข่าย
      const networkId = await web3.eth.net.getId();
      const networkName = getNetworkName(networkId);
      document.getElementById('eth_network').innerText = networkName;

      // เพิ่มข้อความแจ้งเตือนสำหรับเครือข่ายที่ไม่รองรับ
      if (networkName === 'Unknown') {
        alert('You are connected to an unsupported network. Please switch to a supported network.');
      }

      // กำหนดค่า Smart Contract
      const contractAddress = '0x5dc301b3eDEDC2fc9F1dA54a0880deEE6Ec516Cc';
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

      // ดึงจำนวน Insurer จาก Smart Contract
      const insurerCount = await contract.methods.getInsurerCount().call();
      console.log('Insurer Count:', insurerCount); // Debug log
      document.getElementById('insurer-count').innerText = insurerCount;

      // ตัวอย่างการใช้งานเพิ่มเติม (เพิ่มได้ตามต้องการ)
      // const otherData = await contract.methods.someOtherFunction().call();
      // console.log('Other Data:', otherData);
    } catch (error) {
      console.error('Error connecting to Ethereum:', error);
      alert('Failed to connect to Ethereum. Please check your wallet and network settings.');
    }
  } else {
    // แจ้งเตือนผู้ใช้ให้ติดตั้ง MetaMask หรือ Ethereum wallet
    alert('Please install MetaMask or another Ethereum wallet extension.');
  }
});

// ฟังก์ชันสำหรับดึงชื่อเครือข่ายตาม Network ID
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
