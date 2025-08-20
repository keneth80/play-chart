"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeriesBase = void 0;
var rxjs_1 = require("rxjs");
var chart_configuration_1 = require("./chart-configuration");
var chart_selector_variable_1 = require("./chart-selector-variable");
var d3_svg_util_1 = require("./util/d3-svg-util");
var SeriesBase = /** @class */ (function () {
    function SeriesBase(configuration) {
        var _a, _b, _c, _d, _e, _f;
        this.type = 'series';
        this.selector = 'series-base';
        this.subscription = new rxjs_1.Subscription();
        this.originQuadTree = undefined;
        this.xDirection = chart_configuration_1.Placement.BOTTOM;
        this.yDirection = chart_configuration_1.Placement.LEFT;
        this.maskId = '';
        this.type = (_a = configuration.type) !== null && _a !== void 0 ? _a : this.type;
        this.selector = (_b = configuration.selector) !== null && _b !== void 0 ? _b : this.selector;
        this.displayName = (_c = configuration.displayName) !== null && _c !== void 0 ? _c : this.displayName;
        this.shape = (_d = configuration.shape) !== null && _d !== void 0 ? _d : this.shape;
        this.xDirection = (_e = configuration.xDirection) !== null && _e !== void 0 ? _e : this.xDirection;
        this.yDirection = (_f = configuration.yDirection) !== null && _f !== void 0 ? _f : this.yDirection;
    }
    Object.defineProperty(SeriesBase.prototype, "chartBase", {
        get: function () {
            return this.chart;
        },
        set: function (value) {
            this.chart = value;
        },
        enumerable: false,
        configurable: true
    });
    // get $currentItem(): Observable<any> {
    //     return this.itemClickSubject.asObservable();
    // }
    SeriesBase.prototype.xField = function () {
        return null;
    };
    SeriesBase.prototype.yField = function () {
        return null;
    };
    SeriesBase.prototype.changeConfiguration = function (configuration) { };
    SeriesBase.prototype.select = function (displayName, isSelected) { };
    SeriesBase.prototype.hide = function (displayName, isHide) { };
    SeriesBase.prototype.unSelectItem = function () { };
    SeriesBase.prototype.setSvgElement = function (svg, mainGroup, index) { };
    SeriesBase.prototype.drawSeries = function (chartData, scales, geometry, displayOption) { };
    SeriesBase.prototype.setTooltipCanvas = function (svg) {
        // return this.svg.select('.tooltip-group');
        if (!this.chartBase.chartContainer.select('.' + chart_selector_variable_1.ChartSelector.TOOLTIP_CANVAS).node()) {
            var targetSvg = this.chartBase.chartContainer
                .append('svg')
                .attr('class', chart_selector_variable_1.ChartSelector.TOOLTIP_CANVAS)
                .style('z-index', 3)
                .style('position', 'absolute')
                .style('width', '100%')
                .style('height', '100%');
            if (!this.clipPath) {
                this.maskId = (0, d3_svg_util_1.guid)();
                this.clipPath = targetSvg
                    .append('defs')
                    .append('svg:clipPath')
                    .attr('id', this.maskId)
                    .append('rect')
                    .attr('clas', 'option-mask')
                    .attr('x', 0)
                    .attr('y', 0);
            }
            var toolTipGroup = targetSvg
                .append('g')
                .attr('class', 'tooltip-group')
                .attr('transform', "translate(".concat(this.chartBase.chartMargin.left, ", ").concat(this.chartBase.chartMargin.top, ")"));
            this.chartBase.toolTipTarget = toolTipGroup;
            // tooltip 용 svg가 겹치므로 legend group을 상위에 있는 svg로 옮긴다.
            if (this.svg.select('g.legend-group').node()) {
                targetSvg.node().appendChild(this.svg.select('g.legend-group').node());
            }
            return targetSvg;
        }
        else {
            return this.chartBase.chartContainer.select('.' + chart_selector_variable_1.ChartSelector.TOOLTIP_CANVAS);
        }
    };
    SeriesBase.prototype.getSeriesDataByPosition = function (value) {
        return [];
    };
    SeriesBase.prototype.showPointAndTooltip = function (value, selected) {
        return 0;
    };
    SeriesBase.prototype.drawPointer = function (value, selected) {
        return 0;
    };
    SeriesBase.prototype.pointerSize = function (selected) {
        return {
            width: 2,
            height: 2
        };
    };
    SeriesBase.prototype.tooltipText = function (selected) {
        return 'Tooltip Text';
    };
    SeriesBase.prototype.tooltipStyle = function (selected) {
        return null;
    };
    SeriesBase.prototype.onSelectItem = function (value, selected) { };
    SeriesBase.prototype.destroy = function () {
        this.subscription.unsubscribe();
    };
    SeriesBase.prototype.drawProgress = function (totalCount, currentCount, canvas) {
        var progressWidth = canvas.width / 4;
        var progressHeight = 6;
        if (totalCount > currentCount) {
            canvas.target
                .selectAll('.progress-background')
                .data(['progress-background'])
                .join(function (enter) { return enter.append('rect').attr('class', 'progress-background'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
                .style('fill', '#fff')
                .style('fill-opacity', 0.5)
                .attr('width', canvas.width)
                .attr('height', canvas.height);
            var group = canvas.target
                .selectAll('.progress-bar-group')
                .data([
                {
                    totalCount: totalCount,
                    currentCount: currentCount
                }
            ])
                .join(function (enter) { return enter.append('g').attr('class', 'progress-bar-group'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
                .attr('transform', "translate(".concat(canvas.width / 2 - progressWidth / 2, ", ").concat(canvas.height / 2 - progressHeight / 2, ")"));
            group
                .selectAll('.progress-bar')
                .data(function (d) { return [d]; })
                .join(function (enter) { return enter.append('rect').attr('class', 'progress-bar'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
                .style('stroke', '#fff')
                .style('fill', '#ccc')
                .attr('width', progressWidth)
                .attr('height', progressHeight);
            group
                .selectAll('.progress-bar-value')
                .data(function (d) { return [d]; })
                .join(function (enter) { return enter.append('rect').attr('class', 'progress-bar-value'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
                .style('stroke', '#fff')
                .style('fill', '#0362fc')
                .attr('width', progressWidth * (currentCount / totalCount))
                .attr('height', progressHeight);
        }
        else {
            canvas.target.selectAll('*').remove();
        }
        return canvas.target;
    };
    SeriesBase.prototype.search = function (quadtreeObj, x0, y0, x3, y3) {
        var temp = [];
        if (quadtreeObj) {
            quadtreeObj.visit(function (node, x1, y1, x2, y2) {
                if (!node.length) {
                    do {
                        var d = node.data;
                        var selected = d[0] >= x0 && d[0] < x3 && d[1] >= y0 && d[1] < y3;
                        if (selected) {
                            temp.push(d);
                        }
                    } while ((node = node.next));
                }
                return x1 >= x3 || y1 >= y3 || x2 < x0 || y2 < y0;
            });
        }
        return temp;
    };
    return SeriesBase;
}());
exports.SeriesBase = SeriesBase;
//# sourceMappingURL=series-base.js.map