import type { Shape } from "../../shapes/shapeTypes";

export function isPointInEllipse(px: number, py: number, shape: Shape) {
    const cx = (shape.x1 + shape.x2) / 2;
    const cy = (shape.y1 + shape.y2) / 2;

    const rx = Math.abs(shape.x2 - shape.x1) / 2;
    const ry = Math.abs(shape.y2 - shape.y1) / 2;

    if (rx === 0 || ry === 0) return false;

    const normX = (px - cx) / rx;
    const normY = (py - cy) / ry;

    return normX * normX + normY * normY <= 1;
}