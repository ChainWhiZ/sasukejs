import React from "react";
import Grid from "@material-ui/core/Grid";
import footer from "../../assets/footer.png";
import telegram from "../../assets/telegram.png";
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
          <a
            href="https://t.me/joinchat/wNfMm0mKzlBiNGNl"
            target="_blank"
            rel="noreferrer"
          >
            <img src={telegram} alt="telegram" />
          </a>
        </Grid>
        <Grid item md={4} xs={12} className="social-media-icon">
          <a
            href="https://twitter.com/chainwhiz"
            target="_blank"
            rel="noreferrer"
          >
            <img src={discord} alt="discord" className="discord" />
          </a>
        </Grid>
        <Grid item md={4} xs={12} className="social-media-icon">
          <a
            href="https://twitter.com/chainwhiz"
            target="_blank"
            rel="noreferrer"
          >
            <img src={twitter} alt="twitter" className="twitter" />
          </a>
        </Grid>
      </Grid>
    </>
  );
}
