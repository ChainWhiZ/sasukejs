import React,{useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import Navbar from "../navbar/navbar";
import Grid from "@material-ui/core/Grid";
import eventBus from "../EventBus";

export default function Landing() {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  useEffect(() => {
    eventBus.on("loginSuccessful", (data) =>
      setUsername(localStorage.getItem('username'))
    );
    eventBus.remove("loginSuccessful");
  });
 
  return (
    <>
      <Navbar />
      <br/>
      {username?(
      <Grid container spacing={3}>
        <Grid item md={4} xs={14}>
          <Link to="/post" >
            <button>Post a Bounty</button>
          </Link>
          </Grid>
          <Grid item md={4} xs={14}>
          <Link to="/explore" >
            <button>Solve a Bounty</button>
          </Link>
          </Grid>
          <Grid item md={4} xs={14}>
          <Link to="/explore" >
            <button>Vote a Solution</button>
          </Link>
          </Grid>
     
      </Grid>
        ):""}
    </>
  );
}
