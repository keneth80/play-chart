import { BaseType, Selection } from 'd3-selection';
import { ContainerSize, Scale } from '../../chart/chart.interface';
import { SeriesBase } from '../../chart/series-base';
import { SeriesConfiguration } from '../../chart/series.interface';
export interface LabelSeriesConfiguration extends SeriesConfiguration {
    xField: string;
    yField: string;
    templete?: any;
}
export declare class LabelSeries extends SeriesBase {
    private templete;
    private config;
    constructor(configuration: LabelSeriesConfiguration);
    xField(): string;
    yField(): string;
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>): void;
    drawSeries(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
}
//# sourceMappingURL=label-series.d.ts.map