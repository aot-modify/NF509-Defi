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

      // ตัดทอน Wallet Address
      const shortAddress = formatShortAddress(userAccount);
      document.getElementById('eth_address').innerText = shortAddress;

      // ดึงข้อมูลเครือข่าย
      const networkId = await web3.eth.net.getId();
      const networkName = getNetworkName(networkId);
      document.getElementById('eth_network').innerText = networkName;

      // เพิ่มข้อความแจ้งเตือนสำหรับเครือข่ายที่ไม่รองรับ
      if (networkName === 'Unknown') {
        alert('You are connected to an unsupported network. Please switch to a supported network.');
      }

      // กำหนดค่า Smart Contract
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
      ]; // ใส่ ABI ของ Smart Contract ที่นี่
      
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      // ดึงข้อมูลต่าง ๆ จาก Smart Contract
      const insurerCount = await contract.methods.getInsurerCount().call();
      const hospitalCount = await contract.methods.getHospitalCount().call();
      const policyholderCount = await contract.methods.getPolicyholderCount().call();

      // อัพเดตค่าบน Dashboard
      document.getElementById('insurer-count').innerText = insurerCount;
      document.getElementById('hospital-count').innerText = hospitalCount;
      document.getElementById('policyholder-count').innerText = policyholderCount;

    } catch (error) {
      console.error('Error connecting to Ethereum:', error);
      alert('Failed to connect to Ethereum. Please check your wallet and network settings.');
    }
  } else {
    alert('Please install MetaMask or another Ethereum wallet extension.');
  }
});

// ฟังก์ชันสำหรับดึงชื่อเครือข่ายตาม Network ID
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

// ฟังก์ชันสำหรับตัดทอน Wallet Address
function formatShortAddress(address) {
  if (address && address.length > 10) {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }
  return address;
}


// UI Logic and Dynamic Menu Management
document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu-item");
  const sections = document.querySelectorAll(".content-section");
  const mainTitle = document.getElementById("main-title");

  // Menu Click Event
  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      // Remove active class from all menu items
      menuItems.forEach(menu => menu.classList.remove("active"));
      // Hide all sections
      sections.forEach(section => section.classList.add("d-none"));

      // Add active class to clicked menu item
      item.classList.add("active");
      // Show the relevant section
      const sectionId = item.getAttribute("data-section") + "-section";
      const selectedSection = document.getElementById(sectionId);
      if (selectedSection) {
        selectedSection.classList.remove("d-none");
      }

      // Update the title dynamically
      const newTitle = item.getAttribute("data-title");
      mainTitle.textContent = newTitle;
    });
  });

  // Handle Dropdown Items
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault(); // Stop link default behavior

      // ถ้าคลิกที่ Insurance Section
      if (item.getAttribute("data-section") === "insurance") {
        // คำนวณขนาดและตำแหน่งของหน้าจอเพื่อให้ Popup อยู่ตรงกลาง
        const width = 800; // กำหนดขนาดของ Popup
        const height = 600;
        const left = (window.innerWidth - width) / 2; // คำนวณตำแหน่งซ้าย
        const top = (window.innerHeight - height) / 2; // คำนวณตำแหน่งบน

        // เปิด Popup โดยใช้ตำแหน่งที่คำนวณ
        window.open('test1.html', 'popup', `width=${width}, height=${height}, top=${top}, left=${left}, resizable=yes, scrollbars=yes`);

        return; // หยุดการทำงานของโค้ดที่เหลือ
      }

      // Remove active class from all dropdown items
      dropdownItems.forEach(menu => menu.classList.remove("active"));

      // Add active class to clicked dropdown item
      item.classList.add("active");

      // Highlight the main dropdown menu
      const dropdownMenu = item.closest(".dropdown");
      const mainKycMenu = dropdownMenu.querySelector("a.dropdown-toggle");
      mainKycMenu.classList.add("active");

      // Show the related content section
      const sectionId = item.getAttribute("data-section") + "-section";
      const selectedSection = document.getElementById(sectionId);
      if (selectedSection) {
        selectedSection.classList.remove("d-none");
      }

      // Update the main title dynamically
      const newTitle = item.getAttribute("data-title");
      mainTitle.textContent = newTitle;
    });
  });


});
