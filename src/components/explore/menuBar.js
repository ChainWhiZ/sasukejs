import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import "./explore.css";
import { Link } from "react-router-dom";
import accountCircle from "../../assets/account-circle.png";
import postBounty from "../../assets/post_bounty.png";
import solveBounty from "../../assets/solve_bounty.png";
import voteBounty from "../../assets/vote_bounty.png";
import whiteProfile from "../../assets/profile.png";
import blackProfile from "../../assets/black_profile.png";
import whiteSolveBounty from "../../assets/white_solve_bounty.png";
import blackVoteBounty from "../../assets/black_vote_bounty.png";
import { useRecoilValue } from "recoil";
import { username as usernameAtom } from "../../recoil/atoms";
import LoginPopup from "../landing/loginPopup";

export default function MenuBar(props) {
  const username = useRecoilValue(usernameAtom);
  const [loginPopup, setLoginPopup] = useState(false);
  return (
    <>
      <Grid container className="menubar">
        <Grid item md={12} className="menubar-usergrid">
          {username ? (
            <>
              <img src={accountCircle} alt="account" />
              <p className="menubar-username">{username}</p>
            </>
          ) : null}
        </Grid>

        <Link to="/post">
          <Grid item md={12} className="grid-item">
            <img src={postBounty} alt="postBounty" />
            <p className="menubar-items">Post a Bounty</p>
          </Grid>
        </Link>
        <Link to="/solve">
          <Grid
            item
            md={12}
            className={
              props.type === "solve" ? "grid-item active" : "grid-item"
            }
          >
            <img
              src={props.type === "solve" ? solveBounty : whiteSolveBounty}
              alt="solveBounty"
            />
            <p
              className={
                props.type === "solve"
                  ? "menubar-items p-active"
                  : "menubar-items"
              }
            >
              Solve Bounties
            </p>
          </Grid>
        </Link>
        <Link to="/vote">
          <Grid
            item
            md={12}
            className={props.type === "vote" ? "grid-item active" : "grid-item"}
          >
            <img
              src={props.type === "vote" ? blackVoteBounty : voteBounty}
              alt="voteBounty"
            />
            <p
              className={
                props.type === "vote"
                  ? "menubar-items p-active"
                  : "menubar-items"
              }
            >
              Vote on Solutions
            </p>
          </Grid>
        </Link>
        {username ? (
          <Link to="/profile">
            <Grid
              item
              md={12}
              className={
                props.type === "profile" ? "grid-item active" : "grid-item"
              }
            >
              <img
                src={props.type === "profile" ? blackProfile : whiteProfile}
                alt="profile"
              />
              <p
                className={
                  props.type === "profile"
                    ? "menubar-items p-active"
                    : "menubar-items"
                }
              >
                Your Profile
              </p>
            </Grid>
          </Link>
        ) : (
          <div
        class="profile-div"
          
            onClick={() => {
              setLoginPopup(true);
            }}
          >
            <img
              src={props.type === "profile" ? blackProfile : whiteProfile}
              alt="profile"
            />
            <p
              className={
                props.type === "profile"
                  ? "menubar-items p-active"
                  : "menubar-items"
              }
         
            >
              Your Profile
            </p>
          </div>
        )}
      </Grid>
      {loginPopup ? (
        <LoginPopup
          handlePopupClose={(flag) => setLoginPopup(flag)}
          open={loginPopup}
        />
      ) : null}
    </>
  );
}
