import type { ToolType } from "../tools/ToolTypes";
import { Icon, type IconName } from "./icons/Icon";
import { ToolButton } from "./ToolButton";

type ToolbarProps = {
    currentTool: ToolType;
    setTool: (t: ToolType) => void;
};

const TOOLS: { type: ToolType; icon: IconName }[] = [
    { type: "rect", icon: "rect" },
    { type: "line", icon: "line" },
    { type: "arrow", icon: "arrow" },
    { type: "circle", icon: "circle" },
    { type: "triangle", icon: "triangle" },
    { type: "star", icon: "star" },
    { type: "image", icon: "image" },
];
export default function Toolbar({ currentTool, setTool }: ToolbarProps) {
    return (
        <div className="toolbar">
            {TOOLS.map((t) => (
                <ToolButton
                    key={t.type}
                    tool={t.type}
                    active={currentTool === t.type}
                    onSelect={setTool}
                >
                    <span><Icon name={t.icon} /></span>
                </ToolButton>
            ))}
        </div>
    )
}