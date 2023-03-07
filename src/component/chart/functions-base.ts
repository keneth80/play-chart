import {Selection, BaseType} from 'd3-selection';
import {Subject, Observable, Subscription} from 'rxjs';

import {ChartBase} from './chart-base';
import {Scale, ContainerSize} from '../chart/chart.interface';
import {IFunctions} from './functions.interface';

export class FunctionsBase implements IFunctions {
    protected svg: Selection<any, any, HTMLElement, any>;

    protected mainGroup: Selection<any, any, any, any>;

    protected itemClickSubject: Subject<any> = new Subject();

    protected subscription: Subscription = new Subscription();

    protected isEnable = false;

    private chart: ChartBase;

    constructor() {}

    set chartBase(value: ChartBase) {
        this.chart = value;
    }

    get chartBase() {
        return this.chart;
    }

    get $currentItem(): Observable<any> {
        return this.itemClickSubject.asObservable();
    }

    enable(data: any[], scales: Scale[], geometry: ContainerSize) {}

    disable() {}

    changeConfiguration(configuration: any) {}

    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>, index: number) {}

    drawFunctions(chartData: any[], scales: Scale[], geometry: ContainerSize) {}

    destroy() {
        this.subscription.unsubscribe();
    }
}
