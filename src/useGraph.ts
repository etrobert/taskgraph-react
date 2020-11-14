import { useState } from 'react';
import { Graph, Task } from './data';
import { addPoint, Point } from './geometry';

type MoveTask = (id: number, movement: Point) => void;

interface UseGraph {
  graph: Graph;
  moveTask: MoveTask;
}

const defaultInitialGraph = { tasks: [], dependencies: [] };

function useGraph(initialGraph: Graph = defaultInitialGraph): UseGraph {
  const [graph, setGraph] = useState<Graph>(initialGraph);

  const updateTask = (id: number, update: (task: Task) => Task) => {
    setGraph((graph) => ({
      ...graph,
      tasks: graph.tasks.map((task) => (task.id == id ? update(task) : task)),
    }));
  };

  const moveTask: MoveTask = (id, movement) =>
    updateTask(id, (task) => ({ ...task, pos: addPoint(task.pos, movement) }));

  return { graph, moveTask };
}

export { MoveTask };
export default useGraph;
