interface Point {
  x: number;
  y: number;
}

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

export { Point, Task, Dependency, Graph };
