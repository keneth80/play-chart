import { BaseType, Selection } from 'd3-selection';
import { ContainerSize, Scale } from '../../chart/chart.interface';
import { SeriesBase } from '../../chart/series-base';
import { SeriesConfiguration } from '../../chart/series.interface';
export interface StackedHorizontalBarSeriesConfiguration extends SeriesConfiguration {
    xField: string;
    yField: string;
    columns: string[];
}
export declare class StackedHorizontalBarSeries extends SeriesBase {
    private columns;
    private rootGroup;
    private legendGroup;
    private tooltipGroup;
    private numberFmt;
    private config;
    constructor(configuration: StackedHorizontalBarSeriesConfiguration);
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>): void;
    drawSeries(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
}
//# sourceMappingURL=stacked-horizontal-bar-series.d.ts.map