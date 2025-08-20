import {ISeries} from './series.interface';
import {IFunctions} from './functions.interface';
import {IOptions} from './options.interface';

export enum Direction {
    BOTH = 'both',
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
}

export type DirectionType = 'both' | 'horizontal' | 'vertical';

export enum Placement {
    TOP = 'top',
    BOTTOM = 'bottom',
    LEFT = 'left',
    RIGHT = 'right'
}

export type PlacementType = 'top' | 'bottom' | 'left' | 'right';

export enum Align {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right',
    TOP = 'top',
    BOTTOM = 'bottom'
}

export type AlignType = 'left' | 'center' | 'right' | 'top' | 'bottom';

export enum ScaleType {
    NUMBER = 'number',
    TIME = 'time',
    STRING = 'string',
    POINT = 'point'
}

export type ScaleTypeType = 'number' | 'time' | 'string' | 'point';

export enum Shape {
    LINE = 'line',
    RECT = 'rect',
    CIRCLE = 'circle',
    NONE = 'none'
}

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
    type: ScaleTypeType;
    placement: PlacementType;
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
    placement: PlacementType;
    content: string;
    style?: {
        size?: number;
        color?: string;
        font?: string;
    };
}

export interface ChartLegend {
    placement: PlacementType;
    align: AlignType;
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
