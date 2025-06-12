import {ISeries} from './series.interface';
import {IFunctions} from './functions.interface';
import {IOptions} from './options.interface';

export const Direction = {
    BOTH: 'both',
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical'
} as const;

type Direction = typeof Direction[keyof typeof Direction];

export const Placement = {
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right'
} as const;

type Placement = typeof Placement[keyof typeof Placement];

export const ScaleType = {
    NUMBER: 'number',
    TIME: 'time',
    STRING: 'string',
    POINT: 'point'
} as const;

type ScaleType = typeof ScaleType[keyof typeof ScaleType];

export const Align = {
    CENTER: 'center',
    LEFT: 'left',
    RIGHT: 'right',
    TOP: 'top',
    BOTTOM: 'bottom'
} as const;

type Align = typeof Align[keyof typeof Align];

export const Shape = {
    LINE: 'line',
    RECT: 'rect',
    CIRCLE: 'circle',
    NONE: 'none'
} as const;

type Shape = typeof Shape[keyof typeof Shape];


export interface AxisTitle {
    align: string; // top, bottom, left, right, center default: center
    content: string; // title text
    style?: {
        size?: number;
        color?: string;
        font?: string;
    };
}

export interface Axes {
    field: any; // data propertie
    type: string; // default: number, option: number or string or point or time => number: scaleLinear, time: scaleTime, string: scaleBand, point: scalePoint for range
    placement: string; // position
    domain?: any[]; // axis texts
    padding?: number;
    visible?: boolean;
    isRound?: boolean; // nice() call 여부
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
    min?: number; // only type is number
    max?: number; // only type is number
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
    placement: string; // top, bottom, left, right
    content: string; // title text
    style?: {
        size?: number;
        color?: string;
        font?: string;
    };
}

export interface ChartLegend {
    placement: string; // top, bottom, left, right
    isCheckBox?: boolean; // default: true
    isAll?: boolean; // default: true
    align?: string;
    // shape?: string;
}

export interface ChartTooltip {
    tooltipTextParser?: any;
    visible?: boolean;
    isMultiple?: boolean; // default: false
    eventType?: string; // click or mouseover
}

export interface ChartStyle {
    backgroundColor?: string;
}

export interface ChartConfiguration<T = any> {
    selector: string;

    style?: ChartStyle;

    tooltip?: ChartTooltip;

    title?: ChartTitle; // chart title

    isResize?: boolean; // default: true

    isZoom?: boolean;

    legend?: ChartLegend; // legend display

    margin?: Margin; // custom margin

    axes?: Axes[]; // axis list

    series?: ISeries<T>[]; // series list

    functions?: IFunctions<T>[]; // function list

    options?: IOptions<T>[]; // function list

    data: T; // data

    colors?: string[]; // custom color (default: d3.schemeCategory10, size: 10)

    min?: number; // only type is number

    max?: number; // only type is number

    calcField?: string; // for only min max configration

    displayDelay?: {
        delayTime: number;
    };
}
