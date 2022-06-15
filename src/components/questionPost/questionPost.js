import React, { useState } from "react";
import BaseComponent from "./baseComponent/baseComponentPage";
import axios from "axios";
import fleekStorage from "@fleekhq/fleek-storage-js";
import { useHistory } from "react-router-dom";
import { port } from "../../config/config";
import { text } from "../../constants";
import { useRecoilValue } from "recoil";
import { communityText, bountyTypeChoice } from "../../constants";
import validator from "validator";
import {
  walletAddress as walletAddressAtom,
  contract as contractAtom,
  tokenContract as tokenContractAtom,
} from "../../recoil/atoms";
import CircularIndeterminate from "../loader/loader";
import { generateAndVerifyBountySignature } from "../../web3js/web3";
export default function QuestionPost() {
  let history = useHistory();
  const [issueTitle, setIssueTitle] = useState("");
  const [time, setTime] = useState(0);
  const [voteTime, setVoteTime] = useState(0);
  const [languagesAndTools, setLanguagesAndTools] = useState([]);
  const [issueDescription, setIssueDescription] = useState("");
  const [evaluationCriteria, setEvaluationCriteria] = useState("");
  const [reward, setReward] = useState("");
  const [communityOption, setCommunityOption] = useState("Turn off voting");
  const [paidBounty, setPaidBounty] = useState("Paid Bounties");
  const [activePage, setActivePage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [currency, setCurrency] = useState("MATIC");
  const [issueUrl, setIssueUrl] = useState("");
  const [terms, setTerms] = useState({
    undertaking1: false,
  });
  const [communityReward, setCommunityReward] = useState("");
  const walletAddress = useRecoilValue(walletAddressAtom);
  const [alert, setAlert] = useState({
    isValid: false,
    errorMessage: "",
  });
  const [descriptionBuffer, setDescriptionBufferBuffer] = useState("");
  console.log(issueTitle);
  console.log(time);
  console.log(voteTime);
  console.log(reward);
  console.log(communityOption);

  const [success, setSuccess] = useState({
    success: false,
    message: "",
  });

  const contractPromise = useRecoilValue(contractAtom);
  console.log(contractPromise);
  let contract;
  var promise = Promise.resolve(contractPromise);
  promise.then(function (v) {
    contract = v;
  });

  const tokenContractPromise = useRecoilValue(tokenContractAtom);
  console.log(tokenContractPromise);
  let tokenContract;
  var tokenPromise = Promise.resolve(tokenContractPromise);
  tokenPromise.then(function (v) {
    console.log(v);
    tokenContract = v;
  });

  async function uploadToFleek(data) {
    const uploadedFile = await fleekStorage.upload({
      apiKey: process.env.REACT_APP_API_KEY,
      apiSecret: process.env.REACT_APP_API_SECRET,
      key: data,
      data: data,
    });
    console.log(uploadedFile);
    return uploadedFile.hash;
  }

  function getIssueUrl() {
    return issueUrl;
  }
  function handleGithubIssueValidation() {
    setLoader(true);
    return axios
      .post(port + "question/validate", {
        issueUrl: getIssueUrl(),
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
      if (activePage === 5) {
        handlePageChange(page);
      }
      if (activePage === 4) {
        if (issueUrl === "") {
          setAlert((prevState) => ({
            ...prevState,
            isValid: true,
            errorMessage: "What’s all this rush? Enter valid URL.",
          }));
        } else if (getIssueUrl().includes("https://github.com/")) {
          if (!(await handleGithubIssueValidation())) {
            setAlert((prevState) => ({
              ...prevState,
              isValid: true,
              errorMessage:
                "What’s all this rush? Enter valid github issue URL.",
            }));
          } else {
            handlePageChange(page);
          }
        } else if (!validator.isURL(getIssueUrl())) {
          setAlert((prevState) => ({
            ...prevState,
            isValid: true,
            errorMessage: "What’s all this rush? Enter valid URL.",
          }));
        } else {
          handlePageChange(page);
        }
      }
      if (activePage === 8) {
        if (reward < 10 || reward >= 40000) {
          setAlert((prevState) => ({
            ...prevState,
            isValid: true,
            errorMessage:
              "Please enter valid bounty reward between 10 to 40000",
          }));
        } else {
          console.log(currency);
          handlePageChange(page);
        }
      }
      if (activePage === 2) {
        if (!languagesAndTools.length) {
          setAlert((prevState) => ({
            ...prevState,
            isValid: true,
            errorMessage:
              "How dare you? Enter the right languages/tools for me.",
          }));
        } else if (languagesAndTools.length > 13) {
          setAlert((prevState) => ({
            ...prevState,
            isValid: true,
            errorMessage: "Limit exceeded!!",
          }));
        } else {
          handlePageChange(page);
        }
      }
      if (activePage === 3) {
        if (!evaluationCriteria) {
          setAlert((prevState) => ({
            ...prevState,
            isValid: true,
            errorMessage: "Please enter evaluation criteria",
          }));
        } else {
          handlePageChange(page);
        }
      }
      if (activePage === 6) {
        if (!paidBounty) {
          setAlert((prevState) => ({
            ...prevState,
            isValid: true,
            errorMessage: "Please enter bounty options",
          }));
        } else {
          handlePageChange(page);
        }
      }
      if (activePage === 7) {
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

      if (activePage === 11) {
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

      if (activePage === 10) {
        if (
          communityReward < 5 ||
          (communityReward >= 40000 &&
            communityOption == communityText[0].title)
        ) {
          console.log(typeof communityReward);
          setAlert((prevState) => ({
            ...prevState,
            isValid: true,
            errorMessage:
              "Please enter valid community reward between 5 to 40000",
          }));
        } else {
          handlePageChange(page);
        }
      }
      if (activePage === 9) {
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

  async function questionPostingWithMatic(
    timeEnd,
    votingTimeBegin,
    descriptionHash,
    evaluationHash
  ) {
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
        //include title, categories
        const trxObj = contract.methods
          .postBounty(
            issueTitle,
            languagesAndTools,
            getIssueUrl(),
            descriptionHash,
            evaluationHash,
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
  async function questionPostingWithERC20(
    timeEnd,
    votingTimeBegin,
    descriptionHash,
    evaluationHash
  ) {
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
            totalAmount.toString()
          )
          .send({ from: walletAddress.toString() });
        window.alert("Approving your token, wait for the next transaction");
        approvalTrx.on("receipt", async function (receipt) {
          const trxObj = contract.methods
            .postBounty(
              issueTitle,
              languagesAndTools,
              getIssueUrl(),
              descriptionHash,
              evaluationHash,
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
    if (terms.undertaking1 === false) {
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
    } else {
      setAlert((prevState) => ({
        ...prevState,
        isValid: false,
        errorMessage: "",
      }));
      setLoader(true);
      if (paidBounty == bountyTypeChoice[0].title) {
        const descriptionHash = await uploadToFleek(issueDescription);
        const evaluationHash = await uploadToFleek(evaluationCriteria);
        console.log(evaluationHash);
        const timeBegin = Math.floor(new Date().getTime() / 1000);
        let timeEnd =
          timeBegin + time * 24 * 60 * 60 + voteTime * 24 * 60 * 60 + 1;
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
                ? await questionPostingWithMatic(
                    timeEnd,
                    votingTimeBegin,
                    descriptionHash,
                    evaluationHash
                  )
                : await questionPostingWithERC20(
                    timeEnd,
                    votingTimeBegin,
                    descriptionHash,
                    evaluationHash
                  );
          } catch (error) {
            console.log(error);
            valid = false;
          }

          if (valid) {
            try {
              axiosResponse = await axios.post(port + "question/save", {
                address: walletAddress,
                title: issueTitle,
                issueUrl: getIssueUrl(),
                currency: currency,
                timeEnd: timeEnd,
                description: issueDescription,
                evaluationCriteria: evaluationCriteria,
                languagesAndTools: languagesAndTools,
                solvingTimeBegin: timeBegin,
                votingTimeBegin: votingTimeBegin,
                bountyReward: parseFloat(reward),
                communityReward: parseFloat(communityReward) || 0,
                isCommunityApprovedSolution:
                  communityOption == communityText[0].title ? true : false,
              });
              Promise.resolve(axiosResponse).then((val) => {
                if (val.status == 201) {
                  window.alert("Successfully posted");
                  setLoader(false);
                  console.log(axiosResponse.data);
                  history.push({
                    pathname: `/bounty/${axiosResponse.data}`,
                    state: { id: axiosResponse.data },
                  });
                } else {
                  setAlert((prevState) => ({
                    ...prevState,
                    isValid: true,
                    errorMessage: "Something went wrong while posting!",
                  }));
                  valid = false;
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
      } else {
        try {
          await generateAndVerifyBountySignature(
            issueTitle,
            issueUrl,
            evaluationCriteria,
            issueDescription,
            walletAddress.toString()
          ).then(async (res) => {
            console.log(res)
            if (res.status == true) {
              let axiosResponse;
              try {
                axiosResponse = await axios.post(port + "question/save", {
                  address: walletAddress,
                  title: issueTitle,
                  issueUrl: getIssueUrl(),
                  currency: "",
                  signature: res.signature,
                  timeEnd: 0,
                  bountyType:"unpaid",
                  description: issueDescription,
                  evaluationCriteria: evaluationCriteria,
                  languagesAndTools: languagesAndTools,
                  solvingTimeBegin: 0,
                  votingTimeBegin: 0,
                  bountyReward: 0,
                  communityReward: 0,
                  isCommunityApprovedSolution: false,
                });
                Promise.resolve(axiosResponse).then((val) => {
                  if (val.status == 201) {
                    window.alert("Successfully posted");
                    setLoader(false);
                    console.log(axiosResponse.data);
                    history.push({
                      pathname: `/bounty/${axiosResponse.data}`,
                      state: { id: axiosResponse.data },
                    });
                  } else {
                    setAlert((prevState) => ({
                      ...prevState,
                      isValid: true,
                      errorMessage: "Something went wrong while posting!",
                    }));
                  }
                });
              } catch (error) {
                console.log(error);
                setAlert((prevState) => ({
                  ...prevState,
                  isValid: true,
                  errorMessage: "Something went wrong while posting!",
                }));
              }
            }
          });
        } catch (error) {
          setAlert((prevState) => ({
            ...prevState,
            isValid: true,
            errorMessage: "Invalid Signature!",
          }));
        }
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
              handleChipData={setLanguagesAndTools}
              chipData={languagesAndTools}
              alert={alert}
            />
          ) : activePage === 3 ? (
            <BaseComponent
              {...text["page3"]}
              handleValidation={handleValidation}
              pageState={activePage}
              handleEvaluationCriteria={setEvaluationCriteria}
              evaluationCriteria={evaluationCriteria}
              alert={alert}
            />
          ) : activePage === 4 ? (
            <BaseComponent
              {...text["page4"]}
              handleValidation={handleValidation}
              pageState={activePage}
              handleIssueUrl={setIssueUrl}
              issueUrl={issueUrl}
              alert={alert}
            />
          ) : activePage === 5 ? (
            <BaseComponent
              {...text["page5"]}
              handleValidation={handleValidation}
              pageState={activePage}
              handleIssueDescription={setIssueDescription}
              issueDescription={issueDescription}
              alert={alert}
            />
          ) : activePage === 6 ? (
            <BaseComponent
              {...text["page6"]}
              handleValidation={handleValidation}
              pageState={activePage}
              handleBountyOption={setPaidBounty}
              paidBounty={paidBounty}
              alert={alert}
            />
          ) : activePage === 7 ? (
            <BaseComponent
              {...text["page7"]}
              handleValidation={handleValidation}
              pageState={activePage}
              handleTime={setTime}
              time={time}
              alert={alert}
            />
          ) : activePage === 8 ? (
            <BaseComponent
              {...text["page8"]}
              handleValidation={handleValidation}
              pageState={activePage}
              handleReward={setReward}
              reward={reward}
              handleCurrency={setCurrency}
              currency={currency}
              alert={alert}
            />
          ) : activePage === 9 ? (
            <BaseComponent
              {...text["page9"]}
              handleValidation={handleValidation}
              pageState={activePage}
              handleCommunityChoice={setCommunityOption}
              communityOption={communityOption}
              alert={alert}
            />
          ) : activePage === 10 ? (
            <BaseComponent
              {...text["page10"]}
              handleValidation={handleValidation}
              pageState={activePage}
              handleCommunityReward={setCommunityReward}
              communityOption={communityOption}
              communityReward={communityReward}
              handleCurrency={setCurrency}
              currency={currency}
              alert={alert}
            />
          ) : activePage === 11 ? (
            <BaseComponent
              {...text["page11"]}
              handleValidation={handleValidation}
              pageState={activePage}
              handleTime={setVoteTime}
              time={voteTime}
              alert={alert}
            />
          ) : activePage === 12 ? (
            <BaseComponent
              {...text["page12"]}
              handleValidation={handleValidation}
              pageState={activePage}
              handleTerms={setTerms}
              terms={terms}
              alert={alert}
              communityOption={communityOption}
              walletAddress={walletAddress}
              handleSubmit={handleSubmit}
            />
          ) : null}
          <hr className="horizontal-line" style={{ marginTop: "8%" }} />
        </>
      )}
      {success.success ? alert(success.message) : null}
    </>
  );
}
