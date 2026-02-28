import type { ToolEngine } from "../tools";

function getCanvasCoords(
    canvas: HTMLCanvasElement,
    e: MouseEvent
) {
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
    };
}

export function attachPointerHandlers(
    canvas: HTMLCanvasElement,
    engine: ToolEngine
) {
    canvas.onmousedown = (e) => {
        const { x, y } = getCanvasCoords(canvas, e);
        engine.mouseDown(x, y);
    };

    canvas.onmousemove = (e) => {
        const { x, y } = getCanvasCoords(canvas, e);
        engine.mouseMove(x, y);
    };

    canvas.onmouseup = (e) => {
        const { x, y } = getCanvasCoords(canvas, e);
        engine.mouseUp(x, y);
    };
}