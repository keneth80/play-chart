import { BaseType, Selection } from 'd3-selection';
import { ContainerSize, Scale } from '../../chart/chart.interface';
import { SeriesBase } from '../../chart/series-base';
import { SeriesConfiguration } from '../../chart/series.interface';
export interface BasicBoxplotSeriesConfiguration extends SeriesConfiguration {
    xField: string;
    maxWidth?: number;
    style?: {
        stroke?: string;
        fill?: string;
    };
}
export interface BoxplotModel {
    key: string;
    counts?: any[];
    quartile?: number[];
    whiskers?: number[];
    color?: string;
}
export declare class BasicBoxplotSeries extends SeriesBase {
    private config;
    private maxWidth;
    constructor(configuration: BasicBoxplotSeriesConfiguration);
    xField(): any;
    yField(): any;
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>): void;
    drawSeries(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
}
//# sourceMappingURL=basic-boxplot-series.d.ts.map