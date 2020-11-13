import React, { useState } from 'react';
import { hot } from 'react-hot-loader';

import Task from './Task';
import GraphArrows from './GraphArrows';

import './Graph.css';

import { Graph as GraphData, Task as TaskData } from './data';
import { addPoint, Box, boxesEqual, Point } from './geometry';

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
        <GraphArrows
          dependencies={props.graph.dependencies}
          taskBoxes={taskBoxes}
        />
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
