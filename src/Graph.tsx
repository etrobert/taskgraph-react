import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import Task from './Task';
import './Graph.css';
import {
  addPoint,
  Dependency,
  Graph as GraphData,
  Point,
  Task as TaskData,
} from './data';

const moveTask = (task: TaskData, movement: Point) => ({
  ...task,
  pos: {
    x: task.pos.x + movement.x,
    y: task.pos.y + movement.y,
  },
});

const moveTaskInGraph = (
  graph: GraphData,
  taskId: number,
  movement: Point
) => ({
  ...graph,
  tasks: graph.tasks.map((task) =>
    task.id == taskId ? moveTask(task, movement) : task
  ),
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
    const movement = { x: event.movementX, y: event.movementY };

    const dragGraph = () => setPan((pan) => addPoint(pan, movement));

    if (draggingGraph) dragGraph();
    else if (dragged !== null) {
      const newGraph = moveTaskInGraph(props.graph, dragged, movement);
      props.setGraph(newGraph);
    }
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

  const renderDependency = (dep: Dependency) => {
    const findTask = (id: number) =>
      props.graph.tasks.find((task) => task.id == id);
    const predecessor = findTask(dep.predecessor);
    const successor = findTask(dep.successor);
    if (!predecessor || !successor) {
      console.error(
        `Could not find nodes ${dep.predecessor} or ${dep.successor}`
      );
      return;
    }
    return (
      <path
        key={dep.predecessor + '->' + dep.successor}
        className="arrow"
        d={`M${predecessor.pos.x},${predecessor.pos.y}
            L${successor.pos.x},${successor.pos.y}`}
      />
    );
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
        <svg>{props.graph.dependencies.map(renderDependency)}</svg>
        {props.graph.tasks.map((task) => (
          <Task key={task.id} task={task} dragged={dragged == task.id} />
        ))}
      </div>
    </div>
  );
}

export default hot(module)(Graph);
