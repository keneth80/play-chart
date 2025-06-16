import { BaseType, Selection } from 'd3-selection';
import { ContainerSize, Scale } from '../chart/chart.interface';
import { FunctionsBase } from '../chart/functions-base';
export interface BasicSvgMouseZoomHandlerConfiguration {
    xDirection?: string;
    yDirection?: string;
    isMoveEvent?: boolean;
    direction?: string;
    delayTime?: number;
}
export declare class BasicSvgMouseZoomHandler extends FunctionsBase {
    protected pointerGroup: Selection<any, any, HTMLElement, any>;
    protected zoomBackDrop: Selection<any, any, BaseType, any>;
    protected zoomBox: Selection<any, any, BaseType, any>;
    private xDirection;
    private yDirection;
    private isZoom;
    private delayTime;
    private xMinValue;
    private xMaxValue;
    private yMinValue;
    private yMaxValue;
    private direction;
    private isMoveEvent;
    private tempZoomBox;
    private moveSubscription;
    private isDrag;
    constructor(configuration: BasicSvgMouseZoomHandlerConfiguration);
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>, index: number): void;
    drawFunctions(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
    enable(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
    disable(): void;
    destroy(): void;
    private dragElementInit;
    private dragElementClear;
    private drawZoomBox;
    private drawZoomBox2;
}
//# sourceMappingURL=basic-svg-mouse-zoom-handler.d.ts.map