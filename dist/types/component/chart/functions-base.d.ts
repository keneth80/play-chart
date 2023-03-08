import { Selection, BaseType } from 'd3-selection';
import { Subject, Observable, Subscription } from 'rxjs';
import { ChartBase } from './chart-base';
import { Scale, ContainerSize } from '../chart/chart.interface';
import { IFunctions } from './functions.interface';
export declare class FunctionsBase implements IFunctions {
    protected svg: Selection<any, any, HTMLElement, any>;
    protected mainGroup: Selection<any, any, any, any>;
    protected itemClickSubject: Subject<any>;
    protected subscription: Subscription;
    protected isEnable: boolean;
    private chart;
    constructor();
    set chartBase(value: ChartBase);
    get chartBase(): ChartBase;
    get $currentItem(): Observable<any>;
    enable(data: any[], scales: Scale[], geometry: ContainerSize): void;
    disable(): void;
    changeConfiguration(configuration: any): void;
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>, index: number): void;
    drawFunctions(chartData: any[], scales: Scale[], geometry: ContainerSize): void;
    destroy(): void;
}
//# sourceMappingURL=functions-base.d.ts.map