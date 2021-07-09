import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./landing/landing";
import QuestionPost from "./questionPost/questionPost";
import QuestionPage from "./questionPage/questionPage";
import Explore from "./explore/explore";
import VotingPage  from "./votingPage/votingPage";

export default function RouterComponent() {
  return (
    <Router>
      <Route exact path="/" component={Landing} />
      <Route path="/post" component={QuestionPost} />
      <Route
        exact
        path="/bounty/:id"
        render={(props) => {
          return <QuestionPage {...props} />;
        }}
      />
      <Route path="/explore" component={Explore} />
      <Route path="/vote" component={VotingPage} />
    </Router>
  );
}
