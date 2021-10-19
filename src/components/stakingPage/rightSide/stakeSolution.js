import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import avatarIcon from "../../../assets/avatar.png";
import githubIcon from "../../../assets/githubIcon.png";
import axios from "axios";
import { port } from "../../../config/config";
import "../stakingPageCss.css";


export default function StakeSolution(props) {

    console.log(props)
    const [username] = useState(localStorage.getItem("username"));
    const [solution,setSolution] = useState({});
    const [isVoter, setIsVoter] = useState(false);
    useEffect(async () => {
        axios
          .post(port + "solution/fetch", {
            solutionId: props.solutionId,
          })
          .then((response) => {
            setSolution(response.data);
            //setLoader(false);
          })
          .catch((err) => {
            // setAlert((prevState) => ({
            //   ...prevState,
            //   open: true,
            //   errorMessage:
            //     "Solutions can't be loaded! Server-side issue. Sorry for the inconvenience",
            // }));
    
            // setLoader(false);
          });
    
        axios
          .post(port + "user/isvoter", {
            userId: username,
          })
          .then((response) => {
           // setLoader(false);
            setIsVoter(response.data);
          })
          .catch((err) => {});
      }, []);

    return (
<>
         
                <>
                    <Grid item md={6} xs={12}>
                        <p className="staking-solution">
                            <span >
                                <img className="staking-icon" src={avatarIcon} alt="avatar"  />
                            </span>
                            {solution.userId} submitted a solution
                            <span>
                                <img className="staking-git-icon" src={githubIcon} alt="github" />
                            </span>
                        </p>
                    </Grid>
                    <Grid item md={6} xs={12} style={{ marginBottom: "1.5%" }}>
                        <TextField
                            id="outlined-basic"
                            type={"number"}
                            variant="outlined"
                            size="small"
                            className="staking-input"
                            InputProps={{ inputProps: { min: 0, max: 10000 } }}
                        />

                        <Button
                            variant="contained"
                            className="staking-button"
                        >
                            Stake
                        </Button>
                    </Grid>
                </>
          
     </>



    );
}
