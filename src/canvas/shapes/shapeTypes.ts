import type { DrawingStyle } from "../core/config/drawingStyle";

export type LineShape = {
    id: string;
    type: "line";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    style: DrawingStyle;
};
export type EllipseShape = {
    id: string;
    type: "ellipse";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    style: DrawingStyle;
}
export type ArrowShape = {
    id: string;
    type: "arrow";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    style: DrawingStyle;
};

export type RectShape = {
    id: string;
    type: "rect";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    style: DrawingStyle;
}
export type TriangleShape = {
    id: string;
    type: "triangle";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    style: DrawingStyle;
}
export type StarShape = {
    id: string;
    type: "star";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    style: DrawingStyle;
}

export type Shape = LineShape | EllipseShape | ArrowShape | RectShape | TriangleShape | StarShape;
