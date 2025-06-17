import { BaseType, Selection } from 'd3-selection';
import { ContainerSize, Scale } from '../../chart/chart.interface';
import { SeriesBase } from '../../chart/series-base';
import { SeriesConfiguration } from '../../chart/series.interface';
export interface GroupedVerticalBarSeriesConfiguration extends SeriesConfiguration {
    xField: string;
    columns: string[];
    colors?: string[];
    displayNames?: string[];
}
export declare class GroupedVerticalBarSeries extends SeriesBase {
    protected selectionGroup: Selection<BaseType, any, HTMLElement, any>;
    private columns;
    private rootGroup;
    private tooltipGroup;
    private isHide;
    private currentBarWidth;
    private config;
    constructor(configuration: GroupedVerticalBarSeriesConfiguration);
    xField(): any;
    yField(): any;
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>): void;
    drawSeries(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
    select(displayName: string, isSelected: boolean): void;
    hide(displayName: string, isHide: boolean): void;
    onSelectItem(value: number[], selected: any[]): void;
    getSeriesDataByPosition(value: number[]): any;
    drawPointer(value: number[], selected: any[]): number;
    pointerSize(selectedItem: any): ContainerSize;
    tooltipText(selectedItem: any[]): string;
    tooltipStyle(selectedItem: any): {
        fill: string;
        opacity: number;
        stroke: string;
    };
}
//# sourceMappingURL=grouped-vertical-bar-series.d.ts.map