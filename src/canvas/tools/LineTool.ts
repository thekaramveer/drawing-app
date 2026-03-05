import type { Tool } from "./Tool";
import { addShape } from "../shapes/shapeStore";
import type { DrawingStyle } from "../core/config/drawingStyle";

export class LineTool implements Tool {
    private startX = 0;
    private startY = 0;
    private currentX = 0;
    private currentY = 0;
    private drawing = false;
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
    }

    onMouseMove(x: number, y: number) {
        if (!this.drawing) return;
        this.currentX = x;
        this.currentY = y;
    }

    onMouseUp(x: number, y: number) {
        if (!this.drawing) return;

        addShape({
            type: "line",
            x1: this.startX,
            y1: this.startY,
            x2: x,
            y2: y,
            style: this.style
        });

        this.drawing = false;
    }

    drawPreview(ctx: CanvasRenderingContext2D) {
        if (!this.drawing) return;
        ctx.strokeStyle = this.style.stroke;
        ctx.lineWidth = this.style.lineWidth;
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.currentX, this.currentY);
        ctx.stroke();
    }
}