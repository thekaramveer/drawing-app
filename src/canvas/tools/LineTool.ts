import type { Tool } from "./Tool";
import { addShape, saveState } from "../shapes/shapeStore";
import { BaseTool } from "./BaseTool";


const DRAG_THRESHOLD = 3;
export class LineTool extends BaseTool implements Tool {
    private startX = 0;
    private startY = 0;
    private currentX = 0;
    private currentY = 0;
    private drawing = false;
    private hasDragged = false;

    onMouseDown(x: number, y: number) {
        this.startX = x;
        this.startY = y;
        this.currentX = x;
        this.currentY = y;
        this.drawing = true;
        this.hasDragged = false;
    }

    onMouseMove(x: number, y: number) {
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
            this.requestRender();
        }

    }

    onMouseUp(x: number, y: number) {
        if (!this.drawing) return;
        this.drawing = false;
        if (!this.hasDragged) return;
        saveState();
        const style = this.getStyle();
        addShape({
            id: crypto.randomUUID(),
            type: "line",
            x1: this.startX,
            y1: this.startY,
            x2: x,
            y2: y,
            style: { ...style },
        });
        this.hasDragged = false;
        //calling onComplete after the shape is successfully committed to the canvas.

        this.requestRender();
        this.onComplete();
    }

    drawPreview(ctx: CanvasRenderingContext2D) {
        if (!this.drawing) return;
        if (!this.hasDragged) return;
        const style = this.getStyle();
        ctx.strokeStyle = style.stroke;
        ctx.lineWidth = style.lineWidth;
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.currentX, this.currentY);
        ctx.stroke();
    }



}