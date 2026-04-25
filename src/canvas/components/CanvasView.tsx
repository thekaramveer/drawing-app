import { useEffect, useRef, useState } from "react";
import { ToolEngine } from "../tools";

import type { ToolType } from "../tools/ToolTypes";
import { renderScene } from "../renderer/renderScene";
import { attachPointerHandlers } from "../input/pointerHandlers";

import Toolbar from "./Toolbar";
import { toolRegistry } from "../tools/ToolRegistry";
import { deleteSelectedShape, redo, undo } from "../shapes/shapeStore";
import UndoRedoPanel from "./UndoRedoPanel";
import StrokeControlPanel from "./ControlPanel";

import type { DrawingStyle } from "../core/config/drawingStyle";

export default function CanvasView() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const engineRef = useRef<ToolEngine | null>(null);
    const requestRenderRef = useRef<() => void>(() => { });

    const [activeTool, setActiveTool] = useState<ToolType>("line");

    // --- Tool Lock State ---
    const [isToolLocked, setIsToolLocked] = useState(false);
    const isToolLockedRef = useRef(isToolLocked);
    const activeToolRef = useRef(activeTool);

    // Keep refs in sync for the callback without triggering re-renders
    useEffect(() => {
        isToolLockedRef.current = isToolLocked;
    }, [isToolLocked]);

    useEffect(() => {
        activeToolRef.current = activeTool;
    }, [activeTool]);

    // GLOBAL DRAWING STYLE
    const [drawingStyle, setDrawingStyle] = useState<DrawingStyle>({
        stroke: "#ffffff",
        lineWidth: 5,
    });

    const drawingStyleRef = useRef(drawingStyle);
    useEffect(() => {
        drawingStyleRef.current = drawingStyle;
        requestRenderRef.current(); // re-render on style change
    }, [drawingStyle]);

    // return latest style
    const getStyle = () => drawingStyleRef.current;

    // --- Callback fired by tools when they finish drawing ---
    const handleToolComplete = useRef(() => {
        if (!isToolLockedRef.current && activeToolRef.current !== "selection") {
            setActiveTool("selection");
        }
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // DPI scaling
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        ctx.scale(dpr, dpr);

        let needsRender = true;

        const requestRender = () => {
            needsRender = true;
        };

        requestRenderRef.current = requestRender;

        const engine = new ToolEngine(
            toolRegistry["line"](requestRenderRef.current, getStyle, handleToolComplete.current)
        );
        engineRef.current = engine;

        const detach = attachPointerHandlers(canvas, engine, requestRender);

        function handleKeyDown(e: KeyboardEvent) {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
                e.preventDefault();
                if (e.shiftKey) {
                    redo();
                } else {
                    undo();
                }
                requestRender();
            }

            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
                e.preventDefault();
                redo();
                requestRender();
            }

            if (e.key === "Delete" || e.key === "Backspace") {
                deleteSelectedShape();
                requestRender();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        let frameId: number;

        function loop() {
            if (needsRender) {
                if (!ctx) return;
                renderScene(ctx, engine);
                needsRender = false;
            }

            frameId = requestAnimationFrame(loop);
        }

        loop();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            detach();
            cancelAnimationFrame(frameId);
        };
    }, []);

    // TOOL SWITCHING 
    useEffect(() => {
        const engine = engineRef.current;
        if (!engine) return;

        engine.setTool(
            toolRegistry[activeTool](requestRenderRef.current, getStyle, handleToolComplete.current)
        );

        requestRenderRef.current();
    }, [activeTool]);

    // force render when style changes
    useEffect(() => {
        requestRenderRef.current();
    }, [drawingStyle]);

    const handleUndo = () => {
        undo();
        requestRenderRef.current();
    };

    const handleRedo = () => {
        redo();
        requestRenderRef.current();
    };

    return (
        <>
            {/* Toolbar */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 rounded-full bg-neutral-800/90 backdrop-blur-md border border-neutral-700 shadow-lg cursor-grab active:cursor-grabbing select-none">
                {/* Pass lock state to Toolbar */}
                <Toolbar
                    currentTool={activeTool}
                    setTool={setActiveTool}
                    isLocked={isToolLocked}
                    setIsLocked={setIsToolLocked}
                />
            </div>

            {/* Stroke Panel (for drawing style) */}
            <div className="absolute top-20 left-6 z-50">
                <StrokeControlPanel
                    stroke={drawingStyle}
                    onChange={(newStyle) => setDrawingStyle(newStyle)}
                />
            </div>

            {/* Canvas */}
            <div className="w-full h-full rounded-2xl border border-neutral-700 bg-neutral-950 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full block" />
            </div>

            {/* Undo/Redo */}
            <UndoRedoPanel
                onUndo={handleUndo}
                onRedo={handleRedo}
                canUndo={true}
                canRedo={true}
            />
        </>
    );
}