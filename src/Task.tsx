import React, { useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader';
import { Box, createBox } from './geometry';
import { Task as TaskData } from './data';
import './Task.css';

interface TaskProps {
  task: TaskData;
  dragged: boolean;
  updateBox: (box: Box) => void;
}

function Task({ task, dragged, updateBox }: TaskProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = ref.current;
    if (!div) return;
    const box = createBox({
      left: task.pos.x,
      top: task.pos.y,
      width: div.clientWidth,
      height: div.clientHeight,
    });
    updateBox(box);
  }, [task.pos.x, task.pos.y, updateBox]);

  return (
    <div
      className={'Task' + (dragged ? ' Task--dragged' : '')}
      ref={ref}
      style={{
        transform: `translate(${task.pos.x}px, ${task.pos.y}px)`,
      }}
      data-id={task.id}
    >
      {task.name}
    </div>
  );
}

export default hot(module)(Task);
