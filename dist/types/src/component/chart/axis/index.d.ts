import { max, min } from 'd3-array';
import { BaseType, Selection } from 'd3-selection';
import { Axes, Margin } from '../chart-configuration';
import { ContainerSize, Scale } from '../chart.interface';
export declare const generateScaleByAxis: <T = any>(axes: Axes[], data: any[], size: ContainerSize, currentScale: {
    field: string;
    min: number;
    max: number;
}[], isRealTime?: boolean) => Scale[];
export declare const drawAxisByScale: (svgGeometry: ContainerSize, margin: Margin, isCustomMargin: boolean, scale: Scale, targetGroup: Selection<BaseType, any, HTMLElement, any>, defaultAxisLabelStyle: any, defaultAxisTitleStyle: any, axisTitleMargin: Margin, isRealTime?: boolean) => number;
export declare const setupZeroLine: (svgGeometry: ContainerSize, scale: Scale, targetGroup: Selection<BaseType, any, HTMLElement, any>) => Selection<BaseType, any, BaseType, any>;
export declare const setupBrush: (svgGeometry: ContainerSize, margin: Margin, scale: Scale, targetGroup: Selection<BaseType, any, HTMLElement, any>, updateBrushHandler: any) => void;
//# sourceMappingURL=index.d.ts.map