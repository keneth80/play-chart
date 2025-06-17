import { BaseType, Selection } from 'd3-selection';
import { Observable, Subject, Subscription } from 'rxjs';
import { ContainerSize, Scale } from '../chart/chart.interface';
import { ChartBase } from './chart-base';
import { IOptions } from './options.interface';
export declare class OptionsBase implements IOptions {
    selector: string;
    protected svg: Selection<BaseType, any, HTMLElement, any>;
    protected mainGroup: Selection<any, any, HTMLElement, any>;
    protected itemClickSubject: Subject<any>;
    protected subscription: Subscription;
    private chart;
    constructor();
    set chartBase(value: ChartBase);
    get chartBase(): ChartBase;
    get $currentItem(): Observable<any>;
    changeConfiguration(configuration: any): void;
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>, index: number): void;
    drawOptions(chartData: Array<any>, scales: Array<Scale>, geometry: ContainerSize): void;
    destroy(): void;
}
//# sourceMappingURL=options-base.d.ts.map