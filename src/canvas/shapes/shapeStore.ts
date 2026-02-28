import type { Shape } from "./shapeTypes";

export const shapes: Shape[] = [
    {
        "type": "line",
        "x1": 110,
        "y1": 143,
        "x2": 226,
        "y2": 182
    },
    {
        "type": "line",
        "x1": 241,
        "y1": 162,
        "x2": 396,
        "y2": 223
    },
    {
        "type": "line",
        "x1": 375,
        "y1": 147,
        "x2": 404,
        "y2": 161
    }
];

export function addShape(shape: Shape) {
    shapes.push(shape);
}