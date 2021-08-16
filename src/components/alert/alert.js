import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "65%",
    marginTop: "5%",
    marginLeft: "2%",
    marginBottom:"5%",
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

  return (
    <div className={classes.root}>
      <Alert className={classes.standardError} severity={props.severity}>
        {props.message}
      </Alert>
    </div>
  );
}
