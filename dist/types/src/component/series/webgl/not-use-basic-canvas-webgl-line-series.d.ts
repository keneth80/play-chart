import { Selection, BaseType } from 'd3-selection';
import { Scale, ContainerSize, DisplayOption } from '../../chart/chart.interface';
import { SeriesBase } from '../../chart/series-base';
import { SeriesConfiguration } from '../../chart/series.interface';
export declare class BasicCanvasWebglLineSeriesModel {
    x: number;
    y: number;
    i: number;
    data: any;
    constructor(x: number, y: number, i: number, // save the index of the point as a property, this is useful
    data: any);
}
export interface BasicCanvasWebglLineSeriesConfiguration extends SeriesConfiguration {
    dotSelector?: string;
    xField: string;
    yField: string;
    isCurve?: boolean;
    dot?: {
        radius?: number;
    };
    style?: {
        strokeWidth?: number;
        strokeColor?: string;
        fill?: string;
        opacity?: number;
    };
    filter?: any;
    data?: any[];
}
export declare class BasicCanvasWebgLineSeries<T = any> extends SeriesBase {
    protected canvas: Selection<HTMLCanvasElement, any, HTMLElement, any>;
    private tooltipGroup;
    private config;
    private dataFilter;
    private strokeWidth;
    private strokeColor;
    private strokeOpacity;
    private seriesIndex;
    private move$;
    private seriesData;
    private gl;
    private shaderProgram;
    private restoreCanvas;
    private radius;
    private lineStroke;
    private lineColor;
    constructor(configuration: BasicCanvasWebglLineSeriesConfiguration);
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>, index: number): void;
    drawSeries(chartBaseData: any, scales: Scale[], geometry: ContainerSize, option: DisplayOption): void;
    select(displayName: string, isSelected: boolean): void;
    hide(displayName: string, isHide: boolean): void;
    destroy(): void;
    getSeriesDataByPosition(value: number[]): any;
    showPointAndTooltip(value: number[], selected: any[]): number;
    onSelectItem(selectedItem: any[], position: any[]): void;
    clear(): void;
    getCanvasNode(): any;
    getGeometry(): ContainerSize;
    drawTargetSeries(): void;
    private setChartTooltip;
    private webGLStart;
    private initGL;
    private initShaders;
    private makeVertices;
    private initBuffers;
    private drawScene;
    private execRestore;
    private drawTooltipPoint;
    private viewClear;
}
//# sourceMappingURL=not-use-basic-canvas-webgl-line-series.d.ts.map