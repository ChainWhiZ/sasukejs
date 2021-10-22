import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Redirect } from "react-router-dom";
import MenuBar from "../explore/menuBar";
import Heading from "./heading";
import ProfileTabs from "./tabs";
import "./profilePageCss.css"


export default function ProfilePage(props) {
    const [username] = useState(localStorage.getItem('username'));
    if (!username) {
        return (
          <Redirect to="/" />
        )
      }
    
    return (

            <Grid container >
                <Grid item md={12} xs={12}>
                   <hr className="horizontal-line" style={{ marginTop: "8vw" }} />
                </Grid>
               
                <Grid item md={4} xs={12}>
                   <MenuBar/>
                </Grid>
               
                <Grid item md={8} xs={12}>
                
                <Grid item md={12} xs={12}>
                    <Heading/>
              
                </Grid>
                <Grid item md={12} xs={12}>
                    <ProfileTabs/>
              
                </Grid>
                </Grid>
            </Grid>
    );
}
