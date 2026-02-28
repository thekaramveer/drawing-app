export type LineShape = {
    type: "line";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};
export type EllipseShape = {
    type: "ellipse";
    cx: number;
    cy: number;
    rx: number;
    ry: number;
}
export type ArrowShape = {
    type: "arrow";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

export type RectShape = {
    type: "rect";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
export type TriangleShape = {
    type: "triangle";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
export type StarShape = {
    type: "star";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
export type ArcType = {
    type: "arc";
    cx: number;
    cy: number;
    r: number;
    startAngle: number;
    endAngle: number;
}
export type Shape = LineShape | EllipseShape | ArrowShape | RectShape | TriangleShape | StarShape | ArcType;
