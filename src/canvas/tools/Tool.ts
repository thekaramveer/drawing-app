

export interface Tool {
    onMouseDown(x: number, y: number): void;
    onMouseMove(x: number, y: number): void;
    onMouseUp(x: number, y: number): void;
    drawPreview(ctx: CanvasRenderingContext2D): void;
}