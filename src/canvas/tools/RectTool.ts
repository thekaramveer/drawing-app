import { addShape, saveState } from "../shapes/shapeStore";
import { BaseTool } from "./BaseTool";
import type { Tool } from "./Tool";

const DRAG_THRESHOLD = 3;

export class RectTool extends BaseTool implements Tool {
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
            this.requestRender();
        }
    }

    onMouseUp(x: number, y: number): void {
        if (!this.drawing) return;

        this.drawing = false;

        if (!this.hasDragged) {
            this.hasDragged = false;
            return;
        }


        saveState();
        const style = this.getStyle();
        addShape({
            id: crypto.randomUUID(),
            type: "rect",
            x1: this.startX,
            y1: this.startY,
            x2: x,
            y2: y,
            style: { ...style }
        });

        this.hasDragged = false;
    }

    drawPreview(ctx: CanvasRenderingContext2D) {

        if (!this.drawing || !this.hasDragged) return;

        const w = this.currentX - this.startX;
        const h = this.currentY - this.startY;
        const style = this.getStyle();
        ctx.beginPath();
        ctx.strokeStyle = style.stroke;
        ctx.lineWidth = style.lineWidth;
        ctx.rect(this.startX, this.startY, w, h);
        ctx.stroke();
    }
}