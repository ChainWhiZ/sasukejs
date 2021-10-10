import React, { useState, useEffect } from "react";
import BaseComponent from "./baseComponent/baseComponentPage";
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
    }
}
export default function QuestionPost() {
    const [issueTitle, setIssueTitle] = useState("");
    const [time, setTime] = useState("")
    const [cateogy, setCategory] = useState([])
    const [issueURL, setIssueURL] = useState("")
    const [activePage, setActivePage] = useState(1)
    const [isValidIssueTitle, setIsValidIssueTitle]=useState(false)
    const [isValidCateogy, setisValidCateogy]=useState(false)
    const [isValidIssueURL, setisValidIssueURL]=useState(false)
    const [isValidTime,setIsValidTime]=useState(false)

    function handlePageChange(page){
        setActivePage(page)
    }
    function handleValidIssueTitle(title){
        
    }
    console.log(time)
    console.log(issueTitle)
    console.log(cateogy)
    console.log(issueURL)
    return (
        <>
            {activePage == 1 ? (<BaseComponent {...text["page1"]} handlePageChange={handlePageChange} pageState={activePage} handleIssueTitle={setIssueTitle}/>) :
                (activePage == 2 ? (<BaseComponent {...text["page2"]} handlePageChange={handlePageChange} pageState={activePage} handleCategory ={setCategory} categoryState={cateogy}/>) : (
                    activePage == 3 ? (<BaseComponent {...text["page3"]} handlePageChange={handlePageChange} pageState={activePage} handleTime = {setTime}/>) : (
                        activePage == 4 ? (<BaseComponent {...text["page4"]} handlePageChange={handlePageChange} pageState={activePage} handleIssueURL = {setIssueURL}/>) :
                            (null)
                    )
                ))
            }

        </>
    )
}