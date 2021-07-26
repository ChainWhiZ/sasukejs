import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Navbar from "../navbar/navbar";
import SideDrawer from "./drawer";
import BountiesPosted from "./bountiesPosted/bountiesPosted"
import BountiesSolved from "./bountiesSolved/bountiesSolved"
import SolutionsVoted from "./solutionsVoted/solutionsVoted";
import { drawerList } from '../../constants';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
}));

export default function ProfilePage(props) {
    const classes = useStyles();
    const [listItem, setListItem] = useState(drawerList[1]);

    return (
        <div className={classes.root}>

            <Grid container spacing={6}>
                <Grid item md={12} xs={12}>
                    <Navbar />
                </Grid>
                <br />
                <Grid item md={3} xs={12}>
                    <SideDrawer itemClicked={(data) => setListItem(data)} />
                </Grid>
                <Grid item md={9} xs={12}>
                    {listItem === drawerList[1] ?

                        (<BountiesPosted />)
                        :
                        listItem === drawerList[2] ?
                            (<BountiesSolved />)
                            : (
                                listItem === drawerList[3] ?
                                    (<SolutionsVoted />)
                                    : (null)
                            )
                    }
                </Grid>
            </Grid>
        </div>
    );
}
