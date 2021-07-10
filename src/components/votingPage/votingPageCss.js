import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    solutionDiv: {
        marginLeft: "2%",
        marginTop: "2%",
        marginBottom: "2%",
        float: "left",
        backgroundColor: "ghostwhite",
        padding: "3%",
        borderRadius: "4% 0 0 4%",
        height: "69%",
        textAlign: "center",
      },
      stakeDiv: {
        marginRight: "2%",
        marginTop: "2%",
        marginBottom: "2%",
        float: "left",
        backgroundColor: "gainsboro",
        padding: "3%",
        textAlign: "center",
        borderRadius: "0 4% 4% 0"
      },
      innerDiv:{
        float: "left",
        //width: "5s5%"
      },
      stakeInput:{
        width: "150px"
      },
      icon:{
        width: "40px"
      },
      author:{
        clear:"both"
      }


    
}));