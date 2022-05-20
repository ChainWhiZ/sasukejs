import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useHistory,useLocation } from "react-router-dom";
import logo from "../../assets/new-logo.svg";
import {
  walletAddress as walletAddressAtom,
  contract as contractAtom,
  tokenContract as tokenContractAtom,
} from "../../recoil/atoms";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useRecoilState } from "recoil";
import { Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {
  initiliaseWeb3,
  fetchAccount,
  initiliaseContract,
  initiliaseTokenContract,
  checkChain,
} from "../../web3js/web3";
export default function Navbar() {
  const [walletAddress, setWalletAddress] = useRecoilState(walletAddressAtom);
  const [contract, setContract] = useRecoilState(contractAtom);
  const [tokenContract, setTokenContract] = useRecoilState(tokenContractAtom);
  const history = useHistory();
  const location = useLocation();

  const handleConnectWalletClick = async () => {
    if (!walletAddress) {
      await initiliaseWeb3();
      await fetchAccount(async function (result) {
        if (await checkChain()) setWalletAddress(result[0]);
      });
      setContract(async (old) => {
        let _test = await initiliaseContract();
        return _test;
      });
      setTokenContract(async (old) => {
        let _test = await initiliaseTokenContract();
        return _test;
      });
    }
    else {
      history.push('/profile');
    }
  };

  const handleActiveLink = (path) => {
    if(location.pathname === path)
    {
      return 'item item-active';
    }
    return 'item';
  }
  return (
    <AppBar>
      <Toolbar
        className="navbar"
        style={{ backgroundColor: "rgba(12, 12, 12, 1)" }}
      >
        <Grid container>
          <Grid item md={12}>
            {" "}
            <Link to="/" className="link">
              <img src={logo} alt="logo" className="logo" />
            </Link>
          </Grid>
        </Grid>
        <Grid container spacing={3} className="right-side">
          <Grid item md={3}>
            {" "}
            <Link to="/post" className="link">
              <p className={handleActiveLink('/post')}>Post a Bounty</p>
            </Link>
          </Grid>
          <Grid item md={3}>
            {" "}
            <Link to="/solve" className="link">
              <p className={handleActiveLink('/solve')}>Solve a Bounty</p>
            </Link>
          </Grid>
          <Grid item md={3}>
            {" "}
            <Link to="/vote" className="link">
              <p className={handleActiveLink('/vote')}>Vote on Solutions</p>
            </Link>
          </Grid>
          <Grid item md={3}>
            <Tooltip title={walletAddress}>

              <Button
                className="btn__connect-wallet"
                onClick={handleConnectWalletClick}
              >
                {walletAddress
                  ? walletAddress.substring(0, 4) +
                  "..." +
                  walletAddress.substring(38)
                  : "Connect Wallet"}
              </Button>

            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
