import type { Shape } from "../../shapes/shapeTypes";
import { isPointInEllipse } from "./isPointInEllipse";
import { isPointInRect } from "./isPointInNRect";
import { isPointInStar } from "./isPointInStar";
import { isPointInText } from "./isPointInText";
import { isPointNearTriangle } from "./isPointInTriangle";
import { isPointNearLine } from "./isPointNearLine";


export function hitTest(shape: Shape, x: number, y: number): boolean {
    switch (shape.type) {
        case "line":
            return isPointNearLine(x, y, shape);
        case "arrow":
            return isPointNearLine(x, y, shape);

        case "rect":
            return isPointInRect(x, y, shape);

        case "ellipse":
            return isPointInEllipse(x, y, shape);

        case "star":
            return isPointInStar(x, y, shape);

        case "triangle":
            return isPointNearTriangle(x, y, shape)

        case "text":
            return isPointInText(x, y, shape);

        default:
            return false;
    }
}