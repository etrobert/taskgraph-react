import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import Task from './Task';
import './Graph.css';
import { Dependency, Graph as GraphData, Task as TaskData } from './data';
import { addPoint, Box, boxesEqual, getBoxCenter, Point } from './geometry';

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

  const [taskBoxes, setTaskBoxes] = useState<Map<number, Box>>(new Map());
  const setSingleTaskBox = (id: number, box: Box) =>
    setTaskBoxes((taskBoxes) => {
      const currentBox = taskBoxes.get(id);
      if (currentBox && boxesEqual(currentBox, box)) return taskBoxes;
      const newTaskBoxes = new Map(taskBoxes);
      newTaskBoxes.set(id, box);
      return newTaskBoxes;
    });

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
    const predecessorBox = taskBoxes.get(dep.predecessor);
    const successorBox = taskBoxes.get(dep.successor);
    if (!predecessorBox || !successorBox) return null;
    const predecessorCenter = getBoxCenter(predecessorBox);
    const successorCenter = getBoxCenter(successorBox);
    return (
      <path
        key={dep.predecessor + '->' + dep.successor}
        d={`M${predecessorCenter.x},${predecessorCenter.y}
            L${successorCenter.x},${successorCenter.y}`}
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
        className="Graph__container"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}
      >
        <svg className="Graph__arrows">
          {props.graph.dependencies.map(renderDependency)}
        </svg>
        {props.graph.tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            dragged={dragged == task.id}
            updateBox={(box) => setSingleTaskBox(task.id, box)}
          />
        ))}
      </div>
    </div>
  );
}

export default hot(module)(Graph);
