import type { DrawingStyle } from "../core/config/drawingStyle";

type Props = {
    stroke: DrawingStyle;
    onChange: (style: DrawingStyle) => void;
};

export default function StrokeControlPanel({ stroke, onChange }: Props) {
    const colors = [
        "#ffffff",
        "#ef4444",
        "#e5e7eb",
        "#3b82f6",
        "#22c55e",
    ];

    return (
        <div className="flex flex-col justify-center items-start bg-[#8D7704] w-[240px] h-[100px] rounded-xl pl-3 py-2 shadow-lg">

            {/* Stroke Section */}
            <div className="flex items-center gap-3 mb-3">
                <p className="text-white text-lg font-small">Stroke</p>

                <div className="flex gap-2">
                    {colors.map((c, i) => (
                        <div
                            key={i}
                            onClick={() =>
                                onChange({
                                    ...stroke,
                                    stroke: c,
                                })
                            }
                            className={`w-5 h-5 rounded cursor-pointer transition-transform duration-150 hover:scale-110 ${stroke.stroke === c ? "ring-2 ring-black" : ""
                                }`}
                            style={{ backgroundColor: c }}
                        />
                    ))}
                </div>
            </div>

            {/* Width Section */}
            <div className="flex items-center gap-3">
                <p className="text-white text-lg font-small">Width</p>

                <input
                    type="range"
                    min="1"
                    max="20"
                    value={stroke.lineWidth}
                    onChange={(e) =>
                        onChange({
                            ...stroke,
                            lineWidth: Number(e.target.value),
                        })
                    }
                    className="accent-[#FADD5F] cursor-pointer"
                />

                {/* Optional: show value */}
                <span className="text-white text-sm w-8">
                    {stroke.lineWidth}
                </span>
            </div>
        </div>
    );
}