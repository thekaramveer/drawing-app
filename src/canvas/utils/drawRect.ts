export function drawRect(ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number) {
    ctx.beginPath();
    const w = x2 - x1;
    const h = y2 - y1;

    ctx.rect(x1, y1, w, h);

}