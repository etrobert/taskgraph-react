import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import Task from './Task';
import './Graph.css';
import { Graph as GraphData, Point, Task as TaskData } from './data';

const moveTask = (task: TaskData, movement: Point) => ({
  ...task,
  pos: {
    x: task.pos.x + movement.x,
    y: task.pos.y + movement.y,
  },
});

function Graph(props: {
  graph: GraphData;
  setGraph: React.Dispatch<GraphData>;
}) {
  const [dragged, setDragged] = useState<number | null>(null);

  const onPointerMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const newGraph = {
      tasks: props.graph.tasks.map((task) =>
        task.id == dragged
          ? moveTask(task, { x: event.movementX, y: event.movementY })
          : task
      ),
    };
    props.setGraph(newGraph);
  };

  const onPointerLeave = () => setDragged(null);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement; // TODO why cast
    if (!target.classList.contains('Task')) return;
    const id = parseInt(target.dataset.id!);
    setDragged((dragged) => (dragged == id ? null : id));
  };

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
      className="Graph"
    >
      {props.graph.tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}

export default hot(module)(Graph);
