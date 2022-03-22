import { atom } from "recoil";

export const username = atom({
  key: "username",
  default:"akp111",
});

export const walletAddress = atom({
  key: "walletAddress",
  default:"",
});

export const contract = atom({
  key: "contract",
  default:{},
});

export const balance = atom({
  key: "balance",
  default:0,
});

export const maticusd = atom({
  key: "maticusd",
  default:0,
});
export const devusd = atom({
  key: "devusd",
  default:0,
});

export const tokenContract = atom({
  key: "tokenContract",
  default:{},
});


