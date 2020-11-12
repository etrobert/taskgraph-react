interface Point {
  x: number;
  y: number;
}

function addPoint(a: Point, b: Point): Point {
  return { x: a.x + b.x, y: a.y + b.y };
}

interface RectSize {
  w: number;
  h: number;
}

function rectSizesEqual(a: RectSize, b: RectSize): boolean {
  return a.w == b.w && a.h == b.h;
}

interface Rect extends RectSize, Point {}

function rectCenter(rect: Rect): Point {
  return { x: rect.x + rect.w / 2, y: rect.y + rect.h / 2 };
}

export { Point, addPoint, RectSize, rectSizesEqual, Rect, rectCenter };
