import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import QuestionDetail from "../questionDetail";
import axios from "axios";
import { port } from "../../../config/config";
import QuestionStage from "./questionStage";
import SimpleAlerts from "../../alert/alert";
import { useRecoilValue } from "recoil";
import { username as usernameAtom} from "../../../recoil/atoms";
import "../profilePageCss.css"
import { propTypes } from "react-markdown";



export default function VotedSolution() {
    const username = useRecoilValue(usernameAtom);
    const [data, setData] = useState([]);
    const [alert, setAlert] = useState({
        open: false,
        errorMessage: "",
        severity: "error",
    });
   
    useEffect(() => {
       fetchVotedSolutions();
    }, []);
    const fetchVotedSolutions =() =>{
        axios
        .post(port + "user/votedetails", {
            githubId: username
        })
        .then((response) => {
            // setLoader(false);
            console.log(response.data)
            setData(response.data);
        })
        .catch((err) => {
            // setLoader(false);
            // setAlert((prevState) => ({
            //   ...prevState,
            //   open: true,
            //   errorMessage: "Couldn't fetch voted solutions! Server-side issue. Sorry for the inconvenience",
            // }));
        });
    }
    return (
        <>
            <Grid container style={{ marginLeft: "-1%" }} >
                {data.map(votedOn =>
                    <>
                        <Grid item md={7} xs={12} >
                            <QuestionDetail {...votedOn.questionDetails} />
                        </Grid>
                        <Grid item md={5} xs={12}  >
                            <QuestionStage {...votedOn} fetchVotedSolutions={fetchVotedSolutions}/>
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
