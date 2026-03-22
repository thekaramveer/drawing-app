import type { ToolType } from "../tools/ToolTypes";

type ToolButtonProps = {
    tool: ToolType;
    active?: boolean;
    onSelect: (tool: ToolType) => void;
    children: React.ReactNode;
    title: string;
};

export function ToolButton({
    tool,
    active,
    onSelect,
    children,
    title
}: ToolButtonProps) {
    return (
        <button
            className={`
    w-10 h-10
    rounded-full
    flex items-center justify-center
    transition
    ${active
                    ? "bg-neutral-600 text-white"
                    : "text-neutral-300 hover:bg-neutral-700 hover:text-white"}
  `}
            onClick={() => onSelect(tool)}
            title={title}
        >
            {children}
        </button>
    );
}