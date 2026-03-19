import type { Tool } from "./Tool";
import {
    saveState,
    selectedShapeId,
    setSelectedShapeId,
    shapes
} from "../shapes/shapeStore";
import { hitTest } from "../utils/hitTest/hitTest";

const DRAG_THRESHOLD = 5;

export class SelectionTool implements Tool {
    private dragging = false;
    private hasMoved = false;
    private lastX = 0;
    private lastY = 0;

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
            }

            this.dragging = true;
            this.lastX = x;
            this.lastY = y;
            return;
        }

        //  clicked empty canvas
        if (selectedShapeId !== null) {
            setSelectedShapeId(null); // deselect
        }
    }

    onMouseMove(x: number, y: number) {
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
        }
    }

    onMouseUp() {
        // reset
        this.dragging = false;
        this.hasMoved = false;
    }

    drawPreview() { }
}