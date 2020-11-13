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

export { Point, addPoint, Box, boxesEqual, createBox, getBoxCenter };
