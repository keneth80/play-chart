// import './chart.css';
import {schemeCategory10} from 'd3-scale-chromatic';
import {select, Selection} from 'd3-selection';

import {from, fromEvent, interval, Observable, Observer, of, Subject, Subscription, timer} from 'rxjs';
import {concatMap, debounceTime, delay, map, mapTo, switchMap, tap} from 'rxjs/operators';

import crossFilter from 'crossfilter2';
import {sha1} from 'object-hash';

import {drawAxisByScale, generateScaleByAxis, setupZeroLine} from './axis';
import {Axes, ChartConfiguration, ChartTitle, ChartTooltip, Margin, Placement, PlacementByElement} from './chart-configuration';
import {ChartSelector} from './chart-selector-variable';
import {
    ChartItemEvent,
    ChartMouseEvent,
    ChartZoomEvent,
    ContainerSize,
    DisplayType,
    IChartBase,
    LegendItem,
    Scale,
    TooltipEvent
} from './chart.interface';
import {IFunctions} from './functions.interface';
import {drawGridLine} from './grid-line';
import {ChartLegend} from './legend';
import {IOptions} from './options.interface';
import {axisSetupByScale} from './scale';
import {ISeries, SeriesConfiguration} from './series.interface';
import {baseTooltipTemplate} from './tooltip/tooltip-template';
import {clearCanvas} from './util/canvas-util';
import {makeSeriesByConfigurationType} from './util/chart-util';
import {delayExcute, getElementInfoByEvent, getTransformByArray, guid} from './util/d3-svg-util';
import {setChartTooltipByPosition, setMultiChartTooltipByPosition} from './util/tooltip-util';
import {setupWebglContext} from './util/webgl-util';

// TODO: 모든 참조되는 함수들은 subject로 바꾼다.
export class ChartBase<T = any> implements IChartBase {
    isResize = false;

    mouseEventSubject: Subject<ChartMouseEvent> = new Subject();

    zoomEventSubject: Subject<ChartZoomEvent> = new Subject();

    chartItemEventSubject: Subject<ChartItemEvent> = new Subject();

    isTooltipDisplay = false; // 현재 툴팁이 열려있는지 판단여부.

    protected svgWidth = 0;

    protected svgHeight = 0;

    protected scales: Scale[] = [];

    protected width = Infinity;

    protected height = Infinity;

    protected originalData: any = [];

    protected svg: Selection<any, any, HTMLElement, any>;

    protected selector: Selection<any, any, HTMLElement, any>;

    protected mainGroup: Selection<any, any, HTMLElement, any>;

    protected zoomGroup: Selection<any, any, HTMLElement, any>; // svg용 zoom handler group

    protected selectionGroup: Selection<any, any, HTMLElement, any>; // svg용 select item group

    protected optionGroup: Selection<any, any, HTMLElement, any>;

    protected seriesGroup: Selection<any, any, HTMLElement, any>;

    protected titleGroup: Selection<any, any, any, any>;

    protected legendGroup: Selection<any, any, any, any>;

    protected seriesList: ISeries[] = [];

    protected functionList: IFunctions[] = [];

    protected optionList: IOptions[] = [];

    protected subscription: Subscription;

    protected chartClickSubject: Subject<any> = new Subject();

    protected tooltipGroup: Selection<any, any, HTMLElement, any>;

    protected tooltipTemplete: any = baseTooltipTemplate;

    protected margin: Margin = {
        top: 25,
        left: 20,
        bottom: 30,
        right: 20
    }; // default margin

    protected defaultTitleStyle: any = {
        font: {
            family: 'Arial, Helvetica, sans-serif',
            size: 16,
            color: '#999'
        }
    };

    protected defaultLegendStyle: any = {
        font: {
            family: 'Arial, Helvetica, sans-serif',
            size: 12,
            color: '#999'
        }
    };

    protected defaultAxisLabelStyle: any = {
        font: {
            family: 'Arial, Helvetica, sans-serif',
            size: 12,
            color: '#000'
        }
    };

    protected defaultAxisTitleStyle: any = {
        font: {
            family: 'Arial, Helvetica, sans-serif',
            size: 14,
            color: '#000'
        }
    };

    private config: ChartConfiguration;

    private isTooltip = false;

    private isTooltipMultiple = false;

    private clipPath: Selection<any, any, HTMLElement, any>;

    private originDomains: any = {};

    private idleTimeout: any;

    private maskId: string;

    private colors: string[];

    private isCustomMargin = false;

    // ===================== axis configuration start ===================== //
    private axisGroups: any = {
        top: null,
        left: null,
        bottom: null,
        right: null
    };

    private gridLineGroups: PlacementByElement = {
        top: null,
        left: null,
        bottom: null,
        right: null
    };

