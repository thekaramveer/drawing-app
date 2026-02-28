import { addShape } from "../shapes/shapeStore";
import type { Tool } from "./Tool";



const DRAG_THRESHOLD = 3;

export class RectTool implements Tool {

    private startX = 0;
    private startY = 0;
    private currentX = 0;
    private currentY = 0;
    private drawing = false;
    private hasDragged = false;


    onMouseDown(x: number, y: number): void {
        this.startX = x;
        this.startY = y;
        this.currentX = x;
        this.currentY = y;
        this.drawing = true;
        this.hasDragged = false;
    }

    onMouseMove(x: number, y: number): void {
        if (!this.drawing) return;
        const dx = x - this.startX;
        const dy = y - this.startY;
        const distanceSquared = dx * dx + dy * dy;
        if (!this.hasDragged && distanceSquared > DRAG_THRESHOLD * DRAG_THRESHOLD) {
            this.hasDragged = true;
        }
        if (this.hasDragged) {
            this.currentX = x;
            this.currentY = y;
        }

    }
    onMouseUp(x: number, y: number): void {
        if (!this.drawing) return;
        this.drawing = false;

        if (!this.hasDragged) {
            return;
        }
        addShape({
            type: "rect",
            x1: this.startX,
            y1: this.startY,
            x2: x,
            y2: y
        })
    }
    drawPreview(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        const w = this.currentX - this.startX;
        const h = this.currentY - this.startY;

        ctx.rect(this.startX, this.startY, w, h);
        ctx.stroke();
        ctx.closePath();


    }
}