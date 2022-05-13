import { atom } from "recoil";

export const username = atom({
  key: "username",
  default:"mishramonalisha76",
});

export const walletAddress = atom({
  key: "walletAddress",
  default:"0x9c32f6081831d3fdd87c1118f12755dcf38ce76d",
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


