import type { Tool } from "./Tool";
import { addShape } from "../shapes/shapeStore";
import type { DrawingStyle } from "../core/config/drawingStyle";

const DRAG_THRESHOLD = 5;

export class EllipseTool implements Tool {
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

        addShape({
            id: crypto.randomUUID(),
            type: "ellipse",
            x1: this.startX,
            y1: this.startY,
            x2: x,
            y2: y,
            style: this.style
        });

        this.hasDragged = false;
    }

    drawPreview(ctx: CanvasRenderingContext2D) {
        if (!this.drawing || !this.hasDragged) return;

        const { cx, cy, rx, ry } = this.getEllipseData(
            this.currentX,
            this.currentY
        );
        ctx.strokeStyle = this.style.stroke;
        ctx.lineWidth = this.style.lineWidth;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
    }

    private getEllipseData(x: number, y: number) {
        const minX = Math.min(this.startX, x);
        const minY = Math.min(this.startY, y);
        const width = Math.abs(x - this.startX);
        const height = Math.abs(y - this.startY);

        const cx = minX + width / 2;
        const cy = minY + height / 2;

        const rx = width / 2;
        const ry = height / 2;

        return { cx, cy, rx, ry };
    }

}