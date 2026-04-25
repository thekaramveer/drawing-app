import type { Tool } from "./Tool";
import { addShape, saveState } from "../shapes/shapeStore";
import { BaseTool } from "./BaseTool";


const DRAG_THRESHOLD = 5;

export class EllipseTool extends BaseTool implements Tool {
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
        addShape({
            id: crypto.randomUUID(),
            type: "ellipse",
            x1: this.startX,
            y1: this.startY,
            x2: x,
            y2: y,
            style: { ...this.getStyle() }
        });

        this.requestRender();
        this.onComplete();

    }

    drawPreview(ctx: CanvasRenderingContext2D) {
        if (!this.drawing || !this.hasDragged) return;

        const { cx, cy, rx, ry } = this.getEllipseData(
            this.currentX,
            this.currentY
        );
        const style = this.getStyle();
        ctx.strokeStyle = style.stroke;
        ctx.lineWidth = style.lineWidth;
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