    private axisTitleMargin: Margin = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }; // axis title margin
    // ===================== axis configuration end ===================== //

    // ===================== Title configuration start ===================== //
    private isTitle = false;

    private titleContainerSize: ContainerSize = {
        width: 0,
        height: 0
    };

    private titlePlacement = 'top';
    // ===================== Title configuration end ===================== //

    // ===================== Legend configuration start ===================== //
    private isLegend = false;

    private legendPlacement = 'right';

    private legendAlign = 'left';

    private legendContainerSize: ContainerSize = {
        width: 0,
        height: 0
    };

    private legendPadding = 5;

    private currentLegend: string = null;

    private isLegendCheckBox = true;

    private isLegendAll = true;

    private chartLegend: ChartLegend;

    private isLegendAllHide = false;
    // ===================== Legend configuration end ===================== //

    // ===================== current min max start ===================== //
    private currentScale: {field: string; min: number; max: number}[] = [];
    // ===================== current min max start ===================== //

    // multi tooltip 및 series 별 tooltip을 구분할 수 있는 저장소.
    private tooltipItems: {selector: string}[] = [];

    private maxTooltipCount = 4;

    private tooltipEventSubject = new Subject<TooltipEvent>();

    // series delay display observable
    private eachElementAsObservableSubscription: Subscription = new Subscription();

    private webglCanvas: Selection<any, any, HTMLElement, any>;

    private webglContext: any;

    private prevCurrentItemHash = '';

    private crossFilterObject: any = null;

    private chartLifecycleSubject: Subject<{type: string}> = new Subject();

    private isRealTime = false;

    private realTimeSubscription: Subscription;

    constructor(configuration: ChartConfiguration) {
        this.config = configuration;
        this.bootstrap(this.config);
    }

    get chartData(): T[] {
        return this.originalData;
    }

    set chartData(value: T[]) {
        this.originalData = value;
        this.draw();
    }

    get chartContainer(): Selection<any, any, HTMLElement, any> {
        return this.selector;
    }

    // 이 함수는 보류 (미구현)
    get webglElementContext() {
        if (!this.webglCanvas) {
            this.webglCanvas = select(document.createElement('CANVAS'));
            this.webglCanvas.attr('width', this.width).attr('height', this.height);

            if (!this.webglContext) {
                this.webglContext = setupWebglContext(this.webglCanvas);
            }
        }
        this.webglContext.imageSmoothingQuality = 'high'; // "low|medium|high"
        this.webglContext.imageSmoothingEnabled = true;
        this.webglContext.viewportWidth = this.width;
        this.webglContext.viewportHeight = this.height;
        return this.webglContext;
    }

    // 이 함수는 보류 (미구현)
    get webglCanvasElement() {
        return this.webglCanvas;
    }

    get chartMargin(): {left: number; top: number; right: number; bottom: number} {
        const transform: string[] = getTransformByArray(this.mainGroup.attr('transform'));
        const left = +transform[0];
        const top = +transform[1];
        const right = this.svgWidth - (left + this.width);
        const bottom = this.svgHeight - (top + this.height);

        return {
            left,
            top,
            right,
            bottom
        };
    }

    set toolTipTemplete(value: any) {
        this.tooltipTemplete = value;
    }

    set toolTipTarget(value: any) {
        this.tooltipGroup = value;
    }

    get tooltip(): ChartTooltip {
        return this.config.tooltip;
    }

    get chartSeries(): ISeries[] {
        return this.seriesList;
    }

    get functions(): IFunctions[] {
        return this.functions;
    }

    get clipPathSelector(): any {
        return this.clipPath;
    }

    get mouseEvent$(): Observable<ChartMouseEvent> {
        return this.mouseEventSubject.asObservable();
    }

    get zoomEvent$(): Observable<any> {
        return this.zoomEventSubject.asObservable();
    }

    get tooltipEvent$(): Observable<TooltipEvent> {
        return this.tooltipEventSubject.asObservable();
    }

    get lifecycle$(): Observable<{type: string}> {
        return this.chartLifecycleSubject.asObservable();
    }

    get seriesColors(): string[] {
        return this.colors;
    }

    get chartItemEvent(): Observable<ChartItemEvent> {
        return this.chartItemEventSubject.asObservable();
    }

    selectedChart() {
        return this.chartClickSubject.asObservable();
    }

    getColorBySeriesIndex(index: number): string {
        return this.colors[index];
    }

    getColorByIndex(index: number): string {
        return this.colors[index];
    }

    initialize(configuration: ChartConfiguration) {
        // initialize size setup
        if (configuration.margin) {
            Object.assign(this.margin, configuration.margin);
            this.isCustomMargin = true;
        } else {
            this.isCustomMargin = false;
            this.config.axes.forEach((axis: Axes) => {
                // 최초 axis padding을 조정해줌.
                if (axis.placement === Placement.TOP || axis.placement === Placement.BOTTOM) {
                    this.margin[axis.placement] = 30;
                }
            });
        }

        this.selector = select(configuration.selector);

        if (!this.selector.node()) {
            if (console && console.log) {
                console.log('is not html element!');
            }
            return false;
        }

        if (!this.svg) {
            this.svg = this.selector
                .append('svg')
                .style('position', 'absolute')
                .style('display', 'block')
                .style('width', '100%')
                .style('height', '100%');
        }

        if (configuration.style) {
            // background color 설정.
            this.selector.style('background-color', configuration.style.backgroundColor ?? '#fff');
        }

        // data setup origin data 와 분리.
        this.originalData = this.setupData(configuration.data);

        this.crossFilterObject = crossFilter(this.originalData);

        if (configuration.series && configuration.series.length) {
            this.seriesList = configuration.series;
        }

        if (configuration.functions && configuration.functions.length) {
            this.functionList = configuration.functions;
        }

        if (configuration.options && configuration.options.length) {
            this.optionList = configuration.options;
        }

        if (configuration.colors && configuration.colors.length) {
            this.colors = this.config.colors;
        } else {
            this.colors = schemeCategory10.map((color: string) => color);
        }

        if (configuration.title) {
            this.isTitle = true;
            this.titlePlacement = configuration.title.placement;
        } else {
            this.isTitle = false;
        }

        if (configuration.legend) {
            this.isLegend = true;
            this.legendPlacement = configuration.legend.placement;
            this.legendAlign = configuration.legend.align;
            // this.isLegendCheckBox = configuration.legend.isLegendCheckBox === false ? configuration.legend.isLegendCheckBox : true;
            // this.isLegendAll = configuration.legend.isLegendAll === false ? configuration.legend.isLegendAll : true;
            this.isLegendCheckBox = configuration.legend.isCheckBox ?? true;
            this.isLegendAll = configuration.legend.isAll ?? true;
        }

        if (configuration.tooltip) {
            this.isTooltip = configuration.tooltip?.visible ?? true;
            this.isTooltipMultiple = configuration.tooltip.isMultiple === true ? true : false;
        }

        if (!this.maskId) {
            this.maskId = guid();
        }

        return true;
    }

    bootstrap(configuration: ChartConfiguration) {
        if (this.initialize(configuration)) {
            this.setRootSize();
            this.initContainer();
            this.addEventListner();
        }
    }

    realTime(isRealTime: boolean, duration: number = 1000, term: number = 1000) {
        this.isRealTime = isRealTime;
        if (this.realTimeSubscription) {
            this.realTimeSubscription.unsubscribe();
        }

        if (isRealTime) {
            this.realTimeSubscription = interval(duration)
                .pipe(delay(500))
                .subscribe((value: number) => {
                    // x axis의 domain을 현 시간으로 계속 업데이트 해줘야함.
                    const newTime = new Date().getTime();
                    const axesItem = this.config.axes.find(
                        (item: Axes) => item.placement === Placement.BOTTOM || item.placement === Placement.TOP
                    );
                    axesItem.domain = [axesItem.min + term * value, axesItem.max + term * value];

                    // TODO: 보이지 않는 시점부터 data는 삭제해야함.
                    if (this.originalData.length && this.originalData[0][axesItem.field] < axesItem.min + term * value) {
                        const checkDate = this.originalData[0][axesItem.field].getTime();
                        if (checkDate < axesItem.min + term * value) {
                            this.originalData.shift();
                        }
                    }
                    this.updateAxis().then(() => {
                        this.updateSeries();
                    });
                });
        }

        return this;
    }

    data(data: any[]) {
        this.originalData = data;
        this.updateDisplay();
        return this;
    }

    // TODO: real time data 적용해 볼 것.
    appendData(data: any, seriesSelector?: string) {
        // TODO: data 추가가 될 때, min, max도 같이 업데이트 해줄까? 해줘야 performance 가 좋다.
        this.originalData.push(data);
    }

    series(seriesConfigurations: SeriesConfiguration[]) {
        new Observable((observ: Observer<boolean>) => {
            observ.next(true);
            observ.complete();
        })
            .pipe(
                tap(() => {
                    this.seriesGroup.selectAll('*').remove();
                    this.legendGroup.selectAll('*').remove();
                }),
                delay(50),
                tap(() => {
                    this.seriesList.length = 0;
                    for (let i = 0; i < seriesConfigurations.length; i++) {
                        this.seriesList.push(makeSeriesByConfigurationType(seriesConfigurations[i]));
                    }
                })
            )
            .subscribe(() => {
                this.updateLegend();
                this.updateSeries();
            });

        return this;
    }

    title(chartTitle: string) {
        if (this.config.title) {
            this.config.title.content = chartTitle;
            this.titleGroup.data([this.config.title]);
            this.updateTitle();
        }

        return this;
    }

    axes(axes: Axes[]) {
        this.config.axes.length = 0;
        for (let i = 0; i < axes.length; i++) {
            this.config.axes.push(axes[i]);
        }
        this.updateDisplay();
        return this;
    }

    draw() {
        this.chartLifecycleSubject.next({type: 'initialize'});
        this.updateDisplay();
        return this;
    }

    clear() {
        this.selector.selectAll('svg').remove();
        this.selector.selectAll('canvas').remove();
        // this.selector.selectAll('div').style('opacity', 0).style('pointer-events', 'none').remove();

        this.seriesList.forEach((series: ISeries) => {
            series.destroy();
        });

        this.functionList.forEach((functions: IFunctions) => {
            functions.destroy();
        });

        this.functionList.forEach((functions: IFunctions) => {
            functions.destroy();
        });

        if (this.chartLegend) {
            this.chartLegend.destroy();
        }

        this.subscription.unsubscribe();
    }

    showTooltipBySeriesSelector(selector: string): Selection<any, any, HTMLElement, any> {
        const series: ISeries = this.seriesList.find((item: ISeries) => item.selector === selector);
        if (series) {
            this.tooltipItems.push({
                selector
            });
            series.unSelectItem();
            delayExcute(50, () => {
                this.tooltipGroup.select('#' + selector).style('display', null);
                this.drawTooltipBySeriesSelector(selector);
            });
        }
        return this.tooltipGroup;
    }

    hideTooltipBySeriesSelector(selector: string): Selection<any, any, HTMLElement, any> {
        const targetIndex = this.seriesList.findIndex((item: ISeries) => item.selector === selector);
        if (targetIndex > -1) {
            const delIndex = this.tooltipItems.findIndex((item: any) => item.selector === selector);
            if (delIndex > -1) {
                this.tooltipItems.slice(delIndex, 1);
            }
            const series: ISeries = this.seriesList[targetIndex];
            series.unSelectItem();
        }

        delayExcute(50, () => {
            if (!this.tooltipItems.length) {
                this.tooltipGroup.select('#' + selector).style('display', 'none');
            }
            // TODO: 지우거나 this.tooltipItems로 다시 그리거나 할 것.
        });
        return this.tooltipGroup;
    }

    drawTooltipBySeriesSelector(selector: string) {
        // TODO: tooltip을 시리즈 별로 생성한다.
        // select item을 큐에 저장하고 약간의 딜레이 타임을 줘서 툴팁을 생성하는 로직을 고민해볼 것.
        this.tooltipGroup
            .selectAll('.tooltip-background')
            .data(['background'])
            .join(
                (enter) => enter.append('rect').attr('class', '.tooltip-background'),
                (update) => update,
                (exit) => exit.remove()
            )
            .attr('rx', 3)
            .attr('ry', 3)
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 60)
            .attr('height', 20)
            .attr('fill', '#111')
            .style('fill-opacity', 0.6);

        this.tooltipGroup
            .selectAll('.tooltip-text')
            .data(['text'])
            .join(
                (enter) => enter.append('text').attr('class', '.tooltip-text'),
                (update) => update,
                (exit) => exit.remove()
            )
            .attr('x', 5)
            .attr('dy', '1.2em')
            .style('text-anchor', 'start')
            .style('fill', '#fff')
            .attr('font-size', '14px')
            .attr('font-weight', '100');
    }

    destroy() {
        this.subscription.unsubscribe();
        if (this.svg) {
            this.svg.on('click', null);
            // this.svg.selectAll('*').remove();
        }

        if (this.selector) {
            this.selector.selectAll('*').remove();
        }

        if (this.chartLegend) {
            this.chartLegend.destroy();
        }

        this.seriesList.forEach((series: ISeries) => series.destroy());
        this.functionList.forEach((functions: IFunctions) => functions.destroy());
        this.optionList.forEach((options: IOptions) => options.destroy());
        this.originDomains = null;
        this.originalData.length = 0;
    }

    updateOptions() {
        if (this.optionList && this.optionList.length) {
            this.optionList.map((option: IOptions, index: number) => {
                option.chartBase = this;
                option.setSvgElement(this.svg, this.optionGroup, index);
                option.drawOptions(this.originalData, this.scales, {width: this.width, height: this.height});
            });
        }
    }

    targetSeriesUpdate(series: ISeries, index: number): Promise<void> {
        return new Promise((resolve) => {
            series.chartBase = this;
            series.setSvgElement(this.svg, this.seriesGroup, index);
            series.drawSeries(
                this.originalData,
                this.scales,
                {
                    width: this.width,
                    height: this.height
                },
                {
                    index,
                    color: this.colors[index],
                    displayType: DisplayType.NORMAL
                }
            );
            resolve();
        });
    }

    async execute() {
        let index = -1;
        for (const series of this.seriesList) {
            index++;
            await this.targetSeriesUpdate(series, index);
        }
    }

    updateSeries(displayType: DisplayType = DisplayType.NORMAL) {
        try {
            if (this.seriesList && this.seriesList.length) {
                if (!this.config.displayDelay) {
                    const xScale = this.scales.find(
                        (scale: Scale) => scale.orient === Placement.BOTTOM || scale.orient === Placement.TOP
                    );
                    const yScale = this.scales.find(
                        (scale: Scale) => scale.orient === Placement.LEFT || scale.orient === Placement.RIGHT
                    );
                    this.seriesList.map((series: ISeries, index: number) => {
                        if (!series.chartBase) {
                            series.chartBase = this;
                        }

                        series.setSvgElement(this.svg, this.seriesGroup, index);
                        // TODO: crossFilter 적용해서 각 시리즈에서 해당하는 필드데이터만 넘겨줄 수 있도록? 고려해 볼 것.
                        // this.crossFilterObject.dimension((d: any) => d[series.xField])
                        const xField = series.xField();
                        const yField = series.yField();
                        series.drawSeries(
                            // this.originalData
                            displayType === DisplayType.ZOOMIN
                                ? this.originalData.filter(
                                      (d: any) =>
                                          xField &&
                                          d[xField] >= xScale.min - xScale.min * 0.1 &&
                                          d[xField] <= xScale.max + xScale.max * 0.1 &&
                                          yField &&
                                          d[yField] >= yScale.min &&
                                          d[yField] <= yScale.max
                                  )
                                : this.originalData,
                            this.scales,
                            {
                                width: this.width,
                                height: this.height
                            },
                            {
                                index,
                                color: this.colors[index],
                                displayType
                            }
                        );
                    });

                    return;
                } else {
                    if (this.currentScale.length) {
                        this.seriesList.map((series: ISeries, index: number) => {
                            series.chartBase = this;
                            series.setSvgElement(this.svg, this.seriesGroup, index);
                            series.drawSeries(
                                this.originalData,
                                this.scales,
                                {
                                    width: this.width,
                                    height: this.height
                                },
                                {
                                    index,
                                    color: this.colors[index],
                                    displayType: DisplayType.NORMAL
                                }
                            );
                        });
                        return;
                    }
                }

                // 시간차로 그리기.
                const arrayAsObservable = of(null).pipe(
                    // delay(this.config.displayDelay.delayTime),
                    switchMap(() => this.getObjectWithArrayInPromise(this.seriesList)),
                    map((val: any) => {
                        return val.data;
                    }),
                    switchMap((val) => from(val))
                );
                const eachElementAsObservable = arrayAsObservable.pipe(
                    concatMap((value) => timer(this.config.displayDelay.delayTime).pipe(mapTo(value))), // Not working : we want to wait 500ms for each value
                    map((val) => {
                        return val;
                    })
                );

                this.eachElementAsObservableSubscription.unsubscribe();
                this.eachElementAsObservableSubscription = new Subscription();
                this.eachElementAsObservableSubscription.add(
                    eachElementAsObservable.subscribe(
                        (index) => {
                            const currentIndex = +index;
                            this.seriesList[currentIndex].chartBase = this;
                            this.seriesList[currentIndex].setSvgElement(this.svg, this.seriesGroup, currentIndex);
                            this.seriesList[currentIndex].drawSeries(
                                this.originalData,
                                this.scales,
                                {
                                    width: this.width,
                                    height: this.height
                                },
                                {
                                    index: currentIndex,
                                    color: this.colors[currentIndex],
                                    displayType: DisplayType.NORMAL
                                }
                            );
                        },
                        (error) => {
                            if (console && console.log) {
                                console.log(error);
                            }
                        },
                        () => {
                            if (console && console.log) {
                                console.log('complete series display');
                            }
                        }
                    )
                );
            }
        } catch (error) {
            if (console && console.log) {
                console.log(error);
            }
        }
    }

    getObjectWithArrayInPromise(list: ISeries[]) {
        const data = list.map((series: ISeries, index: number) => index);
        return new Promise((resolve) => {
            delayExcute(20, () =>
                resolve({
                    data
                })
            );
        });
    }

    updateRescaleAxis(isZoom: boolean = true) {
        let index = 0;
        for (index = 0; index < this.scales.length; index++) {
            const scale = this.scales[index];
            const orientedAxis: any = axisSetupByScale(scale);

            if (scale.gridLine) {
                drawGridLine(
                    {
                        width: this.width,
                        height: this.height
                    },
                    scale,
                    this.mainGroup,
                    {
                        color: scale.gridLine.color ?? '#ccc',
                        dasharray: scale.gridLine.dasharray ?? 0,
                        opacity: scale.gridLine.opacity ?? 1
                    }
                );
            }

            // TODO: 한가지 패턴으로 정리 할 것.
            // drawAxisByScale(
            //     {
            //         width: this.width,
            //         height: this.height
            //     },
            //     this.margin,
            //     this.isCustomMargin,
            //     scale,
            //     this.axisGroups[scale.orient],
            //     this.defaultAxisLabelStyle,
            //     this.defaultAxisTitleStyle,
            //     this.axisTitleMargin
            // );

            if (scale.visible) {
                this.axisGroups[scale.orient]
                    .call(orientedAxis)
                    .selectAll('text')
                    .style('font-size', this.defaultAxisLabelStyle.font.size + 'px')
                    .style('font-family', this.defaultAxisLabelStyle.font.family);

                if (scale.tickTextParser) {
                    delayExcute(50, () => {
                        this.axisGroups[scale.orient].selectAll('text').text((d: string) => {
                            return scale.tickTextParser(d);
                        });
                    });
                }
            }

            if (scale.zeroLine && scale.min < 0) {
                setupZeroLine(
                    {
                        width: this.width,
                        height: this.height
                    },
                    scale,
                    this.axisGroups[scale.orient]
                );
            } else {
                this.axisGroups[scale.orient].selectAll(`.${scale.orient}-${scale.field}-zero-line`).remove();
            }

            // if (isZoom && scale.isZoom === true) {
            //     // this.setupBrush(scale);
            //     setupBrush(
            //         {
            //             width: this.width,
            //             height: this.height
            //         },
            //         this.margin,
            //         scale,
            //         this.axisGroups[scale.orient],
            //         this.updateBrushHandler
            //     );
            // }
        }
    }

    pointerClear() {
        const selectionCanvas = this.selector.select('.' + ChartSelector.POINTER_CANVAS);
        if (selectionCanvas && selectionCanvas.node()) {
            const context = (selectionCanvas.node() as any).getContext('2d');
            clearCanvas(context, this.width, this.height);
        }
        this.selectionGroup.selectAll(`[type='tooltip-point']`).remove();
        this.hideTooltip();
    }

    selectionClear() {
        this.selectionGroup.selectAll('.selection-point').remove();

        const selectionCanvas = this.selector.select('.' + ChartSelector.SELECTION_CANVAS);
        if (selectionCanvas && selectionCanvas.node()) {
            const context = (selectionCanvas.node() as any).getContext('2d');
            clearCanvas(context, this.width, this.height);
        }
    }

    enableFunction(selector: string) {}

    disableFunction(selector: string) {}

    showTooltip(
        boxStyle?: {fill: string; opacity?: number; stroke: string; strokeWidth?: number},
        textStyle?: {fill: number; size: number}
    ): Selection<any, any, HTMLElement, any> {
        this.seriesList.forEach((series: ISeries) => {
            series.unSelectItem();
        });
        this.tooltipGroup.style('display', null);
        this.tooltipTemplete(this.tooltipGroup, boxStyle, textStyle);
        return this.tooltipGroup.select('g.tooltip-item-group');
    }

    hideTooltip(): Selection<any, any, HTMLElement, any> {
        if (!this.isTooltipDisplay) {
            return;
        }
        // tooltip hide event 발생.
        if (this.config?.tooltip?.visible === false) {
            this.tooltipEventSubject.next({
                type: 'hide',
                position: [0, 0],
                size: {
                    width: 0,
                    height: 0
                }
            });
        }
        if (this.isTooltipDisplay) {
            this.isTooltipDisplay = false;
            this.seriesList.forEach((series: ISeries) => {
                series.unSelectItem();
            });
            this.tooltipGroup.style('display', 'none');
        }
        return this.tooltipGroup;
    }

    protected updateFunctions() {
        try {
            if (this.functionList && this.functionList.length) {
                this.functionList.forEach((functionItem: IFunctions, index: number) => {
                    functionItem.chartBase = this;
                    functionItem.setSvgElement(this.svg, this.seriesGroup, index);
                    functionItem.drawFunctions(this.originalData, this.scales, {width: this.width, height: this.height});
                });
            }
        } catch (error) {
            if (console && console.log) {
                console.log(error);
            }
        }
    }

    protected setRootSize() {
        const titleTextHeight = 16;
        this.svgWidth = (this.svg.node() as HTMLElement).clientWidth;
        this.svgHeight = (this.svg.node() as HTMLElement).clientHeight;
        // this.svgWidth = parseFloat(this.svg.style('width'));
        // this.svgHeight = parseFloat(this.svg.style('height'));

        // axis title check
        if (this.config.axes && this.config.axes.length) {
            this.config.axes.forEach((axis: Axes) => {
                if (axis.title) {
                    this.axisTitleMargin[axis.placement] = titleTextHeight;
                }
            });
        }

        this.width = this.svgWidth - (this.margin.left + this.margin.right) - (this.axisTitleMargin.left + this.axisTitleMargin.right);
        this.height =
            this.svgHeight - (this.margin.top + this.margin.bottom) - (this.axisTitleMargin.top + this.axisTitleMargin.bottom);

        if (this.isTitle) {
            this.titleContainerSize.width =
                this.titlePlacement === Placement.TOP || this.titlePlacement === Placement.BOTTOM ? this.width : 20;
            this.titleContainerSize.height =
                this.titlePlacement === Placement.TOP || this.titlePlacement === Placement.BOTTOM ? 20 : this.height;
            this.width = this.width - (this.titlePlacement === Placement.LEFT || this.titlePlacement === Placement.RIGHT ? 20 : 0);
            this.height = this.height - (this.titlePlacement === Placement.LEFT || this.titlePlacement === Placement.RIGHT ? 0 : 20);
        }

        // 범례 적용 시 사이즈 계산.
        if (this.isLegend) {
            this.initLegend();
        }
    }

    protected initLegend() {
        this.chartLegend = new ChartLegend({
            isCheckBox: this.isLegendCheckBox,
            isAll: this.isLegendAll,
            addTitleWidth: this.isTitle && this.titlePlacement === Placement.LEFT ? this.titleContainerSize.width : 0,
            placement: this.legendPlacement,
            align: this.legendAlign,
            colors: this.colors,
            defaultLegendStyle: this.defaultLegendStyle,
            seriesList: this.seriesList,
            margin: this.margin,
            svgGeometry: {
                width: this.svgWidth,
                height: this.svgHeight
            },
            mainGeometry: {
                width: this.width,
                height: this.height
            },
            onLegendCheckBoxClickHandler: this.onLegendCheckBoxClick,
            onLegendLabelItemClickHandler: this.onLegendLabelItemClick
        });

        this.legendContainerSize.width = this.chartLegend.init().width;
        this.legendContainerSize.height = this.chartLegend.init().height;

        this.width =
            this.width -
            (this.legendPlacement === Placement.LEFT || this.legendPlacement === Placement.RIGHT ? this.legendContainerSize.width : 0);
        this.height =
            this.height -
            (this.legendPlacement === Placement.TOP || this.legendPlacement === Placement.BOTTOM
                ? this.legendContainerSize.height
                : 0);
    }

    protected initContainer() {
        const x =
            this.margin.left +
            this.axisTitleMargin.left +
            (this.isTitle && this.titlePlacement === Placement.LEFT ? this.titleContainerSize.width : 0) +
            (this.isLegend && this.legendPlacement === Placement.LEFT ? this.legendContainerSize.width : 0);
        const y =
            this.margin.top +
            this.axisTitleMargin.top +
            (this.isTitle && this.titlePlacement === Placement.TOP ? this.titleContainerSize.height : 0) +
            (this.isLegend && this.legendPlacement === Placement.TOP ? this.legendContainerSize.height : 0);

        const width = this.width;
        const height = this.height;

        if (!this.clipPath) {
            this.clipPath = this.svg
                .append('defs')
                .append('svg:clipPath')
                .attr('id', this.maskId)
                .append('rect')
                .attr('clas', 'series-mask')
                .attr('width', width)
                .attr('height', height)
                .attr('x', 0)
                .attr('y', 0);
        }

        this.clipPath.attr('width', width).attr('height', height).attr('x', 0).attr('y', 0);

        if (!this.mainGroup) {
            this.mainGroup = this.svg.append('g').attr('class', 'main-group');
        }
        this.mainGroup.attr('transform', `translate(${x}, ${y})`);

        // grid line setup
        if (!this.gridLineGroups.bottom) {
            this.gridLineGroups.bottom = this.mainGroup.append('g').attr('class', 'x-grid-group');
        }
        this.gridLineGroups.bottom.attr('transform', `translate(0, ${height})`);

        if (!this.gridLineGroups.top) {
            this.gridLineGroups.top = this.mainGroup.append('g').attr('class', 'x-top-grid-group');
        }
        this.gridLineGroups.top.attr('transform', `translate(0, 0)`);

        if (!this.gridLineGroups.left) {
            this.gridLineGroups.left = this.mainGroup.append('g').attr('class', 'y-grid-group');
        }

        if (!this.gridLineGroups.right) {
            this.gridLineGroups.right = this.mainGroup.append('g').attr('class', 'y-right-grid-group');
        }
        this.gridLineGroups.right.attr('transform', `translate(${width}, 0)`);

        if (this.isTitle) {
            this.titleGroup = this.svg
                .selectAll('.title-group')
                .data([this.config.title])
                .join(
                    (enter) => enter.append('g').attr('class', 'title-group'),
                    (update) => update,
                    (exit) => exit.remove()
                );
        }

        if (this.isLegend) {
            if (!this.legendGroup) {
                this.legendGroup = this.svg.append('g').attr('class', 'legend-group');
            }
            let legendX = 0;
            let legendY = 0;
            this.legendGroup.attr('transform', () => {
                let translate = 'translate(0, 0)';
                if (this.legendPlacement === Placement.RIGHT) {
                    legendX = width + (this.margin.left + this.margin.right + this.axisTitleMargin.left + this.axisTitleMargin.right);
                    translate = `translate(${legendX}, ${legendY})`;
                } else if (this.legendPlacement === Placement.LEFT) {
                    legendX = this.isTitle && this.titlePlacement === Placement.LEFT ? this.titleContainerSize.width : 0;
                    translate = `translate(${legendX}, ${legendY})`;
                } else if (this.legendPlacement === Placement.TOP) {
                    legendX = this.legendPadding;
                    legendY =
                        (this.isTitle && this.titlePlacement === Placement.TOP ? this.titleContainerSize.height : 0) +
                        this.legendPadding;
                    translate = `translate(${legendX}, ${legendY})`;
                } else if (this.legendPlacement === Placement.BOTTOM) {
                    legendX = this.legendPadding;
                    legendY = this.margin.top + this.margin.bottom + (this.axisTitleMargin.top + this.axisTitleMargin.bottom) + height;
                    if (this.isTitle && this.titlePlacement === Placement.TOP) {
                        legendY += this.titleContainerSize.height + this.legendPadding;
                    }
                    translate = `translate(${legendX}, ${legendY})`;
                }
                return translate;
            });
        }

        if (!this.optionGroup) {
            this.optionGroup = this.svg.append('g').attr('class', 'option-group');
        }
        this.optionGroup.attr('transform', `translate(${x}, ${y})`).attr('clip-path', `url(#${this.maskId})`);

        if (!this.seriesGroup) {
            this.seriesGroup = this.svg.append('g').attr('class', ChartSelector.SERIES_SVG);
        }
        this.seriesGroup.attr('transform', `translate(${x}, ${y})`).attr('clip-path', `url(#${this.maskId})`);

        if (!this.selectionGroup) {
            this.selectionGroup = this.svg.append('g').attr('class', ChartSelector.SELECTION_SVG);
        }
        this.selectionGroup.attr('transform', `translate(${x}, ${y})`);

        if (!this.tooltipGroup) {
            this.tooltipGroup = this.svg.append('g').attr('class', 'tooltip-group');
        }
        this.tooltipGroup.attr('transform', `translate(${x}, ${y})`).style('display', 'none');

        // zoom을 canvas와 webgl과 통일하기위한 순서.
        if (!this.zoomGroup) {
            this.zoomGroup = this.svg.append('g').attr('class', ChartSelector.ZOOM_SVG);
            this.zoomGroup
                .append('rect')
                .attr('class', ChartSelector.ZOOM_SVG + '-background')
                .style('fill', 'none')
                .style('pointer-events', 'all');
        }
        this.zoomGroup.attr('transform', `translate(${x}, ${y})`);

        this.zoomGroup
            .select('.' + ChartSelector.ZOOM_SVG + '-background')
            .attr('width', this.width)
            .attr('height', this.height);

        // axis group setup
        if (!this.axisGroups.bottom) {
            this.axisGroups.bottom = this.mainGroup.append('g').attr('class', 'x-axis-group');
        }
        this.axisGroups.bottom.attr('transform', `translate(0, ${height})`);

        if (!this.axisGroups.top) {
            this.axisGroups.top = this.mainGroup.append('g').attr('class', 'x-top-axis-group');
        }
        this.axisGroups.top.attr('transform', `translate(0, 0)`);

        if (!this.axisGroups.left) {
            this.axisGroups.left = this.mainGroup.append('g').attr('class', 'y-axis-group');
        }

        if (!this.axisGroups.right) {
            this.axisGroups.right = this.mainGroup.append('g').attr('class', 'y-right-axis-group');
        }
        this.axisGroups.right.attr('transform', `translate(${width}, 0)`);
    }

    // 모든 외부에서 들어오는 이벤트는 여기서 처리한다.
    protected addEventListner() {
        this.subscription = new Subscription();
        if (this.config.isResize && this.config.isResize === true) {
            const resizeEvent = fromEvent(window, 'resize').pipe(debounceTime(500));
            this.subscription.add(resizeEvent.subscribe(this.resizeEventHandler));
        }

        let isDragStart = false;
        let isMouseLeave = false;
        const tooltipTargetDataList: any = [];
        const tooltipPointerDataList: any = [];

        this.subscription.add(
            this.mouseEvent$.subscribe((chartEvent: ChartMouseEvent) => {
                if (isMouseLeave) {
                    isMouseLeave = false;
                    return;
                }
                switch (chartEvent.type) {
                    case 'mousemove':
                        isMouseLeave = false;
                        this.mouseleaveEventHandler();
                        // 전에 오버했던 아이템 아웃 이벤트 발생.
                        if (tooltipTargetDataList.length) {
                            this.mouseoutEventHandler(tooltipTargetDataList);
                        }
                        tooltipTargetDataList.length = 0;
                        tooltipPointerDataList.length = 0;
                        if (this.config.tooltip && !isDragStart && !isMouseLeave) {
                            let maxLength = this.seriesList.length;
                            while (maxLength--) {
                                const positionData = this.seriesList[maxLength].getSeriesDataByPosition(chartEvent.position);
                                if (positionData.length) {
                                    // TODO: data 있을 시 시리지 하이라이트 기능 여부 고민해 볼 것.
                                    const currentChartItemIndex = this.seriesList[maxLength].drawPointer(
                                        chartEvent.position,
                                        positionData
                                    );
                                    if (currentChartItemIndex > -1) {
                                        // tooltip show event 발생
                                        const currentTooltipData = [...positionData[currentChartItemIndex]];
                                        if (tooltipTargetDataList.length < 4) {
                                            tooltipTargetDataList.push({
                                                seriesIndex: maxLength,
                                                tooltipData: currentTooltipData,
                                                style: this.seriesList[maxLength].tooltipStyle(currentTooltipData),
                                                pointer: this.seriesList[maxLength].pointerSize(currentTooltipData),
                                                tooltipText: this.seriesList[maxLength].tooltipText,
                                                tooltipTextStr: this.seriesList[maxLength].tooltipText(currentTooltipData)
                                            });
                                            tooltipPointerDataList.push({
                                                seriesIndex: maxLength,
                                                position: [...chartEvent.position],
                                                positionData: [...positionData]
                                            });
                                        }
                                        if (!this.isTooltipMultiple) {
                                            break;
                                        }
                                    }
                                }
                            }
                            this.drawTooltipPointer(this.seriesList, tooltipPointerDataList);
                            this.drawTooltipContents(this.seriesList, tooltipTargetDataList, this.config.tooltip.tooltipTextParser);

                            const newHash = sha1(tooltipTargetDataList);
                            if (this.prevCurrentItemHash !== newHash) {
                                this.prevCurrentItemHash = newHash;
                            }

                            // 오버 이벤트 발생.
                            if (tooltipTargetDataList.length) {
                                this.mouseoverEventHandler(tooltipTargetDataList);
                            }
                        }
                        break;

                    case 'mouseleave':
                        isMouseLeave = true;
                        this.mouseleaveEventHandler();
                        this.drawTooltipContents(this.seriesList, [], undefined);
                        if (tooltipTargetDataList.length) {
                            this.mouseoutEventHandler(tooltipTargetDataList);
                        }
                        break;

                    case 'click':
                    case 'mouseup':
                        isDragStart = false;
                        if (!tooltipPointerDataList.length) {
                            this.selectionClear();
                            this.chartItemEventSubject.next({
                                type: 'backgroundclick',
                                position: [0, 0],
                                data: null,
                                etc: [0, 0]
                            });
                            return;
                        }
                        const seriesIndex = tooltipPointerDataList[0].seriesIndex;
                        const targetSeries = this.seriesList[seriesIndex];
                        const positionDataList = targetSeries.getSeriesDataByPosition(chartEvent.position);
                        if (positionDataList.length) {
                            targetSeries.onSelectItem(chartEvent.position, positionDataList);
                            this.chartItemEventSubject.next({
                                type: chartEvent.type,
                                position: [positionDataList[0][0], positionDataList[0][1]],
                                data: positionDataList[0][2],
                                etc: positionDataList[0]
                            });
                            break;
                        }
                        break;
                }
            })
        );

        this.subscription.add(
            this.zoomEvent$.subscribe((chartEvent: ChartZoomEvent) => {
                if (chartEvent.type === 'dragstart') {
                    isDragStart = true;
                    this.pointerClear();
                } else if (chartEvent.type === 'zoomin') {
                    isDragStart = false;
                    this.selectionClear();
                    this.zoominEventHandler(chartEvent);
                } else if (chartEvent.type === 'zoomout') {
                    isDragStart = false;
                    this.selectionClear();
                    this.zoomoutEventHandler();
                } else {
                    isDragStart = false;
                }
            })
        );
    }

    drawTooltipPointer(seriesList: ISeries[], tooltipTargetList: any[]) {
        tooltipTargetList.forEach((item: any) => {
            this.seriesList[item.seriesIndex].drawPointer(item.position, item.positionData);
        });
    }

    drawTooltipContents(seriesList: ISeries[], tooltipTargetList: any[], tooltipTextParser: any) {
        this.tooltipGroup.style('display', null);

        const itemGroup = this.tooltipGroup
            .selectAll('g.tooltip-item-group')
            .data(tooltipTargetList)
            .join(
                (enter) => enter.append('g').attr('class', 'tooltip-item-group'),
                (update) => update,
                (exit) => exit.remove()
            )
            .attr('transform', (d: any) => {
                return `translate(${d.tooltipData[0]}, ${d.tooltipData[1]})`;
            })
            .each((d: any, index: number, nodeList: any) => {
                if (index > this.maxTooltipCount - 1) {
                    return;
                }
                const group = select(nodeList[index]);
                const prevGroup: any = index > 0 ? select(nodeList[index - 1]) : undefined;
                // style and templete setup
                this.tooltipTemplete(group, d.style);
                const positionx = d.tooltipData[0];
                const positiony = d.tooltipData[1];

                this.isTooltipMultiple
                    ? setMultiChartTooltipByPosition(
                          group,
                          tooltipTextParser ? tooltipTextParser(d.tooltipData) : d.tooltipText(d.tooltipData),
                          {
                              width: this.width,
                              height: this.height
                          },
                          [positionx, positiony],
                          prevGroup,
                          index
                      )
                    : setChartTooltipByPosition(
                          group,
                          tooltipTextParser ? tooltipTextParser(d.tooltipData) : d.tooltipText(d.tooltipData),
                          {
                              width: this.width,
                              height: this.height
                          },
                          [positionx, positiony],
                          {
                              width: d.pointer.width,
                              height: d.pointer.height
                          }
                      );
            });
    }

    protected drawTooltip(currentSeries: ISeries, currentTooltipData: any[], tooltipTextParser: any) {
        const tooltipGroup = this.showTooltip(currentSeries.tooltipStyle(currentTooltipData));
        const pointerSize = currentSeries.pointerSize(currentTooltipData);
        setChartTooltipByPosition(
            tooltipGroup,
            tooltipTextParser ? tooltipTextParser(currentTooltipData) : currentSeries.tooltipText(currentTooltipData),
            {
                width: this.width,
                height: this.height
            },
            [currentTooltipData[0], currentTooltipData[1]],
            {
                width: pointerSize.width,
                height: pointerSize.height
            }
        );
    }

    protected zoominEventHandler(chartEvent: ChartZoomEvent) {
        const reScale = [
            {
                field: chartEvent.zoom.field.x,
                min: chartEvent.zoom.start.x,
                max: chartEvent.zoom.end.x
            },
            {
                field: chartEvent.zoom.field.y,
                min: chartEvent.zoom.start.y,
                max: chartEvent.zoom.end.y
            }
        ];
        this.scales = this.setupScale(this.config.axes, this.width, this.height, reScale);
        this.updateRescaleAxis(false);
        this.updateFunctions();
        this.updateSeries(DisplayType.ZOOMIN);
        this.updateOptions();
    }

    protected zoomoutEventHandler() {
        this.scales = this.setupScale(this.config.axes, this.width, this.height, []);
        this.updateRescaleAxis(false);
        this.updateFunctions();
        this.updateSeries(DisplayType.ZOOMOUT);
        this.updateOptions();
    }

    protected mouseleaveEventHandler() {
        this.hideTooltip();
        this.pointerClear();
        // this.selectionClear();
    }

    protected mousemoveDataClear() {
        // if (this.currentChartItem.length) {
        //     this.mouseoutEventHandler(this.currentChartItem);
        // }
        this.pointerClear();
    }

    protected mouseoutEventHandler(positionData: any[]) {
        this.chartItemEventSubject.next({
            type: 'mouseout',
            position: [0, 0],
            data: positionData.map((item: any) => item.tooltipData),
            etc: positionData
        });
        positionData.length = 0;
    }

    protected mouseoverEventHandler(positionData: any[]) {
        // mouseover event 발생
        this.chartItemEventSubject.next({
            type: 'mouseover',
            position: [positionData[0].tooltipData[0], positionData[0].tooltipData[1]],
            data: positionData.map((item: any) => item.tooltipData),
            etc: positionData
        });
    }

    // protected mouseoutEventHandler(positionData: any[]) {
    //     this.chartItemEventSubject.next({
    //         type: 'mouseout',
    //         position: [positionData[0], positionData[1]],
    //         data: positionData[2],
    //         etc: positionData
    //     });
    //     positionData.length = 0;
    // }

    // protected mouseoverEventHandler(positionData: any[]) {
    //     // data copy
    //     // this.currentChartItem.length = 0;
    //     positionData.forEach((pdata: any) => {
    //         this.currentChartItem.push(pdata);
    //     });
    //     // mouseover event 발생
    //     this.chartItemEventSubject.next({
    //         type: 'mouseover',
    //         position: [positionData[0], positionData[1]],
    //         data: positionData[2],
    //         etc: positionData
    //     });
    // }

    protected updateTitle() {
        if (this.titleGroup) {
            this.titleGroup.attr('transform', (d: ChartTitle) => {
                let titleX = 0;
                let titleY = 0;
                const padding = 5;
                if (d.placement === Placement.RIGHT) {
                    titleX =
                        this.width +
                        this.margin.left +
                        this.margin.right +
                        this.titleContainerSize.width +
                        (this.isLegend && (this.legendPlacement === Placement.RIGHT || this.legendPlacement === Placement.LEFT)
                            ? this.legendContainerSize.width
                            : 0);
                    titleY = this.height;
                } else if (d.placement === Placement.LEFT) {
                    titleX = this.titleContainerSize.width;
                    titleY = this.height;
                } else if (d.placement === Placement.BOTTOM) {
                    titleY =
                        this.height +
                        (this.margin.top + this.margin.bottom) +
                        (this.axisTitleMargin.top + this.axisTitleMargin.bottom) +
                        (this.isLegend && (this.legendPlacement === Placement.TOP || this.legendPlacement === Placement.BOTTOM)
                            ? this.legendContainerSize.height
                            : 0) -
                        padding;
                } else {
                    titleY = padding;
                }
                const rotate = d.placement === Placement.LEFT || d.placement === Placement.RIGHT ? -90 : 0;
                return `translate(${titleX}, ${titleY}) rotate(${rotate})`;
            });

            this.titleGroup
                .selectAll('.chart-title')
                .data((d: ChartTitle) => [d])
                .join(
                    (enter) => enter.append('text').attr('class', 'chart-title'),
                    (update) => update,
                    (exit) => exit.remove()
                )
                .style('font-size', (d: ChartTitle) => {
                    return (d.style && d.style.size ? d.style.size : this.defaultTitleStyle.font.size) + 'px';
                })
                .style('stroke', (d: ChartTitle) => {
                    return d.style && d.style.color ? d.style.color : this.defaultTitleStyle.font.color;
                })
                .style('text-anchor', 'middle')
                .style('stroke-width', 0.5)
                .style('font-family', (d: ChartTitle) => {
                    return d.style && d.style.font ? d.style.font : this.defaultTitleStyle.font.family;
                })
                .text((d: ChartTitle) => d.content)
                .attr('dy', '0em')
                .attr('transform', (d: ChartTitle, index: number, nodeList: any) => {
                    const textNode = nodeList[index].getBoundingClientRect();
                    const textHeight = textNode.height;

                    let x = 0;
                    let y = 0;
                    if (d.placement === Placement.TOP || d.placement === Placement.BOTTOM) {
                        x =
                            (this.width + this.margin.left + this.margin.right) / 2 -
                            (this.isLegend && this.legendPlacement === Placement.LEFT ? this.legendContainerSize.width : 0);
                        y = textHeight / 2 + 3;
                    } else {
                        x = (this.height + this.margin.top + this.margin.bottom) / 2 - textHeight / 2;
                    }
                    const translate = `translate(${x}, ${y})`;
                    return translate;
                });
        }
    }

    protected updateAxis(): Promise<void> {
        const maxTextWidth: any = {};
        const padding = 10; // 10 는 axis 여백.

        let isAxisUpdate = false;

        this.originDomains = {};

        this.scales = this.setupScale(this.config.axes, this.width, this.height, this.currentScale);

        this.scales.forEach((scale: Scale) => {
            if (scale.gridLine) {
                drawGridLine(
                    {
                        width: this.width,
                        height: this.height
                    },
                    scale,
                    this.mainGroup,
                    {
                        color: scale.gridLine.color ?? '#ccc',
                        dasharray: scale.gridLine.dasharray ?? 0,
                        opacity: scale.gridLine.opacity ?? 1
                    }
                );
            }

            maxTextWidth[scale.orient] = drawAxisByScale(
                {
                    width: this.width,
                    height: this.height
                },
                this.margin,
                this.isCustomMargin,
                scale,
                this.axisGroups[scale.orient],
                this.defaultAxisLabelStyle,
                this.defaultAxisTitleStyle,
                this.axisTitleMargin,
                this.isRealTime
            );
        });

        // margin 설정이 따로 없으면 자동으로 계산해서 margin을 갱신한다.
        if (!this.isCustomMargin) {
            Object.keys(maxTextWidth).forEach((orient: string) => {
                if (this.margin[orient] < maxTextWidth[orient] + padding) {
                    this.margin[orient] = maxTextWidth[orient] + padding;
                    isAxisUpdate = true;
                }
            });
        }

        return new Promise((resolve) => {
            if (isAxisUpdate) {
                this.setRootSize();
                this.initContainer();
                this.updateDisplay();
            } else {
                resolve();
            }
        });

        // return of(1).pipe(
        //     concatMap(() => {
        //         if(isAxisUpdate) {
        //             return of(true);
        //         } else {
        //             this.setRootSize();
        //             this.initContainer();
        //             this.updateDisplay();
        //             return throwError('do check size');
        //         }
        //   }),
        //   retry(2)
        // )
    }

    protected updateLegend() {
        if (!this.isLegend) {
            return;
        }

        this.chartLegend.drawLegend(this.legendGroup);
    }

    // protected setupBrush(scale: any) {
    //     let brush = null;
    //     if (scale.type === ScaleType.NUMBER || scale.type === ScaleType.TIME) {
    //         if (scale.orient === Placement.RIGHT || scale.orient === Placement.LEFT) {
    //             let left = 0;
    //             let width = 0;

    //             if (scale.orient === Placement.LEFT) {
    //                 left = -1 * this.margin.left;
    //             } else {
    //                 width = this.width;
    //             }

    //             brush = brushY()
    //                 .extent([ [left, 0], [width, this.height] ]);
    //         } else {
    //             let top = 0;
    //             let height = 0;

    //             // top margin 때문에 처리.
    //             if (scale.orient === Placement.TOP) {
    //                 top = this.margin.top * -1;
    //             } else {
    //                 height = this.margin.bottom;
    //             }

    //             brush = brushX()
    //                 .extent([ [0, top], [this.width, height] ]);
    //         }
    //         brush.on('end', () => {
    //             this.updateBrushHandler(scale.orient, brush);
    //         });
    //     }

    //     if (brush) {
    //         if (!this.axisGroups[scale.orient].select('.brush' + scale.orient).node()) {
    //             this.axisGroups[scale.orient].append('g')
    //                 .attr('class', 'brush' + scale.orient);
    //         }
    //         this.axisGroups[scale.orient].select('.brush' + scale.orient).call(
    //             brush
    //         );
    //     }
    // }

    protected updateDisplay(displayType: DisplayType = DisplayType.NORMAL) {
        if (this.width <= 50 || this.height <= 50) {
            if (console && console.log) {
                console.log('It is too small to draw.');
            }
            return;
        }
        this.clearOption();
        // 기준이되는 axis가 완료된 후에 나머지를 그린다.
        // this.updateAxis()
        //     .subscribe(() => {
        //         this.updateLegend();
        //         this.updateTitle();
        //         this.updateSeries(displayType);
        //         this.updateOptions();
        //         this.updateFunctions();
        //     });
        this.updateAxis().then(() => {
            // TODO: rxjs로 delay time 걸어서 pipe 라인 구축해서 돌려볼 것.
            this.updateLegend();
            this.updateTitle();
            this.updateSeries(displayType);
            this.updateOptions();
            this.updateFunctions();
            this.chartLifecycleSubject.next({type: 'complete'});
        });
    }

    protected setupData(data: T[]) {
        // this.originalData = [...data];
        return data;
    }

    protected setupScale(axes: Axes[] = [], width: number = 0, height: number = 0, reScaleAxes?: any[]): Scale[] {
        // zoom out 했을 경우에 초기화.
        if (!reScaleAxes || (reScaleAxes && !reScaleAxes.length)) {
            this.currentScale.length = 0;
        } else {
            this.currentScale = [...reScaleAxes];
        }

        return generateScaleByAxis(axes, this.originalData, {width, height}, this.currentScale, this.isRealTime);
    }

    // protected updateBrushHandler(orient: string = 'bottom', brush: any) {
    //     const extent = event.selection;
    //     const scale: Scale = this.scales.find((scaleItem: Scale) => scaleItem.orient === orient);
    //     const currentScale: any = scale.scale;

    //     if (!extent) {
    //         if (!this.idleTimeout) return this.idleTimeout = setTimeout(this.idled, 350);
    //         if (this.originDomains[orient]) {
    //             currentScale.domain([this.originDomains[orient][0], this.originDomains[orient][1]]);
    //         }
    //     } else {
    //         if (!this.originDomains[orient]) {
    //             this.originDomains[orient] = currentScale.domain();
    //         }

    //         let domainStart = 0;
    //         let domainEnd = 0;

    //         if (orient === Placement.TOP || orient === Placement.BOTTOM) {
    //             domainStart = currentScale.invert(extent[0]);
    //             domainEnd = currentScale.invert(extent[1]);
    //         } else { // left, right 는 아래에서 위로 정렬이기 때문.
    //             domainStart = currentScale.invert(extent[1]);
    //             domainEnd = currentScale.invert(extent[0]);
    //         }

    //         currentScale.domain([ domainStart, domainEnd ]);
    //         this.axisGroups[orient].select('.brush' + orient).call(
    //             brush.move, null
    //         );
    //     }

    //     if (scale.gridLine) {
    //         drawGridLine(
    //             {
    //                 width: this.width,
    //                 height: this.height
    //             },
    //             scale,
    //             this.mainGroup,
    //             {
    //                 color: scale.gridLine.color ?? '#ccc',
    //                 dasharray: scale.gridLine.dasharray ?? 0,
    //                 opacity: scale.gridLine.opacity ?? 1
    //             }
    //         )
    //     }

    //     const currnetAxis: any = axisSetupByScale(scale);

    //     this.axisGroups[orient]
    //     .call(currnetAxis)
    //     .selectAll('text')
    //         .style('font-size', this.defaultAxisLabelStyle.font.size + 'px')
    //         .style('font-family', this.defaultAxisLabelStyle.font.family);
    //         // .style('font-weight', 100)
    //         // .style('stroke-width', 0.5)
    //         // .style('stroke', this.defaultAxisLabelStyle.font.color);

    //     if (scale.tickTextParser) {
    //         delayExcute(50, () => {
    //             this.axisGroups[orient]
    //             .text((d: string) => {
    //                 return scale.tickTextParser(d);
    //             });
    //         });
    //     }

    //     // this.axisGroups[orient].transition().duration(1000).call(currnetAxis);

    //     this.updateSeries();
    //     this.updateOptions();
    // }

    // TODO: 해상도에 최적화중입니다. 팝업 표시 추가.
    protected resizeEventHandler = () => {
        if (!this.svg) return;

        this.isResize = true;

        this.setRootSize();

        this.initContainer();

        this.clipPath.attr('width', this.width).attr('height', this.height).attr('x', 0).attr('y', 0);

        this.updateDisplay(DisplayType.RESIZE);

        this.isResize = false;
    };

    private clearOption() {
        this.hideTooltip();
    }

    private idled = () => {
        this.idleTimeout = null;
    };

    // 범례 아이템 체크박스 클릭 이벤트
    private onLegendCheckBoxClick = (d: LegendItem, index: number, nodeList: any) => {
        if (d.label === 'All') {
            this.onLegendAllCheckBoxItemClick(d, index, nodeList);
        } else {
            this.onLegendCheckBoxItemClick(d, index, nodeList);
        }
    };

    // 범례 전체 선택 체크박스 클릭 이벤트
    private onLegendAllCheckBoxItemClick(d: LegendItem, index: number, nodeList: any) {
        this.hideTooltip();
        this.currentLegend = null;
        d.isHide = !d.isHide;
        if (d.isHide) {
            this.isLegendAllHide = true;
        } else {
            this.isLegendAllHide = false;
        }

        this.seriesList.forEach((series: ISeries) => {
            if (series.displayNames && series.displayNames.length) {
                series.displayNames.forEach((displayName: string) => {
                    series.hide(displayName, d.isHide);
                });
            } else {
                series.hide(series.displayName ? series.displayName : series.selector, d.isHide);
            }
        });

        this.legendGroup
            .selectAll('.legend-label-group')
            .filter((item: any) => item.label !== 'All')
            .each((item: any) => {
                item.isHide = d.isHide;
            });

        this.legendGroup
            .selectAll('.legend-item-group')
            .filter((item: any) => item.label !== 'All')
            .selectAll('.checkbox-mark')
            .each((item: any, i: number, node: any) => {
                item.checked = !d.isHide;
                select(node[i]).style('opacity', item.checked ? 1 : 0);
            });

        if (this.isLegendAllHide) {
            // select 해제
            this.legendGroup.selectAll('.legend-label-group').each((item: any, i: number, node: any) => {
                item.selected = true;
                select(node[i]).style('opacity', 1);
            });
        }
    }

    private isLegendItemChecked(isLegendAllChecked: boolean) {
        this.legendGroup
            .selectAll('#legend-all-group')
            .selectAll('.checkbox-mark')
            .each((item: any, i: number, node: any) => {
                item.checked = isLegendAllChecked;
                item.data.isHide = !isLegendAllChecked;
                select(node[i]).style('opacity', item.checked ? 1 : 0);
            });
    }

    // 범례 체크박스 클릭 이벤트
    private onLegendCheckBoxItemClick(d: LegendItem, index: number, nodeList: any) {
        this.hideTooltip();
        d.isHide = !d.isHide;
        // TODO: 자기 자신이 숨김이면 선택이 안되어야 함. isLegendAllHide 바꾸는 것 생각해볼것.
        this.isLegendAllHide = false;
        if (this.seriesList && this.seriesList.length) {
            let target: ISeries;
            if (this.seriesList[0].displayNames && this.seriesList[0].displayNames.length) {
                target = this.seriesList[0];
            } else {
                target = this.seriesList.find(
                    (series: ISeries) => (series.displayName ? series.displayName : series.selector) === d.label
                );
            }

            if (target) {
                target.hide(d.label, d.isHide);
                if (!d.isHide && !d.selected) {
                    target.select(d.label, d.selected);
                }

                if (this.isLegendAll) {
                    const isCheckedAll = (this.legendGroup.selectAll('#legend-all-group').selectAll('.checkbox-mark').data()[0] as any)
                        .checked;

                    let checkCount = 0;
                    let uncheckCount = 0;
                    let allCount = 0;
                    this.legendGroup
                        .selectAll('.legend-item-group')
                        .filter((item: any) => item.label !== 'All')
                        .selectAll('.checkbox-mark')
                        .each((item: any, i: number, node: any) => {
                            if (item.checked) {
                                checkCount++;
                            } else {
                                uncheckCount++;
                            }
                            allCount++;
                        });

                    if (isCheckedAll && uncheckCount > 0) {
                        // all check 해제
                        this.isLegendItemChecked(false);
                    } else {
                        if (checkCount === allCount) {
                            // all check 설정.
                            this.isLegendItemChecked(true);
                        }
                    }
                }
            }
        }
    }

    // 범례 라벨 아이템 클릭 이벤트
    private onLegendLabelItemClick = (event: any, d: LegendItem) => {
        if (this.isLegendAllHide) {
            return;
        }
        const {index, nodeList} = getElementInfoByEvent(event);
        if (d.label === 'All') {
            this.onLegendAllLabelItemSelect(d, index, nodeList);
        } else {
            this.onLegendLabelItemSelect(d, index, nodeList);
        }
    };

    // 범례 라벨 아이템 선택 효과
    private onLegendLabelItemSelect(d: LegendItem, index: number, nodeList: any) {
        this.currentLegend = d.label;
        d.selected = !d.selected;

        select(nodeList[index]).style('opacity', d.selected === false ? 0.5 : null);

        let target: ISeries;
        if (this.seriesList[0].displayNames && this.seriesList[0].displayNames.length) {
            target = this.seriesList[0];
        } else {
            target = this.seriesList.find(
                (series: ISeries) => (series.displayName ? series.displayName : series.selector) === d.label
            );
        }

        if (target) {
            target.select(d.label, d.selected);
        }
    }

    // 범례 전체선택 라벨 효과
    private onLegendAllLabelItemSelect = (d: LegendItem, index: number, nodeList: any) => {
        this.currentLegend = null;
        d.selected = !d.selected;

        select(nodeList[index]).style('opacity', d.selected === false ? 0.5 : null);
        this.legendGroup
            .selectAll('.legend-label-group')
            .style('opacity', d.selected === false ? 0.5 : null)
            .each((item: any) => {
                item.selected = d.selected;
            });

        this.seriesList.forEach((series: ISeries) => {
            if (series.displayNames && series.displayNames.length) {
                series.displayNames.forEach((displayName: string) => {
                    series.select(displayName, d.selected);
                });
            } else {
                series.select(series.displayName ? series.displayName : series.selector, d.selected);
            }
        });
    };
}
