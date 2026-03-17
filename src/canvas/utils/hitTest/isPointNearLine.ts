import type { Shape } from "../../shapes/shapeTypes";

export function isPointNearLine(
    px: number,
    py: number,
    shape: Shape
) {
    const { x1, y1, x2, y2 } = shape;

    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;

    const param = dot / lenSq;

    if (param < 0 || param > 1) return false;

    const xx = x1 + param * C;
    const yy = y1 + param * D;

    const dx = px - xx;
    const dy = py - yy;

    return Math.sqrt(dx * dx + dy * dy) < 8; // click tolerance
}