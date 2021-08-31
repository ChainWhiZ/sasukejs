import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { port } from "../../../config/config";
import Button from "@material-ui/core/Button";
import "../landing.css";


export default function LoginButtons() {
    useEffect(() => {
        const url = window.location.href;
        const hasCode = url.includes("?code=");
        if (hasCode) {
            const query = window.location.search.substring(1);
            const token = query.split("code=")[1];

            axios
                .post(port + "authenticate/user", { code: token })
                .then((response) => {
                    localStorage.setItem("username", response.data.doc.githubId);
                    window.history.pushState({}, {}, "/");

                });
        }
    });

    return (
        <>
            <Grid container
                container
                direction="row"
                justifyContent="flex-start"

                alignItems="center"

            >

                <Grid item md={6} xs={6}  >
                    <a href="https://github.com/login/oauth/authorize?client_id=2bcca90edadf4d1f3535">

                        <Button

                            class="landing-button">
                            Test our App
                        </Button>
                    </a>
                </Grid>
                <Grid item md={6} xs={6}>
                    <Button
                        class="landing-button demo"
                        style={{
                            width: "200px",
                            marginLeft: "-23%"
                        }}>
                        Watch our Demo Video</Button>
                </Grid>
            </Grid>
        </>
    );
}
