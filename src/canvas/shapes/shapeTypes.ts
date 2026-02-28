export type LineShape = {
    type: "line";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};
export type CircleShape = {
    type: "circle";
    x1: number;
    y1: number;
    radius: number;
    startAngle: number;
    endAngle: number;
}
export type ArrowShape = {
    type: "arrow";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

export type Shape = LineShape | CircleShape | ArrowShape;
