import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Redirect } from "react-router-dom";
import MenuBar from "../explore/menuBar";
import Heading from "./heading";
import "./profilePageCss.css"


export default function ProfilePage(props) {
    const [username] = useState(localStorage.getItem('username'));
    if (!username) {
        return (
          <Redirect to="/" />
        )
      }
    
    return (

            <Grid container direction="column">
                <Grid item md={12} xs={12}>
                   <hr className="horizontal-line" style={{ marginTop: "8vw" }} />
                </Grid>
               
                <Grid item md={4} xs={12}>
                   <MenuBar/>
                </Grid>
               
                <Grid item md={8} xs={12} className="profile-right-grid">
                
                <Grid item md={12} xs={12}>
                    <Heading/>
              
                </Grid>
                </Grid>
            </Grid>
    );
}
