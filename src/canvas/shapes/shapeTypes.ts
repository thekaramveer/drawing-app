import type { DrawingStyle } from "../core/config/drawingStyle";

export type LineShape = {
    type: "line";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    style: DrawingStyle;
};
export type EllipseShape = {
    type: "ellipse";
    cx: number;
    cy: number;
    rx: number;
    ry: number;
    style: DrawingStyle;
}
export type ArrowShape = {
    type: "arrow";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    style: DrawingStyle;
};

export type RectShape = {
    type: "rect";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    style: DrawingStyle;
}
export type TriangleShape = {
    type: "triangle";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    style: DrawingStyle;
}
export type StarShape = {
    type: "star";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    style: DrawingStyle;
}

export type Shape = LineShape | EllipseShape | ArrowShape | RectShape | TriangleShape | StarShape;
