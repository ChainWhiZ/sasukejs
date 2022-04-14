import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor:"black",
        color: "white"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    bounty: {
        fontSize: "11px",
        overflowX: "auto",
        backgroundColor:"#FFFFFF",
        color: "#0F0F0F"
    },
    category:{
        fontSize: "10px",
        backgroundColor:"#D7FF2E",
        color: "black"
    },
    title:{
        fontSize: "15px"
    },
    searchCard: {
        minWidth: 275,
        minHeight: "100%",
        backgroundColor: "#000000"
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit'
    },
    bountyGrid:{
        marginTop:"2%",
    }
}));
