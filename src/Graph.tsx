import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import Task from './Task';
import './Graph.css';

function Graph() {
  const [graph, setGraph] = useState([
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
  ]);

  const [dragged, setDragged] = useState(0);

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setGraph((graph) =>
      graph.map((task) =>
        task.id == dragged
          ? {
              ...task,
              pos: {
                x: task.pos.x + event.movementX,
                y: task.pos.y + event.movementY,
              },
            }
          : task
      )
    );
  };

  return (
    <div onMouseMove={onMouseMove} className="Graph">
      {graph.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}

export default hot(module)(Graph);
