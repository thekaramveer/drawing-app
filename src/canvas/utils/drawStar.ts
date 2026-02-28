export function drawStar(
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number
) {
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;

    const outerRadius = Math.min(
        Math.abs(x2 - x1),
        Math.abs(y2 - y1)
    ) / 2;

    const innerRadius = outerRadius * 0.5;

    const spikes = 5;
    let rotation = Math.PI / 2 * 3;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY - outerRadius);

    for (let i = 0; i < spikes; i++) {
        let x = centerX + Math.cos(rotation) * outerRadius;
        let y = centerY + Math.sin(rotation) * outerRadius;
        ctx.lineTo(x, y);
        rotation += step;

        x = centerX + Math.cos(rotation) * innerRadius;
        y = centerY + Math.sin(rotation) * innerRadius;
        ctx.lineTo(x, y);
        rotation += step;
    }

    ctx.closePath();
    ctx.stroke();
}