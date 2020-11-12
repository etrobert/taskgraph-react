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

function addPoint(a: Point, b: Point) {
  return { x: a.x + b.x, y: a.y + b.y };
}

export { Point, addPoint, Task, Dependency, Graph };
