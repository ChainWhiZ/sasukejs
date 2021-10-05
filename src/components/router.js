import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import BeforeLogin from "./landing/beforeLogin/beforeLogin"
// import AfterLogin from "./landing/afterLogin";
import QuestionPost from "./questionPost/questionPost";
import QuestionPage from "./questionPage/questionPage";
import Explore from "./explore/explore";
import VotingPage from "./votingPage/votingPage";
import ProfilePage from "./profilePage/profilePage";
import Landing from "./landing/landing";

export default function RouterComponent() {
  // console.log = function() {}
  console.log(localStorage.getItem("username"))
  return (
    <Router >
      {localStorage.getItem("username") ? (
        <Route exact path="/landing" component={() => (<Landing username={localStorage.getItem("username")} />)} />
      ) : ( 
        <Route exact path="/landing" component={Landing} />
       )} 

      <Route path="/post" component={QuestionPost} />
      {/* <Route path="/landing" component={Landing} /> */}
      <Route
        exact
        path="/bounty/:id"
        render={(props) => {
          return <QuestionPage {...props} />;
        }}
      />
      <Route path="/explore" component={Explore} />
      <Route path="/vote" component={VotingPage} />
      <Route path="/profile" component={ProfilePage} />
    </Router>
  );
}
