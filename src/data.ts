import { Point } from './geometry';

interface Task {
  id: number;
  name: string;
  pos: Point;
}

interface Dependency {
  predecessor: number;
  successor: number;
}

interface Graph {
  tasks: Task[];
  dependencies: Dependency[];
}

export { Task, Dependency, Graph };
