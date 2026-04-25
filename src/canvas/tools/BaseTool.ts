import type { DrawingStyle } from "../core/config/drawingStyle";

export abstract class BaseTool {
    protected requestRender: () => void;
    protected getStyle: () => DrawingStyle;
    protected onComplete: () => void;

    constructor(
        requestRender: () => void,
        getStyle: () => DrawingStyle,
        onComplete: () => void = () => { }
    ) {
        this.requestRender = requestRender;
        this.getStyle = getStyle;
        this.onComplete = onComplete;
    }
}