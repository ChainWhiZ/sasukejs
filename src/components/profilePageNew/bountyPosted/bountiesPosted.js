import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import QuestionDetail from "../questionDetail";
import axios from "axios";
import { port } from "../../../config/config";
import QuestionStage from "./questionStage";
import SimpleAlerts from "../../alert/alert";
import "../profilePageCss.css"



export default function BountyPosted(props) {
    const [username] = useState(localStorage.getItem('username'));
    const [data, setData] = useState([]);
    const [alert, setAlert] = useState({
        open: false,
        errorMessage: "",
        severity: "error",
    });
    useEffect(() => {
        axios
            .post(port + "user/questions", {
                githubId: username
            })
            .then((response) => {
                // setLoader(false);
                setData(response.data);
            })
            .catch((err) => {
                setAlert((prevState) => ({
                    ...prevState,
                    open: true,
                    errorMessage: "Couldn't fetch questions! Server-side issue. Sorry for the inconvenience",
                }));
                // setLoader(false);
            });
    }, []);
    return (
        <>
            <Grid container style={{ marginLeft: "-1%" }} >
                {data.map(question =>
                    <>
                        <Grid item md={7} xs={12} >
                            <QuestionDetail {...question} />
                        </Grid>
                        <Grid item md={5} xs={12}  >
                            <QuestionStage {...question} />
                        </Grid>
                    </>
                )}
            </Grid>
            {alert.open ? (
                <SimpleAlerts
                    severity={alert.severity}
                    message={alert.errorMessage}
                />
            ) : null}
        </>
    );
}
