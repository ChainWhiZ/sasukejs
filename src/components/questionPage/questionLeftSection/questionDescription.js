import React from "react";
import Grid from "@material-ui/core/Grid";
import ReactMarkdown from "react-markdown";
import "../questionPage.css";

export default function QuestionDescription(props) {
  return (
    <Grid container spacing={1}>
      <Grid item md={12}>
        <p class="heading">DESCRIPTION</p>
      </Grid>
      <Grid item md={12} style={{ paddingRight: "3%" }}>
        <ReactMarkdown>{props.questionDescription}</ReactMarkdown>
      </Grid>
      <Grid item md={12}>
        <p class="heading">CATEGORIES</p>
      </Grid>

      {props.questionCategories &&
        props.questionCategories.length &&
        props.questionCategories.map((category) => (
          <Grid md>
            <p class="category">{category}</p>
          </Grid>
        ))}
    </Grid>
  );
}
