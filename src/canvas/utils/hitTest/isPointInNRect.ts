import type { Shape } from "../../shapes/shapeTypes";

export function isPointInRect(px: number, py: number, shape: Shape) {
    const minX = Math.min(shape.x1, shape.x2);
    const maxX = Math.max(shape.x1, shape.x2);
    const minY = Math.min(shape.y1, shape.y2);
    const maxY = Math.max(shape.y1, shape.y2);

    return px >= minX && px <= maxX && py >= minY && py <= maxY;
}