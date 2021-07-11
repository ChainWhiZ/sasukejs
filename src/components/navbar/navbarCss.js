import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
   
    link: {
        color: 'inherit',
        textDecoration: 'inherit'
    },
    marginLeft: {
        marginLeft: "20%"
    },
    appBar: {
        color: "black",
        backgroundColor: "white",
        boxShadow: "none"
    }
}));