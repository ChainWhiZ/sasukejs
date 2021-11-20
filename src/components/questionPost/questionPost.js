import React, { useEffect, useState } from "react";
import BaseComponent from "./baseComponent/baseComponentPage";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { port } from "../../config/config";
import { text } from "../../constants";
import { useRecoilValue } from "recoil";
import { username as usernameAtom } from "../../recoil/atoms";
import { Redirect } from "react-router-dom";
import { walletAddress as walletAddressAtom, contract as contractAtom } from "../../recoil/atoms";
import CircularIndeterminate from "../loader/loader";

export default function QuestionPost() {
  let history = useHistory();
  const [issueTitle, setIssueTitle] = useState("");
  const [time, setTime] = useState(0);
  const [category, setCategory] = useState([]);
  const [issueURL, setIssueURL] = useState("");
  const [reward, setReward] = useState(0);
  const [communityOption, setCommunityOption] = useState();
  const [activePage, setActivePage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [terms, setTerms] = useState({
    undertaking1: false,
    undertaking2: false,
  });
  const [communityReward, setCommunityReward] = useState(0);
  const walletAddress = useRecoilValue(walletAddressAtom);
  const [alert, setAlert] = useState({
    isValid: false,
    errorMessage: "",
  });
  const [success, setSuccess] = useState({
    success: false,
    message: ""
  })
  // const [contract,setContract]=useState(null)
  const username = useRecoilValue(usernameAtom);
  const contractPromise = useRecoilValue(contractAtom);
  let contract;
  var promise = Promise.resolve(contractPromise);
  promise.then(function (v) {
    contract = v;
  });


  function handleGithubIssueValidation() {
    console.log("in here");
    // return axios
    //   .post(port + "question/validate", {
    //     githubIssueUrl: issueURL,
    //   })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       return true;
    //     }
    //   })
    //   .catch((err) => {
    //     return false;
    //   });
    return true;
  }


  function handlePageChange(page) {
    setAlert((prevState) => ({
      ...prevState,
      isValid: false,
      errorMessage: "",
    }));
    setActivePage(page);
  }

  async function handleValidation(page) {
    console.log(page);
    console.log(activePage);
    if (page > activePage) {
      if (activePage === 1) {
        if (issueTitle === "") {
          setAlert((prevState) => ({
            ...prevState,
            isValid: true,
            errorMessage: "Please enter issue title",
          }));
        } else {
          handlePageChange(page);
        }
      }
      if (activePage === 4) {
        if (!(await handleGithubIssueValidation())) {
          setAlert((prevState) => ({
            ...prevState,
            isValid: true,
            errorMessage: "Please enter valid issue URL",
          }));
        } else {
          handlePageChange(page);
        }
      }
      if (activePage === 5) {
        if (reward <= 0.000001) {
          setAlert((prevState) => ({
            ...prevState,
            isValid: true,
            errorMessage: "Please enter valid reward",
          }));
        } else {
          handlePageChange(page);
        }
      }
      if (activePage === 2) {
        if (!category.length) {
          setAlert((prevState) => ({
            ...prevState,
            isValid: true,
            errorMessage: "Please enter valid issue category",
          }));
        } else {
          handlePageChange(page);
        }
      }
      if (activePage === 3) {
        if (time <= 0) {
          setAlert((prevState) => ({
            ...prevState,
            isValid: true,
            errorMessage: "Please enter valid time",
          }));
        } else {
          handlePageChange(page);
        }
      }
      if (activePage === 7) {
        if (communityReward <= 0.00000001 && communityOption == "Community Approved") {
          console.log(typeof communityReward);
          setAlert((prevState) => ({
            ...prevState,
            isValid: true,
            errorMessage: "Please enter valid community reward",
          }));
        } else {
          handlePageChange(page);
        }
      }
      if (activePage === 6) {
        if (!communityOption) {
          setAlert((prevState) => ({
            ...prevState,
            isValid: true,
            errorMessage: "Please enter approval options",
          }));
        } else {
          handlePageChange(page);
        }
      }
    } else {
      handlePageChange(page);
    }
  }

  async function questionPosting(timeEnd, votingTimeBegin) {
    return await new Promise((resolve, reject) => {
      try {
        const trxObj = contract.methods
          .postIssue(
            username,
            issueURL,
            (reward * Math.pow(10, 18)).toString(),
            (communityReward * Math.pow(10, 18)).toString(),
            communityOption == "Community Approved" ? (votingTimeBegin - 1).toString() : timeEnd.toString(),
            communityOption == "Community Approved" ? votingTimeBegin.toString() : "0",
            communityOption == "Community Approved" ? timeEnd.toString() : "0",
          )
          .send({ from: walletAddress.toString() });

        trxObj.on('receipt', function (receipt) {
          console.log("Successfully done")
          resolve(receipt)
        })

        trxObj.on('error', function (error, receipt) {
          setLoader(false)
          console.log(Object.keys(error))
          window.alert(`An error occured at trx hash:${error["receipt"].transactionHash}`)
          reject(error)
        });

      } catch (error) {
        console.log(error)
        window.alert(error)
        reject(error)
      }
    })

  };
  function handleSubmit() {
    console.log(time);
    console.log(issueTitle);
    console.log(category);
    console.log(issueURL);
    console.log(reward);
    console.log(communityOption);
    console.log(communityReward);
    console.log(terms);
    setLoader(true);
    if (terms.undertaking1 === false || terms.undertaking2 === false) {

      setAlert((prevState) => ({
        ...prevState,
        isValid: true,
        errorMessage: "Please accept the terms",
      }));
    } else if (!walletAddress) {

      setAlert((prevState) => ({
        ...prevState,
        isValid: true,
        errorMessage: "Please connect wallet",
      }));
    }
    else {

      setAlert((prevState) => ({
        ...prevState,
        isValid: false,
        errorMessage: "",
      }));
      console.log("hereeeeee")
      const timeBegin = Math.floor(new Date().getTime() / 1000);
      let timeEnd = timeBegin + time * 24 * 60 * 60;
      let votingTimeBegin = communityOption == "Community Approved"
        ? timeBegin + Math.floor(0.7 * (timeEnd - timeBegin)) + 1
        : 0
      try {
        return Promise.resolve()
          .then(async function () {
            try {
              return await questionPosting(timeEnd, votingTimeBegin);
            } catch (error) {
              console.log(error)
              return;
            }
          })
          .then(async function () {
            //return setSuccessStatus(true);
          })
          .then(async function () {
            return axios
              .post(port + "question/save", {
                githubId: username,
                publicAddress: walletAddress,
                questionTitle: issueTitle,
                githubIssueUrl: issueURL,
                timeEnd: timeEnd,
                solvingTimeBegin: timeBegin,
                votingTimeBegin: votingTimeBegin,
                bountyReward: reward,
                communityReward: communityReward,
                isCommunityApprovedSolution:
                  communityOption == "Community Approved" ? true : false,
                questionCategories: category,
              })
              .then((response) => {
                setLoader(false);
                history.push({
                  pathname: `/bounty/${response.data}`,
                  state: { id: response.data },
                });
              });
          })
          .then(function () { });

      } catch (error) {
        console.log(error)
        setAlert((prevState) => ({
          ...prevState,
          isValid: true,
          errorMessage: "Something went wrong while posting!",
        }));

      }

    }

  }

  if (!username) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {loader ?
        <CircularIndeterminate />
        :
        <>
          {activePage === 1 ? (
            <BaseComponent
              {...text["page1"]}
              handleValidation={handleValidation}
              pageState={activePage}
              handleIssueTitle={setIssueTitle}
              issueTitle={issueTitle}
              alert={alert}
            />
          ) : activePage === 2 ? (
            <BaseComponent
              {...text["page2"]}
              handleValidation={handleValidation}
              pageState={activePage}
              handleCategory={setCategory}
              category={category}
              alert={alert}
            />
          ) : activePage === 3 ? (
            <BaseComponent
              {...text["page3"]}
              handleValidation={handleValidation}
              pageState={activePage}
              handleTime={setTime}
              time={time}
              alert={alert}
            />
          ) : activePage === 4 ? (
            <BaseComponent
              {...text["page4"]}
              handleValidation={handleValidation}
              pageState={activePage}
              handleIssueURL={setIssueURL}
              issueURL={issueURL}
              alert={alert}
            />
          ) : activePage === 5 ? (
            <BaseComponent
              {...text["page5"]}
              handleValidation={handleValidation}
              pageState={activePage}
              handleReward={setReward}
              reward={reward}
              alert={alert}
            />
          ) : activePage === 6 ? (
            <BaseComponent
              {...text["page6"]}
              handleValidation={handleValidation}
              pageState={activePage}
              handleCommunityChoice={setCommunityOption}
              communityOption={communityOption}
              alert={alert}
            />
          ) : activePage === 7 ? (
            <BaseComponent
              {...text["page7"]}
              handleValidation={handleValidation}
              pageState={activePage}
              handleCommunityReward={setCommunityReward}
              communityOption={communityOption}
              communityReward={communityReward}
              alert={alert}
            />
          ) : activePage === 8 ? (
            <BaseComponent
              {...text["page8"]}
              handleValidation={handleValidation}
              pageState={activePage}
              handleTerms={setTerms}
              terms={terms}
              alert={alert}
              walletAddress={walletAddress}
              handleSubmit={handleSubmit}
            />
          ) : null}
        </>

      }
      {success.success ? alert(success.message) : null}
    </>
  );
}
