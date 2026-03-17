import type { Tool } from "./Tool";
import { selectedShapeId, setSelectedShapeId, shapes } from "../shapes/shapeStore";
import type { DrawingStyle } from "../core/config/drawingStyle";
import { hitTest } from "../utils/hitTest/hitTest";

const DRAG_THRESHOLD = 5;

export class SelectionTool implements Tool {
    private dragging = false;
    private lastX = 0;
    private lastY = 0;



    private style: DrawingStyle = {
        stroke: "white",
        lineWidth: 5
    }

    onMouseDown(x: number, y: number) {

        for (let i = shapes.length - 1; i >= 0; i--) {
            const shape = shapes[i];

            if (hitTest(shape, x, y)) {
                setSelectedShapeId(shape.id);

                this.dragging = true;
                this.lastX = x;
                this.lastY = y;

                return;
            }
        }

        setSelectedShapeId(null);
    }

    onMouseMove(x: number, y: number) {
        if (!this.dragging || !selectedShapeId) return;

        const shape = shapes.find(s => s.id === selectedShapeId);
        if (!shape) return;

        const dx = x - this.lastX;
        const dy = y - this.lastY;

        shape.x1 += dx;
        shape.y1 += dy;
        shape.x2 += dx;
        shape.y2 += dy;

        this.lastX = x;
        this.lastY = y;
    }

    onMouseUp() {
        this.dragging = false;
    }

    drawPreview(ctx: CanvasRenderingContext2D): void {

    }

}