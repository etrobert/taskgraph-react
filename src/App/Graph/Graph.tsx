import React, { useState } from 'react';
import { hot } from 'react-hot-loader';

import Task from './Task/Task';
import GraphArrows from './GraphArrows/GraphArrows';

import './Graph.css';

import { Graph as GraphData } from '../../data';
import { addPoint, Box, boxesEqual } from '../../geometry';
import { MoveTask } from '../../useGraph';

function Graph(props: { graph: GraphData; moveTask: MoveTask }) {
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
    else if (dragged !== null) props.moveTask(dragged, movement);
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
