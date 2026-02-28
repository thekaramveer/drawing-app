import {
    RectIcon,
    LineIcon,
    ArrowIcon,
    EllipseIcon,
    TriangleIcon,
    StarIcon,
    ImageIcon,
} from "./icons";

export type IconName =
    | "rect"
    | "line"
    | "arrow"
    | "ellipse"
    | "triangle"
    | "star"
    | "image";

const ICONS: Record<IconName, React.FC> = {
    rect: RectIcon,
    line: LineIcon,
    arrow: ArrowIcon,
    ellipse: EllipseIcon,
    triangle: TriangleIcon,
    star: StarIcon,
    image: ImageIcon,
};

export function Icon({ name }: { name: IconName }) {
    const Component = ICONS[name];
    return <Component />;
}