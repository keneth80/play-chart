import { BaseType, Selection } from 'd3-selection';
import { ContainerSize, DisplayOption, Scale } from '../../chart/chart.interface';
import { SeriesBase } from '../../chart/series-base';
import { SeriesConfiguration } from '../../chart/series.interface';
export interface BasicAreaSeriesConfiguration extends SeriesConfiguration {
    xField: string;
    yField: string;
    line?: {
        strokeWidth?: number;
        strokeColor?: string;
    };
    area?: {
        isCurve?: boolean;
        opacity?: number;
        color: string;
    };
}
export declare class BasicAreaSeries extends SeriesBase {
    private area;
    private line;
    private lineStyle;
    private areaStyle;
    private config;
    constructor(configuration: BasicAreaSeriesConfiguration);
    xField(): string;
    yField(): string;
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>): void;
    drawSeries(chartData: any[], scales: Scale[], geometry: ContainerSize, option: DisplayOption): void;
}
//# sourceMappingURL=basic-area-series.d.ts.map