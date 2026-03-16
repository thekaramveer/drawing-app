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