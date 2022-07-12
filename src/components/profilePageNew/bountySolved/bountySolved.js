import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import QuestionDetail from "../questionDetail";
import axios from "axios";
import { port } from "../../../config/config";
import QuestionStage from "./questionStage";
import SimpleAlerts from "../../alert/alert";
import { useRecoilValue } from "recoil";
import { walletAddress as walletAddressAtom } from "../../../recoil/atoms";
import CircularIndeterminate from "../../loader/loader";
import { new_backend_port } from "../../../config/config";
import "../profilePageCss.css";
import { Link } from "react-router-dom";
export default function BountySolved(props) {
  const walletAddress = useRecoilValue(walletAddressAtom);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [alert, setAlert] = useState({
    open: false,
    errorMessage: "",
    severity: "error",
  });
  var solutions = [];
  var escrowContent = [];
  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = () => {
    axios
      .post(port + "user/solutions", {
        address: walletAddress,
      })
      .then((response) => {
        solutions = response.data;
        axios
          .post(new_backend_port + "api/escrow/get_escrow_status", {
            query: { solverAddress: walletAddress },
          })
          .then((response) => {
           escrowContent=response.data.result
            
          }).then(() => {
            concatObject();
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

  const concatObject = () => {
    solutions.forEach((solution) => {
      escrowContent.forEach((escrow) => {
        solution.questionId.selectedSolution = escrow.solutionLink;
        if (solution._id === escrow.solutionLink) {
          solution.escrowStatus = escrow.escrowStatus;
        }
      });
    });
    setData(solutions.reverse());
    setLoader(false)
  };
console.log(data)
  return (
    <>
      {loader ? (
        <CircularIndeterminate />
      ) : (
        <Grid container style={{ marginLeft: "-1%" }}>
          {data.length ? (
            data.map((solution) => (
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
                    handleLoader={(flag) => setLoader(flag)}
                  />
                </Grid>
              </>
            ))
          ) : (
            <p style={{ marginLeft: "3%" }}>
              Run the day. Don’t let it run you. Start your journey on
              Chainwhiz.
            </p>
          )}
        </Grid>
      )}
      {alert.open ? (
        <SimpleAlerts severity={alert.severity} message={alert.errorMessage} />
      ) : null}
    </>
  );
}
