import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  solutionDiv: {
    marginLeft: "2%",
    marginTop: "4%",
    marginBottom: "2%",
    float: "left",
    backgroundColor: "rgba(220, 220, 220, 1)",
    padding: "2%",
    paddingTop: "4.1%",
    paddingBottom:"0%",
    borderRadius: "4% 0 0 4%",
    height: "72%",
    textAlign: "center",
  },

  link: {
    color: 'inherit',
    textDecoration: 'inherit'
  },
  stakeDiv: {
    marginRight: "2%",
    marginTop: "4%",
    paddingTop:"6%",
    marginBottom: "1.9%",
    float: "left",
    backgroundColor: "rgba(196, 196, 196, 1)",
    padding: "2%",
    textAlign: "center",
    borderRadius: "0 4% 4% 0"
  },
  innerDiv: {
    float: "left",
    //width: "5s5%"
  },
  stakeInput: {
    width: "150px"
  },
  icon: {
    width: "40px",
    marginBottom: "10%",
  },
  author: {
    clear: "both"
  }



}));