import { BaseType } from 'd3';
import { Selection } from 'd3-selection';
import { ContainerSize, Scale } from '../../../../component/chart/chart.interface';
import { SeriesBase } from '../../../../component/chart/series-base';
import { SeriesConfiguration } from '../../../../component/chart/series.interface';
interface ITick {
    tickCount: number;
    tickLabel?: Function;
    tickVisible?: boolean;
}
export interface SpiderData {
    [key: string]: number;
}
export interface ImageSpiderSeriesConfiguration extends SeriesConfiguration {
    domain: [number, number];
    range: [number, number];
    features: Array<string>;
    labelFmt?: Function;
    tick: ITick;
    labelColor?: (text: string) => string;
    labelDecoration?: (text: string) => string;
    seriesImage: (index: number) => {};
    backgroundImage: any;
    getSeriesInfo: (index: number) => string;
}
export declare class ImageSpiderSeries extends SeriesBase {
    private domain;
    private features;
    private labelFmt;
    private labelDecoration;
    private labelColor;
    private tick;
    private backgroundImage;
    private seriesImage;
    private getSeriesInfo;
    constructor(configuration: ImageSpiderSeriesConfiguration);
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>): void;
    drawSeries(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
}
export {};
//# sourceMappingURL=index.d.ts.map