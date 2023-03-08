import { Selection } from 'd3-selection';
import { Subscription } from 'rxjs';
import { Quadtree } from 'd3-quadtree';
import { ChartBase } from './chart-base';
import { ContainerSize, DisplayOption, Scale } from './chart.interface';
import { ISeries, SeriesConfiguration } from './series.interface';
export declare class SeriesBase implements ISeries {
    type: string;
    selector: string;
    displayName: string;
    displayNames: string[];
    shape: string;
    color: string;
    colors: string[];
    protected svg: Selection<any, any, HTMLElement, any>;
    protected mainGroup: Selection<any, any, HTMLElement, any>;
    protected subscription: Subscription;
    protected initGeometry: ContainerSize;
    protected geometry: ContainerSize;
    protected originQuadTree: any;
    protected xDirection: string;
    protected yDirection: string;
    private chart;
    private clipPath;
    private maskId;
    constructor(configuration: SeriesConfiguration);
    set chartBase(value: ChartBase);
    get chartBase(): ChartBase;
    xField(): any;
    yField(): any;
    changeConfiguration(configuration: SeriesConfiguration): void;
    select(displayName: string, isSelected: boolean): void;
    hide(displayName: string, isHide: boolean): void;
    unSelectItem(): void;
    setSvgElement(svg: Selection<any, any, HTMLElement, any>, mainGroup: Selection<any, any, HTMLElement, any>, index: number): void;
    drawSeries(chartData: any[], scales: Scale[], geometry: ContainerSize, displayOption: DisplayOption): void;
    setTooltipCanvas(svg: Selection<any, any, HTMLElement, any>): Selection<import("d3-selection").BaseType, any, HTMLElement, any> | Selection<SVGSVGElement, any, HTMLElement, any>;
    getSeriesDataByPosition(value: number[]): any;
    showPointAndTooltip(value: number[], selected: any[]): number;
    drawPointer(value: number[], selected: any[]): number;
    pointerSize(selected: any[]): ContainerSize;
    tooltipText(selected: any[]): string;
    tooltipStyle(selected: any[]): {
        fill: string;
        opacity: number;
        stroke: string;
    };
    onSelectItem(value: number[], selected: any[]): void;
    destroy(): void;
    drawProgress(totalCount: number, currentCount: number, canvas: {
        width: number;
        height: number;
        target: Selection<any, any, any, any>;
    }): Selection<any, any, any, any>;
    protected search(quadtreeObj: Quadtree<any[]>, x0: number, y0: number, x3: number, y3: number): any;
}
//# sourceMappingURL=series-base.d.ts.map