# Drawing App

A simple drawing application built using React, TypeScript, and HTML5 Canvas.

## Features

* Freehand drawing
* Basic shapes (rectangle, ellipse, line, text)
* Undo functionality

## Tech Stack

* React (Vite)
* TypeScript
* HTML5 Canvas

## Getting Started

Clone the repository:

```bash
git clone https://github.com/thekaramveer/drawing-app.git
cd drawing-app
```

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

## Folder Structure

```
src/
├── App.css
├── App.tsx
├── index.css
├── main.tsx
└── canvas/
    ├── components/          # UI elements (Toolbar, Panels, Undo/Redo)
    │   ├── CanvasView.tsx
    │   ├── ControlPanel.tsx
    │   ├── ToolButton.tsx
    │   ├── Toolbar.tsx
    │   ├── UndoRedoPanel.tsx
    │   └── icons/
    │       ├── Icon.tsx
    │       └── icons.tsx
    ├── core/                # Global configurations
    │   └── config/
    │       └── drawingStyle.ts
    ├── input/               # Mouse and touch event handlers
    │   └── pointerHandlers.ts
    ├── renderer/            # Core HTML5 Canvas rendering logic
    │   ├── drawShape.ts
    │   ├── index.ts
    │   └── renderScene.ts
    ├── shapes/              # Data models and state management
    │   ├── geometry.ts
    │   ├── shapeStore.ts
    │   └── shapeTypes.ts
    ├── tools/               # Individual drawing tools (Strategy Pattern)
    │   ├── ArrowTool.ts
    │   ├── BaseTool.ts
    │   ├── EllipseTool.ts
    │   ├── LineTool.ts
    │   ├── RectTool.ts
    │   ├── SelectionTool.ts
    │   ├── StarTool.ts
    │   ├── TextTool.ts
    │   ├── Tool.ts
    │   ├── ToolEngine.ts
    │   ├── ToolRegistry.ts
    │   ├── ToolTypes.ts
    │   ├── TriangleTool.ts
    │   └── index.ts
    └── utils/               # Math, drawing helpers, and collision detection
        ├── distance.ts
        ├── drawArrow.ts
        ├── drawEllipse.ts
        ├── drawLine.ts
        ├── drawRect.ts
        ├── drawSelectionOutline.ts
        ├── drawStar.ts
        ├── drawTriangle.ts
        └── hitTest/         # Logic for shape selection and interaction
            ├── hitTest.ts
            ├── isPointInEllipse.ts
            ├── isPointInNRect.ts
            ├── isPointInStar.ts
            ├── isPointInText.ts
            ├── isPointInTriangle.ts
            └── isPointNearLine.ts
```

## Live Demo


## Author

Karamveer Chahar
