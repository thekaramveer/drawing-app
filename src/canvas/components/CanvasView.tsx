import { useEffect, useRef, useState } from "react";
import { ToolEngine } from "../tools";

import type { ToolType } from "../tools/ToolTypes";
import { renderScene } from "../renderer/renderScene";
import { attachPointerHandlers } from "../input/pointerHandlers";

import Toolbar from "./Toolbar";
import { toolRegistry } from "../tools/ToolRegistry";
import { deleteSelectedShape } from "../shapes/shapeStore";

export default function CanvasView() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const engineRef = useRef<ToolEngine | null>(null);

    const [activeTool, setActiveTool] = useState<ToolType>("line");

    useEffect(() => {
        const canvas = canvasRef.current!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext("2d")!;

        const engine = new ToolEngine(toolRegistry["line"]());
        engineRef.current = engine;

        attachPointerHandlers(canvas, engine);

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Delete" || e.key === "Backspace") {
                deleteSelectedShape();
            }
        }
        window.addEventListener("keydown", handleKeyDown);

        function loop() {
            renderScene(ctx, engine);
            requestAnimationFrame(loop);
        }

        loop();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };

    }, []);

    // Tool Switching Logic
    useEffect(() => {
        const engine = engineRef.current;
        if (!engine) return;
        engine.setTool(toolRegistry[activeTool]());
    }, [activeTool]);

    return (


        <>
            <div
                className="
    absolute
    top-6
    left-1/2
    -translate-x-1/2
    flex
    gap-2
    px-4 py-2
    rounded-full
    bg-neutral-800/90
    backdrop-blur-md
    border border-neutral-700
    shadow-lg
    cursor-grab
    active:cursor-grabbing
    select-none
  "
            >
                <Toolbar currentTool={activeTool} setTool={setActiveTool} />
            </div>


            <div className="
  w-full 
  h-full 
  rounded-2xl
  border border-neutral-700
  bg-neutral-950
  shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_rgba(0,0,0,0.6)]
  overflow-hidden
">
                <canvas ref={canvasRef} className="w-full h-full block" />
            </div>
        </>
    );
}