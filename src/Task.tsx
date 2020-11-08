import React from 'react';
import { hot } from 'react-hot-loader';
import './Task.css';

function Task(props: {
  task: { id: number; name: string; pos: { x: number; y: number } };
}) {
  return (
    <div
      className="Task"
      style={{
        transform: `translate(${props.task.pos.x}px, ${props.task.pos.y}px)`,
      }}
    >
      {props.task.name}
    </div>
  );
}

export default hot(module)(Task);
