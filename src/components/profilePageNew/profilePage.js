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
               
                <Grid item md={4} xs={12} >
                   <MenuBar type={'profile'}/>
                </Grid>
               
                <Grid container item md={8} xs={12} style={{marginLeft:"-6%", marginTop:"2%"}}>
                
                <Grid item md={12} xs={12}>
                    <Heading/>
              
                </Grid>
                <br/>
                <Grid item md={12} xs={12}>
                    <ProfileTabs/>
              
                </Grid>
                </Grid>
            </Grid>
    );
}
