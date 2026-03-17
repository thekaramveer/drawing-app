import type { Shape } from "../../shapes/shapeTypes";
import { isPointInRect } from "./isPointInNRect";

export function isPointInStar(px: number, py: number, shape: Shape) {
    return isPointInRect(px, py, shape);
}