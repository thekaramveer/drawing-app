import type { ToolType } from "../tools/ToolTypes";
import { Icon, type IconName } from "./icons/Icon";
import { ToolButton } from "./ToolButton";
import { LockIcon } from "./icons/LockIcon"; // <-- Import added here

type ToolbarProps = {
    currentTool: ToolType;
    setTool: (t: ToolType) => void;
    isLocked: boolean;
    setIsLocked: (locked: boolean) => void;
};

const TOOLS: { type: ToolType; icon: IconName }[] = [
    { type: "rect", icon: "rect" },
    { type: "line", icon: "line" },
    { type: "arrow", icon: "arrow" },
    { type: "ellipse", icon: "ellipse" },
    { type: "triangle", icon: "triangle" },
    { type: "star", icon: "star" },
    { type: "selection", icon: "selection" },
    { type: "text", icon: "text" },
];

export default function Toolbar({ currentTool, setTool, isLocked, setIsLocked }: ToolbarProps) {
    return (
        <div className="toolbar flex items-center gap-1">
            {TOOLS.map((t) => (
                <ToolButton
                    key={t.type}
                    tool={t.type}
                    active={currentTool === t.type}
                    onSelect={setTool}
                    title={t.type}
                >
                    <span><Icon name={t.icon} /></span>
                </ToolButton>
            ))}

            {/* Divider */}
            <div className="w-px h-6 bg-neutral-600 mx-1" />

            {/* Lock Button */}
            <button
                type="button"
                onClick={() => setIsLocked(!isLocked)}
                title="Lock Tool (Keep active after drawing)"
                // Added flex utility classes to keep the SVG perfectly centered
                className={`p-2 rounded-full transition-colors flex items-center justify-center ${isLocked
                    ? "bg-neutral-600 text-white"
                    : "text-neutral-300 hover:bg-neutral-700 hover:text-white"
                    }`}
            >
                {/* Replaced the emoji span with the component */}
                <LockIcon isLocked={isLocked} />
            </button>
        </div>
    );
}