import { Selection } from 'd3-selection';
import { ContainerSize, Scale } from '../../chart/chart.interface';
import { SeriesBase } from '../../chart/series-base';
import { SeriesConfiguration } from '../../chart/series.interface';
export interface BasicPieSeriesConfiguration extends SeriesConfiguration {
    categoryField: string;
    valueField: string;
    innerRadius?: number;
    isLabel?: boolean;
}
export declare class BasicPieSeries extends SeriesBase {
    private categoryField;
    private valueField;
    private transition;
    private pieShape;
    private innerRadius;
    private isLabel;
    constructor(configuration: BasicPieSeriesConfiguration);
    setSvgElement(svg: Selection<any, any, HTMLElement, any>, mainGroup: Selection<any, any, HTMLElement, any>): void;
    drawSeries(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
}
//# sourceMappingURL=basic-pie-series.d.ts.map