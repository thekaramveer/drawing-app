import type { ToolEngine } from "../tools";

function getCanvasCoords(
    canvas: HTMLCanvasElement,
    e: MouseEvent | PointerEvent
) {
    const rect = canvas.getBoundingClientRect();

    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
    };
}

export function attachPointerHandlers(
    canvas: HTMLCanvasElement,
    engine: ToolEngine,
    requestRender: () => void
) {
    canvas.onpointerdown = (e) => {
        const { x, y } = getCanvasCoords(canvas, e);
        engine.mouseDown(x, y);
        requestRender();
    };

    canvas.onpointermove = (e) => {
        const { x, y } = getCanvasCoords(canvas, e);
        engine.mouseMove(x, y);
        requestRender();
    };

    canvas.onpointerup = (e) => {
        const { x, y } = getCanvasCoords(canvas, e);
        engine.mouseUp(x, y);
        requestRender();
    };

    return function detach() {
        canvas.onpointerdown = null;
        canvas.onpointermove = null;
        canvas.onpointerup = null;
    };
}