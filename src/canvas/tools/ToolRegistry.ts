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
    getStyle: () => DrawingStyle,
    onComplete: () => void
) => Tool;

export const toolRegistry: Record<ToolType, ToolFactory> = {
    line: (requestRender, getStyle, onComplete) =>
        new LineTool(requestRender, getStyle, onComplete),

    ellipse: (requestRender, getStyle, onComplete) =>
        new EllipseTool(requestRender, getStyle, onComplete),

    arrow: (requestRender, getStyle, onComplete) =>
        new ArrowTool(requestRender, getStyle, onComplete),

    rect: (requestRender, getStyle, onComplete) =>
        new RectTool(requestRender, getStyle, onComplete),

    triangle: (requestRender, getStyle, onComplete) =>
        new TriangleTool(requestRender, getStyle, onComplete),

    star: (requestRender, getStyle, onComplete) =>
        new StarTool(requestRender, getStyle, onComplete),

    selection: (requestRender, getStyle, onComplete) =>
        new SelectionTool(requestRender, getStyle, onComplete),

    text: (requestRender, getStyle, onComplete) =>
        new TextTool(requestRender, getStyle, onComplete),
};