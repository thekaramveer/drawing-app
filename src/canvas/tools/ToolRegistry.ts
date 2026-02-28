import { EllipseTool } from "./EllipseTool";
import { LineTool } from "./LineTool";
import { ArrowTool } from "./ArrowTool";
import { RectTool } from "./RectTool";
import type { Tool } from "./Tool";
import type { ToolType } from "./ToolTypes";
import { TriangleTool } from "./TriangleTool";
import { StarTool } from "./StarTool";
import { ArcTool } from "./ArcTool";


export const toolRegistry: Record<ToolType, () => Tool> = {
    line: () => new LineTool(),
    ellipse: () => new EllipseTool(),
    arrow: () => new ArrowTool(),
    rect: () => new RectTool(),
    triangle: () => new TriangleTool(),
    star: () => new StarTool(),
    arc: () => new ArcTool()

};