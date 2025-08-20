import { BaseType, Selection } from 'd3-selection';
import { ContainerSize, DisplayOption, Scale } from '../../chart/chart.interface';
import { SeriesBase } from '../../chart/series-base';
import { SeriesConfiguration } from '../../chart/series.interface';
export declare class BasicCanvasScatterPlotModel {
    x: number;
    y: number;
    z: number;
    i: number;
    selected: boolean;
    obj: any;
    constructor(x: number, y: number, z: number, i: number, // save the index of the point as a property, this is useful
    selected: boolean, obj: any);
}
export interface BasicCanvasScatterPlotConfiguration extends SeriesConfiguration {
    xField: string;
    yField: string;
    pointer?: {
        radius: number;
        stroke?: {
            color: string;
            strokeWidth: number;
        };
    };
}
export declare class BasicCanvasScatterPlot<T = any> extends SeriesBase {
    protected canvas: Selection<HTMLCanvasElement, any, HTMLElement, any>;
    private prevCanvas;
    private bufferCanvas;
    private isRestore;
    private isZoom;
    private xMinValue;
    private xMaxValue;
    private yMinValue;
    private yMaxValue;
    private pointerRadius;
    private strokeWidth;
    private strokeColor;
    private originData;
    private mouseSubscription;
    private config;
    constructor(configuration: BasicCanvasScatterPlotConfiguration);
    xField(): string;
    yField(): string;
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>): void;
    drawSeries(chartData: T[], scales: Scale[], geometry: ContainerSize, option: DisplayOption): void;
    destroy(): void;
    private addMouseEvent;
    private setContainerPosition;
    private getObjectWithArrayInPromise;
    private drawZoomBox;
    private drawCircle;
}
//# sourceMappingURL=basic-canvas-scatter-plot.d.ts.map