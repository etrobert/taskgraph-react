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
        pos: { x: 0, y: 90 },
      },
      {
        id: 1,
        name: 'hector is a definitly a great hero',
        pos: { x: 0, y: 0 },
      },
    ],
    dependencies: [{ predecessor: 0, successor: 1 }],
  });

  return (
    <div className="App">
      <Graph graph={graph} setGraph={setGraph} />
    </div>
  );
}

export default hot(module)(App);
