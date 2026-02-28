import { addShape } from "../shapes/shapeStore";
import { distance } from "../utils/distance";
import type { Tool } from "./Tool";
import { DRAWING_STYLE } from "../core/config/drawingStyle";


export class CircleTool implements Tool {
    private startX = 0;
    private startY = 0;
    private currentX = 0;
    private currentY = 0;
    private startAngle = 0;
    private endAngle = 2 * Math.PI;
    private drawing = false;

    onMouseDown(x: number, y: number) {
        this.startX = x;
        this.startY = y;
        this.currentX = x;
        this.currentY = y;
        this.drawing = true;
    }
    onMouseMove(x: number, y: number): void {
        if (!this.drawing) return;
        this.currentX = x;
        this.currentY = y;
    }

    onMouseUp(x: number, y: number): void {
        if (!this.drawing) return;
        this.currentX = x;
        this.currentY = y;
        addShape({
            type: "circle",
            x1: this.startX,
            y1: this.startY,
            radius: distance(this.startX, this.startY, this.currentX, this.currentY),
            startAngle: this.startAngle,
            endAngle: this.endAngle
        })
        this.drawing = false;
    }

    drawPreview(ctx: CanvasRenderingContext2D): void {
        if (!this.drawing) return;
        ctx.beginPath();
        ctx.arc(this.startX, this.startY, distance(this.startX, this.startY, this.currentX, this.currentY), this.startAngle, this.endAngle);
        ctx.strokeStyle = DRAWING_STYLE.stroke;
        ctx.stroke();

    }

}