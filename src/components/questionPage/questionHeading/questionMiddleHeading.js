import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import GithubIcon from "../../../assets/githubIcon.png";
import VideoIcon from "../../../assets/video.png";
import LinkIcon from "../../../assets/link-icon.png";
import "../questionPage.css";

export default function QuestionMiddleHeading(props) {
  const [showMore, setShowMore] = useState({
    itemsToShow: 4,
    expanded: false,
  })
  const issueUrl = "jhhihljk";
  const handleShow = (flag = false) => {
    if (!flag) {
      setShowMore({
        itemsToShow: props.questionCategories.length,
        expanded: true,
      })
    }
    else {
      setShowMore({
        itemsToShow: 4,
        expanded: false,
      })
    }
  }

  const handleLinkDisable = () =>{
   if(props.issueUrl.includes('https://github.com/'))
   
   return true;
   else
   return false;
  }
  const handleLinkDisableClass = (flag) =>{   
    if(flag) 
    return "link heading-text bounty-middle-github bounty-middle-github-disabled";
    return "link heading-text bounty-middle-github";
   }

  const handleShowLabel = () => {
    if (showMore.expanded) {
      return 'Show Less';
    }
    return 'Show More';
  }
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
            <p class="heading color-neon">Languages/Tools</p>
          </Grid>
          {props.questionCategories &&
            props.questionCategories.length &&
            (props.questionCategories.slice(0, showMore.itemsToShow)).map((category) => (
              <Grid item md={2}>
                <p class="heading-text heading-text-category" style={{ marginTop: "1%" }}>
                  {category}
                </p>
              </Grid>
            ))}
          {props.questionCategories.length > 4 ?
            < Grid item md={2}>
              <p onClick={() => handleShow(showMore.expanded)} class="heading color-neon heading-show" style={{ marginTop: "1%" }}>{handleShowLabel()}</p>
            </Grid>
            : null}
        </Grid>
        <Grid item md={12}>
          <p class="heading color-neon">Resources/Links</p>
        </Grid>
        <Grid item md={4}>
          <img class={!handleLinkDisable()?"bounty-middle-github-disabled":""} src={GithubIcon} alt="git" />
          <a
            class={handleLinkDisableClass(!handleLinkDisable())}
            href={props.issueUrl}
            target="_blank"
            rel="noreferrer"
          >
            Issue Link
          </a>
        </Grid>
        <Grid item md={4}>
          <img class={handleLinkDisable()?"bounty-middle-github-disabled":""} src={LinkIcon} alt="git" />
          <a
            class={handleLinkDisableClass(handleLinkDisable())}
            href={props.issueUrl}
            target="_blank"
            rel="noreferrer"
          >
           Other Link
          </a>
        </Grid>
        <Grid item md={4}>
          <img class="bounty-middle-github-disabled" src={VideoIcon} alt="git" />
          <a
            class="link heading-text bounty-middle-github bounty-middle-github-disabled"
            target="_blank"
            rel="noreferrer"
          >
            Video
          </a>
        </Grid>
      
      </Grid>
    </>
  );
}
