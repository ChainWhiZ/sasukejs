import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
export default function RightSideText (props){
    console.log(props)
    return (
        <>
            <Grid item md={4} xs={4} className="right-side">
                <Grid container direction="">
                    <div>
                        <Grid item md={12} xs={12} className="message">
                            <h1 className="message-title">{props && props.title?props.title:null}</h1>
                        </Grid>
                    </div>
                    <div>
                        <Grid item md={12} xs={12}>
                            <p className="message-text">{props && props.content?props.content:null}</p>
                        </Grid>
                    </div>
                    <Grid item md={12} xs={12} className="button-parent">
                        <Grid container direction="row" container
                            justifyContent="space-between"
                            alignItems="center">
                            <Grid item md={6} xs={6}>
                                <Button size="small" variant="contained" className="button" onClick={(e)=>{e.preventDefault(); if(props.pageState>0 && props.pageState<6){props.handlePageChange(props.pageState-1)}}}>Previous</Button>
                            </Grid>
                            <Grid item md={6} xs={6}>
                                <Button size="small" variant="contained" className="button" onClick={(e)=>{e.preventDefault(); if(props.pageState>0 && props.pageState<6){props.handlePageChange(props.pageState+1)}}}>Next</Button>
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>
            </Grid>
        </>
    )
}