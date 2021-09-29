import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import SearchBar from "material-ui-search-bar";
// import { useStyles } from './exploreCss'
import style from "./explore.css"

export default function Search() {
  // const classes = useStyles();

  return (
    <Card >
        <SearchBar
        />
    </Card>
  );
}
