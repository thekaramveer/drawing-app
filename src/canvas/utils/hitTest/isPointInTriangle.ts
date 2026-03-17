import type { Shape } from "../../shapes/shapeTypes";

function getTrianglePoints(shape: Shape) {
    const { x1, y1, x2, y2 } = shape;

    const width = x2 - x1;
    const height = y2 - y1;

    const A = { x: x1 + width / 2, y: y1 };       // top
    const B = { x: x1, y: y1 + height };          // bottom left
    const C = { x: x2, y: y2 };                   // bottom right

    return { A, B, C };
}
function isPointInTriangle(
    px: number,
    py: number,
    A: { x: number; y: number },
    B: { x: number; y: number },
    C: { x: number; y: number }
) {
    const area = (p1: { x: number; y: number },
        p2: { x: number; y: number },
        p3: { x: number; y: number }) =>
        (p1.x * (p2.y - p3.y) +
            p2.x * (p3.y - p1.y) +
            p3.x * (p1.y - p2.y)) / 2;

    const P = { x: px, y: py };

    const A1 = Math.abs(area(P, B, C));
    const A2 = Math.abs(area(A, P, C));
    const A3 = Math.abs(area(A, B, P));

    const A_total = Math.abs(area(A, B, C));

    return Math.abs(A1 + A2 + A3 - A_total) < 0.5;
}

export function isPointInTriangleShape(px: number, py: number, shape: Shape) {
    const { A, B, C } = getTrianglePoints(shape);
    return isPointInTriangle(px, py, A, B, C);
}


type Point = { x: number; y: number };

function isPointNearSegment(
    px: number,
    py: number,
    p1: Point,
    p2: Point
) {
    const A = px - p1.x;
    const B = py - p1.y;
    const C = p2.x - p1.x;
    const D = p2.y - p1.y;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;

    const param = dot / lenSq;

    if (param < 0 || param > 1) return false;

    const xx = p1.x + param * C;
    const yy = p1.y + param * D;

    const dx = px - xx;
    const dy = py - yy;

    return Math.sqrt(dx * dx + dy * dy) < 8;
}
export function isPointNearTriangle(px: number, py: number, shape: Shape) {
    const { A, B, C } = getTrianglePoints(shape);

    return (
        isPointNearSegment(px, py, A, B) ||
        isPointNearSegment(px, py, B, C) ||
        isPointNearSegment(px, py, C, A)
    );
}