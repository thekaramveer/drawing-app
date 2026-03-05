import { shapes } from "../shapes/shapeStore";
import { drawShape } from "./drawShape";
import type { ToolEngine } from "../tools";

export function renderScene(
    ctx: CanvasRenderingContext2D,
    engine: ToolEngine
) {

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (const shape of shapes) {
        drawShape(ctx, shape);
    }

    engine.drawPreview(ctx);
}