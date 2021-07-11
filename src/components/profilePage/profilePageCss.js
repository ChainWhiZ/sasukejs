import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      marginTop: "7%",
      borderRadius:"0 4% 0 0",
      backgroundColor:"ghostwhite",
     
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    
  }));