import React, { useState} from "react";
import { useRecoilState } from "recoil";
import { walletAddress as walletAddressAtom ,contract as contractAtom} from "../../recoil/atoms";
import walletIcon from "../../assets/wallet.png";
import Tooltip from '@material-ui/core/Tooltip';
import Button from "@material-ui/core/Button";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import "./navbar.css";
import {
    initiliaseWeb3,
    fetchAccount,
    initiliaseContract,
} from "../../web3js/web3";

export default function ConnectWallet() {
    const [walletAddress, setWalletAddress] = useRecoilState(walletAddressAtom);
    const [contract, setContract] = useRecoilState(contractAtom);
    const [connectWallet, setConnectWallet] = useState(false);
    const [open, setOpen] = useState(false);
   
    const handleConnectWalletClick = async () => {
        setConnectWallet(false);
        await initiliaseWeb3();
        await fetchAccount(function (result) {
            setWalletAddress(result[0]);
        });
        setContract(async (old) => {
            let _test = await initiliaseContract();
            return _test;
          });
     
    }
    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        if (!walletAddress)
            setConnectWallet(true);
        setOpen(true);
    };


    return (
        <>
            <ClickAwayListener onClickAway={handleTooltipClose}>
                <div>
                    <Tooltip
                        interactive
                        PopperProps={{
                            disablePortal: true,
                        }}
                        onClose={handleTooltipClose}
                        open={open}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title={connectWallet ?
                            <Button onClick={handleConnectWalletClick}>
                                Connect Wallet
                            </Button>

                            : walletAddress}
                    >
                        <img src={walletIcon} alt="walletIcon" onClick={handleTooltipOpen} />
                    </Tooltip>
                </div>
            </ClickAwayListener>

        </>
    );
}
