import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from "@material-ui/core/Button";
import fleekStorage from '@fleekhq/fleek-storage-js'

export default function WorkplanSubmit(props) {
 
    const [open, setOpen] = useState(props.open);
    const [buffer,setBuffer] = useState('');
    const [username] = localStorage.getItem('username');
    const handleClose = () => {
        setOpen(false);
        props.handleDialogClose(false);
    };
    console.log(props)
    const captureFile = (e) => {
        const file = e.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
          setBuffer(Buffer(reader.result));
        }
    };
    const handleSubmit = async() => {
        const timestamp= new Date().getTime();
        const uploadedFile = await fleekStorage.upload({
            apiKey: 'U3QGDwCkWltjBLGG1hATUg==',
            apiSecret: 'GMFzg7TFJC2fjhwoz9slkfnncmV/TAHK/4WVeI0qpYY=',
            key: username+timestamp ,
            data: buffer,
          });
        setOpen(false);
    };

    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Submit Workplan</DialogTitle>
            <input type="file"
                onChange={(e)=>captureFile(e)}
            />
            <Button onClick={handleSubmit}>Submit</Button>
            <Button onClick={handleClose}>Close</Button>
        </Dialog>
    );
}

