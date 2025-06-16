import { Selection, BaseType } from 'd3-selection';
import { Scale, ContainerSize, DisplayOption } from '../chart/chart.interface';
import { SeriesBase } from '../chart/series-base';
import { SeriesConfiguration } from '../chart/series.interface';
export interface ExampleSeriesConfiguration extends SeriesConfiguration {
    xField: string;
    yField: string;
}
export declare class ExampleSeries extends SeriesBase {
    private config;
    constructor(configuration: ExampleSeriesConfiguration);
    xField(): any;
    yField(): any;
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, seriesGroup: Selection<BaseType, any, HTMLElement, any>, index: number): void;
    drawSeries(chartData: Array<any>, scales: Array<Scale>, geometry: ContainerSize, option: DisplayOption): void;
    select(displayName: string, isSelected: boolean): void;
    hide(displayName: string, isHide: boolean): void;
}
//# sourceMappingURL=example-series.d.ts.map