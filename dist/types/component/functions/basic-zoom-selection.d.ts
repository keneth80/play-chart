import { BaseType, Selection } from 'd3-selection';
import { ContainerSize, Scale } from '../chart/chart.interface';
import { FunctionsBase } from '../chart/functions-base';
export interface BasicZoomSelectionConfiguration {
    targetGroup: string;
    xField: string;
    yField: string;
    xDirection?: string;
    yDirection?: string;
    direction?: string;
}
export declare class BasicZoomSelection extends FunctionsBase {
    private targetGroup;
    private targetElements;
    private xField;
    private yField;
    private xDirection;
    private yDirection;
    private direction;
    private zoomTarget;
    private originScaleX;
    private originScaleY;
    constructor(configuration: BasicZoomSelectionConfiguration);
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>): void;
    drawFunctions(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
}
//# sourceMappingURL=basic-zoom-selection.d.ts.map