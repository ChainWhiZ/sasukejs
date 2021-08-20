import React from 'react';
import { useStyles } from "./profilePageCss";
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { drawerList } from '../../constants';
import Button from "@material-ui/core/Button";

export default function SideDrawer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >


        <List>
          {drawerList.map((text, index) => (
            <ListItem onClick={(e) => { props.itemClicked(text) }} button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText className={classes.listItem} primary={text} />
              <br />
              <br />
              <br />

            </ListItem>
          ))}
        </List>
      </Drawer>

    </div>
  );
}
