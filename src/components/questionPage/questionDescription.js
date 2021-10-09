import React from "react";
import Grid from "@material-ui/core/Grid";
import ReactMarkdown from "react-markdown";
import "./questionPage.css";

export default function QuestionDescription(props) {
  return (
    <Grid container className="description-box">
      <Grid item md={12}>
        <p class="heading color-neon">DESCRIPTION</p>
      </Grid>
      <Grid item md={12} style={{paddingRight:"3%"}}>
        <ReactMarkdown className="description">{props.questionDescription}</ReactMarkdown>
      </Grid>
     

    </Grid>
  );
}
