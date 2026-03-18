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

    saveState();
    const index = shapes.findIndex(s => s.id === selectedShapeId);

    if (index !== -1) {
        shapes.splice(index, 1);
    }

    selectedShapeId = null;
}

let history: typeof shapes[] = [];
let redoStack: typeof shapes[] = [];

export function saveState() {
    history.push(structuredClone(shapes));
    redoStack = []; // clear redo on new action
}

export function undo() {
    if (history.length === 0) return;

    redoStack.push(structuredClone(shapes));

    const prev = history.pop()!;
    shapes.length = 0;
    shapes.push(...prev);
}

export function redo() {
    if (redoStack.length === 0) return;

    history.push(structuredClone(shapes));

    const next = redoStack.pop()!;
    shapes.length = 0;
    shapes.push(...next);
}