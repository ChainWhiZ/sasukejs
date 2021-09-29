import { makeStyles } from "@material-ui/core/styles";
import { Label } from "@material-ui/icons";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "4%",
    overflowX: "hidden",
    overflowY: "hidden",
  },
  heading: {
    textAlign: "center",
  },
  marginLeftRight10: {
    marginLeft: "15%",
    marginRight: "15%",
  },
  paper: {
    padding: theme.spacing(2),
    marginRight: theme.spacing(12),
    textAlign: "center",
  },
}));
