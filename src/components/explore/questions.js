import React,{useState} from "react";
import Grid from "@material-ui/core/Grid";
import "./explore.css";
import search from "../../assets/Search.png";
import QuestionCard from "./questionCard";

export default function Questions(props) {
  console.log(props)
const[searchValue,setSearchValue] = useState("");
  return (
    <>
      <Grid container className="questions-section">
        <Grid item md={6}>
          <p className="bounty-heading">
            {props.data.length ? "Active Bounties" : "No Available Bounties"}
          </p>
        </Grid>
        <Grid item md={4} className="questions-search">
          <input type="search" className="input" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
        </Grid>
        <Grid item md={2} className="questions-search">
          <img src={search} alt="search" onClick={()=>props.filterQuestions(searchValue)} />
        </Grid>
        <hr className="question-hr" />
      </Grid>
      <Grid item md={12}>
        {props.data.length ? (
          props.data.map((question) => (
            <>
              <QuestionCard {...question} type={props.type} />
              <hr className="question-hr" />
            </>
          ))
        ) : (
          <p>Looks like our developers are having bounties for breakfast, lunch and dinner. Check back for new bounties</p>
        )}
      </Grid>
    </>
  );
}
