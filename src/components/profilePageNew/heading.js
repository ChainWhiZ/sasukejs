import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import accountCircle from "../../assets/profile-account.png";
import "./profilePageCss.css"



export default function Heading(props) {
    const [username] = useState(localStorage.getItem('username'));
    return (

        <Grid container style={{ marginLeft: "1.5%" }} >
            <Grid item md={12} xs={12} className="profile-heading-grid" >
                <img className="profile-account-icon" src={accountCircle} alt="account" />

            </Grid>
            
            <Grid item md={12} xs={12} className="profile-content-style" style={{ fontSize: "18px" }} >
                <p>{localStorage.getItem("username")}</p>
            </Grid>
            <Grid item md={12} xs={12} className="profile-content-style" style={{ fontWeight: "normal" }} >
                <p>An open-source and decentralized project-building marketplace on Polygon with zero platform fees.
                    List your polygon projects and connect with developers.</p>
            </Grid>
        </Grid>
    );
}
