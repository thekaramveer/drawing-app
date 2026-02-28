import { CircleTool } from "./CircleTool";
import { LineTool } from "./LineTool";
import { ArrowTool } from "./ArrowTool";
import type { Tool } from "./Tool";
import type { ToolType } from "./ToolTypes";


export const toolRegistry: Record<ToolType, () => Tool> = {
    line: () => new LineTool(),
    circle: () => new CircleTool(),
    arrow: () => new ArrowTool()
};