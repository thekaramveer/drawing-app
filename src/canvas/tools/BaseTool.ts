import type { DrawingStyle } from "../core/config/drawingStyle";

export abstract class BaseTool {
    protected requestRender: () => void;
    protected getStyle: () => DrawingStyle;

    constructor(
        requestRender: () => void,
        getStyle: () => DrawingStyle
    ) {
        this.requestRender = requestRender;
        this.getStyle = getStyle;
    }
}