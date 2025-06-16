import { BaseType, Selection } from 'd3-selection';
import { ContainerSize, Scale } from '../../chart/chart.interface';
import { SeriesBase } from '../../chart/series-base';
import { SeriesConfiguration } from '../../chart/series.interface';
export interface BasicGaugeSeriesConfiguration extends SeriesConfiguration {
    clipWidth: number;
    clipHeight: number;
    ringInset?: number;
    ringWidth: number;
    pointerWidth?: number;
    pointerTailLength?: number;
    pointerHeadLengthPercent?: number;
    minValue: number;
    maxValue: number;
    minAngle?: number;
    maxAngle?: number;
    transitionMs: number;
    majorTicks?: number;
    labelFormat?: any;
    labelInset?: number;
    colors?: string[];
}
export declare class BasicGaugeSeries extends SeriesBase {
    private arcGroup;
    private labelGroup;
    private pointerGroup;
    private config;
    private range;
    private r;
    private pointerHeadLength;
    private arc;
    private scale;
    private ticks;
    private tickData;
    private pointer;
    private arcColorFn;
    constructor(configuration: any);
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>): void;
    drawSeries(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
    private deg2rad;
    private centerTransition;
}
//# sourceMappingURL=basic-gauge-series.d.ts.map