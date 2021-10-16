import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from "@material-ui/core";
import SimpleAlerts from "../../alert/alert";
import {communityText,categoryText} from "../../../constants";
import "../questionPostCss.css"

export default function OptionComponent(props) {
    console.log(props)
    // function handleBgColour(value) {
    //     console.log(props.category)
    //     if(props.pageState==2)
    //     {
    //         // if((props.category).find(value))
    //         // {
    //             document.getElementByClass("selectedCard").style.backgroundColor = "D4FF1F";
    //        // }
    //     }
    //     if(props.pageState==6)
    //     {
    //         if(props.communityOption==value)
    //         {
    //             document.getElementByClass("selectedCard").style.backgroundColor = "D4FF1F";
    //         }
    //     }
    // }
    return (
        <>
            <Grid container  direction="row" alignItems="center" justifyContent="center" spacing={3} style={{ marginTop: "33%", marginLeft: "5%" }}>
                {props.pageState == 2 ? (

                    categoryText.map((item) => {
                        return (
                            <Grid item md={6} xs={6} onClick={(e) => { e.preventDefault(); props.category.includes(item.title)?props.handleCategory(props.category.filter(ele=>ele!= item.title)) :props.handleCategory((prevState) => [...prevState, item.title]); }} style={{background: props.category.includes(item.title)? "#D4FF1F":null,}}>
                                <Card class="selectedCard" sx={{ minWidth: "10vw" }}  >
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
                            <Grid item md={6} xs={6} onClick={(e) => { e.preventDefault(); props.handleCommunityChoice(item.title) }} style={{background: props.communityOption && props.communityOption.includes(item.title)? "#D4FF1F":"black"}}>
                                <Card class="selectedCard" sx={{ minWidth: "10vw" }}  >
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
            {props.alert.isValid ? (
                <SimpleAlerts severity={"warning"} message={props.alert.errorMessage} />
            ) : null}
        </>
    )
}