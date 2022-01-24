import React, { useEffect, useState } from "react";
import axios from "axios";
import { port } from "../../config/config";
import { useRecoilState } from "recoil";
import { username as usernameAtom } from "../../recoil/atoms";
import { CircularProgress } from "@material-ui/core";
import "./navbar.css";

export default function Login() {
  const [username, setUsername] = useRecoilState(usernameAtom);
  setUsername("voter5")
  const [ loader,setLoader] = useState(false);
  setUsername("mishramonalisha76");
  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");
    if (hasCode) {
      setLoader(true);
      const query = window.location.search.substring(1);
      const token = query.split("code=")[1];

      axios
        .post(port + "authenticate/user", { code: token })
        .then((response) => {
          setLoader(false);
          setUsername(response.data.doc.githubId);
          window.history.pushState({}, {}, "/");
        });
    }
  });

  return (
    <>
    
      {loader ?
        <CircularProgress class="navbar-loader"/>
        :
        <a
          href={
            "https://github.com/login/oauth/authorize?client_id=" +
            process.env.REACT_APP_CLIENT_ID
          }
        >
          <p className="item login ">Login</p>
        </a>
      }
    </>
  );
}
