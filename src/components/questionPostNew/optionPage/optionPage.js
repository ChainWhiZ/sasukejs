import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from "@material-ui/core";
const categoryText = [
    {
        title: "Front End",
        conetnt: "There are many variations of passs of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look asa o la sl asosl saseo w wls also l asl a lwew pals asl as"
    },
    {
        title: "Back End",
        conetnt: "There are many variations of passs of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look asa o la sl asosl saseo w wls also l asl a lwew pals asl as"
    },
    {
        title: "Smart Contract",
        conetnt: "There are many variations of passs of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look asa o la sl asosl saseo w wls also l asl a lwew pals asl as"
    },
    {
        title: "Others",
        conetnt: "There are many variations of passs of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look asa o la sl asosl saseo w wls also l asl a lwew pals asl as"
    }
]

const communityText = [
    {
        title: "Community Approved",
        conetnt: "There are many variations of passs of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look asa o la sl asosl saseo w wls also l asl a lwew pals asl as"
    },
    {
        title: "Self Approved",
        conetnt: "There are many variations of passs of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look asa o la sl asosl saseo w wls also l asl a lwew pals asl as"
    },
]
export default function OptionComponent(props) {
    console.log(props)
    return (
        <>
            <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center" style={{ marginTop: "16%", marginLeft: "5%" }}>
                {props.pageState == 2 ? (

                    categoryText.map((item) => {
                        return (
                            <Grid item md={6} xs={6} onClick={(e) => { e.preventDefault(); props.handleCategory(prevState => [...prevState, item.title]) }}>
                                <Card sx={{ minWidth: "10vw" }} style={{ backgroundColor: "#131313", width: "25vw", height: "30vh" }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} className="card-title" gutterBottom>
                                            {item.title}
                                        </Typography>
                                        <br></br>
                                        <Typography variant="body2" className="card-body">
                                            {item.conetnt}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                        )
                    })

                ) : (props.pageState == 6 ? (
                    communityText.map((item) => {
                        return (
                            <Grid item md={6} xs={6} onClick={(e) => { e.preventDefault(); props.handleCommunityChoice(item.title) }}>
                                <Card sx={{ minWidth: "10vw" }} style={{ backgroundColor: "#131313", width: "25vw", height: "30vh" }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} className="card-title" gutterBottom>
                                            {item.title}
                                        </Typography>
                                        <br></br>
                                        <Typography variant="body2" className="card-body">
                                            {item.conetnt}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                        )
                    })

                ) : (null))}

            </Grid>
        </>
    )
}