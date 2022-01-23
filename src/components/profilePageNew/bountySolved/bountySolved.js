import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import QuestionDetail from "../questionDetail";
import axios from "axios";
import { port } from "../../../config/config";
import QuestionStage from "./questionStage";
import SimpleAlerts from "../../alert/alert";
import { useRecoilValue } from "recoil";
import { username as usernameAtom } from "../../../recoil/atoms";
import CircularIndeterminate from "../../loader/loader";
import "../profilePageCss.css";
import { Link } from "react-router-dom";
export default function BountySolved(props) {
  const username = useRecoilValue(usernameAtom);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });
  useEffect(() => {
    fetchSolutions();
  }, []);
  console.log(data);

  const fetchSolutions = () => {
    axios
      .post(port + "user/solutions", {
        githubId: username,
      })
      .then((response) => {
        setLoader(false);
        console.log(response);
        setData(response.data);
      })
      .catch((err) => {
        setAlert((prevState) => ({
          ...prevState,
          open: true,
          errorMessage:
            "Couldn't fetch questions! Server-side issue. Sorry for the inconvenience",
        }));
        setLoader(false);
      });
  };

  return (
    <>
      {loader ? <CircularIndeterminate /> :
        <Grid container style={{ marginLeft: "-1%" }}>
          {data.length ?

            (data.map((solution) => (
              <>
                <Grid item md={7} xs={12}>
                <Link to={`/bounty/${solution.questionId._id}`}>
                  <QuestionDetail {...solution.questionId} />
                  </Link>
                </Grid>
                <Grid item md={5} xs={12}>
                  <QuestionStage
                    {...solution}
                    fetchSolutions={fetchSolutions}
                    
                  />
                </Grid>
              </>
            )))
            :
            <p style={{ "marginLeft": "3%" }}>Run the day. Don’t let it run you. Start your journey on Chainwhiz.</p>
          }

        </Grid>

      }
      {alert.open ? (
        <SimpleAlerts severity={alert.severity} message={alert.errorMessage} />
      ) : null}
    </>
  );
}
