import type { Tool } from "./Tool";

export class ToolEngine {
    private currentTool: Tool;

    constructor(tool: Tool) {
        this.currentTool = tool;
    }

    setTool(tool: Tool) {
        this.currentTool = tool;
    }
    getTool() {
        return this.currentTool;
    }
    mouseDown(x: number, y: number) {
        this.currentTool.onMouseDown(x, y);
    }

    mouseMove(x: number, y: number) {
        this.currentTool.onMouseMove(x, y);
    }

    mouseUp(x: number, y: number) {
        this.currentTool.onMouseUp(x, y);
    }

    drawPreview(ctx: CanvasRenderingContext2D) {
        this.currentTool.drawPreview(ctx);
    }
}