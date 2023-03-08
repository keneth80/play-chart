import { Selection, BaseType } from 'd3-selection';
import { ContainerSize, LegendItem } from '../chart.interface';
export declare const getTransformByArray: (transform?: string) => string[];
export declare const isIE: () => boolean;
export declare const colorDarker: (fill: any, value?: number) => any;
export declare const guid: () => string;
export declare const textWrapping: (text: any, width: number) => void;
export declare const textBreak: (target: any, pattern?: any) => void;
export declare const getOsName: () => string;
export declare const wrapTextByRowLimit: (text: any, width: number, limitRowCount?: number) => any;
export declare const getTextWidth: (text: string, fontSize: number, fontFace: string) => number;
export declare const getTextHeight: (fontSize: number, fontFace: string) => number;
export declare const getTextWidthByComputedTextLength: (text: any) => any;
export declare const getMaxText: (texts?: string[]) => string;
export declare const drawSvgCheckBox: <T = any>(selection: any, clickEvent?: any, size?: number, x?: number, y?: number, rx?: number, ry?: number, markStrokeWidth?: number, boxStrokeWidth?: number, checked?: boolean) => Selection<BaseType, any, BaseType, any>;
export declare const getAxisByPlacement: (placement: string, scale: any) => import("d3-axis").Axis<import("d3-axis").AxisDomain>;
export declare const drawLegendColorItemByRect: (targetGroup: Selection<BaseType, LegendItem, BaseType, any>, legendItemSize: {
    width: number;
    height: number;
}, keys?: LegendItem[], colors?: string[]) => Selection<BaseType | SVGRectElement, LegendItem, BaseType, LegendItem>;
export declare const drawLegendColorItemByCircle: (targetGroup: Selection<BaseType, LegendItem, BaseType, any>, legendItemSize: {
    width: number;
    height: number;
}, keys?: LegendItem[], colors?: string[]) => Selection<BaseType | SVGCircleElement, LegendItem, BaseType, LegendItem>;
export declare const drawLegendColorItemByLine: (targetGroup: Selection<BaseType, LegendItem, BaseType, any>, legendItemSize: {
    width: number;
    height: number;
}, keys?: LegendItem[], colors?: string[]) => Selection<BaseType | SVGRectElement, LegendItem, BaseType, LegendItem>;
export declare const delayExcute: (delayTime: number, callback: any) => import("rxjs").Subscription;
export declare const drawSelectionTooltipPointByCircle: (selector: string, targetGroup: Selection<BaseType, any, HTMLElement, any>, position: number[][], style: {
    radius: number;
    strokeColor: string;
    strokeWidth: number;
}) => void;
export declare const drawTooltipPointByCircle: (targetGroup: Selection<BaseType, any, HTMLElement, any>, position: number[][], style: {
    radius: number;
    strokeColor: string;
    strokeWidth: number;
}) => void;
export declare const drawSelectionPointByCircle: (targetGroup: Selection<BaseType, any, HTMLElement, any>, position: number[][], style: {
    fill: string;
    radius: number;
}) => void;
export declare const drawTooltipPointByRect: (targetGroup: Selection<BaseType, any, HTMLElement, any>, position: number[][], itemSize: ContainerSize, style: {
    fill: string;
}) => void;
export declare const drawSelectionPointByRect: (targetGroup: Selection<BaseType, any, HTMLElement, any>, position: number[][], itemSize: ContainerSize, style: {
    fill: string;
}) => void;
export declare const getElementInfoByEvent: (event: any, selector?: string) => {
    index: number;
    nodeList: BaseType[];
};
//# sourceMappingURL=d3-svg-util.d.ts.map