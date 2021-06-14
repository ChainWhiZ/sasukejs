
import './App.css';
import axios from 'axios';
import { createHashHistory } from 'history';
import React, { useState, useEffect } from 'react';

function App() {
  const [code, setCode] = useState('');
  useEffect(() => {
    const url= window.location.href;
    const hasCode = url.includes("?code=");
    const clientID = "2bcca90edadf4d1f3535";
    const clientSecret = "1e48b32e22a2a195fafc3702a07c6ca2957f3c0f";
    if (hasCode) {
      const query = window.location.search.substring(1)
      const token = query.split('code=')[1]
      axios({
        method: "post",
        url: `https://localhost:4000`,
        body: {code:hasCode}
      }).then((response) => {
        console.log(response);
      });
    }
  });
  function handleLogin() {
    const history = createHashHistory();
    window.open(`https://github.com/login/oauth/authorize?client_id=2bcca90edadf4d1f3535`, '_blank');
  }
  return (
    <div className="App">
      <header className="App-header">

        <button onClick={handleLogin}>Login</button>

      </header>
    </div>
  );
}

export default App;
