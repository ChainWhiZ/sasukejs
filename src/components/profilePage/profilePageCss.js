import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  flexRoot: {
    flexGrow: 1,
  },
  accordianRoot: {
    width: "100%",
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: "7%",
    borderRadius: "0 4% 0 0",
    backgroundColor: "ghostwhite",
  },
  link: {
    color: "inherit",
    textDecoration: "inherit",
    fontWeight: "700",
  },
  list: {
    "list-style-type": "none",
  },
  cardColor: {
    backgroundColor: "ghostwhite",
  },
  button: {
    textTransform: "none",
    "&:hover": {
      background: "#1D1D1D",
      color: "white",
    },
  },
  escrowDialog: {
    width: "30%",
    height: "40%",
  },
  marginRight: {
    marginRight: "5%",
  },
  smallButton: {
    width: "50%",
  },
  center: {
    alignItems: "center",
  },
  font: {
    fontFamily: "Poppins",
  },
  dialog: {
    width: "35% ",
    height: "70% ",
    marginLeft: "30%",
  },
  listItem: {
    fontFamily: "Poppins",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));
