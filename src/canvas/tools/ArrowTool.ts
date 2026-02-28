import type { Tool } from "./Tool";
import { addShape } from "../shapes/shapeStore";


export class ArrowTool implements Tool {
    private startX = 0;
    private startY = 0;
    private currentX = 0;
    private currentY = 0;
    private drawing = false;

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
            type: "arrow",
            x1: this.startX,
            y1: this.startY,
            x2: x,
            y2: y
        });

        this.drawing = false;
    }

    drawPreview(ctx: CanvasRenderingContext2D) {
        if (!this.drawing) return;
        this.drawArrow(ctx, this.startX, this.startY, this.currentX, this.currentY);
    }

    private drawArrow(
        ctx: CanvasRenderingContext2D,
        x1: number,
        y1: number,
        x2: number,
        y2: number
    ) {
        const headLength = 12; // size of arrow head

        const dx = x2 - x1;
        const dy = y2 - y1;
        const angle = Math.atan2(dy, dx);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        // left side of arrow head
        ctx.lineTo(
            x2 - headLength * Math.cos(angle - Math.PI / 6),
            y2 - headLength * Math.sin(angle - Math.PI / 6)
        );

        ctx.moveTo(x2, y2);

        // right side of arrow head
        ctx.lineTo(
            x2 - headLength * Math.cos(angle + Math.PI / 6),
            y2 - headLength * Math.sin(angle + Math.PI / 6)
        );

        ctx.stroke();
    }
}