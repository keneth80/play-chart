import { Selection, BaseType } from 'd3-selection';
import { ContainerSize } from '../chart.interface';
import { ChartBase } from '..';
export declare const setMultiChartTooltipByPosition: (tooltipTarget: Selection<BaseType, any, BaseType, any>, tooltipText: string, chartGeometry: ContainerSize, position: number[], prevGroup?: Selection<BaseType, any, BaseType, any>, index?: number) => void;
export declare const setIndexChartTooltipByPosition: (tooltipTarget: Selection<BaseType, any, BaseType, any>, tooltipText: string, chartGeometry: ContainerSize, position: number[], tooltipPointerSize: ContainerSize, margin?: {
    left: number;
    top: number;
}, prevGroup?: Selection<BaseType, any, BaseType, any>, index?: number) => void;
export declare const setChartTooltipByPosition: (tooltipTarget: Selection<BaseType, any, BaseType, any>, tooltipText: string, chartGeometry: ContainerSize, position: number[], tooltipPointerSize: ContainerSize, margin?: {
    left: number;
    top: number;
}) => void;
export declare const centerPositionForTooltipElement: (chart: ChartBase, tooltipElement: any, position: any[], padding?: {
    top: number;
    left: number;
}) => any;
//# sourceMappingURL=tooltip-util.d.ts.map