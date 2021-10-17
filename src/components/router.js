import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import QuestionPost from "./questionPost/questionPost";
import QuestionPage from "./questionPage/questionPage";
import VotingPage from "./votingPage/votingPage";
import ProfilePage from "./profilePage/profilePage";
import Landing from "./landing/landing";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import NewExplore from "./explore/explore";
export default function RouterComponent() {

  console.log(localStorage.getItem("username"))

  // console.log = function () {};


  return (
    <Router>
      {/* {localStorage.getItem("username") ? (
        <Route exact path="/" component={AfterLogin} />
      ) : ( 
        <Route exact path="/" component={BeforeLogin} />
       )}  */}
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/post" component={QuestionPost} />
        <Route
          exact
          path="/bounty/:id"
          render={(props) => {
            return <QuestionPage {...props} />;
          }}
        />
        <Route path="/explore" component={NewExplore} />
        <Route path="/vote" component={VotingPage} />
        <Route path="/profile" component={ProfilePage} />
      </Switch>
      <Footer />
    </Router>
  );
}
