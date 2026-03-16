import type { Shape } from "../shapes/shapeTypes";

export function drawSelectionOutline(ctx: CanvasRenderingContext2D, shape: Shape) {
    ctx.save();

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);

    const minX = Math.min(shape.x1, shape.x2);
    const minY = Math.min(shape.y1, shape.y2);
    const width = Math.abs(shape.x2 - shape.x1);
    const height = Math.abs(shape.y2 - shape.y1);

    ctx.strokeRect(minX, minY, width, height);

    ctx.restore();
}