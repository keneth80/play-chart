import { Selection, BaseType } from 'd3-selection';
import { SeriesBase } from '../../chart/series-base';
import { Scale, ContainerSize } from '../../chart/chart.interface';
import { SeriesConfiguration } from '../../chart/series.interface';
export interface BasicViolinSeriesConfiguration extends SeriesConfiguration {
    xField: string;
    yField: string;
}
export declare class BasicViolinSeries extends SeriesBase {
    private histogram;
    private config;
    constructor(configuration: BasicViolinSeriesConfiguration);
    xField(): string;
    yField(): string;
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>): void;
    drawSeries(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
}
//# sourceMappingURL=basic-violin-series.d.ts.map