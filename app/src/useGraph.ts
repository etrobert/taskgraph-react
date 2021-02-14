import { useEffect, useState } from 'react';
import { Graph, Task } from './data';
import { addPoint, Point } from './geometry';

type MoveTask = (id: number, movement: Point) => void;

interface UseGraph {
  graph: Graph;
  addTask: (name: string) => void;
  moveTask: MoveTask;
}

const maxId = (graph: Graph) => Math.max(...graph.tasks.map((task) => task.id));

const loadFromLocalStorage = (): Graph | null => {
  const graphString = window.localStorage.getItem('graph');
  // TODO validate graphString
  return graphString && JSON.parse(graphString);
};

const saveToLocalStorage = (graph: Graph) =>
  window.localStorage.setItem('graph', JSON.stringify(graph));

const defaultInitialGraph = { tasks: [], dependencies: [] };

function useGraph(initialGraph: Graph = defaultInitialGraph): UseGraph {
  const [graph, setGraph] = useState<Graph>(initialGraph);

  // Given a specific graph, returns the next id number
  const graphNextId = (graph: Graph) => (graph.tasks ? maxId(graph) + 1 : 0);
  const [nextId, setNextId] = useState(graphNextId(initialGraph));

  // Initialize graph with localStorage
  // TODO fix flash of initialGraph
  useEffect(() => {
    const graph = loadFromLocalStorage();
    if (!graph) return;
    setGraph(graph);
    setNextId(graphNextId(graph));
  }, []);

  // Update localStorage on every graph modification
  useEffect(() => saveToLocalStorage(graph), [graph]);

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
