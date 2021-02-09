import { Point } from './geometry';

const colors = {
  cyan: '#82e5d1',
  pink: '#eeb1bb',
};

interface Task {
  id: number;
  name: string;
  pos: Point;
  color?: string;
}

interface Dependency {
  predecessor: number;
  successor: number;
}

interface Graph {
  tasks: Task[];
  dependencies: Dependency[];
}

export { Task, Dependency, Graph, colors };
