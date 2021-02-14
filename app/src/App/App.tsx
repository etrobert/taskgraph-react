import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';
import Graph from './Graph/Graph';
import useGraph from '@/useGraph';

function App() {
  const { graph, moveTask, addTask } = useGraph();

  return (
    <div className="App">
      <Graph graph={graph} moveTask={moveTask} />
      <button onClick={() => addTask('coucou')}>Add</button>
    </div>
  );
}

export default hot(module)(App);
