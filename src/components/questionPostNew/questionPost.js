import React, { useState, useEffect } from "react";
import BaseComponent from "./baseComponent/baseComponentPage";
import axios from "axios";
import {port} from "../../config/config"
const text = {
    page1: {
        title: `What should we call your Issue?`,
        content: `The Issue title is the first thing that a 
        developer sees when he comes across your bounty. It’s best practise to keep the title to the point and closely related to the issue. Avoid vague words like Important, Amazing, Stunning etc.`
    },
    page2: {
        title: `Choose the category/ies`,
        content: `The Issue title is the first thing that a 
        developer sees when he comes across your bounty. It’s best practise to keep the title to the point and closely related to the issue. Avoid vague words like Important, Amazing, Stunning etc.`
    },
    page3: {
        title: `Expected time of the solution`,
        content: `The Issue title is the first thing that a 
        developer sees when he comes across your bounty. It’s best practise to keep the title to the point and closely related to the issue. Avoid vague words like Important, Amazing, Stunning etc.`
    },
    page4: {
        title: `Provide the Github issue link`,
        content: `The Issue title is the first thing that a 
        developer sees when he comes across your bounty. It’s best practise to keep the title to the point and closely related to the issue. Avoid vague words like Important, Amazing, Stunning etc.`
    },
    page5: {
        title: `Provide the bounty amount`,
        content: `The Issue title is the first thing that a 
        developer sees when he comes across your bounty. It’s best practise to keep the title to the point and closely related to the issue. Avoid vague words like Important, Amazing, Stunning etc.`
    },
    page6: {
        title: `Who can approve the solution`,
        content: `The Issue title is the first thing that a 
        developer sees when he comes across your bounty. It’s best practise to keep the title to the point and closely related to the issue. Avoid vague words like Important, Amazing, Stunning etc.`
    },
    page7: {
        title: `Enter Community Reward`,
        content: `The Issue title is the first thing that a 
        developer sees when he comes across your bounty. It’s best practise to keep the title to the point and closely related to the issue. Avoid vague words like Important, Amazing, Stunning etc.`
    },
    page8: {
        title: `Confirm your Wallet Address`,
        content: `The Issue title is the first thing that a 
        developer sees when he comes across your bounty. It’s best practise to keep the title to the point and closely related to the issue. Avoid vague words like Important, Amazing, Stunning etc.`
    }
}
export default function QuestionPost() {
    const [issueTitle, setIssueTitle] = useState("");
    const [time, setTime] = useState("")
    const [cateogy, setCategory] = useState([])
    const [issueURL, setIssueURL] = useState("")
    const [reward, setReward] = useState("")
    const [communityOption, setCommunityOption] = useState()
    const [activePage, setActivePage] = useState(1)
    const [terms, setTerms] = useState({
        undertaking1: false,
        undertaking2: false,
    })
    const [communityReward, setCommunityReward] = useState("")

    const [isValidIssueTitle, setIsValidIssueTitle] = useState(false)
    const [isValidCateogy, setisValidCateogy] = useState(false)
    const [isValidIssueURL, setisValidIssueURL] = useState(false)
    const [isValidTime, setIsValidTime] = useState(false)
    const [isValidReward, setIsValidReward] = useState(false)
    const [isValidTerms, setIsValidTerms] = useState(false)


    function handleGithubIssueValidation() {
        return axios
          .post(port + "question/validate", {
            githubIssueUrl: issueURL,
          })
          .then((response) => {
            if (response.status === 200) {
              return true;
            }
          })
          .catch((err) => {
            return false;
          });
      };

    async function handlePageChange(page) {
     //   console.log(page)
        if(activePage === 1)
        {
            if (issueTitle === "") {
                setIsValidIssueTitle(true);
              }
              else
              {
                setActivePage(page)
              }
        }
        if(activePage === 4)
        {
            if (!(await handleGithubIssueValidation())) {
                setisValidIssueURL(true);
              }
              else
              {
                setActivePage(page)
              }
        }
        if(activePage === 5)
        {
            if (reward <= 0) {
                setIsValidReward(true);
              }
              else
              {
                setActivePage(page)
              }
        }
        if(activePage === 2)
        {
            if (cateogy === []) {
                setisValidCateogy(true);
              }
              else
              {
                setActivePage(page)
              }
        }
        if(activePage === 3)
        {
            if (time <= 0) {
                setIsValidTime(true);
              }
              else
              {
                setActivePage(page)
              }
        }
        
    }
    function handleValidIssueTitle(title) {

    }
    console.log(time)
    console.log(issueTitle)
    console.log(cateogy)
    console.log(issueURL)
    console.log(reward)
    console.log(communityOption)
    console.log(activePage)
    console.log(terms)
    return (
        <>
            {activePage == 1 ? (<BaseComponent {...text["page1"]} handlePageChange={handlePageChange} pageState={activePage} handleIssueTitle={setIssueTitle} />) :
                (activePage == 2 ? (<BaseComponent {...text["page2"]} handlePageChange={handlePageChange} pageState={activePage} handleCategory={setCategory} categoryState={cateogy} />) : (
                    activePage == 3 ? (<BaseComponent {...text["page3"]} handlePageChange={handlePageChange} pageState={activePage} handleTime={setTime} />) : (
                        activePage == 4 ? (<BaseComponent {...text["page4"]} handlePageChange={handlePageChange} pageState={activePage} handleIssueURL={setIssueURL} />) :
                            (activePage == 5 ? (<BaseComponent {...text["page5"]} handlePageChange={handlePageChange} pageState={activePage} handleReward={setReward} />) :
                                (activePage == 6 ? (<BaseComponent {...text["page6"]} handlePageChange={handlePageChange} pageState={activePage} handleCommunityChoice={setCommunityOption} />) :
                                    (activePage == 7 ? (<BaseComponent {...text["page7"]} handlePageChange={handlePageChange} pageState={activePage} handleComunityReward={setCommunityReward} />) : (
                                        activePage == 8 ? (<BaseComponent {...text["page8"]} handlePageChange={handlePageChange} pageState={activePage} handleTerms={setTerms} terms />
                                        ) : (null))
                                    )
                                )
                            )
                    )
                )
                )
            }

        </>
    )
}