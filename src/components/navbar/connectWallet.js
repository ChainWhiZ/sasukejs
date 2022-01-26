import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { walletAddress as walletAddressAtom, contract as contractAtom, tokenContract as tokenContractAtom } from "../../recoil/atoms";
import walletIcon from "../../assets/wallet.png";
import Tooltip from '@material-ui/core/Tooltip';
import Button from "@material-ui/core/Button";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import "./navbar.css";
import {
    initiliaseWeb3,
    fetchAccount,
    initiliaseContract,
    initiliaseTokenContract,
    checkChain
} from "../../web3js/web3";

export default function ConnectWallet() {
    const [walletAddress, setWalletAddress] = useRecoilState(walletAddressAtom);
    const [contract, setContract] = useRecoilState(contractAtom);
    const [tokenContract, setTokenContract] = useRecoilState(tokenContractAtom);
    const [connectWallet, setConnectWallet] = useState(false);
    const [open, setOpen] = useState(false);
    const walletAddressValue = useRecoilValue(walletAddressAtom);

    const handleConnectWalletClick = async () => {
        setConnectWallet(false);
        await initiliaseWeb3();
        await fetchAccount(async function (result) {
            if (await checkChain())
                setWalletAddress(result[0]);

        });
        console.log(walletAddress)
        setContract(async (old) => {
            let _test = await initiliaseContract();
            console.log(_test)
            return _test;
        });
        setTokenContract(async (old) => {
            let _test = await initiliaseTokenContract();
            console.log(_test)
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
