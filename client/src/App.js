import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from "./Component/Homepage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <Homepage/>

        </header>
      </div>
    );
  }
}

export default App;
