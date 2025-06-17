import { BaseType } from 'd3-selection';
import { Selection } from 'd3-selection';
import { ContainerSize, DisplayOption, DisplayType, Scale } from '../../../../component/chart/chart.interface';
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
export interface SpiderSeriesConfiguration extends SeriesConfiguration {
    domain: [number, number];
    range: [number, number];
    features: Array<string>;
    labelFmt?: Function;
    tick: ITick;
    labelWidth?: number;
}
export declare class SpiderSeries extends SeriesBase {
    private domain;
    private features;
    private labelFmt;
    private tick;
    private labelWidth;
    constructor(configuration: SpiderSeriesConfiguration);
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>): void;
    drawSeries(chartData: any[], scales: Scale[], geometry: ContainerSize, displayOption: DisplayOption): void;
    updateSeries(displayType?: typeof DisplayType[keyof typeof DisplayType]): void;
}
export {};
//# sourceMappingURL=index.d.ts.map