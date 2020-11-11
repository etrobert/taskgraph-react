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
  const [draggingGraph, setDraggingGraph] = useState(false);

  const [pan, setPan] = useState({ x: 0, y: 0 });

  const onPointerMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const dragGraph = () => {
      setPan((pan) => ({
        x: pan.x + event.movementX,
        y: pan.y + event.movementY,
      }));
    };
    const dragTask = () => {
      const newGraph = {
        tasks: props.graph.tasks.map((task) =>
          task.id == dragged
            ? moveTask(task, { x: event.movementX, y: event.movementY })
            : task
        ),
      };
      props.setGraph(newGraph);
    };
    if (draggingGraph) dragGraph();
    else if (dragged !== null) dragTask();
  };

  const stopDragging = () => {
    setDragged(null);
    setDraggingGraph(false);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement; // TODO why cast
    if (target.classList.contains('Task')) {
      const id = parseInt(target.dataset.id!);
      setDragged((dragged) => (dragged == id ? null : id));
    } else setDraggingGraph(true);
  };

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerLeave={stopDragging}
      onPointerUp={stopDragging}
      onPointerMove={onPointerMove}
      className="Graph"
    >
      <div
        className="container"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}
      >
        {props.graph.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default hot(module)(Graph);
