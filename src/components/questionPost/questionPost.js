import React, { useState } from "react";
import BaseComponent from "./baseComponent/baseComponentPage";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { port } from "../../config/config";
import { text } from "../../constants";
import { useRecoilValue } from "recoil";
import { username as usernameAtom } from "../../recoil/atoms";
import { communityText } from "../../constants";
import { Redirect } from "react-router-dom";
import {
  walletAddress as walletAddressAtom,
  contract as contractAtom,
  tokenContract as tokenContractAtom,
} from "../../recoil/atoms";
import CircularIndeterminate from "../loader/loader";

export default function QuestionPost() {
  let history = useHistory();
  const [issueTitle, setIssueTitle] = useState("");
  const [time, setTime] = useState(0);
  const [voteTime, setVoteTime] = useState(0);
  const [category, setCategory] = useState([]);
  const [issueURL, setIssueURL] = useState("");
  const [reward, setReward] = useState(0);
  const [communityOption, setCommunityOption] = useState();
  const [activePage, setActivePage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [currency, setCurrency] = useState("MATIC");
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
  console.log(issueTitle)
  console.log(time)
  console.log(voteTime)
  console.log(category)
  console.log(issueURL)
  console.log(reward)
  console.log(communityOption)

  const [success, setSuccess] = useState({
    success: false,
    message: "",
  });
  const username = useRecoilValue(usernameAtom);
  const contractPromise = useRecoilValue(contractAtom);
  console.log(contractPromise);
  let contract;
  var promise = Promise.resolve(contractPromise);
  promise.then(function (v) {
    contract = v;
  });
  console.log(tokenContractAtom);
  const tokenContractPromise = useRecoilValue(tokenContractAtom);
  console.log(tokenContractPromise);
  let tokenContract;
  var tokenPromise = Promise.resolve(tokenContractPromise);
  tokenPromise.then(function (v) {
    console.log(v);
    tokenContract = v;
    console.log(tokenContract);
  });
  console.log(tokenContract);
  function handleGithubIssueValidation() {
    console.log("in here");
    setLoader(true);
    return axios
      .post(port + "question/validate", {
        githubIssueUrl: issueURL,
      })
      .then((response) => {
        if (response.status === 200) {
          setLoader(false);
          return true;
        }
      })
      .catch((err) => {
        setLoader(false);
        return false;
      });
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
            errorMessage: "You don’t have a name? Where’s mine then?",
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
            errorMessage: "What’s all this rush? Enter valid issue URL.",
          }));
        } else {
          handlePageChange(page);
        }
      }
      if (activePage === 5) {
        if ((reward <= 5) && (reward >= 40000)) {
          setAlert((prevState) => ({
            ...prevState,
            isValid: true,
            errorMessage: "Please enter valid bounty reward between 5 to 40000",
          }));
        } else {
          console.log(currency);
          handlePageChange(page);
        }
      }
      if (activePage === 2) {
        if (!category.length) {
          setAlert((prevState) => ({
            ...prevState,
            isValid: true,
            errorMessage: "How dare you? Choose the right category/ies for me.",
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
      if (activePage === 8) {
        if (voteTime <= 0) {
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
        if (
          (communityReward <= 5) && (communityReward >= 40000) &&
          communityOption == communityText[0].title
        ) {
          console.log(typeof communityReward);
          setAlert((prevState) => ({
            ...prevState,
            isValid: true,
            errorMessage: "Please enter valid community reward between 5 to 40000",
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

  async function questionPostingWithMatic(timeEnd, votingTimeBegin) {
    return await new Promise((resolve, reject) => {
      const rewardAmount = reward * Math.pow(10, 18);
      const communityRewardAmount = communityReward * Math.pow(10, 18);
      const totalAmount = rewardAmount + communityRewardAmount;
      console.log(
        "total %s comm %s sol %s",
        totalAmount,
        communityRewardAmount,
        rewardAmount
      );
      try {
        const trxObj = contract.methods
          .postIssue(
            username,
            issueURL,
            rewardAmount.toString(),
            communityRewardAmount.toString(),
            communityOption == communityText[0].title
              ? (votingTimeBegin - 1).toString()
              : timeEnd.toString(),
            communityOption == communityText[0].title
              ? votingTimeBegin.toString()
              : "0",
            communityOption == communityText[0].title ? timeEnd.toString() : "0",
            currency
          )
          .send({ from: walletAddress.toString(), value: totalAmount });

        trxObj.on("receipt", function (receipt) {
          console.log("Successfully done");
          //  window.alert("Suuccessfulyy posted")
          resolve(receipt);
        });

        trxObj.on("error", function (error, receipt) {
          setLoader(false);
          console.log(error);
          if (error)
            window.alert(
              error.transactionHash
                ? `Went wrong in trc hash :${error.transactionHash}`
                : error.message
            );
          reject(error.message);
        });
      } catch (error) {
        console.log(error);
        window.alert(
          error.transactionHash
            ? `Went wrong in trc hash :${error.transactionHash}`
            : error.message
        );
        reject(error);
      }
    });
  }
  async function questionPostingWithERC20(timeEnd, votingTimeBegin) {
    return await new Promise((resolve, reject) => {
      const rewardAmount = reward * Math.pow(10, 18);
      const communityRewardAmount = communityReward * Math.pow(10, 18);
      const totalAmount = rewardAmount + communityRewardAmount;
      console.log(
        "total %s comm %s sol %s",
        totalAmount,
        communityRewardAmount,
        rewardAmount
      );
      try {
        console.log(tokenContract.methods);
        const approvalTrx = tokenContract.methods
          .approve(
            process.env.REACT_APP_CHAINWHIZ_CORE_ADDRESS,
            (totalAmount * 2).toString()
          )
          .send({ from: walletAddress.toString() });
        approvalTrx.on("receipt", function (receipt) {
          window.alert("Approving your token, wait for the next transaction");
          const trxObj = contract.methods
            .postIssue(
              username,
              issueURL,
              rewardAmount.toString(),
              communityRewardAmount.toString(),
              communityOption == communityText[0].title
                ? (votingTimeBegin - 1).toString()
                : timeEnd.toString(),
              communityOption == communityText[0].title
                ? votingTimeBegin.toString()
                : "0",
              communityOption == communityText[0].title
                ? timeEnd.toString()
                : "0",
              currency
            )
            .send({ from: walletAddress.toString() });

          trxObj.on("receipt", function (receipt) {
            console.log("Successfully done");
            //  window.alert("Suuccessfulyy posted")
            resolve(receipt);
          });

          trxObj.on("error", function (error, receipt) {
            setLoader(false);
            console.log(error);
            if (error)
              window.alert(
                error.transactionHash
                  ? `Went wrong in trc hash :${error.transactionHash}`
                  : error.message
              );
            reject(error.message);
          });
        });
      } catch (error) {
        console.log(error);
        window.alert(
          error.transactionHash
            ? `Went wrong in trc hash :${error.transactionHash}`
            : error.message
        );
        reject(error);
      }
    });
  }
  async function handleSubmit() {
    console.log(time);
    console.log(issueTitle);
    console.log(category);
    console.log(issueURL);
    console.log(reward);
    console.log(communityOption);
    console.log(communityReward);
    console.log(terms);

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
    }else if (!username) {
      setAlert((prevState) => ({
        ...prevState,
        isValid: true,
        errorMessage: "Please login to post bounty",
      }));
      
    } else {
      setAlert((prevState) => ({
        ...prevState,
        isValid: false,
        errorMessage: "",
      }));
      setLoader(true);
      console.log("hereeeeee");
      const timeBegin = Math.floor(new Date().getTime() / 1000);
      let timeEnd = timeBegin + time * 24 * 60 * 60 + voteTime* 24 * 60 * 60;
      let votingTimeBegin =
        communityOption == communityText[0].title
          ? timeBegin + time * 24 * 60 * 60 + 1
          : 0;
      let valid = true;
      let axiosResponse;
      try {
        try {
          const questionResponse =
            currency === "MATIC"
              ? await questionPostingWithMatic(timeEnd, votingTimeBegin)
              : await questionPostingWithERC20(timeEnd, votingTimeBegin);
        } catch (error) {
          console.log(error);
          valid = false;
        }

        if (valid) {
          try {
            axiosResponse = await axios.post(port + "question/save", {
              githubId: username,
              publicAddress: walletAddress,
              questionTitle: issueTitle,
              githubIssueUrl: issueURL,
              bountyCurrency: currency,
              timeEnd: timeEnd,
              solvingTimeBegin: timeBegin,
              votingTimeBegin: votingTimeBegin,
              bountyReward: reward,
              communityReward: communityReward,
              isCommunityApprovedSolution:
                communityOption == communityText[0].title ? true : false,
              questionCategories: category,
            });
            Promise.resolve(axiosResponse).then((val) => {
              if (val.status == 201) {
                window.alert("Successfully posted");
                setLoader(false);
                history.push({
                  pathname: `/bounty/${axiosResponse.data}`,
                  state: { id: axiosResponse.data },
                });
              }
            });
          } catch (error) {
            console.log(error);
            setAlert((prevState) => ({
              ...prevState,
              isValid: true,
              errorMessage: "Something went wrong while posting!",
            }));
            valid = false;
          }
        }
      } catch (error) {
        console.log(error);
        setAlert((prevState) => ({
          ...prevState,
          isValid: true,
          errorMessage: "Something went wrong while posting!",
        }));
      }
    }
  }



  return (
    <>
      {loader ? (
        <CircularIndeterminate />
      ) : (
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
              handleCurrency={setCurrency}
              currency={currency}
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
              handleCurrency={setCurrency}
              currency={currency}
              alert={alert}
            />
          ) : activePage === 9 ? (
            <BaseComponent
              {...text["page9"]}
              handleValidation={handleValidation}
              pageState={activePage}
              handleTerms={setTerms}
              terms={terms}
              alert={alert}
              communityOption={communityOption}
              walletAddress={walletAddress}
              handleSubmit={handleSubmit}
            />
          ) : activePage === 8 ? (
            <BaseComponent
              {...text["page8"]}
              handleValidation={handleValidation}
              pageState={activePage}
              handleTime={setVoteTime}
              time={voteTime}
              alert={alert}
            />
          ): null}
        </>
      )}
      {success.success ? alert(success.message) : null}
    </>
  );
}
