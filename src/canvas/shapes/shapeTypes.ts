import type { DrawingStyle } from "../core/config/drawingStyle";

// shared base
type BaseShape = {
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    style: DrawingStyle;
};

// individual shapes
export type LineShape = BaseShape & {
    type: "line";
};

export type EllipseShape = BaseShape & {
    type: "ellipse";
};

export type ArrowShape = BaseShape & {
    type: "arrow";
};

export type RectShape = BaseShape & {
    type: "rect";
};

export type TriangleShape = BaseShape & {
    type: "triangle";
};

export type StarShape = BaseShape & {
    type: "star";
};

export type TextShape = BaseShape & {
    type: "text";
    text: string;
};

// union
export type Shape =
    | LineShape
    | EllipseShape
    | ArrowShape
    | RectShape
    | TriangleShape
    | StarShape
    | TextShape;