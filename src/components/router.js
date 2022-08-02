import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import { logEvent } from "firebase/analytics";
import firebaseAnalytics from "./firebaseConfig";
import QuestionPost from "./questionPost/questionPost";
import QuestionPage from "./questionPage/questionPage";
import axios from "axios";
import ProfilePage from "./profilePageNew/profilePage";
import Landing from "./landing/landing";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import NewExplore from "./explore/explore";
import StakingPage from "./stakingPage/stakingPage";
import {
  maticusd as maticusdAtom,
  usdValues as usdValuesAtom,
} from "../recoil/atoms";
import { useRecoilState } from "recoil";
import MobileView from "./mobileView/mobileView";
import { port } from "../config/config";
import "../style/style.css";

export default function RouterComponent() {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1100);
  const [maticusd, setMaticusd] = useRecoilState(maticusdAtom);
  const [usdValues, setUsdValues] = useRecoilState(usdValuesAtom);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 1100);
  };
  console.log = function () {};
  //use this if coinbase goes down
  // "https://api.coingecko.com/api/v3/coins/dev-protocol?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
  useEffect(() => {
    logEvent(firebaseAnalytics, "dApp");

    axios
      .get(port + "cryptocurrencies/get-active-list")
      .then((response) => {
        console.log(response);
        setMaticusd(response.data[2].USD);
        setUsdValues({
          DEV: response.data[1].USD,
          BETS: response.data[0].USD,
        });
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
      })

      .catch((err) => {
        console.log(err);
      });
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [maticusd]);

  return (
    <Router>
      {isDesktop ? (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Chainwhiz</title>
            <meta name="keywords" content="bounty,community" />
            <meta
              name="description"
              content="ChainWhiZ is an open-source and decentralised marketplace for dApp development with zero platform fees."
            />
            <meta
              name="image"
              content="https://app.chainwhiz.app/bounty/6213d0d284ff2300187cbb03"
            />
          </Helmet>
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
            <Route path="/solve" component={NewExplore} />
            <Route path="/completed" component={NewExplore} />
            <Route path="/vote" component={NewExplore} />
            <Route path="/stake" component={StakingPage} />
            <Route path="/profile" component={ProfilePage} />
          </Switch>
          {window.location.pathname !== "/post" && <Footer />}
        </>
      ) : (
        <Route path="/" component={MobileView} />
      )}
    </Router>
  );
}
