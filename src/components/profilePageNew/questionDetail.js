import React from "react";
import Grid from "@material-ui/core/Grid";
import GithubIcon from "../../assets/githubIcon.png";
import VideoIcon from "../../assets/video.png";
import LinkIcon from "../../assets/link-icon.png";
import "./profilePageCss.css";

export default function QuestionDetail(props) {
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
 
  return (
    <>
      <Grid container className="profile-question-detail-grid">
        <Grid item md={12}>
          <p className="profile-text-style">Title</p>
          <p className="profile-content-style">{props.title}</p>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item md={12}>
            <p className="profile-text-style">Languages/Tools</p>
          </Grid>
          {props.languagesAndTools&&
            props.languagesAndTools.length &&
            props.languagesAndTools.slice(0,4).map((category) => (
              <Grid item md={3} >
                <p
                  className="profile-content-style"
                  style={{ marginTop: "1%" }}
                >
                  {category}
                </p>
              </Grid>
            ))}
        </Grid>
        <Grid item md={12}>
          <p className="profile-text-style">Resources/Links</p>
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
            href={props.issueUrl.includes("https://")?props.issueUrl:`https://${props.issueUrl}`}
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
