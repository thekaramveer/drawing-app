import { EllipseTool } from "./EllipseTool";
import { LineTool } from "./LineTool";
import { ArrowTool } from "./ArrowTool";
import { RectTool } from "./RectTool";
import type { Tool } from "./Tool";
import type { ToolType } from "./ToolTypes";
import { TriangleTool } from "./TriangleTool";
import { StarTool } from "./StarTool";
import { SelectionTool } from "./SelectionTool";
import { TextTool } from "./TextTool";
import type { DrawingStyle } from "../core/config/drawingStyle";


type ToolFactory = (
    requestRender: () => void,
    getStyle: () => DrawingStyle
) => Tool;


export const toolRegistry: Record<ToolType, ToolFactory> = {
    line: (requestRender, getStyle) =>
        new LineTool(requestRender, getStyle),

    ellipse: (requestRender, getStyle) =>
        new EllipseTool(requestRender, getStyle),

    arrow: (requestRender, getStyle) =>
        new ArrowTool(requestRender, getStyle),

    rect: (requestRender, getStyle) =>
        new RectTool(requestRender, getStyle),

    triangle: (requestRender, getStyle) =>
        new TriangleTool(requestRender, getStyle),

    star: (requestRender, getStyle) =>
        new StarTool(requestRender, getStyle),

    selection: (requestRender, getStyle) =>
        new SelectionTool(requestRender, getStyle),

    text: (requestRender, getStyle) =>
        new TextTool(requestRender, getStyle),
};