import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';
import Graph from './Graph/Graph';
import useGraph from '@/useGraph';
import { colors } from '@/data';

function App() {
  const { graph, moveTask, addTask } = useGraph({
    tasks: [
      {
        id: 0,
        name: 'coucou jeannot',
        pos: { x: 0, y: 90 },
        color: colors.pink,
      },
      {
        id: 1,
        name: 'hector is a definitly a great hero',
        pos: { x: 0, y: 0 },
        color: colors.cyan,
      },
    ],
    dependencies: [{ predecessor: 0, successor: 1 }],
  });

  return (
    <div className="App">
      <Graph graph={graph} moveTask={moveTask} />
      <button onClick={() => addTask('coucou')}>Add</button>
      <button onClick={() => localStorage.clear()}>Clear</button>
    </div>
  );
}

export default hot(module)(App);
