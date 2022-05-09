import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import QuestionDetail from "../questionDetail";
import axios from "axios";
import { port } from "../../../config/config";
import QuestionStage from "./questionStage";
import SimpleAlerts from "../../alert/alert";
import { useRecoilValue } from "recoil";
import { walletAddress as walletAddressAtom } from "../../../recoil/atoms";
import CircularIndeterminate from "../../loader/loader";
import "../profilePageCss.css";
import { Link } from "react-router-dom";
export default function VotedSolution() {
    const walletAddress = useRecoilValue(walletAddressAtom);
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);
    const [alert, setAlert] = useState({
        open: false,
        errorMessage: "",
        severity: "error",
    });

    useEffect(() => {
        fetchVotedSolutions();
    }, []);
    const fetchVotedSolutions = () => {
        axios
            .post(port + "user/votedetails", {
                address: walletAddress
            })
            .then((response) => {
                setLoader(false);
                console.log(response.data)
                setData(response.data.reverse());
            })
            .catch((err) => {
                setLoader(false);
                setAlert((prevState) => ({
                    ...prevState,
                    open: true,
                    errorMessage: "Couldn't fetch voted solutions! Server-side issue. Sorry for the inconvenience",
                }));
            });
    }
    return (
        <>  {loader ? <CircularIndeterminate /> :
            <Grid container style={{ marginLeft: "-1%" }} >
                {data.length ?
                    (data.map(votedOn =>
                        <>
                            <Grid item md={7} xs={12} >
                            <Link to={`/bounty/${votedOn.questionDetails._id}`}>
                                <QuestionDetail {...votedOn.questionDetails} />
                                </Link>
                            </Grid>
                            <Grid item md={5} xs={12}  >
                                <QuestionStage {...votedOn} fetchVotedSolutions={fetchVotedSolutions} handleLoader={(flag) => setLoader(flag)} />
                            </Grid>
                        </>
                    ))
                    :
                    <p style={{ "marginLeft": "3%" }}>Run the day. Don’t let it run you. Start your journey on Chainwhiz.</p>
                }
            </Grid>
        }
            {alert.open ? (
                <SimpleAlerts
                    severity={alert.severity}
                    message={alert.errorMessage}
                />
            ) : null}

        </>
    );
}
