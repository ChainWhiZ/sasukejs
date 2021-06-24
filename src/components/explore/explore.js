import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import QuestionCard from "./questionCard";
import Search from "./search";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
}));

const data = [{
    questionTitle: "API documentation on setup and pypi for Release",
    questionCategories: ["front end", "backend", "smartcontract"],
    bountyReward: 25,
    communityReward:12,
    isCommunityApprovedSolution:true
},
{
    questionTitle: "API documentation on setup and pypi for Release",
    questionCategories: ["front end", "backend", "smartcontract"],
    bountyReward: 25
},
{
    questionTitle: "API documentation on setup and pypi for Release",
    questionCategories: ["front end", "backend", "smartcontract"],
    bountyReward: 25,
    communityReward:12,
    isCommunityApprovedSolution:true
},
{
    questionTitle: "API documentation on setup and pypi for Release",
    questionCategories: ["front end", "backend", "smartcontract"],
    bountyReward: 25
}]

export default function Explore(props) {
    const classes = useStyles();
    //   const [data, setData] = useState({});
    //   useEffect(() => {
    //     axios
    //       .post(`http://localhost:4000/question/fetch`, {
    //         _id: props.match.params.id,
    //       })
    //       .then((response) => {
    //         setData(response.data);
    //       })
    //       .catch((err) => console.log(err));
    //   }, [data._id]);

    return (
        <div className={classes.root}>
            <Grid container spacing={6}>

                <Grid item md={3} xs={12}>
                    <Search />
                </Grid>
                <Grid item md={9} xs={12}>

                    <p>Available Bounties</p>
                    <hr />
                    {data.map(question => (
                        <>
                            <QuestionCard {...question} />
                            <hr />
                        </>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
}
