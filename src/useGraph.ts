import { useState } from 'react';
import { Graph, Task } from './data';
import { addPoint, Point } from './geometry';

type MoveTask = (id: number, movement: Point) => void;

interface UseGraph {
  graph: Graph;
  addTask: (name: string) => void;
  moveTask: MoveTask;
}

const maxId = (graph: Graph) => Math.max(...graph.tasks.map((task) => task.id));

const defaultInitialGraph = { tasks: [], dependencies: [] };

function useGraph(initialGraph: Graph = defaultInitialGraph): UseGraph {
  const [graph, setGraph] = useState<Graph>(initialGraph);

  const [nextId, setNextId] = useState(
    initialGraph.tasks ? maxId(initialGraph) + 1 : 0
  );

  const addTask = (name: string) => {
    setNextId((nextId) => nextId + 1);
    setGraph((graph) => ({
      ...graph,
      tasks: [...graph.tasks, { id: nextId, name, pos: { x: 0, y: 0 } }],
    }));
  };

  const updateTask = (id: number, update: (task: Task) => Task) => {
    setGraph((graph) => ({
      ...graph,
      tasks: graph.tasks.map((task) => (task.id == id ? update(task) : task)),
    }));
  };

  const moveTask: MoveTask = (id, movement) =>
    updateTask(id, (task) => ({ ...task, pos: addPoint(task.pos, movement) }));

  return { graph, addTask, moveTask };
}

export { MoveTask };
export default useGraph;
