import React, { useEffect } from "react";
import axios from "axios";
import { port } from "../../config/config";

export default function Login() {
  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");
    if (hasCode) {
      const query = window.location.search.substring(1);
      const token = query.split("code=")[1];

      axios
        .post(port + "authenticate/user", { code: token })
        .then((response) => {
          localStorage.setItem("username", response.data.doc.githubId);
          window.history.pushState({}, {}, "/");
          window.location.reload();
        });
    }
  });

  return (
    <>
      <a href="https://github.com/login/oauth/authorize?client_id=2bcca90edadf4d1f3535">
        <p className="item login ">Login</p>
      </a>
    </>
  );
}
