import type { Shape } from "../shapes/shapeTypes";
import { drawArrow } from "../utils/drawArrow";
import { drawEllipse } from "../utils/drawEllipse";
import { drawLine } from "../utils/drawLine";
import { drawRect } from "../utils/drawRect";
import { drawStar } from "../utils/drawStar";
import { drawTriangle } from "../utils/drawTriangle";


export function drawShape(
    ctx: CanvasRenderingContext2D,
    shape: Shape
) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = shape.style.stroke
    ctx.lineWidth = shape.style.lineWidth
    if (shape.type === "line") {
        drawLine(ctx, shape.x1, shape.y1, shape.x2, shape.y2);
    }
    if (shape.type === "ellipse") {
        drawEllipse(ctx, shape.x1, shape.y1, shape.x2, shape.y2);

    }
    if (shape.type === "arrow") {
        drawArrow(ctx, shape.x1, shape.y1, shape.x2, shape.y2)
    }
    if (shape.type === "rect") {
        drawRect(ctx, shape.x1, shape.y1, shape.x2, shape.y2)

    }
    if (shape.type === "triangle") {
        drawTriangle(ctx, shape.x1, shape.y1, shape.x2, shape.y2)

    }
    if (shape.type === "star") {
        drawStar(ctx, shape.x1, shape.y1, shape.x2, shape.y2)
    }

    ctx.stroke();
    ctx.restore();

}