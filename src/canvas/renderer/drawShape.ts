import type { Shape } from "../shapes/shapeTypes";
import { drawArrow } from "../utils/drawArrow";
import { drawRect } from "../utils/drawRect";


export function drawShape(
    ctx: CanvasRenderingContext2D,
    shape: Shape
) {
    ctx.beginPath();

    if (shape.type === "line") {
        ctx.moveTo(shape.x1, shape.y1);
        ctx.lineTo(shape.x2, shape.y2);
    }
    if (shape.type === "circle") {
        ctx.arc(shape.x1, shape.y1, shape.radius, shape.startAngle, shape.endAngle);

    }
    if (shape.type === "arrow") {
        drawArrow(ctx, shape.x1, shape.y1, shape.x2, shape.y2)
    }
    if (shape.type === "rect") {
        drawRect(ctx, shape.x1, shape.y1, shape.x2, shape.y2)

    }
    ctx.stroke();

}