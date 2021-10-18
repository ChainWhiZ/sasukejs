import React from "react";
import Grid from "@material-ui/core/Grid";
import GithubIcon from "../../../assets/githubIcon.png";
import "../questionPage.css";

export default function QuestionMiddleHeading(props) {
  return (
    <>
      <Grid container className="heading-box2">
        <Grid item md={12}>
          <p class="heading color-neon">Title</p>
          <p class="heading-text">{props.questionTitle}</p>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item md={12}>
            <p class="heading color-neon">Categories</p>
          </Grid>
          {props.questionCategories &&
            props.questionCategories.length &&
            props.questionCategories.map((category) => (
              <Grid item md={4}>
                <p class="heading-text " style={{ marginTop: "1%" }}>
                  {category}
                </p>
              </Grid>
            ))}
        </Grid>
        <Grid item md={12}>
          <p class="heading color-neon">Resources/Links</p>

          <img class="icon" src={GithubIcon} alt="git" />
          <a
            class="link heading-text"
            href={props.githubIssueUrl}
            target="_blank"
            rel="noreferrer"
          >
            Github Repo
          </a>
        </Grid>
      </Grid>
    </>
  );
}
