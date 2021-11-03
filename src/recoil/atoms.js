import { atom } from "recoil";

export const username = atom({
  key: "username",
  default:"",
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