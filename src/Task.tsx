import React from 'react';
import { hot } from 'react-hot-loader';
import { Task as TaskData } from './data';
import './Task.css';

function Task(props: { task: TaskData; dragged: boolean }) {
  return (
    <div
      className="Task"
      style={{
        transform: `translate(${props.task.pos.x}px, ${props.task.pos.y}px)`,
        zIndex: props.dragged ? 1 : 0,
      }}
      data-id={props.task.id}
    >
      {props.task.name}
    </div>
  );
}

export default hot(module)(Task);
