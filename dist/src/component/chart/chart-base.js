var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// import './chart.css';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { select } from 'd3-selection';
import { from, fromEvent, interval, Observable, of, Subject, Subscription, timer } from 'rxjs';
import { concatMap, debounceTime, delay, map, mapTo, switchMap, tap } from 'rxjs/operators';
import crossFilter from 'crossfilter2';
import { sha1 } from 'object-hash';
import { drawAxisByScale, generateScaleByAxis, setupZeroLine } from './axis';
import { Placement } from './chart-configuration';
import { ChartSelector } from './chart-selector-variable';
import { DisplayType } from './chart.interface';
import { drawGridLine } from './grid-line';
import { ChartLegend } from './legend';
import { axisSetupByScale } from './scale';
import { baseTooltipTemplate } from './tooltip/tooltip-template';
import { clearCanvas } from './util/canvas-util';
import { makeSeriesByConfigurationType } from './util/chart-util';
import { delayExcute, getElementInfoByEvent, getTransformByArray, guid } from './util/d3-svg-util';
import { setChartTooltipByPosition, setMultiChartTooltipByPosition } from './util/tooltip-util';
import { setupWebglContext } from './util/webgl-util';
// TODO: 모든 참조되는 함수들은 subject로 바꾼다.
var ChartBase = /** @class */ (function () {
    function ChartBase(configuration) {
        var _this = this;
        this.isResize = false;
        this.mouseEventSubject = new Subject();
        this.zoomEventSubject = new Subject();
        this.chartItemEventSubject = new Subject();
        this.isTooltipDisplay = false; // 현재 툴팁이 열려있는지 판단여부.
        this.svgWidth = 0;
        this.svgHeight = 0;
        this.scales = [];
        this.width = Infinity;
        this.height = Infinity;
        this.originalData = [];
        this.seriesList = [];
        this.functionList = [];
        this.optionList = [];
        this.chartClickSubject = new Subject();
        this.tooltipTemplete = baseTooltipTemplate;
        this.margin = {
            top: 25,
            left: 20,
            bottom: 30,
            right: 20
        }; // default margin
        this.defaultTitleStyle = {
            font: {
                family: 'Arial, Helvetica, sans-serif',
                size: 16,
                color: '#999'
            }
        };
        this.defaultLegendStyle = {
            font: {
                family: 'Arial, Helvetica, sans-serif',
                size: 12,
                color: '#999'
            }
        };
        this.defaultAxisLabelStyle = {
            font: {
                family: 'Arial, Helvetica, sans-serif',
                size: 12,
                color: '#000'
            }
        };
        this.defaultAxisTitleStyle = {
            font: {
                family: 'Arial, Helvetica, sans-serif',
                size: 14,
                color: '#000'
            }
        };
        this.isTooltip = false;
        this.isTooltipMultiple = false;
        this.originDomains = {};
        this.isCustomMargin = false;
        // ===================== axis configuration start ===================== //
        this.axisGroups = {
            top: null,
            left: null,
            bottom: null,
            right: null
        };
        this.gridLineGroups = {
            top: null,
            left: null,
            bottom: null,
            right: null
        };
        this.axisTitleMargin = {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        }; // axis title margin
        // ===================== axis configuration end ===================== //
        // ===================== Title configuration start ===================== //
        this.isTitle = false;
        this.titleContainerSize = {
            width: 0,
            height: 0
        };
        this.titlePlacement = 'top';
        // ===================== Title configuration end ===================== //
        // ===================== Legend configuration start ===================== //
        this.isLegend = false;
        this.legendPlacement = 'right';
        this.legendAlign = 'left';
        this.legendContainerSize = {
            width: 0,
            height: 0
        };
        this.legendPadding = 5;
        this.currentLegend = null;
        this.isLegendCheckBox = true;
        this.isLegendAll = true;
        this.isLegendAllHide = false;
        // ===================== Legend configuration end ===================== //
        // ===================== current min max start ===================== //
        this.currentScale = [];
        // ===================== current min max start ===================== //
        // multi tooltip 및 series 별 tooltip을 구분할 수 있는 저장소.
        this.tooltipItems = [];
        this.maxTooltipCount = 4;
        this.tooltipEventSubject = new Subject();
        // series delay display observable
        this.eachElementAsObservableSubscription = new Subscription();
        this.prevCurrentItemHash = '';
        this.crossFilterObject = null;
        this.chartLifecycleSubject = new Subject();
        this.isRealTime = false;
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
        this.resizeEventHandler = function () {
            if (!_this.svg)
                return;
            _this.isResize = true;
            _this.setRootSize();
            _this.initContainer();
            _this.clipPath.attr('width', _this.width).attr('height', _this.height).attr('x', 0).attr('y', 0);
            _this.updateDisplay(DisplayType.RESIZE);
            _this.isResize = false;
        };
        this.idled = function () {
            _this.idleTimeout = null;
        };
        // 범례 아이템 체크박스 클릭 이벤트
        this.onLegendCheckBoxClick = function (d, index, nodeList) {
            if (d.label === 'All') {
                _this.onLegendAllCheckBoxItemClick(d, index, nodeList);
            }
            else {
                _this.onLegendCheckBoxItemClick(d, index, nodeList);
            }
        };
        // 범례 라벨 아이템 클릭 이벤트
        this.onLegendLabelItemClick = function (event, d) {
            if (_this.isLegendAllHide) {
                return;
            }
            var _a = getElementInfoByEvent(event), index = _a.index, nodeList = _a.nodeList;
            if (d.label === 'All') {
                _this.onLegendAllLabelItemSelect(d, index, nodeList);
            }
            else {
                _this.onLegendLabelItemSelect(d, index, nodeList);
            }
        };
        // 범례 전체선택 라벨 효과
        this.onLegendAllLabelItemSelect = function (d, index, nodeList) {
            _this.currentLegend = null;
            d.selected = !d.selected;
            select(nodeList[index]).style('opacity', d.selected === false ? 0.5 : null);
            _this.legendGroup
                .selectAll('.legend-label-group')
                .style('opacity', d.selected === false ? 0.5 : null)
                .each(function (item) {
                item.selected = d.selected;
            });
            _this.seriesList.forEach(function (series) {
                if (series.displayNames && series.displayNames.length) {
                    series.displayNames.forEach(function (displayName) {
                        series.select(displayName, d.selected);
                    });
                }
                else {
                    series.select(series.displayName ? series.displayName : series.selector, d.selected);
                }
            });
        };
        this.config = configuration;
        this.bootstrap(this.config);
    }
    Object.defineProperty(ChartBase.prototype, "chartData", {
        get: function () {
            return this.originalData;
        },
        set: function (value) {
            this.originalData = value;
            this.draw();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartBase.prototype, "chartContainer", {
        get: function () {
            return this.selector;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartBase.prototype, "webglElementContext", {
        // 이 함수는 보류 (미구현)
        get: function () {
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
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartBase.prototype, "webglCanvasElement", {
        // 이 함수는 보류 (미구현)
        get: function () {
            return this.webglCanvas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartBase.prototype, "chartMargin", {
        get: function () {
            var transform = getTransformByArray(this.mainGroup.attr('transform'));
            var left = +transform[0];
            var top = +transform[1];
            var right = this.svgWidth - (left + this.width);
            var bottom = this.svgHeight - (top + this.height);
            return {
                left: left,
                top: top,
                right: right,
                bottom: bottom
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartBase.prototype, "toolTipTemplete", {
        set: function (value) {
            this.tooltipTemplete = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartBase.prototype, "toolTipTarget", {
        set: function (value) {
            this.tooltipGroup = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartBase.prototype, "tooltip", {
        get: function () {
            return this.config.tooltip;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartBase.prototype, "chartSeries", {
        get: function () {
            return this.seriesList;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartBase.prototype, "functions", {
        get: function () {
            return this.functions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartBase.prototype, "clipPathSelector", {
        get: function () {
            return this.clipPath;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartBase.prototype, "mouseEvent$", {
        get: function () {
            return this.mouseEventSubject.asObservable();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartBase.prototype, "zoomEvent$", {
        get: function () {
            return this.zoomEventSubject.asObservable();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartBase.prototype, "tooltipEvent$", {
        get: function () {
            return this.tooltipEventSubject.asObservable();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartBase.prototype, "lifecycle$", {
        get: function () {
            return this.chartLifecycleSubject.asObservable();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartBase.prototype, "seriesColors", {
        get: function () {
            return this.colors;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartBase.prototype, "chartItemEvent", {
        get: function () {
            return this.chartItemEventSubject.asObservable();
        },
        enumerable: false,
        configurable: true
    });
    ChartBase.prototype.selectedChart = function () {
        return this.chartClickSubject.asObservable();
    };
    ChartBase.prototype.getColorBySeriesIndex = function (index) {
        return this.colors[index];
    };
    ChartBase.prototype.getColorByIndex = function (index) {
        return this.colors[index];
    };
    ChartBase.prototype.initialize = function (configuration) {
        var _this = this;
        var _a, _b, _c, _d, _e;
        // initialize size setup
        if (configuration.margin) {
            Object.assign(this.margin, configuration.margin);
            this.isCustomMargin = true;
        }
        else {
            this.isCustomMargin = false;
            this.config.axes.forEach(function (axis) {
                // 최초 axis padding을 조정해줌.
                if (axis.placement === Placement.TOP || axis.placement === Placement.BOTTOM) {
                    _this.margin[axis.placement] = 30;
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
            this.selector.style('background-color', (_a = configuration.style.backgroundColor) !== null && _a !== void 0 ? _a : '#fff');
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
        }
        else {
            this.colors = schemeCategory10.map(function (color) { return color; });
        }
        if (configuration.title) {
            this.isTitle = true;
            this.titlePlacement = configuration.title.placement;
        }
        else {
            this.isTitle = false;
        }
        if (configuration.legend) {
            this.isLegend = true;
            this.legendPlacement = configuration.legend.placement;
            this.legendAlign = configuration.legend.align;
            // this.isLegendCheckBox = configuration.legend.isLegendCheckBox === false ? configuration.legend.isLegendCheckBox : true;
            // this.isLegendAll = configuration.legend.isLegendAll === false ? configuration.legend.isLegendAll : true;
            this.isLegendCheckBox = (_b = configuration.legend.isCheckBox) !== null && _b !== void 0 ? _b : true;
            this.isLegendAll = (_c = configuration.legend.isAll) !== null && _c !== void 0 ? _c : true;
        }
        if (configuration.tooltip) {
            this.isTooltip = (_e = (_d = configuration.tooltip) === null || _d === void 0 ? void 0 : _d.visible) !== null && _e !== void 0 ? _e : true;
            this.isTooltipMultiple = configuration.tooltip.isMultiple === true ? true : false;
        }
        if (!this.maskId) {
            this.maskId = guid();
        }
        return true;
    };
    ChartBase.prototype.bootstrap = function (configuration) {
        if (this.initialize(configuration)) {
            this.setRootSize();
            this.initContainer();
            this.addEventListner();
        }
    };
    ChartBase.prototype.realTime = function (isRealTime, duration, term) {
        var _this = this;
        if (duration === void 0) { duration = 1000; }
        if (term === void 0) { term = 1000; }
        this.isRealTime = isRealTime;
        if (this.realTimeSubscription) {
            this.realTimeSubscription.unsubscribe();
        }
        if (isRealTime) {
            this.realTimeSubscription = interval(duration)
                .pipe(delay(500))
                .subscribe(function (value) {
                // x axis의 domain을 현 시간으로 계속 업데이트 해줘야함.
                var newTime = new Date().getTime();
                var axesItem = _this.config.axes.find(function (item) { return item.placement === Placement.BOTTOM || item.placement === Placement.TOP; });
                axesItem.domain = [axesItem.min + term * value, axesItem.max + term * value];
                // TODO: 보이지 않는 시점부터 data는 삭제해야함.
                if (_this.originalData.length && _this.originalData[0][axesItem.field] < axesItem.min + term * value) {
                    var checkDate = _this.originalData[0][axesItem.field].getTime();
                    if (checkDate < axesItem.min + term * value) {
                        _this.originalData.shift();
                    }
                }
                _this.updateAxis().then(function () {
                    _this.updateSeries();
                });
            });
        }
        return this;
    };
    ChartBase.prototype.data = function (data) {
        this.originalData = data;
        this.updateDisplay();
        return this;
    };
    // TODO: real time data 적용해 볼 것.
    ChartBase.prototype.appendData = function (data, seriesSelector) {
        // TODO: data 추가가 될 때, min, max도 같이 업데이트 해줄까? 해줘야 performance 가 좋다.
        this.originalData.push(data);
    };
    ChartBase.prototype.series = function (seriesConfigurations) {
        var _this = this;
        new Observable(function (observ) {
            observ.next(true);
            observ.complete();
        })
            .pipe(tap(function () {
            _this.seriesGroup.selectAll('*').remove();
            _this.legendGroup.selectAll('*').remove();
        }), delay(50), tap(function () {
            _this.seriesList.length = 0;
            for (var i = 0; i < seriesConfigurations.length; i++) {
                _this.seriesList.push(makeSeriesByConfigurationType(seriesConfigurations[i]));
            }
        }))
            .subscribe(function () {
            _this.updateLegend();
            _this.updateSeries();
        });
        return this;
    };
    ChartBase.prototype.title = function (chartTitle) {
        if (this.config.title) {
            this.config.title.content = chartTitle;
            this.titleGroup.data([this.config.title]);
            this.updateTitle();
        }
        return this;
    };
    ChartBase.prototype.axes = function (axes) {
        this.config.axes.length = 0;
        for (var i = 0; i < axes.length; i++) {
            this.config.axes.push(axes[i]);
        }
        this.updateDisplay();
        return this;
    };
    ChartBase.prototype.draw = function () {
        this.chartLifecycleSubject.next({ type: 'initialize' });
        this.updateDisplay();
        return this;
    };
    ChartBase.prototype.clear = function () {
        this.selector.selectAll('svg').remove();
        this.selector.selectAll('canvas').remove();
        // this.selector.selectAll('div').style('opacity', 0).style('pointer-events', 'none').remove();
        this.seriesList.forEach(function (series) {
            series.destroy();
        });
        this.functionList.forEach(function (functions) {
            functions.destroy();
        });
        this.functionList.forEach(function (functions) {
            functions.destroy();
        });
        if (this.chartLegend) {
            this.chartLegend.destroy();
        }
        this.subscription.unsubscribe();
    };
    ChartBase.prototype.showTooltipBySeriesSelector = function (selector) {
        var _this = this;
        var series = this.seriesList.find(function (item) { return item.selector === selector; });
        if (series) {
            this.tooltipItems.push({
                selector: selector
            });
            series.unSelectItem();
            delayExcute(50, function () {
                _this.tooltipGroup.select('#' + selector).style('display', null);
                _this.drawTooltipBySeriesSelector(selector);
            });
        }
        return this.tooltipGroup;
    };
    ChartBase.prototype.hideTooltipBySeriesSelector = function (selector) {
        var _this = this;
        var targetIndex = this.seriesList.findIndex(function (item) { return item.selector === selector; });
        if (targetIndex > -1) {
            var delIndex = this.tooltipItems.findIndex(function (item) { return item.selector === selector; });
            if (delIndex > -1) {
                this.tooltipItems.slice(delIndex, 1);
            }
            var series = this.seriesList[targetIndex];
            series.unSelectItem();
        }
        delayExcute(50, function () {
            if (!_this.tooltipItems.length) {
                _this.tooltipGroup.select('#' + selector).style('display', 'none');
            }
            // TODO: 지우거나 this.tooltipItems로 다시 그리거나 할 것.
        });
        return this.tooltipGroup;
    };
    ChartBase.prototype.drawTooltipBySeriesSelector = function (selector) {
        // TODO: tooltip을 시리즈 별로 생성한다.
        // select item을 큐에 저장하고 약간의 딜레이 타임을 줘서 툴팁을 생성하는 로직을 고민해볼 것.
        this.tooltipGroup
            .selectAll('.tooltip-background')
            .data(['background'])
            .join(function (enter) { return enter.append('rect').attr('class', '.tooltip-background'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
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
            .join(function (enter) { return enter.append('text').attr('class', '.tooltip-text'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('x', 5)
            .attr('dy', '1.2em')
            .style('text-anchor', 'start')
            .style('fill', '#fff')
            .attr('font-size', '14px')
            .attr('font-weight', '100');
    };
    ChartBase.prototype.destroy = function () {
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
        this.seriesList.forEach(function (series) { return series.destroy(); });
        this.functionList.forEach(function (functions) { return functions.destroy(); });
        this.optionList.forEach(function (options) { return options.destroy(); });
        this.originDomains = null;
        this.originalData.length = 0;
    };
    ChartBase.prototype.updateOptions = function () {
        var _this = this;
        if (this.optionList && this.optionList.length) {
            this.optionList.map(function (option, index) {
                option.chartBase = _this;
                option.setSvgElement(_this.svg, _this.optionGroup, index);
                option.drawOptions(_this.originalData, _this.scales, { width: _this.width, height: _this.height });
            });
        }
    };
    ChartBase.prototype.targetSeriesUpdate = function (series, index) {
        var _this = this;
        return new Promise(function (resolve) {
            series.chartBase = _this;
            series.setSvgElement(_this.svg, _this.seriesGroup, index);
            series.drawSeries(_this.originalData, _this.scales, {
                width: _this.width,
                height: _this.height
            }, {
                index: index,
                color: _this.colors[index],
                displayType: DisplayType.NORMAL
            });
            resolve();
        });
    };
    ChartBase.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var index, _i, _a, series;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        index = -1;
                        _i = 0, _a = this.seriesList;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        series = _a[_i];
                        index++;
                        return [4 /*yield*/, this.targetSeriesUpdate(series, index)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ChartBase.prototype.updateSeries = function (displayType) {
        var _this = this;
        if (displayType === void 0) { displayType = DisplayType.NORMAL; }
        try {
            if (this.seriesList && this.seriesList.length) {
                if (!this.config.displayDelay) {
                    var xScale_1 = this.scales.find(function (scale) { return scale.orient === Placement.BOTTOM || scale.orient === Placement.TOP; });
                    var yScale_1 = this.scales.find(function (scale) { return scale.orient === Placement.LEFT || scale.orient === Placement.RIGHT; });
                    this.seriesList.map(function (series, index) {
                        if (!series.chartBase) {
                            series.chartBase = _this;
                        }
                        series.setSvgElement(_this.svg, _this.seriesGroup, index);
                        // TODO: crossFilter 적용해서 각 시리즈에서 해당하는 필드데이터만 넘겨줄 수 있도록? 고려해 볼 것.
                        // this.crossFilterObject.dimension((d: any) => d[series.xField])
                        var xField = series.xField();
                        var yField = series.yField();
                        series.drawSeries(
                        // this.originalData
                        displayType === DisplayType.ZOOMIN
                            ? _this.originalData.filter(function (d) {
                                return xField &&
                                    d[xField] >= xScale_1.min - xScale_1.min * 0.1 &&
                                    d[xField] <= xScale_1.max + xScale_1.max * 0.1 &&
                                    yField &&
                                    d[yField] >= yScale_1.min &&
                                    d[yField] <= yScale_1.max;
                            })
                            : _this.originalData, _this.scales, {
                            width: _this.width,
                            height: _this.height
                        }, {
                            index: index,
                            color: _this.colors[index],
                            displayType: displayType
                        });
                    });
                    return;
                }
                else {
                    if (this.currentScale.length) {
                        this.seriesList.map(function (series, index) {
                            series.chartBase = _this;
                            series.setSvgElement(_this.svg, _this.seriesGroup, index);
                            series.drawSeries(_this.originalData, _this.scales, {
                                width: _this.width,
                                height: _this.height
                            }, {
                                index: index,
                                color: _this.colors[index],
                                displayType: DisplayType.NORMAL
                            });
                        });
                        return;
                    }
                }
                // 시간차로 그리기.
                var arrayAsObservable = of(null).pipe(
                // delay(this.config.displayDelay.delayTime),
                switchMap(function () { return _this.getObjectWithArrayInPromise(_this.seriesList); }), map(function (val) {
                    return val.data;
                }), switchMap(function (val) { return from(val); }));
                var eachElementAsObservable = arrayAsObservable.pipe(concatMap(function (value) { return timer(_this.config.displayDelay.delayTime).pipe(mapTo(value)); }), // Not working : we want to wait 500ms for each value
                map(function (val) {
                    return val;
                }));
                this.eachElementAsObservableSubscription.unsubscribe();
                this.eachElementAsObservableSubscription = new Subscription();
                this.eachElementAsObservableSubscription.add(eachElementAsObservable.subscribe(function (index) {
                    var currentIndex = +index;
                    _this.seriesList[currentIndex].chartBase = _this;
                    _this.seriesList[currentIndex].setSvgElement(_this.svg, _this.seriesGroup, currentIndex);
                    _this.seriesList[currentIndex].drawSeries(_this.originalData, _this.scales, {
                        width: _this.width,
                        height: _this.height
                    }, {
                        index: currentIndex,
                        color: _this.colors[currentIndex],
                        displayType: DisplayType.NORMAL
                    });
                }, function (error) {
                    if (console && console.log) {
                        console.log(error);
                    }
                }, function () {
                    if (console && console.log) {
                        console.log('complete series display');
                    }
                }));
            }
        }
        catch (error) {
            if (console && console.log) {
                console.log(error);
            }
        }
    };
    ChartBase.prototype.getObjectWithArrayInPromise = function (list) {
        var data = list.map(function (series, index) { return index; });
        return new Promise(function (resolve) {
            delayExcute(20, function () {
                return resolve({
                    data: data
                });
            });
        });
    };
    ChartBase.prototype.updateRescaleAxis = function (isZoom) {
        var _this = this;
        var _a, _b, _c;
        if (isZoom === void 0) { isZoom = true; }
        var index = 0;
        var _loop_1 = function () {
            var scale = this_1.scales[index];
            var orientedAxis = axisSetupByScale(scale);
            if (scale.gridLine) {
                drawGridLine({
                    width: this_1.width,
                    height: this_1.height
                }, scale, this_1.mainGroup, {
                    color: (_a = scale.gridLine.color) !== null && _a !== void 0 ? _a : '#ccc',
                    dasharray: (_b = scale.gridLine.dasharray) !== null && _b !== void 0 ? _b : 0,
                    opacity: (_c = scale.gridLine.opacity) !== null && _c !== void 0 ? _c : 1
                });
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
                this_1.axisGroups[scale.orient]
                    .call(orientedAxis)
                    .selectAll('text')
                    .style('font-size', this_1.defaultAxisLabelStyle.font.size + 'px')
                    .style('font-family', this_1.defaultAxisLabelStyle.font.family);
                if (scale.tickTextParser) {
                    delayExcute(50, function () {
                        _this.axisGroups[scale.orient].selectAll('text').text(function (d) {
                            return scale.tickTextParser(d);
                        });
                    });
                }
            }
            if (scale.zeroLine && scale.min < 0) {
                setupZeroLine({
                    width: this_1.width,
                    height: this_1.height
                }, scale, this_1.axisGroups[scale.orient]);
            }
            else {
                this_1.axisGroups[scale.orient].selectAll(".".concat(scale.orient, "-").concat(scale.field, "-zero-line")).remove();
            }
        };
        var this_1 = this;
        for (index = 0; index < this.scales.length; index++) {
            _loop_1();
        }
    };
    ChartBase.prototype.pointerClear = function () {
        var selectionCanvas = this.selector.select('.' + ChartSelector.POINTER_CANVAS);
        if (selectionCanvas && selectionCanvas.node()) {
            var context = selectionCanvas.node().getContext('2d');
            clearCanvas(context, this.width, this.height);
        }
        this.selectionGroup.selectAll("[type='tooltip-point']").remove();
        this.hideTooltip();
    };
    ChartBase.prototype.selectionClear = function () {
        this.selectionGroup.selectAll('.selection-point').remove();
        var selectionCanvas = this.selector.select('.' + ChartSelector.SELECTION_CANVAS);
        if (selectionCanvas && selectionCanvas.node()) {
            var context = selectionCanvas.node().getContext('2d');
            clearCanvas(context, this.width, this.height);
        }
    };
    ChartBase.prototype.enableFunction = function (selector) { };
    ChartBase.prototype.disableFunction = function (selector) { };
    ChartBase.prototype.showTooltip = function (boxStyle, textStyle) {
        this.seriesList.forEach(function (series) {
            series.unSelectItem();
        });
        this.tooltipGroup.style('display', null);
        this.tooltipTemplete(this.tooltipGroup, boxStyle, textStyle);
        return this.tooltipGroup.select('g.tooltip-item-group');
    };
    ChartBase.prototype.hideTooltip = function () {
        var _a, _b;
        if (!this.isTooltipDisplay) {
            return;
        }
        // tooltip hide event 발생.
        if (((_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.tooltip) === null || _b === void 0 ? void 0 : _b.visible) === false) {
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
            this.seriesList.forEach(function (series) {
                series.unSelectItem();
            });
            this.tooltipGroup.style('display', 'none');
        }
        return this.tooltipGroup;
    };
    ChartBase.prototype.updateFunctions = function () {
        var _this = this;
        try {
            if (this.functionList && this.functionList.length) {
                this.functionList.forEach(function (functionItem, index) {
                    functionItem.chartBase = _this;
                    functionItem.setSvgElement(_this.svg, _this.seriesGroup, index);
                    functionItem.drawFunctions(_this.originalData, _this.scales, { width: _this.width, height: _this.height });
                });
            }
        }
        catch (error) {
            if (console && console.log) {
                console.log(error);
            }
        }
    };
    ChartBase.prototype.setRootSize = function () {
        var _this = this;
        var titleTextHeight = 16;
        this.svgWidth = this.svg.node().clientWidth;
        this.svgHeight = this.svg.node().clientHeight;
        // this.svgWidth = parseFloat(this.svg.style('width'));
        // this.svgHeight = parseFloat(this.svg.style('height'));
        // axis title check
        if (this.config.axes && this.config.axes.length) {
            this.config.axes.forEach(function (axis) {
                if (axis.title) {
                    _this.axisTitleMargin[axis.placement] = titleTextHeight;
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
    };
    ChartBase.prototype.initLegend = function () {
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
    };
    ChartBase.prototype.initContainer = function () {
        var _this = this;
        var x = this.margin.left +
            this.axisTitleMargin.left +
            (this.isTitle && this.titlePlacement === Placement.LEFT ? this.titleContainerSize.width : 0) +
            (this.isLegend && this.legendPlacement === Placement.LEFT ? this.legendContainerSize.width : 0);
        var y = this.margin.top +
            this.axisTitleMargin.top +
            (this.isTitle && this.titlePlacement === Placement.TOP ? this.titleContainerSize.height : 0) +
            (this.isLegend && this.legendPlacement === Placement.TOP ? this.legendContainerSize.height : 0);
        var width = this.width;
        var height = this.height;
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
        this.mainGroup.attr('transform', "translate(".concat(x, ", ").concat(y, ")"));
        // grid line setup
        if (!this.gridLineGroups.bottom) {
            this.gridLineGroups.bottom = this.mainGroup.append('g').attr('class', 'x-grid-group');
        }
        this.gridLineGroups.bottom.attr('transform', "translate(0, ".concat(height, ")"));
        if (!this.gridLineGroups.top) {
            this.gridLineGroups.top = this.mainGroup.append('g').attr('class', 'x-top-grid-group');
        }
        this.gridLineGroups.top.attr('transform', "translate(0, 0)");
        if (!this.gridLineGroups.left) {
            this.gridLineGroups.left = this.mainGroup.append('g').attr('class', 'y-grid-group');
        }
        if (!this.gridLineGroups.right) {
            this.gridLineGroups.right = this.mainGroup.append('g').attr('class', 'y-right-grid-group');
        }
        this.gridLineGroups.right.attr('transform', "translate(".concat(width, ", 0)"));
        if (this.isTitle) {
            this.titleGroup = this.svg
                .selectAll('.title-group')
                .data([this.config.title])
                .join(function (enter) { return enter.append('g').attr('class', 'title-group'); }, function (update) { return update; }, function (exit) { return exit.remove(); });
        }
        if (this.isLegend) {
            if (!this.legendGroup) {
                this.legendGroup = this.svg.append('g').attr('class', 'legend-group');
            }
            var legendX_1 = 0;
            var legendY_1 = 0;
            this.legendGroup.attr('transform', function () {
                var translate = 'translate(0, 0)';
                if (_this.legendPlacement === Placement.RIGHT) {
                    legendX_1 = width + (_this.margin.left + _this.margin.right + _this.axisTitleMargin.left + _this.axisTitleMargin.right);
                    translate = "translate(".concat(legendX_1, ", ").concat(legendY_1, ")");
                }
                else if (_this.legendPlacement === Placement.LEFT) {
                    legendX_1 = _this.isTitle && _this.titlePlacement === Placement.LEFT ? _this.titleContainerSize.width : 0;
                    translate = "translate(".concat(legendX_1, ", ").concat(legendY_1, ")");
                }
                else if (_this.legendPlacement === Placement.TOP) {
                    legendX_1 = _this.legendPadding;
                    legendY_1 =
                        (_this.isTitle && _this.titlePlacement === Placement.TOP ? _this.titleContainerSize.height : 0) +
                            _this.legendPadding;
                    translate = "translate(".concat(legendX_1, ", ").concat(legendY_1, ")");
                }
                else if (_this.legendPlacement === Placement.BOTTOM) {
                    legendX_1 = _this.legendPadding;
                    legendY_1 = _this.margin.top + _this.margin.bottom + (_this.axisTitleMargin.top + _this.axisTitleMargin.bottom) + height;
                    if (_this.isTitle && _this.titlePlacement === Placement.TOP) {
                        legendY_1 += _this.titleContainerSize.height + _this.legendPadding;
                    }
                    translate = "translate(".concat(legendX_1, ", ").concat(legendY_1, ")");
                }
                return translate;
            });
        }
        if (!this.optionGroup) {
            this.optionGroup = this.svg.append('g').attr('class', 'option-group');
        }
        this.optionGroup.attr('transform', "translate(".concat(x, ", ").concat(y, ")")).attr('clip-path', "url(#".concat(this.maskId, ")"));
        if (!this.seriesGroup) {
            this.seriesGroup = this.svg.append('g').attr('class', ChartSelector.SERIES_SVG);
        }
        this.seriesGroup.attr('transform', "translate(".concat(x, ", ").concat(y, ")")).attr('clip-path', "url(#".concat(this.maskId, ")"));
        if (!this.selectionGroup) {
            this.selectionGroup = this.svg.append('g').attr('class', ChartSelector.SELECTION_SVG);
        }
        this.selectionGroup.attr('transform', "translate(".concat(x, ", ").concat(y, ")"));
        if (!this.tooltipGroup) {
            this.tooltipGroup = this.svg.append('g').attr('class', 'tooltip-group');
        }
        this.tooltipGroup.attr('transform', "translate(".concat(x, ", ").concat(y, ")")).style('display', 'none');
        // zoom을 canvas와 webgl과 통일하기위한 순서.
        if (!this.zoomGroup) {
            this.zoomGroup = this.svg.append('g').attr('class', ChartSelector.ZOOM_SVG);
            this.zoomGroup
                .append('rect')
                .attr('class', ChartSelector.ZOOM_SVG + '-background')
                .style('fill', 'none')
                .style('pointer-events', 'all');
        }
        this.zoomGroup.attr('transform', "translate(".concat(x, ", ").concat(y, ")"));
        this.zoomGroup
            .select('.' + ChartSelector.ZOOM_SVG + '-background')
            .attr('width', this.width)
            .attr('height', this.height);
        // axis group setup
        if (!this.axisGroups.bottom) {
            this.axisGroups.bottom = this.mainGroup.append('g').attr('class', 'x-axis-group');
        }
        this.axisGroups.bottom.attr('transform', "translate(0, ".concat(height, ")"));
        if (!this.axisGroups.top) {
            this.axisGroups.top = this.mainGroup.append('g').attr('class', 'x-top-axis-group');
        }
        this.axisGroups.top.attr('transform', "translate(0, 0)");
        if (!this.axisGroups.left) {
            this.axisGroups.left = this.mainGroup.append('g').attr('class', 'y-axis-group');
        }
        if (!this.axisGroups.right) {
            this.axisGroups.right = this.mainGroup.append('g').attr('class', 'y-right-axis-group');
        }
        this.axisGroups.right.attr('transform', "translate(".concat(width, ", 0)"));
    };
    // 모든 외부에서 들어오는 이벤트는 여기서 처리한다.
    ChartBase.prototype.addEventListner = function () {
        var _this = this;
        this.subscription = new Subscription();
        if (this.config.isResize && this.config.isResize === true) {
            var resizeEvent = fromEvent(window, 'resize').pipe(debounceTime(500));
            this.subscription.add(resizeEvent.subscribe(this.resizeEventHandler));
        }
        var isDragStart = false;
        var isMouseLeave = false;
        var tooltipTargetDataList = [];
        var tooltipPointerDataList = [];
        this.subscription.add(this.mouseEvent$.subscribe(function (chartEvent) {
            if (isMouseLeave) {
                isMouseLeave = false;
                return;
            }
            switch (chartEvent.type) {
                case 'mousemove':
                    isMouseLeave = false;
                    _this.mouseleaveEventHandler();
                    // 전에 오버했던 아이템 아웃 이벤트 발생.
                    if (tooltipTargetDataList.length) {
                        _this.mouseoutEventHandler(tooltipTargetDataList);
                    }
                    tooltipTargetDataList.length = 0;
                    tooltipPointerDataList.length = 0;
                    if (_this.config.tooltip && !isDragStart && !isMouseLeave) {
                        var maxLength = _this.seriesList.length;
                        while (maxLength--) {
                            var positionData = _this.seriesList[maxLength].getSeriesDataByPosition(chartEvent.position);
                            if (positionData.length) {
                                // TODO: data 있을 시 시리지 하이라이트 기능 여부 고민해 볼 것.
                                var currentChartItemIndex = _this.seriesList[maxLength].drawPointer(chartEvent.position, positionData);
                                if (currentChartItemIndex > -1) {
                                    // tooltip show event 발생
                                    var currentTooltipData = __spreadArray([], positionData[currentChartItemIndex], true);
                                    if (tooltipTargetDataList.length < 4) {
                                        tooltipTargetDataList.push({
                                            seriesIndex: maxLength,
                                            tooltipData: currentTooltipData,
                                            style: _this.seriesList[maxLength].tooltipStyle(currentTooltipData),
                                            pointer: _this.seriesList[maxLength].pointerSize(currentTooltipData),
                                            tooltipText: _this.seriesList[maxLength].tooltipText,
                                            tooltipTextStr: _this.seriesList[maxLength].tooltipText(currentTooltipData)
                                        });
                                        tooltipPointerDataList.push({
                                            seriesIndex: maxLength,
                                            position: __spreadArray([], chartEvent.position, true),
                                            positionData: __spreadArray([], positionData, true)
                                        });
                                    }
                                    if (!_this.isTooltipMultiple) {
                                        break;
                                    }
                                }
                            }
                        }
                        _this.drawTooltipPointer(_this.seriesList, tooltipPointerDataList);
                        _this.drawTooltipContents(_this.seriesList, tooltipTargetDataList, _this.config.tooltip.tooltipTextParser);
                        var newHash = sha1(tooltipTargetDataList);
                        if (_this.prevCurrentItemHash !== newHash) {
                            _this.prevCurrentItemHash = newHash;
                        }
                        // 오버 이벤트 발생.
                        if (tooltipTargetDataList.length) {
                            _this.mouseoverEventHandler(tooltipTargetDataList);
                        }
                    }
                    break;
                case 'mouseleave':
                    isMouseLeave = true;
                    _this.mouseleaveEventHandler();
                    _this.drawTooltipContents(_this.seriesList, [], undefined);
                    if (tooltipTargetDataList.length) {
                        _this.mouseoutEventHandler(tooltipTargetDataList);
                    }
                    break;
                case 'click':
                case 'mouseup':
                    isDragStart = false;
                    if (!tooltipPointerDataList.length) {
                        _this.selectionClear();
                        _this.chartItemEventSubject.next({
                            type: 'backgroundclick',
                            position: [0, 0],
                            data: null,
                            etc: [0, 0]
                        });
                        return;
                    }
                    var seriesIndex = tooltipPointerDataList[0].seriesIndex;
                    var targetSeries = _this.seriesList[seriesIndex];
                    var positionDataList = targetSeries.getSeriesDataByPosition(chartEvent.position);
                    if (positionDataList.length) {
                        targetSeries.onSelectItem(chartEvent.position, positionDataList);
                        _this.chartItemEventSubject.next({
                            type: chartEvent.type,
                            position: [positionDataList[0][0], positionDataList[0][1]],
                            data: positionDataList[0][2],
                            etc: positionDataList[0]
                        });
                        break;
                    }
                    break;
            }
        }));
        this.subscription.add(this.zoomEvent$.subscribe(function (chartEvent) {
            if (chartEvent.type === 'dragstart') {
                isDragStart = true;
                _this.pointerClear();
            }
            else if (chartEvent.type === 'zoomin') {
                isDragStart = false;
                _this.selectionClear();
                _this.zoominEventHandler(chartEvent);
            }
            else if (chartEvent.type === 'zoomout') {
                isDragStart = false;
                _this.selectionClear();
                _this.zoomoutEventHandler();
            }
            else {
                isDragStart = false;
            }
        }));
    };
    ChartBase.prototype.drawTooltipPointer = function (seriesList, tooltipTargetList) {
        var _this = this;
        tooltipTargetList.forEach(function (item) {
            _this.seriesList[item.seriesIndex].drawPointer(item.position, item.positionData);
        });
    };
    ChartBase.prototype.drawTooltipContents = function (seriesList, tooltipTargetList, tooltipTextParser) {
        var _this = this;
        this.tooltipGroup.style('display', null);
        var itemGroup = this.tooltipGroup
            .selectAll('g.tooltip-item-group')
            .data(tooltipTargetList)
            .join(function (enter) { return enter.append('g').attr('class', 'tooltip-item-group'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('transform', function (d) {
            return "translate(".concat(d.tooltipData[0], ", ").concat(d.tooltipData[1], ")");
        })
            .each(function (d, index, nodeList) {
            if (index > _this.maxTooltipCount - 1) {
                return;
            }
            var group = select(nodeList[index]);
            var prevGroup = index > 0 ? select(nodeList[index - 1]) : undefined;
            // style and templete setup
            _this.tooltipTemplete(group, d.style);
            var positionx = d.tooltipData[0];
            var positiony = d.tooltipData[1];
            _this.isTooltipMultiple
                ? setMultiChartTooltipByPosition(group, tooltipTextParser ? tooltipTextParser(d.tooltipData) : d.tooltipText(d.tooltipData), {
                    width: _this.width,
                    height: _this.height
                }, [positionx, positiony], prevGroup, index)
                : setChartTooltipByPosition(group, tooltipTextParser ? tooltipTextParser(d.tooltipData) : d.tooltipText(d.tooltipData), {
                    width: _this.width,
                    height: _this.height
                }, [positionx, positiony], {
                    width: d.pointer.width,
                    height: d.pointer.height
                });
        });
    };
    ChartBase.prototype.drawTooltip = function (currentSeries, currentTooltipData, tooltipTextParser) {
        var tooltipGroup = this.showTooltip(currentSeries.tooltipStyle(currentTooltipData));
        var pointerSize = currentSeries.pointerSize(currentTooltipData);
        setChartTooltipByPosition(tooltipGroup, tooltipTextParser ? tooltipTextParser(currentTooltipData) : currentSeries.tooltipText(currentTooltipData), {
            width: this.width,
            height: this.height
        }, [currentTooltipData[0], currentTooltipData[1]], {
            width: pointerSize.width,
            height: pointerSize.height
        });
    };
    ChartBase.prototype.zoominEventHandler = function (chartEvent) {
        var reScale = [
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
    };
    ChartBase.prototype.zoomoutEventHandler = function () {
        this.scales = this.setupScale(this.config.axes, this.width, this.height, []);
        this.updateRescaleAxis(false);
        this.updateFunctions();
        this.updateSeries(DisplayType.ZOOMOUT);
        this.updateOptions();
    };
    ChartBase.prototype.mouseleaveEventHandler = function () {
        this.hideTooltip();
        this.pointerClear();
        // this.selectionClear();
    };
    ChartBase.prototype.mousemoveDataClear = function () {
        // if (this.currentChartItem.length) {
        //     this.mouseoutEventHandler(this.currentChartItem);
        // }
        this.pointerClear();
    };
    ChartBase.prototype.mouseoutEventHandler = function (positionData) {
        this.chartItemEventSubject.next({
            type: 'mouseout',
            position: [0, 0],
            data: positionData.map(function (item) { return item.tooltipData; }),
            etc: positionData
        });
        positionData.length = 0;
    };
    ChartBase.prototype.mouseoverEventHandler = function (positionData) {
        // mouseover event 발생
        this.chartItemEventSubject.next({
            type: 'mouseover',
            position: [positionData[0].tooltipData[0], positionData[0].tooltipData[1]],
            data: positionData.map(function (item) { return item.tooltipData; }),
            etc: positionData
        });
    };
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
    ChartBase.prototype.updateTitle = function () {
        var _this = this;
        if (this.titleGroup) {
            this.titleGroup.attr('transform', function (d) {
                var titleX = 0;
                var titleY = 0;
                var padding = 5;
                if (d.placement === Placement.RIGHT) {
                    titleX =
                        _this.width +
                            _this.margin.left +
                            _this.margin.right +
                            _this.titleContainerSize.width +
                            (_this.isLegend && (_this.legendPlacement === Placement.RIGHT || _this.legendPlacement === Placement.LEFT)
                                ? _this.legendContainerSize.width
                                : 0);
                    titleY = _this.height;
                }
                else if (d.placement === Placement.LEFT) {
                    titleX = _this.titleContainerSize.width;
                    titleY = _this.height;
                }
                else if (d.placement === Placement.BOTTOM) {
                    titleY =
                        _this.height +
                            (_this.margin.top + _this.margin.bottom) +
                            (_this.axisTitleMargin.top + _this.axisTitleMargin.bottom) +
                            (_this.isLegend && (_this.legendPlacement === Placement.TOP || _this.legendPlacement === Placement.BOTTOM)
                                ? _this.legendContainerSize.height
                                : 0) -
                            padding;
                }
                else {
                    titleY = padding;
                }
                var rotate = d.placement === Placement.LEFT || d.placement === Placement.RIGHT ? -90 : 0;
                return "translate(".concat(titleX, ", ").concat(titleY, ") rotate(").concat(rotate, ")");
            });
            this.titleGroup
                .selectAll('.chart-title')
                .data(function (d) { return [d]; })
                .join(function (enter) { return enter.append('text').attr('class', 'chart-title'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
                .style('font-size', function (d) {
                return (d.style && d.style.size ? d.style.size : _this.defaultTitleStyle.font.size) + 'px';
            })
                .style('stroke', function (d) {
                return d.style && d.style.color ? d.style.color : _this.defaultTitleStyle.font.color;
            })
                .style('text-anchor', 'middle')
                .style('stroke-width', 0.5)
                .style('font-family', function (d) {
                return d.style && d.style.font ? d.style.font : _this.defaultTitleStyle.font.family;
            })
                .text(function (d) { return d.content; })
                .attr('dy', '0em')
                .attr('transform', function (d, index, nodeList) {
                var textNode = nodeList[index].getBoundingClientRect();
                var textHeight = textNode.height;
                var x = 0;
                var y = 0;
                if (d.placement === Placement.TOP || d.placement === Placement.BOTTOM) {
                    x =
                        (_this.width + _this.margin.left + _this.margin.right) / 2 -
                            (_this.isLegend && _this.legendPlacement === Placement.LEFT ? _this.legendContainerSize.width : 0);
                    y = textHeight / 2 + 3;
                }
                else {
                    x = (_this.height + _this.margin.top + _this.margin.bottom) / 2 - textHeight / 2;
                }
                var translate = "translate(".concat(x, ", ").concat(y, ")");
                return translate;
            });
        }
    };
    ChartBase.prototype.updateAxis = function () {
        var _this = this;
        var maxTextWidth = {};
        var padding = 10; // 10 는 axis 여백.
        var isAxisUpdate = false;
        this.originDomains = {};
        this.scales = this.setupScale(this.config.axes, this.width, this.height, this.currentScale);
        this.scales.forEach(function (scale) {
            var _a, _b, _c;
            if (scale.gridLine) {
                drawGridLine({
                    width: _this.width,
                    height: _this.height
                }, scale, _this.mainGroup, {
                    color: (_a = scale.gridLine.color) !== null && _a !== void 0 ? _a : '#ccc',
                    dasharray: (_b = scale.gridLine.dasharray) !== null && _b !== void 0 ? _b : 0,
                    opacity: (_c = scale.gridLine.opacity) !== null && _c !== void 0 ? _c : 1
                });
            }
            maxTextWidth[scale.orient] = drawAxisByScale({
                width: _this.width,
                height: _this.height
            }, _this.margin, _this.isCustomMargin, scale, _this.axisGroups[scale.orient], _this.defaultAxisLabelStyle, _this.defaultAxisTitleStyle, _this.axisTitleMargin, _this.isRealTime);
        });
        // margin 설정이 따로 없으면 자동으로 계산해서 margin을 갱신한다.
        if (!this.isCustomMargin) {
            Object.keys(maxTextWidth).forEach(function (orient) {
                if (_this.margin[orient] < maxTextWidth[orient] + padding) {
                    _this.margin[orient] = maxTextWidth[orient] + padding;
                    isAxisUpdate = true;
                }
            });
        }
        return new Promise(function (resolve) {
            if (isAxisUpdate) {
                _this.setRootSize();
                _this.initContainer();
                _this.updateDisplay();
            }
            else {
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
    };
    ChartBase.prototype.updateLegend = function () {
        if (!this.isLegend) {
            return;
        }
        this.chartLegend.drawLegend(this.legendGroup);
    };
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
    ChartBase.prototype.updateDisplay = function (displayType) {
        var _this = this;
        if (displayType === void 0) { displayType = DisplayType.NORMAL; }
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
        this.updateAxis().then(function () {
            // TODO: rxjs로 delay time 걸어서 pipe 라인 구축해서 돌려볼 것.
            _this.updateLegend();
            _this.updateTitle();
            _this.updateSeries(displayType);
            _this.updateOptions();
            _this.updateFunctions();
            _this.chartLifecycleSubject.next({ type: 'complete' });
        });
    };
    ChartBase.prototype.setupData = function (data) {
        // this.originalData = [...data];
        return data;
    };
    ChartBase.prototype.setupScale = function (axes, width, height, reScaleAxes) {
        if (axes === void 0) { axes = []; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        // zoom out 했을 경우에 초기화.
        if (!reScaleAxes || (reScaleAxes && !reScaleAxes.length)) {
            this.currentScale.length = 0;
        }
        else {
            this.currentScale = __spreadArray([], reScaleAxes, true);
        }
        return generateScaleByAxis(axes, this.originalData, { width: width, height: height }, this.currentScale, this.isRealTime);
    };
    ChartBase.prototype.clearOption = function () {
        this.hideTooltip();
    };
    // 범례 전체 선택 체크박스 클릭 이벤트
    ChartBase.prototype.onLegendAllCheckBoxItemClick = function (d, index, nodeList) {
        this.hideTooltip();
        this.currentLegend = null;
        d.isHide = !d.isHide;
        if (d.isHide) {
            this.isLegendAllHide = true;
        }
        else {
            this.isLegendAllHide = false;
        }
        this.seriesList.forEach(function (series) {
            if (series.displayNames && series.displayNames.length) {
                series.displayNames.forEach(function (displayName) {
                    series.hide(displayName, d.isHide);
                });
            }
            else {
                series.hide(series.displayName ? series.displayName : series.selector, d.isHide);
            }
        });
        this.legendGroup
            .selectAll('.legend-label-group')
            .filter(function (item) { return item.label !== 'All'; })
            .each(function (item) {
            item.isHide = d.isHide;
        });
        this.legendGroup
            .selectAll('.legend-item-group')
            .filter(function (item) { return item.label !== 'All'; })
            .selectAll('.checkbox-mark')
            .each(function (item, i, node) {
            item.checked = !d.isHide;
            select(node[i]).style('opacity', item.checked ? 1 : 0);
        });
        if (this.isLegendAllHide) {
            // select 해제
            this.legendGroup.selectAll('.legend-label-group').each(function (item, i, node) {
                item.selected = true;
                select(node[i]).style('opacity', 1);
            });
        }
    };
    ChartBase.prototype.isLegendItemChecked = function (isLegendAllChecked) {
        this.legendGroup
            .selectAll('#legend-all-group')
            .selectAll('.checkbox-mark')
            .each(function (item, i, node) {
            item.checked = isLegendAllChecked;
            item.data.isHide = !isLegendAllChecked;
            select(node[i]).style('opacity', item.checked ? 1 : 0);
        });
    };
    // 범례 체크박스 클릭 이벤트
    ChartBase.prototype.onLegendCheckBoxItemClick = function (d, index, nodeList) {
        this.hideTooltip();
        d.isHide = !d.isHide;
        // TODO: 자기 자신이 숨김이면 선택이 안되어야 함. isLegendAllHide 바꾸는 것 생각해볼것.
        this.isLegendAllHide = false;
        if (this.seriesList && this.seriesList.length) {
            var target = void 0;
            if (this.seriesList[0].displayNames && this.seriesList[0].displayNames.length) {
                target = this.seriesList[0];
            }
            else {
                target = this.seriesList.find(function (series) { return (series.displayName ? series.displayName : series.selector) === d.label; });
            }
            if (target) {
                target.hide(d.label, d.isHide);
                if (!d.isHide && !d.selected) {
                    target.select(d.label, d.selected);
                }
                if (this.isLegendAll) {
                    var isCheckedAll = this.legendGroup.selectAll('#legend-all-group').selectAll('.checkbox-mark').data()[0]
                        .checked;
                    var checkCount_1 = 0;
                    var uncheckCount_1 = 0;
                    var allCount_1 = 0;
                    this.legendGroup
                        .selectAll('.legend-item-group')
                        .filter(function (item) { return item.label !== 'All'; })
                        .selectAll('.checkbox-mark')
                        .each(function (item, i, node) {
                        if (item.checked) {
                            checkCount_1++;
                        }
                        else {
                            uncheckCount_1++;
                        }
                        allCount_1++;
                    });
                    if (isCheckedAll && uncheckCount_1 > 0) {
                        // all check 해제
                        this.isLegendItemChecked(false);
                    }
                    else {
                        if (checkCount_1 === allCount_1) {
                            // all check 설정.
                            this.isLegendItemChecked(true);
                        }
                    }
                }
            }
        }
    };
    // 범례 라벨 아이템 선택 효과
    ChartBase.prototype.onLegendLabelItemSelect = function (d, index, nodeList) {
        this.currentLegend = d.label;
        d.selected = !d.selected;
        select(nodeList[index]).style('opacity', d.selected === false ? 0.5 : null);
        var target;
        if (this.seriesList[0].displayNames && this.seriesList[0].displayNames.length) {
            target = this.seriesList[0];
        }
        else {
            target = this.seriesList.find(function (series) { return (series.displayName ? series.displayName : series.selector) === d.label; });
        }
        if (target) {
            target.select(d.label, d.selected);
        }
    };
    return ChartBase;
}());
export { ChartBase };
//# sourceMappingURL=chart-base.js.map