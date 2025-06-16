import { Selection, BaseType } from 'd3-selection';
import { Scale, ContainerSize } from '../../chart/chart.interface';
import { SeriesBase } from '../../chart/series-base';
import { SeriesConfiguration } from '../../chart/series.interface';
export interface GroupedHorizontalBarSeriesConfiguration extends SeriesConfiguration {
    xField: string;
    columns: string[];
}
export declare class GroupedHorizontalBarSeries extends SeriesBase {
    private columns;
    private rootGroup;
    private legendGroup;
    private tooltipGroup;
    private numberFmt;
    private config;
    constructor(configuration: GroupedHorizontalBarSeriesConfiguration);
    xField(): any;
    yField(): any;
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>): void;
    drawSeries(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
}
//# sourceMappingURL=grouped-horizontal-bar-series.d.ts.map