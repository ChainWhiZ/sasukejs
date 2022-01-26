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
  if (!(web3.givenProvider.networkVersion == 137)) {
    window.alert("Please switch to Polygon Mumbai Mainnet");
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
  let contract = new web3.eth.Contract(
    chainwhiz,
    // "0x842Edf7aB0086c3B96Deb9f461F7DD5635841e69" //testnet
    process.env.REACT_APP_CHAINWHIZ_CORE_ADDRESS//prod mainnet
  );
  return contract;
};
export const initiliaseTokenContract = async () => {
  let contract = new web3.eth.Contract(
    erc20,
    process.env.REACT_APP_DEV_TOKEN_ADDRESS
  );

  return contract;
};
