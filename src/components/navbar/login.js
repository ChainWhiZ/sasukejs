import React, { useEffect } from "react";
import axios from "axios";
import { port } from "../../config/config";
import { useRecoilState } from "recoil";
import { username as usernameAtom } from "../../recoil/atoms";

export default function Login() {
  const [username, setUsername] = useRecoilState(usernameAtom);
  setUsername("mishramonalisha76");
  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");
    if (hasCode) {
      const query = window.location.search.substring(1);
      const token = query.split("code=")[1];

      axios
        .post(port + "authenticate/user", { code: token })
        .then((response) => {
          setUsername(response.data.doc.githubId);
          window.history.pushState({}, {}, "/");
        });
    }
  });

  return (
    <>
      <a
        href={
          "https://github.com/login/oauth/authorize?client_id=" +
          process.env.REACT_APP_CLIENT_ID
        }
      >
        <p className="item login ">Login</p>
      </a>
    </>
  );
}
