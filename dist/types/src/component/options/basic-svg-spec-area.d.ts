import { BaseType, Selection } from 'd3-selection';
import { ContainerSize, Scale } from '../chart/chart.interface';
import { OptionsBase } from '../chart/options-base';
export interface BasicSpecAreaConfiguration<T = any> {
    selector: string;
    startField: string;
    endField: string;
    placement?: string;
    data?: any;
    style?: {
        color: string;
    };
}
export declare class BasicSpecArea<T = any> extends OptionsBase {
    private startField;
    private endField;
    private labelField;
    private stepData;
    private placement;
    constructor(configuration: BasicSpecAreaConfiguration);
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>): void;
    drawOptions(chartData: T[], scales: Scale[], geometry: ContainerSize): void;
    select(displayName: string, isSelected: boolean): void;
    hide(displayName: string, isHide: boolean): void;
    destroy(): void;
}
//# sourceMappingURL=basic-svg-spec-area.d.ts.map