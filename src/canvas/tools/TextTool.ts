import type { Tool } from "./Tool";
import { addShape, saveState } from "../shapes/shapeStore";
import { BaseTool } from "./BaseTool";

export class TextTool extends BaseTool implements Tool {
    private x = 0;
    private y = 0;
    private isTyping = false;
    private inputEl: HTMLInputElement | null = null;

    onMouseDown(x: number, y: number) {
        if (this.isTyping) return;

        this.x = x;
        this.y = y;
        this.isTyping = true;

        const input = document.createElement("input");
        input.type = "text";

        input.style.position = "absolute";
        input.style.left = `${x}px`;
        input.style.top = `${y}px`;
        input.style.background = "#222";
        input.style.border = "1px solid #ccc";
        input.style.color = "white";
        input.style.outline = "none";
        input.style.font = "16px sans-serif";
        input.style.zIndex = "1000";

        document.body.appendChild(input);

        setTimeout(() => input.focus(), 0);

        this.inputEl = input;

        let finished = false;

        const finish = () => {
            if (finished) return;
            finished = true;

            if (!this.inputEl) return;

            const value = this.inputEl.value.trim();

            // remove input safely
            if (this.inputEl.parentNode) {
                this.inputEl.parentNode.removeChild(this.inputEl);
            }

            this.inputEl = null;
            this.isTyping = false;

            if (!value) {
                this.requestRender();
                return;
            }

            saveState();

            const style = this.getStyle();

            addShape({
                id: crypto.randomUUID(),
                type: "text",
                x1: this.x,
                y1: this.y,
                x2: this.x,
                y2: this.y,
                text: value,
                style: { ...style },
            });

            this.requestRender();
            this.onComplete();
        };

        // Enter key
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                finish();
            }
        });

        // Blur
        setTimeout(() => {
            input.addEventListener("blur", finish);
        }, 0);
    }

    onMouseMove() { }
    onMouseUp() { }

    drawPreview() { }
}