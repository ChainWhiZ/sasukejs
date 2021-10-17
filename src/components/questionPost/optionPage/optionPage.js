import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";
import SimpleAlerts from "../../alert/alert";
import { communityText, categoryText } from "../../../constants";

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
  return (
    <>
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
                    class="selectedCard"
                    style={{
                      backgroundColor:
                        props.communityOption &&
                        props.communityOption.includes(item.title)
                          ? "#D4FF1F"
                          : "#131313",
                    }}
                    sx={{ minWidth: "10vw" }}
                  >
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        className="card-title"
                        gutterBottom
                      >
                        {item.title}
                      </Typography>
                      <br></br>
                      <Typography variant="body2" className="card-body">
                        {item.content}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          : null}
      </Grid>
      {props.alert.isValid ? (
        <SimpleAlerts severity={"warning"} message={props.alert.errorMessage} />
      ) : null}
    </>
  );
}
