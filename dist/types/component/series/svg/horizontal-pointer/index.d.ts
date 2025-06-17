import { BaseType } from 'd3';
import { Selection } from 'd3-selection';
import { ContainerSize, Scale } from '../../../../component/chart/chart.interface';
import { SeriesBase } from '../../../../component/chart/series-base';
import { SeriesConfiguration } from '../../../../component/chart/series.interface';
export interface HorizontalPointerSeriesConfiguration extends SeriesConfiguration {
    domain: [number, number];
    unit: string;
}
export declare class HorizontalPointerSeries extends SeriesBase {
    private domain;
    private unit;
    constructor(configuration: HorizontalPointerSeriesConfiguration);
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>): void;
    drawSeries(chartData: any, scales: Scale[], geometry: ContainerSize): void;
}
//# sourceMappingURL=index.d.ts.map