import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SimpleAlerts from "../../alert/alert";
import { communityText, categoryText } from "../../../constants";

export default function OptionComponent(props) {
  console.log(props);
  function handleClick(value) {
    console.log(props.communityOption);
    if (props.communityOption === value) {
      props.handleCommunityChoice("");
    } else {
      props.handleCommunityChoice(value);
    }
    console.log(value)
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
        spacing={0}
        className="option-page-margins"
      >
        {communityText.map((item) => {
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
        })}
      </Grid>
    </>
  );
}
