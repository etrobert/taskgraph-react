import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import Task from './Task';
import './Graph.css';
import { Dependency, Graph as GraphData, Task as TaskData } from './data';
import {
  addPoint,
  Point,
  Rect,
  rectCenter,
  RectSize,
  rectSizesEqual,
} from './geometry';

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

  // prettier-ignore
  const [taskSizes, setTaskSizes] = useState<Map<number, RectSize>>(new Map());
  const setSingleTaskSize = (id: number, size: RectSize) =>
    setTaskSizes((taskSizes) => {
      const currentSize = taskSizes.get(id);
      if (currentSize && rectSizesEqual(currentSize, size)) return taskSizes;
      const newTaskSizes = new Map(taskSizes);
      newTaskSizes.set(id, size);
      return newTaskSizes;
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

  /**
   * Returns the Rect corresponding to a Task
   *
   * Uses props.graph.tasks to find the Position.
   * Throws if fails to find the Position.
   *
   * Uses taskSizes to get the Size.
   * Use {w: 0, h: 0} if fails to find the Size
   * because the task may not have been rendered yet.
   */
  function getTaskRect(id: number): Rect {
    const findTask = (id: number) =>
      props.graph.tasks.find((task) => task.id == id);
    const task = findTask(id);
    if (!task) throw Error('Cannot find task');
    const size = taskSizes.get(id) || { w: 0, h: 0 };
    return { ...task.pos, ...size };
  }

  const renderDependency = (dep: Dependency) => {
    const predecessorCenter = rectCenter(getTaskRect(dep.predecessor));
    const successorCenter = rectCenter(getTaskRect(dep.successor));
    return (
      <path
        key={dep.predecessor + '->' + dep.successor}
        className="arrow"
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
        className="container"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}
      >
        <svg>{props.graph.dependencies.map(renderDependency)}</svg>
        {props.graph.tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            dragged={dragged == task.id}
            updateSize={(size) => setSingleTaskSize(task.id, size)}
          />
        ))}
      </div>
    </div>
  );
}

export default hot(module)(Graph);
