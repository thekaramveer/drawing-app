import type { Shape } from "./shapeTypes";

export const shapes: Shape[] = [];

export function addShape(shape: Shape) {
    shapes.push(shape);
}

export let selectedShapeId: string | null = null;

export function setSelectedShapeId(id: string | null) {
    selectedShapeId = id;
}

export function deleteSelectedShape() {
    if (!selectedShapeId) return;

    const index = shapes.findIndex(s => s.id === selectedShapeId);

    if (index !== -1) {
        shapes.splice(index, 1);
    }

    selectedShapeId = null;
}