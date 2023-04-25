"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicLineSeries = void 0;
var tslib_1 = require("tslib");
var d3_ease_1 = require("d3-ease");
var d3_quadtree_1 = require("d3-quadtree");
var d3_shape_1 = require("d3-shape");
var d3_transition_1 = require("d3-transition");
var chart_1 = require("../../chart");
var chart_interface_1 = require("../../chart/chart.interface");
var series_base_1 = require("../../chart/series-base");
var d3_svg_util_1 = require("../../chart/util/d3-svg-util");
var BasicLineSeries = /** @class */ (function (_super) {
    tslib_1.__extends(BasicLineSeries, _super);
    function BasicLineSeries(configuration) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, configuration) || this;
        _this.dotClass = 'basic-line-dot';
        _this.isAnimation = false;
        _this.isHide = false;
        _this.radius = 2;
        _this.dotFill = '';
        _this.dotStrokeWidth = 1;
        _this.strokeColor = '';
        _this.strokeWidth = 1;
        _this.config = configuration;
        _this.color = _this.checkSeriesColor();
        if (_this.config.hasOwnProperty('animation')) {
            _this.isAnimation = configuration.animation;
        }
        _this.dotClass = (_c = (_b = (_a = _this.config) === null || _a === void 0 ? void 0 : _a.dot) === null || _b === void 0 ? void 0 : _b.selector) !== null && _c !== void 0 ? _c : _this.dotClass + '-' + _this.config.yField;
        return _this;
    }
    BasicLineSeries.prototype.xField = function () {
        return this.config.xField;
    };
    BasicLineSeries.prototype.yField = function () {
        return this.config.yField;
    };
    BasicLineSeries.prototype.setSvgElement = function (svg, mainGroup) {
        this.svg = svg;
        this.selectionGroup = this.svg.select('.' + chart_1.ChartSelector.SELECTION_SVG);
        if (!mainGroup.select(".".concat(this.selector, "-group")).node()) {
            this.mainGroup = mainGroup.append('g').attr('class', "".concat(this.selector, "-group"));
        }
        if (!mainGroup.select(".".concat(this.dotClass, "-group")).node()) {
            this.dotGroup = mainGroup.append('g').attr('class', "".concat(this.dotClass, "-group"));
        }
    };
    BasicLineSeries.prototype.drawSeries = function (chartData, scales, geometry, option) {
        var _this = this;
        var _a, _b;
        var xScale = scales.find(function (scale) { return scale.orient === _this.xDirection; });
        var yScale = scales.find(function (scale) { return scale.orient === _this.yDirection; });
        var x = xScale.scale;
        var y = yScale.scale;
        var xmin = xScale.min;
        var xmax = xScale.max;
        var ymin = yScale.min;
        var ymax = yScale.max;
        var padding = 0;
        if (x.bandwidth) {
            padding = x.bandwidth() / 2;
        }
        this.geometry = geometry;
        this.strokeColor = (_a = this.checkSeriesColor()) !== null && _a !== void 0 ? _a : option.color;
        this.dotFill = this.config.dot && this.config.dot.fill ? this.config.dot.fill : option.color;
        this.dotStrokeWidth = this.config.dot && this.config.dot.strokeWidth ? this.config.dot.strokeWidth : this.dotStrokeWidth;
        var resultData = !this.config.filter ? chartData : chartData.filter(function (item) { return _this.config.filter(item); });
        // .filter((d: any) => d[this.config.xField] >= (xmin - xmin * 0.02) && d[this.config.xField] <= (xmax + xmax * 0.02) && d[this.config.yField] >= ymin && d[this.config.yField] <= ymax);
        if (this.config.line) {
            this.line = (0, d3_shape_1.line)()
                .defined(function (data) { return data[_this.config.xField]; })
                .x(function (data, i) {
                var xposition = x(data[_this.config.xField]) + padding;
                return xposition;
            })
                .y(function (data) {
                var yposition = y(data[_this.config.yField]);
                return yposition;
            });
            if (this.config.line.isCurve === true) {
                this.line.curve(d3_shape_1.curveMonotoneX); // apply smoothing to the line
            }
            var lineSeries_1 = this.mainGroup
                .selectAll(".".concat(this.selector))
                .data([resultData])
                .join(function (enter) { return enter.append('path').attr('class', _this.selector); }, function (update) { return update.style('stroke-dasharray', '').style('stroke-dashoffset', ''); }, function (exit) { return exit.remove(); })
                // .style('stroke-dasharray', this.config.line.dashArray && this.config.line.dashArray > 0 ? this.config.line.dashArray : 0)
                .style('stroke-width', this.strokeWidth)
                .style('stroke', this.strokeColor)
                .style('fill', 'none')
                .attr('d', this.line);
            if (this.isAnimation && option.displayType === chart_interface_1.DisplayType.NORMAL) {
                lineSeries_1
                    .style('stroke-dasharray', function (d, i, nodeList) { return nodeList[i].getTotalLength(); })
                    .style('stroke-dashoffset', function (d, i, nodeList) { return nodeList[i].getTotalLength(); });
                lineSeries_1.transition((0, d3_transition_1.transition)().delay(200).duration(800).ease(d3_ease_1.easeLinear)).style('stroke-dashoffset', 0);
                (0, d3_svg_util_1.delayExcute)(1000, function () {
                    lineSeries_1
                        // .attr('stroke-dashoffset', null)
                        .style('stroke-dasharray', _this.config.line.dashArray && _this.config.line.dashArray > 0 ? _this.config.line.dashArray : 0);
                });
            }
        }
        if (this.config.dot) {
            // dot설정이 있을 시 에는 mask 영역 늘리기
            // 우선 주석처리함. zoom시 라인이 늘려진 마스크 영역 때문에 시리즈 영역 바깥으로 빗나가는 현상이 생김.
            // this.chartBase.clipPathSelector
            //     .attr('width', geometry.width + (radius * 4))
            //     .attr('height', geometry.height + (radius * 4))
            //     .attr('x', -(radius*2))
            //     .attr('y', -(radius*2));
            this.radius = (_b = this.config.dot.radius) !== null && _b !== void 0 ? _b : this.radius;
            this.dotGroup
                .selectAll(".".concat(this.dotClass))
                .data(resultData)
                .join(function (enter) { return enter.append('circle').attr('class', _this.dotClass); }, function (update) { return update; }, function (exit) { return exit.remove(); })
                .style('stroke-width', this.dotStrokeWidth)
                .style('stroke', this.strokeColor)
                .style('fill', this.dotFill)
                .attr('cx', function (data) { return x(data[_this.config.xField]) + padding; })
                .attr('cy', function (data) { return y(data[_this.config.yField]); })
                .attr('r', this.radius);
        }
        if (this.originQuadTree) {
            this.originQuadTree = undefined;
        }
        var generateData = resultData.map(function (d, i) {
            var _a;
            var xposition = x(d[_this.config.xField]) + padding;
            var yposition = y(d[_this.config.yField]);
            var obj = {
                data: d,
                width: _this.radius,
                height: _this.radius,
                strokeColor: _this.strokeColor,
                field: _this.config.yField,
                displayName: (_a = _this.selector) !== null && _a !== void 0 ? _a : _this.displayName
            };
            return [xposition, yposition, obj];
        });
        this.originQuadTree = (0, d3_quadtree_1.quadtree)()
            .extent([
            [xScale.min, yScale.min],
            [geometry.width, geometry.height]
        ])
            .addAll(generateData);
    };
    BasicLineSeries.prototype.select = function (displayName, isSelected) {
        this.mainGroup.selectAll(".".concat(this.selector)).style('opacity', isSelected ? null : 0.4);
        if (this.config.dot) {
            this.dotGroup.selectAll(".".concat(this.dotClass)).style('opacity', isSelected ? null : 0.4);
        }
    };
    BasicLineSeries.prototype.hide = function (displayName, isHide) {
        this.isHide = isHide;
        this.mainGroup.selectAll(".".concat(this.selector)).style('opacity', !isHide ? null : 0);
        if (this.isHide) {
            this.mainGroup.lower();
        }
        else {
            this.mainGroup.raise();
        }
        if (this.config.dot) {
            if (this.isHide) {
                this.dotGroup.lower();
            }
            else {
                this.dotGroup.raise();
            }
            this.dotGroup.selectAll(".".concat(this.dotClass)).style('opacity', !isHide ? null : 0);
        }
    };
    BasicLineSeries.prototype.onSelectItem = function (value, selected) {
        var selectedItem = selected[0];
        // TODO: selector가 같아서 막대와 원 선택 아이템이 겹침. selector를 다르게 하거나 분기 해야함.
        this.chartBase.selectionClear();
        (0, d3_svg_util_1.drawSelectionPointByCircle)(this.selectionGroup, [[selectedItem[0], selectedItem[1]]], {
            fill: this.dotFill,
            radius: this.radius * 1.5
        });
    };
    BasicLineSeries.prototype.unSelectItem = function () {
        if (this.currentSelector) {
            this.currentSelector.attr('r', this.radius);
            this.currentSelector = null;
        }
    };
    BasicLineSeries.prototype.getSeriesDataByPosition = function (value) {
        return this.isHide
            ? []
            : this.search(this.originQuadTree, value[0] - this.radius * 3, value[1] - this.radius * 3, value[0] + this.radius * 3, value[1] + this.radius * 3);
    };
    BasicLineSeries.prototype.drawPointer = function (value, selected) {
        // const index = Math.floor(selected.length / 2);
        var index = selected.length - 1;
        var selectedItem = selected[index];
        // drawTooltipPointByCircle(
        //     this.selectionGroup,
        //     [selectedItem],
        //     {
        //         radius: this.radius * 1.5,
        //         strokeColor: this.strokeColor,
        //         strokeWidth: this.dotStrokeWidth + 2
        //     }
        // );
        (0, d3_svg_util_1.drawSelectionTooltipPointByCircle)(this.selector, this.selectionGroup, [selectedItem], {
            radius: this.radius * 1.5,
            strokeColor: this.strokeColor,
            strokeWidth: this.dotStrokeWidth + 2
        });
        return index;
    };
    BasicLineSeries.prototype.pointerSize = function () {
        return {
            width: this.radius,
            height: this.radius
        };
    };
    BasicLineSeries.prototype.tooltipText = function (selectedItem) {
        var _a;
        return "".concat((_a = this.displayName) !== null && _a !== void 0 ? _a : this.config.xField, ": ").concat(selectedItem[2].data[this.config.yField]);
    };
    BasicLineSeries.prototype.tooltipStyle = function () {
        return {
            fill: '#fff',
            opacity: 1,
            stroke: this.strokeColor
        };
    };
    // showPointAndTooltip(value: number[], selected: any[]) {
    //     // const index = Math.floor(selected.length / 2);
    //     const index = selected.length - 1;
    //     const selectedItem = selected[index];
    //     drawTooltipPointByCircle(
    //         this.selectionGroup,
    //         [selectedItem],
    //         {
    //             radius: this.radius * 1.5,
    //             strokeColor: this.strokeColor,
    //             strokeWidth: this.dotStrokeWidth + 2
    //         }
    //     );
    //     if (!this.chartBase.isTooltipDisplay) {
    //         this.tooltipGroup = this.chartBase.showTooltip({
    //             fill: '#fff',
    //             opacity: 1,
    //             stroke: this.strokeColor
    //         });
    //         setChartTooltipByPosition(
    //             this.tooltipGroup,
    //             this.chartBase.tooltip && this.chartBase.tooltip.tooltipTextParser
    //                 ? this.chartBase.tooltip.tooltipTextParser(selectedItem)
    //                 : `${this.config.xField}: ${selectedItem[2][this.config.xField]} \n ${this.config.yField}: ${selectedItem[2][this.config.yField]}`,
    //             this.geometry,
    //             [
    //                 selectedItem[0],
    //                 selectedItem[1]
    //             ],
    //             {
    //                 width: this.radius,
    //                 height: this.radius
    //             }
    //         )
    //     }
    //     return index;
    // }
    BasicLineSeries.prototype.checkSeriesColor = function () {
        return this.config.line && this.config.line.strokeColor ? this.config.line.strokeColor : null;
    };
    return BasicLineSeries;
}(series_base_1.SeriesBase));
exports.BasicLineSeries = BasicLineSeries;
//# sourceMappingURL=basic-line-series.js.map