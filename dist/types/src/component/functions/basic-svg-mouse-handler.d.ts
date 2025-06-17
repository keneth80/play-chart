import { Selection, BaseType } from 'd3-selection';
import { Scale, ContainerSize } from '../chart/chart.interface';
import { FunctionsBase } from '../chart/functions-base';
export interface BasicSvgMouseHandlerConfiguration {
    isMoveEvent?: boolean;
    delayTime?: number;
}
export declare class BasicSvgMouseHandler extends FunctionsBase {
    protected pointerGroup: Selection<BaseType, any, HTMLElement, any>;
    private isMoveEvent;
    private delayTime;
    constructor(configuration: BasicSvgMouseHandlerConfiguration);
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>, index: number): void;
    drawFunctions(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
    destroy(): void;
    private setContainerPosition;
}
//# sourceMappingURL=basic-svg-mouse-handler.d.ts.map