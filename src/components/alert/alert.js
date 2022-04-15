import React from "react";
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "65%",
    marginTop: "5%",
    marginLeft: "2%",
    marginBottom: "5%",
    "& > * + *": {
      marginTop: theme.spacing(4),
    },
  },
  standardError: {
    fontSize: "13px",
  },
}));

export default function SimpleAlerts(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert className={classes.standardError} severity={props.severity} onClose={handleClose}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
