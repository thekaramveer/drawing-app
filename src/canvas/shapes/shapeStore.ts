import type { Shape } from "./shapeTypes";

export const shapes: Shape[] = [];

export function addShape(shape: Shape) {
    shapes.push(shape);
}

export let selectedShapeId: string | null = null;

export function setSelectedShape(id: string | null) {
    selectedShapeId = id;
}