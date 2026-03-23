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


type ToolFactory = (requestRender: () => void) => Tool;


export const toolRegistry: Record<ToolType, ToolFactory> = {
    line: (_requestRender) => new LineTool(),
    ellipse: (_requestRender) => new EllipseTool(),
    arrow: (_requestRender) => new ArrowTool(),
    rect: (_requestRender) => new RectTool(),
    triangle: (_requestRender) => new TriangleTool(),
    star: (_requestRender) => new StarTool(),
    selection: (_requestRender) => new SelectionTool(),
    text: (requestRender) => new TextTool(requestRender),

};