import type { Tool } from "./Tool";
import { addShape } from "../shapes/shapeStore";

const DRAG_THRESHOLD = 5;

export class ArcTool implements Tool {
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
        }
    }

    onMouseUp(x: number, y: number) {
        if (!this.drawing) return;

        this.drawing = false;

        if (!this.hasDragged) return;

        const { radius, endAngle } = this.getArcData(x, y);

        addShape({
            type: "arc",
            cx: this.startX,
            cy: this.startY,
            r: radius,
            startAngle: 0,
            endAngle: endAngle
        });

        this.hasDragged = false;
    }

    drawPreview(ctx: CanvasRenderingContext2D) {
        if (!this.drawing || !this.hasDragged) return;

        const { radius, endAngle } = this.getArcData(
            this.currentX,
            this.currentY
        );

        ctx.beginPath();
        ctx.arc(
            this.startX,
            this.startY,
            radius,
            0,
            endAngle
        );
        ctx.stroke();
    }

    private getArcData(x: number, y: number) {
        const dx = x - this.startX;
        const dy = y - this.startY;

        const radius = Math.sqrt(dx * dx + dy * dy);
        const endAngle = Math.atan2(dy, dx);

        return { radius, endAngle };
    }
}