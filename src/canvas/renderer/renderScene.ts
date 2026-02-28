import { shapes } from "../shapes/shapeStore";
import { drawShape } from "./drawShape";
import type { ToolEngine } from "../tools";
import { DRAWING_STYLE } from "../core/config/drawingStyle";

export function renderScene(
    ctx: CanvasRenderingContext2D,
    engine: ToolEngine
) {
    ctx.strokeStyle = DRAWING_STYLE.stroke;
    ctx.lineWidth = DRAWING_STYLE.lineWidth;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (const shape of shapes) {
        drawShape(ctx, shape);
    }

    engine.drawPreview(ctx);
}