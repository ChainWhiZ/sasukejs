import React from "react"
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom"
import Landing from "./landing/landing";
import QuestionPost from "./questionPost/questionPost"

export default function RouterComponent() {


  return (

    <Router>

      <Route exact path="/" component={Landing} />
      <Route path="/post" component={QuestionPost} />
    </Router>
  )

}

