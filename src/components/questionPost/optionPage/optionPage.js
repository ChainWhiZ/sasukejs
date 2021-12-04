import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SimpleAlerts from "../../alert/alert";
import { communityText, categoryText } from "../../../constants";
import twoHands from "../../../assets/two_hands.png";
import googleCode from "../../../assets/google_code.png";
import settings from "../../../assets/settings.png";
import worker from "../../../assets/worker.png";
import blackGoogleCode from "../../../assets/black-google-code.png";
import blackSettings from "../../../assets/black-settings.png";
import blackWorker from "../../../assets/black-worker.png";
import blackTwoHands from "../../../assets/black-two-hands.png";



export default function OptionComponent(props) {
  console.log(props);
  function handleClick(value) {
    if (props.pageState === 2) {
      if (props.category.includes(value)) {
        props.handleCategory(props.category.filter((ele) => ele !== value));
      } else {
        props.handleCategory((prevState) => [...prevState, value]);
      }
    } else {
      if (props.communityOption === value) {
        props.handleCommunityChoice("");
      } else {
        props.handleCommunityChoice(value);
      }
    }
  }
  function handleIcon(value) {
    if (value === "Front End")
      return  (props.category.includes(value)
      ? blackGoogleCode
      : googleCode);
    if (value === "Smart Contract")
      return (props.category.includes(value)
      ? blackWorker
      : worker);
    if (value === "Back End")
      return (props.category.includes(value)
      ? blackSettings
      : settings);
    if (value === "Others")
      return (props.category.includes(value)
      ? blackTwoHands
      : twoHands);
  }
  return (
    <>
     {props.alert.isValid ? (
        <SimpleAlerts severity={"warning"} message={props.alert.errorMessage} />
      ) : null}
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={3}
        className="option-page-margins"
      >
        {props.pageState === 2
          ? categoryText.map((item) => {
            return (
              <Grid
                item
                md={6}
                xs={6}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item.title);
                }}
              >
                <Card
                  className={
                    props.category.includes(item.title)
                      ? "selected-card"
                      : "non-selected-card"
                  }
                >
                  <CardContent>

                    <p
                      className={
                        props.category.includes(item.title)
                          ? "card-title black-text"
                          : "card-title"
                      }
                    >
                      <img
                        style={{marginRight:"3%" }}
                        src={
                          handleIcon(item.title)
                        }
                        alt="icon"
                        className={ props.category.includes(item.title)
                          ? "category-image"
                          : null}
                      />
                      {item.title}
                    </p>
                    <p
                      className={
                        props.category.includes(item.title)
                          ? "card-body black-text"
                          : "card-body"
                      }
                    >
                      {item.content}
                    </p>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
          : props.pageState === 6
            ? communityText.map((item) => {
              return (
                <Grid
                  item
                  md={6}
                  xs={6}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.title);
                  }}
                >
                  <Card
                    className={
                      props.communityOption === item.title
                        ? "selected-card"
                        : "non-selected-card"
                    }
                  >
                    <CardContent>
                      <p
                        className={
                          props.communityOption === item.title
                            ? "card-title black-text"
                            : "card-title"
                        }
                      >
                        {item.title}
                      </p>
                      <p
                        className={
                          props.communityOption === item.title
                            ? "card-body black-text"
                            : "card-body"
                        }
                      >
                        {item.content}
                      </p>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
            : null}
      </Grid>
     
    </>
  );
}
