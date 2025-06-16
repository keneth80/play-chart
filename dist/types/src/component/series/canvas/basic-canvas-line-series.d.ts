import { BaseType, Selection } from 'd3-selection';
import { ContainerSize, DisplayOption, Scale } from '../../chart/chart.interface';
import { SeriesBase } from '../../chart/series-base';
import { SeriesConfiguration } from '../../chart/series.interface';
export declare class BasicCanvasLineSeriesModel {
    x: number;
    y: number;
    i: number;
    selected: boolean;
    color: string;
    memoryColor: string;
    data: any;
    constructor(x: number, y: number, i: number, // save the index of the point as a property, this is useful
    color: string, memoryColor: string, selected: boolean, data: any);
}
export interface BasicCanvasLineSeriesConfiguration extends SeriesConfiguration {
    dotSelector?: string;
    xField: string;
    yField: string;
    isCurve?: boolean;
    dot?: {
        radius?: number;
    };
    style?: {
        strokeWidth?: number;
    };
    filter?: any;
    crossFilter?: {
        filerField: string;
        filterValue: string;
    };
}
export declare class BasicCanvasLineSeries<T = any> extends SeriesBase {
    protected canvas: Selection<HTMLCanvasElement, any, HTMLElement, any>;
    protected pointerCanvas: Selection<any, any, HTMLElement, any>;
    private tooltipGroup;
    private line;
    private config;
    private dataFilter;
    private strokeWidth;
    private memoryCanvas;
    private move$;
    private crossFilterDimension;
    constructor(configuration: BasicCanvasLineSeriesConfiguration);
    xField(): string;
    yField(): string;
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>, index: number): void;
    drawSeries(chartData: T[], scales: Scale[], geometry: ContainerSize, option: DisplayOption): void;
    select(displayName: string, isSelected: boolean): void;
    hide(displayName: string, isHide: boolean): void;
    destroy(): void;
    private onClickItem;
    private drawTooltipPoint;
    private drawPoint;
    private getColor;
}
//# sourceMappingURL=basic-canvas-line-series.d.ts.map