import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  link: {
    color: "inherit",
    textDecoration: "inherit",
  },

  accountIcon: {
    marginTop: "8%",
    marginLeft: "-20%",
  },
  username: {
    marginTop: "6%",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 300,
    lineHeight: "21px",
    letterSpacing: "0.03em",
    textAlign: "left",
    marginLeft:"-11%"
  },
  button: {
    fontFamily: "Poppins",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 300,
    lineHeight: "21px",
    letterSpacing: "0.03em",
    textAlign: "left",
  },
}));
