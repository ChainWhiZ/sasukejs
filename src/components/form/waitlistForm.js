import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { Widget } from '@typeform/embed-react'
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import "./waitlistFormCss.css";
import { Button } from "@material-ui/core";
import { createPopup } from '@typeform/embed'
import '@typeform/embed/build/css/popup.css'


export default function WaitlistForm(props) {
    const [open, setOpen] = useState(props.open);
    const handleClick =()=>{
        const { toggle } = createPopup("UNzTJS5Q")
        document.getElementById('waitlist-button').onclick = toggle
    }

    const handleClose = () => {
        setOpen(false);
        props.handleDialogClose(false);
    };
console.log("hii")

    return (
        <>
            <Dialog
                aria-labelledby="simple-dialog-title"
                maxWidth="lg"
                className="waitlist-dialog"
                open={open}
                BackdropProps={{
                    classes: {
                        root: "dialog-blur",
                    },
                }}
                onBackdropClick={handleClose}
            >
                <ClearRoundedIcon
                    style={{
                        marginLeft: "50vw",
                         marginTop: "1vh",
                         marginBottom: "1vh",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        handleClose();
                    }}
                />
                {/* <Widget id="UNzTJS5Q" style={{ width: '100%',height: "100%" }} className="my-form" /> */}
<Button id="waitlist-button" onClick={()=>handleClick()}>Start</Button>

            </Dialog>

        </>
    );
}
