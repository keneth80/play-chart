import { BaseType, Selection } from 'd3-selection';
import { ContainerSize, Scale } from '../../chart/chart.interface';
import { SeriesBase } from '../../chart/series-base';
import { SeriesConfiguration } from '../../chart/series.interface';
export interface BasicBollingerBandSeriesConfiguration extends SeriesConfiguration {
    xField: string;
    style?: {
        stroke?: string;
        fill?: string;
    };
}
export interface BollingerBandModel {
    key: string;
    ma: number;
    low: number;
    high: number;
}
export declare class BasicBollingerBandSeries extends SeriesBase {
    private config;
    constructor(configuration: BasicBollingerBandSeriesConfiguration);
    xField(): any;
    yField(): any;
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>): void;
    drawSeries(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
}
//# sourceMappingURL=basic-bollinger-band-series.d.ts.map