import React from "react"
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom"
import Landing from "./landing/landing"

export default function RouterComponent (){

 
        return (
  
          <Router>
           
          <Route exact path="/" component={Landing} /> 
      
          </Router>
        )
      
      }
  
    