import { Selection, BaseType } from 'd3-selection';
import { Scale, ContainerSize } from '../chart/chart.interface';
import { FunctionsBase } from '../chart/functions-base';
export interface BasicCanvasMouseHandlerConfiguration {
    isMoveEvent?: boolean;
    delayTime?: number;
}
export declare class BasicCanvasMouseHandler extends FunctionsBase {
    protected pointerCanvas: Selection<any, any, HTMLElement, any>;
    private isMoveEvent;
    private move$;
    private delayTime;
    private moveSubscription;
    constructor(configuration: BasicCanvasMouseHandlerConfiguration);
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>, index: number): void;
    drawFunctions(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
    enable(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
    disable(): void;
    destroy(): void;
    private addEvent;
    private setContainerPosition;
}
//# sourceMappingURL=basic-canvas-mouse-handler.d.ts.map