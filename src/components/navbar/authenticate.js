import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';

export default function Authenticate(props) {
  const [username, setUsername] = useState(localStorage.getItem('username'));

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");
    if (hasCode) {
      const query = window.location.search.substring(1);
      const token = query.split("code=")[1];
      axios
        .post(`http://localhost:4000/authenticate/user`, { code: token })
        .then((response) => {
          localStorage.setItem('username', response.data.doc.githubId);
          props.handleLogin(response.data.doc.githubId);
          setUsername(response.data.doc.githubId);
       
          window.history.pushState({}, {}, "/");
        });
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        {!username ? (
          <a href="https://github.com/login/oauth/authorize?client_id=2bcca90edadf4d1f3535">
            <button>Login</button>
          </a>
        ) : (
            <>
              <p>{username}</p>


           
            </>
          )}
      </header>
    </div>
  );
}
