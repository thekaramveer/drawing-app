export function drawTriangle(
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number
) {
    const width = x2 - x1;
    const height = y2 - y1;

    ctx.beginPath();
    ctx.moveTo(x1 + width / 2, y1);       // top center
    ctx.lineTo(x1, y1 + height);          // bottom left
    ctx.lineTo(x2, y2);                   // bottom right
    ctx.closePath();
    ctx.stroke();
}