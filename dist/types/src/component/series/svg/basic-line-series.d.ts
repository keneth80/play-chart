import { Selection } from 'd3-selection';
import { ContainerSize, DisplayOption, Scale } from '../../chart/chart.interface';
import { SeriesBase } from '../../chart/series-base';
import { SeriesConfiguration } from '../../chart/series.interface';
export interface BasicLineSeriesConfiguration extends SeriesConfiguration {
    xField: string;
    yField: string;
    dot?: {
        selector?: string;
        radius?: number;
        fill?: string;
        strokeWidth?: number;
    };
    line?: {
        strokeWidth?: number;
        strokeColor?: string;
        dashArray?: number;
        isCurve?: boolean;
    };
    animation?: boolean;
}
export interface BasicLineSeriesData {
    data: any;
    width: number;
    height: number;
    strokeColor: string;
    field: string;
    displayName: string;
}
export declare class BasicLineSeries extends SeriesBase {
    protected dotGroup: Selection<any, any, HTMLElement, any>;
    protected selectionGroup: Selection<any, any, HTMLElement, any>;
    private tooltipGroup;
    private line;
    private dotClass;
    private config;
    private isAnimation;
    private currentSelector;
    private isHide;
    private radius;
    private dotFill;
    private dotStrokeWidth;
    private strokeColor;
    private strokeWidth;
    constructor(configuration: BasicLineSeriesConfiguration);
    xField(): string;
    yField(): string;
    setSvgElement(svg: Selection<any, any, HTMLElement, any>, mainGroup: Selection<any, any, HTMLElement, any>): void;
    drawSeries(chartData: any[], scales: Scale[], geometry: ContainerSize, option: DisplayOption): void;
    select(displayName: string, isSelected: boolean): void;
    hide(displayName: string, isHide: boolean): void;
    onSelectItem(value: number[], selected: any[]): void;
    unSelectItem(): void;
    getSeriesDataByPosition(value: number[]): any;
    drawPointer(value: number[], selected: any[]): number;
    pointerSize(): ContainerSize;
    tooltipText(selectedItem: any[]): string;
    tooltipStyle(): {
        fill: string;
        opacity: number;
        stroke: string;
    };
    private checkSeriesColor;
}
//# sourceMappingURL=basic-line-series.d.ts.map