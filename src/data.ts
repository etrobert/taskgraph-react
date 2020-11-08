interface Point {
  x: number;
  y: number;
}

interface Task {
  id: number;
  name: string;
  pos: Point;
}

interface Graph {
  tasks: Task[];
}

export { Point, Task, Graph };
