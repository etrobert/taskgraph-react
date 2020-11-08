import React from 'react';
import { hot } from 'react-hot-loader';
import { Task as TaskData } from './data';
import './Task.css';

function Task(props: { task: TaskData }) {
  return (
    <div
      className="Task"
      style={{
        transform: `translate(${props.task.pos.x}px, ${props.task.pos.y}px)`,
      }}
      data-id={props.task.id}
    >
      {props.task.name}
    </div>
  );
}

export default hot(module)(Task);
