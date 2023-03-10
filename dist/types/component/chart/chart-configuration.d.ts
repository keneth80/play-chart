import { ISeries } from './series.interface';
import { IFunctions } from './functions.interface';
import { IOptions } from './options.interface';
export declare enum Direction {
    BOTH = "both",
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical"
}
export declare enum Placement {
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right"
}
export declare enum ScaleType {
    NUMBER = "number",
    TIME = "time",
    STRING = "string",
    POINT = "point"
}
export declare enum Align {
    CENTER = "center",
    LEFT = "left",
    RIGHT = "right",
    TOP = "top",
    BOTTOM = "bottom"
}
export declare enum Shape {
    LINE = "line",
    RECT = "rect",
    CIRCLE = "circle",
    NONE = "none"
}
export interface AxisTitle {
    align: string;
    content: string;
    style?: {
        size?: number;
        color?: string;
        font?: string;
    };
}
export interface Axes {
    field: any;
    type: string;
    placement: string;
    domain?: any[];
    padding?: number;
    visible?: boolean;
    isRound?: boolean;
    tickFormat?: any;
    tickTextParser?: any;
    tickSize?: number;
    zeroLine?: {
        color?: string;
    };
    gridLine?: {
        color?: string;
        dasharray?: number;
        opacity?: number;
    };
    isZoom?: boolean;
    min?: number;
    max?: number;
    title?: AxisTitle;
}
export interface Margin {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    [key: string]: number;
}
export interface PlacementByElement {
    top: any;
    left: any;
    bottom: any;
    right: any;
    [key: string]: any;
}
export interface ChartTitle {
    placement: string;
    content: string;
    style?: {
        size?: number;
        color?: string;
        font?: string;
    };
}
export interface ChartLegend {
    placement: string;
    isCheckBox?: boolean;
    isAll?: boolean;
    align?: string;
}
export interface ChartTooltip {
    tooltipTextParser?: any;
    visible?: boolean;
    isMultiple?: boolean;
    eventType?: string;
}
export interface ChartStyle {
    backgroundColor?: string;
}
export interface ChartConfiguration<T = any> {
    selector: string;
    style?: ChartStyle;
    tooltip?: ChartTooltip;
    title?: ChartTitle;
    isResize?: boolean;
    isZoom?: boolean;
    legend?: ChartLegend;
    margin?: Margin;
    axes?: Axes[];
    series?: ISeries<T>[];
    functions?: IFunctions<T>[];
    options?: IOptions<T>[];
    data: T;
    colors?: string[];
    min?: number;
    max?: number;
    calcField?: string;
    displayDelay?: {
        delayTime: number;
    };
}
//# sourceMappingURL=chart-configuration.d.ts.map