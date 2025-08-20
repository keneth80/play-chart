import { BaseType, Selection } from 'd3-selection';
import { ContainerSize, Scale } from '../chart/chart.interface';
import { FunctionsBase } from '../chart/functions-base';
export interface BasicCanvasMouseZoomHandlerConfiguration {
    xDirection?: string;
    yDirection?: string;
    isMoveEvent?: boolean;
    direction?: string;
    delayTime?: number;
}
export declare class BasicCanvasMouseZoomHandler extends FunctionsBase {
    protected zoomCanvas: Selection<HTMLCanvasElement, any, HTMLElement, any>;
    protected pointerCanvas: Selection<any, any, any, any>;
    private xDirection;
    private yDirection;
    private isZoom;
    private xMinValue;
    private xMaxValue;
    private yMinValue;
    private yMaxValue;
    private direction;
    private isMoveEvent;
    private delayTime;
    private move$;
    private moveSubscription;
    constructor(configuration: BasicCanvasMouseZoomHandlerConfiguration);
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>, index: number): void;
    drawFunctions(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
    enable(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
    disable(): void;
    destroy(): void;
    private addEvent;
    private drawZoomBox;
    private setContainerPosition;
}
//# sourceMappingURL=basic-canvas-mouse-zoom-handler.d.ts.map