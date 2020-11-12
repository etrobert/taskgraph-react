import React, { useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader';
import { RectSize } from './geometry';
import { Task as TaskData } from './data';
import './Task.css';

interface TaskProps {
  task: TaskData;
  dragged: boolean;
  updateSize: (size: RectSize) => void;
}

function Task({ task, dragged, updateSize }: TaskProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = ref.current;
    if (div) updateSize({ w: div.clientWidth, h: div.clientHeight });
  }, [updateSize]);

  return (
    <div
      className="Task"
      ref={ref}
      style={{
        transform: `translate(${task.pos.x}px, ${task.pos.y}px)`,
        zIndex: dragged ? 1 : 0,
      }}
      data-id={task.id}
    >
      {task.name}
    </div>
  );
}

export default hot(module)(Task);
