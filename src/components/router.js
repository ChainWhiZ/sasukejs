import React,{useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import QuestionPost from "./questionPost/questionPost";
import QuestionPage from "./questionPage/questionPage";
import axios from "axios";
import ProfilePage from "./profilePageNew/profilePage";
import Landing from "./landing/landing";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import NewExplore from "./explore/explore";
import StakingPage from "./stakingPage/stakingPage";
import { maticusd as maticusdAtom } from "../recoil/atoms";
import { useRecoilState } from "recoil";
import "../style/style.css";
export default function RouterComponent() {
<<<<<<< HEAD
  // console.log = function() {}
  console.log(localStorage.getItem("username"))
  return (
    <Router>
      {localStorage.getItem("username") ? (
        <Route exact path="/" component={AfterLogin} />
      ) : ( 
        <Route exact path="/" component={BeforeLogin} />
       )} 
=======
  const [maticusd, setMaticusd] = useRecoilState(maticusdAtom);
  useEffect(() => {
    axios
    .get(`https://api.polygonscan.com/api?module=stats&action=maticprice&apikey=${process.env.REACT_APP_POLYGONSCAN}`)
    .then((response) => {
     setMaticusd(response.data.result.maticusd);
    })
    .catch((err) => {
     
    });
   
  },[maticusd])
  // console.log = function () {};
>>>>>>> ccb98323b6a81bc08ce334712ecac3d2ff2b803e


  return (
    <Router>
     
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
        <Route path="/stake" component={StakingPage} />
        <Route path="/profile" component={ProfilePage} />
      </Switch>
      <Footer />
    </Router>
  );
}
