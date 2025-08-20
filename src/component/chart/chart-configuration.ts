import {ISeries} from './series.interface';
import {IFunctions} from './functions.interface';
import {IOptions} from './options.interface';

export const Direction = {
    BOTH: 'both',
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical'
} as const;

export type Direction = typeof Direction[keyof typeof Direction];

export const Placement = {
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right'
} as const;

export type Placement = typeof Placement[keyof typeof Placement];

export const ScaleType = {
    NUMBER: 'number',
    TIME: 'time',
    STRING: 'string',
    POINT: 'point'
} as const;

export type ScaleType = typeof ScaleType[keyof typeof ScaleType];

export const Align = {
    CENTER: 'center',
    LEFT: 'left',
    RIGHT: 'right',
    TOP: 'top',
    BOTTOM: 'bottom'
} as const;

export type Align = typeof Align[keyof typeof Align];

export const Shape = {
    LINE: 'line',
    RECT: 'rect',
    CIRCLE: 'circle',
    NONE: 'none'
} as const;

export type Shape = typeof Shape[keyof typeof Shape];


export type ShapeType = 'line' | 'rect' | 'circle' | 'none';

export interface AxisTitle {
    text: string;
    style?: {
        size?: number;
        color?: string;
        font?: string;
    };
}

export interface GridLine {
    color?: string;
    dasharray?: number;
    opacity?: number;
}

export interface ZeroLine {
    color?: string;
}

export interface Axes {
    field: string;
    type: ScaleType;
    placement: Placement;
    domain?: [number, number];
    padding?: number;
    visible?: boolean;
    isRound?: boolean;
    tickFormat?: (value: any) => string;
    tickTextParser?: (value: any) => string;
    tickSize?: number;
    zeroLine?: ZeroLine;
    gridLine?: GridLine;
    isZoom?: boolean;
    min?: number;
    max?: number;
    title?: AxisTitle;
}

export interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
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
    placement: Placement;
    content: string;
    style?: {
        size?: number;
        color?: string;
        font?: string;
    };
}

export interface ChartLegend {
    placement: Placement;
    align: Align;
    isCheckBox?: boolean;
    isAll?: boolean;
}

export interface ChartTooltip {
    tooltipTextParser?: (data: any) => string;
    visible?: boolean;
    isMultiple?: boolean;
    eventType?: 'click' | 'mouseover';
}

export interface ChartStyle {
    backgroundColor?: string;
    fontFamily?: string;
    fontSize?: number;
    fontColor?: string;
}

export interface DisplayDelay {
    delayTime: number;
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
    axes: Axes[];
    series: ISeries<T>[];
    functions?: IFunctions<T>[];
    options?: IOptions<T>[];
    data: T[];
    colors?: string[];
    min?: number;
    max?: number;
    calcField?: string;
    displayDelay?: DisplayDelay;
}
