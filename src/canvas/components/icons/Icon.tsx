import {
    RectIcon,
    LineIcon,
    ArrowIcon,
    CircleIcon,
    TriangleIcon,
    StarIcon,
    ImageIcon,
} from "./icons";

export type IconName =
    | "rect"
    | "line"
    | "arrow"
    | "circle"
    | "triangle"
    | "star"
    | "image";

const ICONS: Record<IconName, React.FC> = {
    rect: RectIcon,
    line: LineIcon,
    arrow: ArrowIcon,
    circle: CircleIcon,
    triangle: TriangleIcon,
    star: StarIcon,
    image: ImageIcon,
};

export function Icon({ name }: { name: IconName }) {
    const Component = ICONS[name];
    return <Component />;
}