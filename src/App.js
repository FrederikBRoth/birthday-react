import React, { useState } from 'react';

import Settings from "./components/Settings"

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

function App() {

  function handleClick() {
    const audio = document.getElementById("audio")
    console.log(audio)
    audio.load()
    audio.play()
  }

  return (
    <div className="main" id="main">
      <Router>
        <Switch>
          <Route path="/:test?">
            <Settings />
          </Route>
        </Switch>
      </Router>
      <div className="">

      </div>
    </div>

  );
}

export default App;
