import { BaseType, Selection } from 'd3-selection';
import { ContainerSize, Scale } from '../chart/chart.interface';
import { OptionsBase } from '../chart/options-base';
export interface BasicStepAreaConfiguration<T = any> {
    selector: string;
    startField: string;
    endField: string;
    labelField: string;
    data?: Array<T>;
}
export declare class BasicStepArea<T = any> extends OptionsBase {
    private startField;
    private endField;
    private labelField;
    private stepData;
    constructor(configuration: BasicStepAreaConfiguration);
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>): void;
    drawOptions(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
    select(displayName: string, isSelected: boolean): void;
    hide(displayName: string, isHide: boolean): void;
    destroy(): void;
}
//# sourceMappingURL=basic-svg-step-area.d.ts.map