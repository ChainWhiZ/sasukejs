import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import accountCircle from "../../assets/profile-account.png";
import "./profilePageCss.css";
import axios from "axios";
import { port } from "../../config/config";
export default function Heading(props) {
  const [username] = useState(localStorage.getItem("username"));
  // const [data, setData] = useState({});
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });
  let data = {
    _id: "612a65bc3aa7bb0018a70872",
    publicAddresses: [],
    publications: [],
    questionIds: [
      "612b802451c9f700184b4188",
      "613318c9a0267c0018b750dd",
      "6139b3f4bf69520018799f1c",
      "61461936bd0000001871fb09",
      "617cd63a97deb80018b65469",
    ],
    solutionIds: [
      "https://github.com/mishramonalisha76/stranger",
      "https://github.com/rajashree23/API",
      "https://github.com/mishramonalisha76/chat_plugin",
      "https://github.com/mishramonalisha76/ether-transfer",
      "https://github.com/mishramonalisha76/blockchain_prototype",
      "https://github.com/rohit-px2/nvui",
      "https://github.com/mishramonalisha76/competitive-programming-solutions",
      "https://github.com/rahulmishra24/mygit",
      "https://github.com/grawlinson/dell-xps-9360",
    ],
    votedOn: ["612e41e79a8bed0018533a03", "61320456170a130018a3afd4"],
    githubId: "mishramonalisha76",
    skills: [],
    __v: 0,
     voterId: "61320411170a130018a3afd3",
    voterWeightage: 30,
  };
  // useEffect(() => {
  //   axios
  //     .post(port + "user/user-details", {
  //       githubId: username,
  //     })
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((err) => {
  //       setAlert((prevState) => ({
  //         ...prevState,
  //         open: true,
  //         errorMessage:
  //           "Couldn't fetch questions! Server-side issue. Sorry for the inconvenience",
  //       }));
  //     });
  // }, []);
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

      <Grid item md={3} className="profile-details-bounty-heading-grid">
        <p className="profile-details-bounty">{data.questionIds.length}</p>
        <p className="profile-details-bounty-heading">Bounties Posted</p>
      </Grid>
      <Grid item md={3} className="profile-details-bounty-heading-grid">
        <p className="profile-details-bounty">{data.solutionIds.length}</p>
        <p className="profile-details-bounty-heading">Bounties Solved</p>
      </Grid>
      <Grid item md={3} className="profile-details-bounty-heading-grid">
        {data.voterWeightage ? (
          <p className="profile-details-bounty">{data.voterWeightage}</p>
        ) : (
          <p className="profile-details-bounty">0</p>
        )}

        <p className="profile-details-bounty-heading">Voter Weightage</p>
      </Grid>

      <Grid
        item
        md={12}
        xs={12}
        className="profile-content-style profile-sub-info profile-bounty-username"
      >
        <p>{localStorage.getItem("username")}</p>
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
