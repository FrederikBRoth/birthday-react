import React from 'react';

import Settings from "./components/Settings"

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

function App() {
  function handleClick(){
    const audio = document.getElementById("audio")
    audio.play()
  }

  return (
    <div className="main" id="main" onClick={handleClick}>
      <Router>
        <audio id="audio">
          <source src="http://192.168.1.71:5000/9mF3P_9ORB_pfu_r192L1Qf18pwh0_qA.mp3" type="audio/mpeg" />
        </audio>
        {/* <img class="dance-gif" src={require("./rats.gif")} alt="Family dancing to son's happy birthday song"/> */}

        <Switch>
          <Route path="/:test?">
            <Settings />
          </Route>
        </Switch>
      </Router>
    </div>

  );
}

export default App;
