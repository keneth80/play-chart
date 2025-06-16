import { BaseType, Selection } from 'd3-selection';
import { ContainerSize, Scale } from '../../chart/chart.interface';
import { SeriesBase } from '../../chart/series-base';
import { SeriesConfiguration } from '../../chart/series.interface';
export interface BasicDonutSeriesConfiguration extends SeriesConfiguration {
    selector?: string;
    categoryField: string;
    valueField: string;
}
export declare class BasicDonutSeries extends SeriesBase {
    private categoryField;
    private valueField;
    private transition;
    private pieShape;
    private pieSeriesGroup;
    private pieLabelGroup;
    private pieLineGroup;
    private tooltipGroup;
    private numberFmt;
    constructor(configuration: BasicDonutSeriesConfiguration);
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>): void;
    drawSeries(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
    midAngle: (d: any) => any;
}
//# sourceMappingURL=basic-donut-series.d.ts.map