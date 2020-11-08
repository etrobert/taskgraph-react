import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import './App.css';
import Graph from './Graph';

function App() {
  const [graph, setGraph] = useState({
    tasks: [
      {
        id: 0,
        name: 'coucou jeannot',
        pos: { x: 0, y: 0 },
      },
      {
        id: 1,
        name: 'hector',
        pos: { x: 0, y: 0 },
      },
    ],
  });

  return (
    <div className="App">
      <Graph graph={graph} setGraph={setGraph} />
    </div>
  );
}

export default hot(module)(App);
