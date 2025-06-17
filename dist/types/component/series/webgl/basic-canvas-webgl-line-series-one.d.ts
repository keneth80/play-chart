import { BaseType, Selection } from 'd3-selection';
import { ContainerSize, DisplayOption, Scale } from '../../chart/chart.interface';
import { SeriesBase } from '../../chart/series-base';
import { SeriesConfiguration } from '../../chart/series.interface';
export declare class BasicCanvasWebglLineSeriesOneModel {
    x: number;
    y: number;
    i: number;
    data: any;
    constructor(x: number, y: number, i: number, // save the index of the point as a property, this is useful
    data: any);
}
export interface BasicCanvasWebglLineSeriesOneConfiguration extends SeriesConfiguration {
    dotSelector?: string;
    xField: string;
    yField: string;
    isCurve?: boolean;
    dot?: {
        radius?: number;
        fill?: string;
    };
    line?: {
        strokeWidth?: number;
        strokeColor?: string;
    };
    data?: any[];
}
export declare class BasicCanvasWebgLineSeriesOne<T = any> extends SeriesBase {
    protected canvas: Selection<HTMLCanvasElement, any, HTMLElement, any>;
    private config;
    private seriesIndex;
    private padding;
    private gl;
    private shaderProgram;
    private displayType;
    private cashingVertices;
    private radius;
    private dotFill;
    private strokeColor;
    private strokeWidth;
    constructor(configuration: BasicCanvasWebglLineSeriesOneConfiguration);
    xField(): string;
    yField(): string;
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>, index: number): void;
    drawSeries(chartBaseData: T[], scales: Scale[], geometry: ContainerSize, option: DisplayOption): void;
    drawPointer(value: number[], selected: any[]): number;
    select(displayName: string, isSelected: boolean): void;
    hide(displayName: string, isHide: boolean): void;
    onSelectItem(value: number[], selected: any[]): void;
    destroy(): void;
    getSeriesDataByPosition(value: number[]): any;
    showPointAndTooltip(value: number[], selected: any[]): number;
    clear(): void;
    private checkSeriesColor;
    private webGLStart;
    private initGL;
    private initShaders;
    private makeVertices;
    private initBuffers;
    private drawScene;
    private execRestore;
    private drawTooltipPoint;
    private drawSelectionPoint;
    private viewClear;
}
//# sourceMappingURL=basic-canvas-webgl-line-series-one.d.ts.map