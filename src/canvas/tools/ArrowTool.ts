import type { Tool } from "./Tool";
import { addShape } from "../shapes/shapeStore";
import type { DrawingStyle } from "../core/config/drawingStyle";
const DRAG_THRESHOLD = 5;


export class ArrowTool implements Tool {
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
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (!this.hasDragged && distance > DRAG_THRESHOLD) {
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
        if (!this.hasDragged) {
            return;
        }

        addShape({
            type: "arrow",
            x1: this.startX,
            y1: this.startY,
            x2: x,
            y2: y,
            style: this.style
        });
    }

    drawPreview(ctx: CanvasRenderingContext2D) {
        if (!this.drawing || !this.hasDragged) return;
        this.drawArrow(ctx, this.startX, this.startY, this.currentX, this.currentY);
    }

    private drawArrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
        const headLength = 12; // size of arrow head 
        const dx = x2 - x1;
        const dy = y2 - y1;
        const angle = Math.atan2(dy, dx);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2); // left side of arrow head 
        ctx.lineTo(x2 - headLength * Math.cos(angle - Math.PI / 6), y2 - headLength * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(x2, y2); // right side of arrow head 
        ctx.lineTo(x2 - headLength * Math.cos(angle + Math.PI / 6), y2 - headLength * Math.sin(angle + Math.PI / 6));
        ctx.strokeStyle = this.style.stroke; ctx.lineWidth = this.style.lineWidth; ctx.stroke();
    }
}
