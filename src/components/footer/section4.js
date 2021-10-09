import React from "react";
import Grid from "@material-ui/core/Grid";
import footer from "../../assets/footer.png";
import telegram from "../../assets/telegram.png"
import discord from "../../assets/discord.png";
import twitter from "../../assets/twitter.png";
// import "./footer.css";
export default function Section4() {
  return (
    <>
      <Grid container className="footer">
        <Grid item md={12} xs={12}>
          <img src={footer} alt="footer" />
        </Grid>
        <Grid item md={4} xs={12} className="social-media-icon">
          <img src={telegram} alt="telegram" />
        </Grid>
        <Grid item md={4} xs={12} className="social-media-icon">
          <img src={discord} alt="discord" className="discord" />
        </Grid>
        <Grid item md={4} xs={12} className="social-media-icon">
          <img src={twitter} alt="twitter" className="twitter" />
        </Grid>
      </Grid>
    </>
  );
}
