import { Selection, BaseType } from 'd3-selection';
export declare const baseTooltipTemplate: (group: Selection<BaseType, any, HTMLElement, any>, boxStyle?: {
    fill: string;
    opacity: number;
    stroke: string;
}, textStyle?: {
    fiil: number;
    size: number;
}) => Selection<BaseType, any, HTMLElement, any>;
export declare const colorTooltipTemplate: (group: Selection<BaseType, any, HTMLElement, any>, boxStyle?: {
    fill: string;
    opacity: number;
    stroke: string;
    strokeWidth?: number;
}, textStyle?: {
    fiil: number;
    size: number;
}) => Selection<BaseType, any, HTMLElement, any>;
//# sourceMappingURL=tooltip-template.d.ts.map