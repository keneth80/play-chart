import { BaseType, Selection } from 'd3-selection';
import { ContainerSize, Scale } from '../chart/chart.interface';
import { OptionsBase } from '../chart/options-base';
export interface BasicStepLineConfiguration<T = any> {
    selector: string;
    xField: string;
    data?: any[];
}
export declare class BasicStepLine<T = any> extends OptionsBase {
    private xField;
    private stepData;
    constructor(configuration: BasicStepLineConfiguration);
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>): void;
    drawOptions(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
    select(displayName: string, isSelected: boolean): void;
    hide(displayName: string, isHide: boolean): void;
    destroy(): void;
}
//# sourceMappingURL=basic-svg-step-line.d.ts.map