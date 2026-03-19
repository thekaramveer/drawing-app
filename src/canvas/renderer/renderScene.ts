import { selectedShapeId, shapes } from "../shapes/shapeStore";
import { drawShape } from "./drawShape";
import type { ToolEngine } from "../tools";
import { drawSelectionOutline } from "../utils/drawSelectionOutline";

export function renderScene(
    ctx: CanvasRenderingContext2D,
    engine: ToolEngine
) {

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (const shape of shapes) {
        if (shape.type === "text") {
            ctx.fillStyle = shape.style.stroke;
            ctx.font = "16px sans-serif";
            ctx.fillText(shape.text || "", shape.x1, shape.y1);
        }
        drawShape(ctx, shape);
    }
    engine.drawPreview(ctx);

    if (selectedShapeId) {
        const selected = shapes.find(s => s.id === selectedShapeId);
        if (selected) {
            drawSelectionOutline(ctx, selected);
        }

    }

}