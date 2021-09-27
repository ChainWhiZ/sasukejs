import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  bounty: {
    fontSize: "11px",
    overflowX: "auto",
  },
  category: {
    fontSize: "10px",
  },
  questionTitle: {
    fontSize: "15px",
  },
  searchCard: {
    minWidth: 275,
    minHeight: "100%",
    backgroundColor: "#F7F8FB",
  },
  link: {
    color: "inherit",
    textDecoration: "inherit",
  },
  bountyGrid: {
    marginTop: "2%",
  },
}));
