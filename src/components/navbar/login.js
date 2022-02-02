import React, { useEffect, useState } from "react";
import axios from "axios";
import { port } from "../../config/config";
import { useRecoilState } from "recoil";
import { username as usernameAtom } from "../../recoil/atoms";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from 'react-router-dom'
import "./navbar.css";

export default function Login() {
  const [username, setUsername] = useRecoilState(usernameAtom);
  const [loader, setLoader] = useState(false);
  const [callbackUrl, setCallbackUrl] = useState('');
  const history = useHistory()
  useEffect(() => {
    history.listen((location) => {
      setCallbackUrl("https://app.chainwhiz.app" + location.pathname);
    });
    const url = window.location.href;
    const hasCode = url.includes("?code=");
    if (hasCode) {
      setLoader(true);
      const urlParts = url.split("?code=");
      axios
        .post(port + "authenticate/user", { code: urlParts[1], redirectUri: urlParts[0].toString() })
        .then((response) => {
          setLoader(false);
          setUsername(response.data.doc.githubId);
          window.history.pushState({}, {}, response.data.redirectUri);
        });
    }
  }, [history]);
  return (
    <>

      {loader ?
        <CircularProgress class="navbar-loader" />
        :
        <a
          href={
            "https://github.com/login/oauth/authorize?client_id=" +
            process.env.REACT_APP_CLIENT_ID + "&redirect_uri=" + callbackUrl
          }
        >
          <p className="item login ">Login</p>
        </a>
      }
    </>
  );
}
