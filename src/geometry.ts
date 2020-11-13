interface Point {
  x: number;
  y: number;
}

function addPoint(a: Point, b: Point): Point {
  return { x: a.x + b.x, y: a.y + b.y };
}

interface Box {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

interface PartialBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

function createBox(partialBox: PartialBox): Box {
  return {
    ...partialBox,
    right: partialBox.left + partialBox.width - 1,
    bottom: partialBox.top + partialBox.height - 1,
  };
}

function getBoxCenter(box: Box): Point {
  return {
    x: box.left + box.width / 2,
    y: box.top + box.height / 2,
  };
}

// Testing for bottom and right is redundant as they calculated from the others
function boxesEqual(a: Box, b: Box): boolean {
  return (
    a.left == b.left &&
    a.top == b.top &&
    a.width == b.width &&
    a.height == b.height
  );
}

// Finds the intersection point between the line segment p1->p2 and the given bounding box.
// If the line segment and the box don't intersect, null is returned.
function intersectLineBox(p1: Point, p2: Point, box: Box): Point | null {
  const left = {
    p1: { x: box.left, y: box.top },
    p2: { x: box.left, y: box.bottom },
  };
  const top = {
    p1: { x: box.left, y: box.top },
    p2: { x: box.right, y: box.top },
  };
  const right = {
    p1: { x: box.right, y: box.top },
    p2: { x: box.right, y: box.bottom },
  };
  const bottom = {
    p1: { x: box.left, y: box.bottom },
    p2: { x: box.right, y: box.bottom },
  };

  return (
    intersectLines(p1, p2, left.p1, left.p2) ||
    intersectLines(p1, p2, top.p1, top.p2) ||
    intersectLines(p1, p2, right.p1, right.p2) ||
    intersectLines(p1, p2, bottom.p1, bottom.p2)
  );
}

// Finds the intersection point between the line segments p1->p2 and p3->p4.
// If the segments don't intersect, null is returned.
function intersectLines(
  p1: Point,
  p2: Point,
  p3: Point,
  p4: Point
): Point | null {
  // Check if none of the lines are of length 0
  if ((p1.x === p2.x && p1.y === p2.y) || (p3.x === p4.x && p3.y === p4.y)) {
    return null;
  }

  const denominator =
    (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);

  // Lines are parallel
  if (denominator === 0) {
    return null;
  }

  const ua =
    ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) /
    denominator;
  const ub =
    ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) /
    denominator;

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return null;
  }

  // Return a object with the x and y coordinates of the intersection
  const x = p1.x + ua * (p2.x - p1.x);
  const y = p1.y + ua * (p2.y - p1.y);

  return { x, y };
}

export {
  Point,
  addPoint,
  Box,
  boxesEqual,
  createBox,
  getBoxCenter,
  intersectLineBox,
};
