import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import SearchBar from "material-ui-search-bar";
import { useStyles } from './exploreCss'


export default function Search() {
  const classes = useStyles();

  return (
    <Card className={classes.searchCard}>
      <CardContent>
        <SearchBar
        // value={this.state.value}
        // onChange={(newValue) => this.setState({ value: newValue })}
        // onRequestSearch={() => doSomethingWith(this.state.value)}
        />
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
