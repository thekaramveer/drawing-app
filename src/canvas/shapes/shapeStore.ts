import type { Shape } from "./shapeTypes";

export const shapes: Shape[] = [];

export function addShape(shape: Shape) {
    shapes.push(shape);
}