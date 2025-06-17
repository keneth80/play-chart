import { ISeries } from './series.interface';
import { IFunctions } from './functions.interface';
import { IOptions } from './options.interface';
export declare const Direction: {
    readonly BOTH: "both";
    readonly HORIZONTAL: "horizontal";
    readonly VERTICAL: "vertical";
};
export type Direction = typeof Direction[keyof typeof Direction];
export declare const Placement: {
    readonly TOP: "top";
    readonly BOTTOM: "bottom";
    readonly LEFT: "left";
    readonly RIGHT: "right";
};
export type Placement = typeof Placement[keyof typeof Placement];
export declare const ScaleType: {
    readonly NUMBER: "number";
    readonly TIME: "time";
    readonly STRING: "string";
    readonly POINT: "point";
};
export type ScaleType = typeof ScaleType[keyof typeof ScaleType];
export declare const Align: {
    readonly CENTER: "center";
    readonly LEFT: "left";
    readonly RIGHT: "right";
    readonly TOP: "top";
    readonly BOTTOM: "bottom";
};
export type Align = typeof Align[keyof typeof Align];
export declare const Shape: {
    readonly LINE: "line";
    readonly RECT: "rect";
    readonly CIRCLE: "circle";
    readonly NONE: "none";
};
export type Shape = typeof Shape[keyof typeof Shape];
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