import { Selection, BaseType } from 'd3-selection';
import { Scale, ContainerSize } from '../chart/chart.interface';
import { FunctionsBase } from '../chart/functions-base';
export interface BasicSvgMouseGuideLineHandlerConfiguration {
    xDirection?: string;
    yDirection?: string;
    direction?: string;
    delayTime?: number;
    isMultiTooltip?: boolean;
}
export declare class BasicSvgMouseGuideLineHandler extends FunctionsBase {
    protected pointerGroup: Selection<BaseType, any, HTMLElement, any>;
    private xDirection;
    private yDirection;
    private delayTime;
    private direction;
    constructor(configuration: BasicSvgMouseGuideLineHandlerConfiguration);
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>, index: number): void;
    drawFunctions(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
    destroy(): void;
}
//# sourceMappingURL=basic-svg-mouse-guide-line-handler.d.ts.map