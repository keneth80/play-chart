import { BaseType, Selection } from 'd3-selection';
import { ContainerSize, DisplayOption, Scale } from '../../chart/chart.interface';
import { SeriesBase } from '../../chart/series-base';
import { SeriesConfiguration } from '../../chart/series.interface';
export declare class BasicCanvasTraceModel {
    x: number;
    y: number;
    i: number;
    data: any;
    constructor(x: number, y: number, i: number, // save the index of the point as a property, this is useful
    data: any);
}
export interface BasicCanvasTraceData {
    data: any;
    width: number;
    height: number;
    strokeColor: string;
    field: string;
    displayName: string;
}
export interface BasicCanvasTraceConfiguration extends SeriesConfiguration {
    xField: string;
    yField: string;
    dot?: {
        radius?: number;
        fill?: string;
    };
    line?: {
        strokeOpacity?: number;
        strokeWidth?: number;
        strokeColor?: string;
        dashArray?: number;
        isCurve?: boolean;
    };
    data?: any[];
}
export declare class BasicCanvasTrace<T = any> extends SeriesBase {
    protected canvas: Selection<HTMLCanvasElement, any, HTMLElement, any>;
    private tooltipGroup;
    private line;
    private config;
    private restoreCanvas;
    private radius;
    private dotFill;
    private strokeColor;
    private strokeWidth;
    constructor(configuration: BasicCanvasTraceConfiguration);
    xField(): string;
    yField(): string;
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>, index: number): void;
    drawSeries(chartBaseData: T[], scales: Scale[], geometry: ContainerSize, option: DisplayOption): void;
    drawPointer(value: number[], selected: any[]): number;
    select(displayName: string, isSelected: boolean): void;
    hide(displayName: string, isHide: boolean): void;
    destroy(): void;
    getSeriesDataByPosition(value: number[]): any;
    showPointAndTooltip(value: number[], selected: any[]): number;
    onSelectItem(value: number[], selected: any[]): void;
    private checkSeriesColor;
    private drawTooltipPoint;
    private drawSelectionPoint;
}
//# sourceMappingURL=basic-canvas-trace.d.ts.map