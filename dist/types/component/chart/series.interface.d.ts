import { BaseType, Selection } from 'd3-selection';
import { ChartBase } from './chart-base';
import { ContainerSize, DisplayOption, Scale } from './chart.interface';
export declare enum SeriesType {
    SVG_LINE = "BasicLineSeries",
    SVG_VERTICAL_BAR = "GroupedVerticalBarSeries",
    SVG_AREA = "BasicAreaSeries"
}
export interface SeriesConfiguration {
    type?: SeriesType;
    selector?: string;
    displayName?: string;
    shape?: string;
    filter?: any;
    xDirection?: string;
    yDirection?: string;
}
export interface ISeries<T = any> {
    type: string;
    chartBase: ChartBase;
    displayName: string;
    displayNames: string[];
    shape: string;
    selector: string;
    color: string;
    colors: string[];
    changeConfiguration(configuration: SeriesConfiguration): void;
    select(displayName: string, isSelected: boolean): void;
    hide(displayName: string, isHide: boolean): void;
    unSelectItem(): void;
    destroy(): void;
    getSeriesDataByPosition(value: number[]): any;
    showPointAndTooltip(value: number[], selected: any[]): number;
    drawPointer(value: number[], selected: any[]): number;
    pointerSize(selected: any[]): ContainerSize;
    tooltipStyle(selected: any[]): {
        fill: string;
        opacity: number;
        stroke: string;
    };
    tooltipText(selectedItem: any[]): string;
    onSelectItem(value: number[], selected: any[]): void;
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, seriesGroup: Selection<BaseType, any, HTMLElement, any>, index: number): void;
    drawSeries(data: T[], scales: Scale[], geometry: ContainerSize, displayOption: DisplayOption): void;
    xField(): string;
    yField(): string;
}
//# sourceMappingURL=series.interface.d.ts.map