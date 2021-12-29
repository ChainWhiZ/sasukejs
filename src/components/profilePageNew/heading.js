import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import accountCircle from "../../assets/profile-account.png";
import "./profilePageCss.css";
import axios from "axios";
import { port } from "../../config/config";
import { useRecoilValue } from "recoil";
import { username as usernameAtom } from "../../recoil/atoms";
import { Tooltip } from "@material-ui/core";

export default function Heading(props) {
  const username = useRecoilValue(usernameAtom);
  const [data, setData] = useState({});
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });

  useEffect(() => {
    axios
      .post(port + "user/user-details", {
        githubId: username,
      })
      .then((response) => {
        console.log(response.data)
        setData(response.data);
      })
      .catch((err) => {
        setAlert((prevState) => ({
          ...prevState,
          open: true,
          errorMessage:
            "Couldn't fetch questions! Server-side issue. Sorry for the inconvenience",
        }));
      });
  }, []);
  return (

    <>


      <Grid item md={12} xs={12} className="profile-heading-grid"></Grid>
      <Grid item md={3}>
        <img
          className="profile-account-icon"
          src={accountCircle}
          alt="account"
        />
      </Grid>
      {data && Object.keys(data).length ?
        <>
          <Grid item md={3} className="profile-details-bounty-heading-grid">
            <p className="profile-details-bounty">
              {data.questionIds && data.questionIds.length}
            </p>
            <p className="profile-details-bounty-heading">Bounties Posted</p>
          </Grid>
          <Grid item md={3} className="profile-details-bounty-heading-grid">
            <p className="profile-details-bounty">
              {data.solutionIds && data.solutionIds.length}
            </p>
            <p className="profile-details-bounty-heading">Bounties Solved</p>
          </Grid>
          <Grid item md={3} className="profile-details-bounty-heading-grid">
            {data.voterWeightage ? (
             
                <p className="profile-details-bounty">
                  {data.voterWeightage}
                </p>
             
            ) : (
              <p className="profile-details-bounty">0</p>
            )}

            <p className="profile-details-bounty-heading">Voter Weightage</p>
          </Grid>
        </>
        : null
      }
      <Grid
        item
        md={12}
        xs={12}
        className="profile-content-style profile-sub-info profile-bounty-username"
      >
        <p>{username}</p>
      </Grid>
      <Grid
        item
        md={12}
        xs={12}
        className="profile-content-style profile-sub-info"
      >
        <p>
          An open-source and decentralized project-building marketplace on
          Polygon with zero platform fees. List your polygon projects and
          connect with developers.
        </p>
      </Grid>

    </>
  );
}
