import type { Tool } from "./Tool";
import {
    saveState,
    selectedShapeId,
    setSelectedShapeId,
    shapes
} from "../shapes/shapeStore";
import { hitTest } from "../utils/hitTest/hitTest";
import { BaseTool } from "./BaseTool";

const DRAG_THRESHOLD = 5;

export class SelectionTool extends BaseTool implements Tool {
    private dragging = false;
    private hasMoved = false;
    private lastX = 0;
    private lastY = 0;

    // State for the Selection Marquee ---
    private isBoxSelecting = false;
    private startX = 0;
    private startY = 0;
    private currentX = 0;
    private currentY = 0;

    onMouseDown(x: number, y: number) {
        this.dragging = false;
        this.hasMoved = false;

        let clickedShape = null;

        // top-most shape detection
        for (let i = shapes.length - 1; i >= 0; i--) {
            if (hitTest(shapes[i], x, y)) {
                clickedShape = shapes[i];
                break;
            }
        }

        // clicked on a shape
        if (clickedShape) {
            if (clickedShape.id !== selectedShapeId) {
                // only save if selection actually changes
                setSelectedShapeId(clickedShape.id);
                this.requestRender();
            }

            this.dragging = true;
            this.lastX = x;
            this.lastY = y;
            return;
        }

        //  clicked empty canvas
        if (selectedShapeId !== null) {
            setSelectedShapeId(null); // deselect
            this.requestRender();
        }

        // ---Start Box Selection ---
        this.isBoxSelecting = true;
        this.startX = x;
        this.startY = y;
        this.currentX = x;
        this.currentY = y;
    }

    onMouseMove(x: number, y: number) {
        // ---Handle Box Selection Dragging ---
        if (this.isBoxSelecting) {
            this.currentX = x;
            this.currentY = y;
            this.requestRender(); // Force re-render to draw the growing box
            return;
        }

        if (!this.dragging || !selectedShapeId) return;

        const shape = shapes.find(s => s.id === selectedShapeId);
        if (!shape) return;

        const dx = x - this.lastX;
        const dy = y - this.lastY;

        // detect actual movement
        if (!this.hasMoved) {
            const dist = dx * dx + dy * dy;
            if (dist > DRAG_THRESHOLD * DRAG_THRESHOLD) {
                this.hasMoved = true;
                saveState(); //save BEFORE modifying 
            }
        }

        if (this.hasMoved) {
            shape.x1 += dx;
            shape.y1 += dy;
            shape.x2 += dx;
            shape.y2 += dy;

            this.lastX = x;
            this.lastY = y;
            this.requestRender();
        }
    }

    onMouseUp() {
        // --- Handle Box Selection Finish ---
        if (this.isBoxSelecting) {
            this.isBoxSelecting = false;

            // TODO: Here is where i will eventually add logic to find 
            // all shapes that intersect with selection rectangle 
            // and will add them to a multi-selection array.

            this.requestRender(); // Re-render to erase the box
        }

        // reset
        this.dragging = false;
        this.hasMoved = false;
    }

    drawPreview(ctx: CanvasRenderingContext2D) {
        if (this.isBoxSelecting) {
            const width = this.currentX - this.startX;
            const height = this.currentY - this.startY;

            ctx.save();

            // Excalidraw-style colors: semi-transparent blue fill, solid blue stroke
            ctx.fillStyle = "rgba(105, 101, 219, 0.08)";
            ctx.strokeStyle = "rgba(105, 101, 219, 1)";
            ctx.lineWidth = 1;

            ctx.fillRect(this.startX, this.startY, width, height);
            ctx.strokeRect(this.startX, this.startY, width, height);

            ctx.restore();
        }
    }
}