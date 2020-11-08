import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';
import Graph from './Graph';

function App() {
  return (
    <div className="App">
      <Graph />
    </div>
  );
}

export default hot(module)(App);
