import React from "react";
import Navbar from "../navbar/navbar";
import Grid from "@material-ui/core/Grid";
import "./landing.css";

export default function Landing() {
    return (
        <>
            <Navbar />
            <Grid container direction="row"
                justify="center"
                alignItems="center"
                className="container"
            >

                <Grid item md={12} xs={12}>
                    <p className="landing-heading">Welcome to Chainwhiz</p>
                </Grid>
                <Grid item md={10} xs={12} class="description-grid">
                    <p className="landing-description">Zero platform fees. Near to negligible network fees. Open-source and decentralised.
                        This is the first public release of Chainwhiz. The primary objective behind the release
                        is collecting constructive criticism and improve the future versions of the product.</p>

                    <p class="landing-description margin-top-3"> Chainwhiz is built on the Polygon Nerwork and is presently deployed on the Testnet. </p>
                </Grid>

                <Grid container direction="row"
                    justify="space-evenly"
                    alignItems="center"
                    className="margin-top-3"
                    
                >
                    <Grid item md={4} xs={12} class="category-box">
                        <p className="category-title">Post a Bounty</p>
                        <p className="category-description">Fill in the basic details like bounty title,
                            time of delivery, bounty amount ,and
                            Github issue URL and your bounty is live.
                        </p>
                    </Grid>
                    <Grid item md={4} xs={12} class="category-box">
                        <p className="category-title">Solve a Bounty</p>
                        <p  className="category-description">Start contributing on open-source projects
                            by builidng out bounties listed on the platform.
                            In exchange earn high bounty rewards.</p>
                    </Grid>
                    <Grid item md={4} xs={12} class="category-box">
                        <p className="category-title">Vote on Solutions</p>
                        <p className="category-description ">Stake and vote on solutions submitted by
                            developers on bounties on the platform and
                            earn incentives on the staked amount.</p>
                    </Grid>


                </Grid>
            </Grid>
        </>
    );
}
