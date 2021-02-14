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

const serverUrl = 'http://localhost:3001';

const loadGraph = async (id: number) => {
  const response = await fetch(`${serverUrl}/graph/${id}`);
  // TODO validate graph
  // TODO handle HTTP errors
  return (await response.json()) as Graph;
};

const defaultInitialGraph = { tasks: [], dependencies: [] };

function useGraph(initialGraph: Graph = defaultInitialGraph): UseGraph {
  const [graph, setGraph] = useState<Graph>(initialGraph);

  // Given a specific graph, returns the next id number
  const graphNextId = (graph: Graph) => (graph.tasks ? maxId(graph) + 1 : 0);
  const [nextId, setNextId] = useState(graphNextId(initialGraph));

  // Initialize graph
  // TODO fix flash of initialGraph
  useEffect(() => {
    const initialLoad = async () => {
      const graph = await loadGraph(1);
      if (!graph) return;
      setGraph(graph);
      setNextId(graphNextId(graph));
    };

    initialLoad();
  }, []);

  // TODO Update on every graph modification
  // useEffect(() => update(graph), [graph]);

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
