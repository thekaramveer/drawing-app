import {
    RectIcon,
    LineIcon,
    ArrowIcon,
    EllipseIcon,
    TriangleIcon,
    StarIcon,
    SelectoinIcon,
} from "./icons";

export type IconName =
    | "rect"
    | "line"
    | "arrow"
    | "ellipse"
    | "triangle"
    | "star"
    | "selection";

const ICONS: Record<IconName, React.FC> = {
    rect: RectIcon,
    line: LineIcon,
    arrow: ArrowIcon,
    ellipse: EllipseIcon,
    triangle: TriangleIcon,
    star: StarIcon,
    selection: SelectoinIcon,
};

export function Icon({ name }: { name: IconName }) {
    const Component = ICONS[name];
    return <Component />;
}