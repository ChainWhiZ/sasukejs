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
  var escrowContent = [
    {
      escrowStatus: "completed",
      _id: "6250939d594d5c805d7d30d5",
      solutionLink: "https://github.com/AlbertoCruzLuis/solana-pay-tutorial",
      publisherAddress: "0xD10A857A9B3D45b36A8CB2354A365839556978a5",
      solverAddress: "0xfFA1aF9E558B68bBC09ad74058331c100C135280",
      bountyUrl:
        "https://github.com/ChainWhiZ/Chainwhiz-landing-testimonial/issues/1",
      __v: 0,
      id: "6250939d594d5c805d7d30d5",
    },
    {
      escrowStatus: "initiated",
      _id: "6255cdbbf62bb4a4ac31ead8",
      solutionLink: "frontend-solution2.com",
      publisherAddress: "0xD10A857A9B3D45b36A8CB2354A365839556978a5",
      solverAddress: "0xfFA1aF9E558B68bBC09ad74058331c100C135280",
      bountyUrl: "frotend-test2.app",
      __v: 0,
      id: "6255cdbbf62bb4a4ac31ead8",
    },
  ];
  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = () => {
    axios
      .post(port + "user/solutions", {
        address: walletAddress,
      })
      .then((response) => {
        setLoader(false); //to be removed later
        solutions = response.data;

        // axios
        //   .post(new_backend_port + "api/escrow/get_escrow_status", {
        //     query: { solverAddress: walletAddress },
        //   })
        //   .then((response) => {
        //    escrowContent=response.data
        //     setLoader(false);
        //
        //   })
        //   .catch((err) => {
        //     setAlert((prevState) => ({
        //       ...prevState,
        //       open: true,
        //       errorMessage:
        //         "Couldn't fetch questions! Server-side issue. Sorry for the inconvenience",
        //     }));
        //     setLoader(false);
        //   });
      })
      .then(() => {
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
  };

  const concatObject = () => {
    solutions.forEach((solution) => {
      escrowContent.forEach((escrow) => {
        //solution.questionId.selectedSolution = escrow.solutionLink;
        if (solution._id === escrow.solutionLink) {
          solution.escrowStatus = escrow.escrowStatus;
        }
      });
    });
    setData(solutions);
  };

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
