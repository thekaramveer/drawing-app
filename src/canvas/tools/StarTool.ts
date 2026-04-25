import type { Tool } from "./Tool";
import { addShape, saveState } from "../shapes/shapeStore";
import { BaseTool } from "./BaseTool";

const DRAG_THRESHOLD = 5;

export class StarTool extends BaseTool implements Tool {
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
            type: "star",
            x1: this.startX,
            y1: this.startY,
            x2: x,
            y2: y,
            style: { ...style }
        });

        this.hasDragged = false;
        this.requestRender();
        this.onComplete();

    }

    drawPreview(ctx: CanvasRenderingContext2D) {
        if (!this.drawing || !this.hasDragged) return;
        const style = this.getStyle();
        ctx.strokeStyle = style.stroke;
        ctx.lineWidth = style.lineWidth;
        this.drawStar(ctx, this.startX, this.startY, this.currentX, this.currentY);
    }

    private drawStar(
        ctx: CanvasRenderingContext2D,
        x1: number,
        y1: number,
        x2: number,
        y2: number
    ) {
        const centerX = (x1 + x2) / 2;
        const centerY = (y1 + y2) / 2;

        const outerRadius = Math.min(
            Math.abs(x2 - x1),
            Math.abs(y2 - y1)
        ) / 2;

        const innerRadius = outerRadius * 0.5;

        const spikes = 5;
        let rotation = Math.PI / 2 * 3;
        const step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY - outerRadius);

        for (let i = 0; i < spikes; i++) {
            let x = centerX + Math.cos(rotation) * outerRadius;
            let y = centerY + Math.sin(rotation) * outerRadius;
            ctx.lineTo(x, y);
            rotation += step;

            x = centerX + Math.cos(rotation) * innerRadius;
            y = centerY + Math.sin(rotation) * innerRadius;
            ctx.lineTo(x, y);
            rotation += step;
        }

        ctx.closePath();
        ctx.stroke();
    }

}