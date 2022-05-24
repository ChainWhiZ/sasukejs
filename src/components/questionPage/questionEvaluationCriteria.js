import React from "react";
import Grid from "@material-ui/core/Grid";
import "./questionPage.css";

export default function QuestionEvaluationCriteria(props) {
  return (
    <Grid container className="description-box">
      <Grid item md={12}>
        <p class="heading color-neon">EVALUATION CRITERIA</p>
      </Grid>
      <Grid item md={12} style={{paddingRight:"3%"}}>
        <pre><p className="description">{props.evaluationCriteria}</p></pre>
      </Grid>
    </Grid>
  );
}
