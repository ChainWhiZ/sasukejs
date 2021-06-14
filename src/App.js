
import './App.css';
import axios from 'axios';
import { createHashHistory } from 'history'

function App() {
  
 function handleLogin(){
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
