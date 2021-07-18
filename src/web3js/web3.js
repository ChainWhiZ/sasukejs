import Web3 from "web3";
import chainwhiz from "../artifacts/chainwhizAbi";
let web3;

export const initiliaseWeb3 = async () => {
  if (window.ethereum) {
    // Modern DApp browsers
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
    } catch (error) {
      // User denied account access
      alert(error);
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
};

export const fetchAccount = async (callback) => {
  web3.eth.getAccounts((error, result) => {
    if (error) {
      alert(error);
    } else {
      callback(result);
    }
  });
};

export const initiliaseContract = async () => {
  let contract = new web3.eth.Contract(
    chainwhiz,
    // "0xbdc46E2543bACf67D0F14553348e354E7ed05052"
    "0x7fA47322B674FeCc80E5F925CdeCe08688cE8d83"
  );
  return contract;
};
