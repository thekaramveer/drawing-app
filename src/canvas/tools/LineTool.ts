import type { Tool } from "./Tool";
import { addShape, saveState } from "../shapes/shapeStore";
import type { DrawingStyle } from "../core/config/drawingStyle";


const DRAG_THRESHOLD = 3;
export class LineTool implements Tool {
    private startX = 0;
    private startY = 0;
    private currentX = 0;
    private currentY = 0;
    private drawing = false;
    private hasDragged = false;
    private style: DrawingStyle = {
        stroke: "white",
        lineWidth: 5
    }

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
        }

    }

    onMouseUp(x: number, y: number) {
        if (!this.drawing) return;
        this.drawing = false;
        if (!this.hasDragged) return;
        saveState();
        addShape({
            id: crypto.randomUUID(),
            type: "line",
            x1: this.startX,
            y1: this.startY,
            x2: x,
            y2: y,
            style: this.style
        });
        this.hasDragged = false;
    }

    drawPreview(ctx: CanvasRenderingContext2D) {
        if (!this.drawing) return;
        if (!this.hasDragged) return;
        ctx.strokeStyle = this.style.stroke;
        ctx.lineWidth = this.style.lineWidth;
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.currentX, this.currentY);
        ctx.stroke();
    }



}