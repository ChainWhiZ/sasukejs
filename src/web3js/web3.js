import Web3 from "web3";
import { chainwhiz, erc20 } from "../artifacts/chainwhizAbi";

let web3;

export const initiliaseWeb3 = async () => {
  if (window.ethereum) {
    // Modern DApp browsers
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
    } catch (error) {
      // User denied account access
      alert("User denied");
    }
  } else if (window.web3) {
    // Legacy dapp browsers
    web3 = new Web3(window.web3.currentProvider);
  } else {
    // Non-dapp browsers
    alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
  // web3.eth.handleRevert = true
};

export const checkChain = async () => {
  if (!(web3.givenProvider.networkVersion == 80001)) {
    window.alert("Please switch to Polygon Mumbai");
    return false
  }

  return true;
}

export const fetchAccount = async (callback) => {
  // web3.eth.handleRevert = true
  web3.eth.getAccounts((error, result) => {
    if (error) {
      alert("Can't fetch account");
    } else {
      callback(result);
    }
  });
};

export const fetchBalance =  async (walletAddress) => {
  initiliaseWeb3();
  const balance = await web3.eth.getBalance(walletAddress);
  return (web3.utils.fromWei(balance.toString(), 'ether'));
};

export const initiliaseContract = async () => {
  // web3.eth.handleRevert = true
  let contract = new web3.eth.Contract(
    chainwhiz,
    // "0xbdc46E2543bACf67D0F14553348e354E7ed05052"
    // "0x7fA47322B674FeCc80E5F925CdeCe08688cE8d83" //"old contract"
    // "0xc46Dbf7F0E2d4d5e1DfC050c40a92702dd67EE50" // "had escrow issue"
    // "0x5C83d26Be0122F1abEEB9009F91BA065f1809E0a" //"still some issues"
    //"0x1600b56844e733d5469ff5eecbf26d3552248b49"//old
    // "0x8Ca862bE7C505E7369E5a0F1D788eCd173fAA491"
    // "0x0858421E69bA63621f382Ea9E2Ba299E0B8Ce5D7"
    // "0x2E5514C923c5ebF12026Bc9a24B5aa20f83EED3F"//old contract
    //"0xED480C4eec3B31480f7e6386fee467852162A4C7",//prod contract
    // "0x7b452FAF31e26A53c9567F8A6B7e586428967e48" //new prod contract
    "0x842Edf7aB0086c3B96Deb9f461F7DD5635841e69" //testnet
  );
  return contract;
};
export const initiliaseTokenContract = async () => {
  // web3.eth.handleRevert = true
  let contract = new web3.eth.Contract(
    erc20,
    "0x29740a588FF949B08c187db7bE2e4B4cdf968F2A"
  );

  return contract;
};
