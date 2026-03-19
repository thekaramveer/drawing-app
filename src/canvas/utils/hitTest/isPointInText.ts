import type { TextShape } from "../../shapes/shapeTypes";


export function isPointInText(x: number, y: number, shape: TextShape) {

    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return false;

    ctx.font = "16px sans-serif";

    const metrics = ctx.measureText(shape.text); // ✅ no error
    const width = metrics.width;
    const height = 16;

    const x1 = shape.x1;
    const y1 = shape.y1 - height;

    return (
        x >= x1 &&
        x <= x1 + width &&
        y >= y1 &&
        y <= y1 + height
    );

}