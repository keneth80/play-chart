import { __extends, __spreadArray } from "tslib";
import { quadtree } from 'd3-quadtree';
import { scaleOrdinal } from 'd3-scale';
import { stack } from 'd3-shape';
import { ChartSelector } from '../../chart';
import { SeriesBase } from '../../chart/series-base';
import { drawSelectionPointByRect, drawTooltipPointByRect } from '../../chart/util/d3-svg-util';
var StackedVerticalBarSeries = /** @class */ (function (_super) {
    __extends(StackedVerticalBarSeries, _super);
    function StackedVerticalBarSeries(configuration) {
        var _this = _super.call(this, configuration) || this;
        _this.currentBarWidth = 0;
        _this.isHide = false;
        _this.config = configuration;
        _this.columns = configuration.columns ? __spreadArray([], configuration.columns, true) : [];
        _this.colors = configuration.colors ? __spreadArray([], configuration.colors, true) : undefined;
        _this.displayNames = configuration.displayNames ? __spreadArray([], configuration.displayNames, true) : __spreadArray([], configuration.columns, true);
        return _this;
    }
    StackedVerticalBarSeries.prototype.xField = function () {
        return this.config.xField;
    };
    StackedVerticalBarSeries.prototype.yField = function () {
        return null;
    };
    StackedVerticalBarSeries.prototype.setSvgElement = function (svg, mainGroup) {
        this.svg = svg;
        this.rootGroup = mainGroup;
        this.selectionGroup = this.svg.select('.' + ChartSelector.SELECTION_SVG);
        if (!mainGroup.select(".".concat(this.selector, "-group")).node()) {
            this.mainGroup = this.rootGroup.append('g').attr('class', "".concat(this.selector, "-group"));
        }
    };
    StackedVerticalBarSeries.prototype.drawSeries = function (chartData, scales, geometry) {
        var _this = this;
        var _a;
        var x = scales.find(function (scale) { return scale.orient === _this.xDirection; }).scale;
        var y = scales.find(function (scale) { return scale.orient === _this.yDirection; }).scale;
        // set the colors
        var z = scaleOrdinal()
            .range((_a = this.colors) !== null && _a !== void 0 ? _a : this.chartBase.seriesColors)
            .domain(this.columns);
        this.currentBarWidth = x.bandwidth();
        this.geometry = {
            width: 0,
            height: 0
        };
        this.geometry.width = geometry.width;
        this.geometry.height = geometry.height;
        var generateChartData = stack().keys(this.columns)(chartData);
        this.mainGroup
            .selectAll('.stacked-bar-group')
            .data(generateChartData)
            .join(function (enter) { return enter.append('g').attr('class', 'stacked-bar-group'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('fill', function (d) {
            return z(d.key) + '';
        })
            .attr('column', function (d) {
            return d.key;
        })
            .attr('index', function (d, index) {
            return index;
        }) // index
            .selectAll('.stacked-bar-item')
            .data(function (d) {
            return d;
        })
            .join(function (enter) { return enter.append('rect').attr('class', 'stacked-bar-item'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('x', function (d) {
            return x(d.data[_this.config.xField]);
        })
            .attr('height', function (d) {
            return y(d[0]) - y(d[1]);
        })
            .attr('y', function (d) {
            return d[1] < 0 ? y(0) : y(d[1]);
        })
            // TODO: ?????? ????????? ??? ???.
            // .attr('height', (d: any) => { return Math.abs(y(d[0]) - y(d[1]) - y(0)); })
            .attr('width', x.bandwidth());
        var size = generateChartData.length;
        var generateData = [];
        for (var i = 0; i < size; i++) {
            var d = generateChartData[i];
            var key = d.key;
            var fill = z(key) + '';
            var columnSize = d.length;
            for (var j = 0; j < columnSize; j++) {
                var item = d[j];
                var data = d[j].data;
                var itemx = x(data[this.config.xField]);
                var itemy = item[1] < 0 ? y(0) : y(item[1]);
                // POINT: quadtree ??? ?????? ?????? ????????????
                // [???????????? x???, y???, ???????????? ?????????, ????????? ?????? ?????????, ????????? ?????? ?????????, ??????, ???????????????, ?????????]
                generateData.push([itemx, itemy, data, x.bandwidth(), y(item[0]) - y(item[1]), fill, j, key]);
            }
        }
        this.originQuadTree = quadtree()
            .extent([
            [0, 0],
            [geometry.width, geometry.height]
        ])
            .addAll(generateData);
    };
    StackedVerticalBarSeries.prototype.select = function (displayName, isSelected) {
        var targetIndex = this.displayNames.findIndex(function (seriesName) { return seriesName === displayName; });
        if (targetIndex > -1) {
            this.mainGroup.selectAll("[index=\"".concat(targetIndex, "\"]")).style('opacity', isSelected ? null : 0.4);
        }
    };
    StackedVerticalBarSeries.prototype.hide = function (displayName, isHide) {
        this.isHide = isHide;
        var targetIndex = this.displayNames.findIndex(function (seriesName) { return seriesName === displayName; });
        this.mainGroup.selectAll("[index=\"".concat(targetIndex, "\"]")).style('opacity', !isHide ? null : 0);
    };
    StackedVerticalBarSeries.prototype.onSelectItem = function (value, selected) {
        var index = this.retriveColumnIndex(value, selected);
        if (index < 0) {
            return;
        }
        var selectedItem = selected[index];
        drawSelectionPointByRect(this.selectionGroup, [[selectedItem[0], selectedItem[1]]], {
            width: selectedItem[3],
            height: selectedItem[4]
        }, {
            fill: selectedItem[5]
        });
    };
    StackedVerticalBarSeries.prototype.getSeriesDataByPosition = function (value) {
        return this.search(this.originQuadTree, value[0] - this.currentBarWidth, 0, value[0], this.geometry.height);
    };
    StackedVerticalBarSeries.prototype.drawPointer = function (value, selected) {
        // const index = Math.floor(selected.length / 2);
        var index = this.retriveColumnIndex(value, selected);
        if (index > -1) {
            var selectedItem = selected[index];
            drawTooltipPointByRect(this.selectionGroup, [[selectedItem[0], selectedItem[1]]], {
                width: selectedItem[3],
                height: selectedItem[4]
            }, {
                fill: selectedItem[5]
            });
        }
        return index;
    };
    StackedVerticalBarSeries.prototype.pointerSize = function (selectedItem) {
        return {
            width: selectedItem[3],
            height: selectedItem[4]
        };
    };
    StackedVerticalBarSeries.prototype.tooltipText = function (selectedItem) {
        var _a;
        var dataKey = selectedItem[6];
        var tooltipData = selectedItem[2];
        return "".concat((_a = this.displayName) !== null && _a !== void 0 ? _a : this.config.xField, ": ").concat(tooltipData[dataKey]);
    };
    StackedVerticalBarSeries.prototype.tooltipStyle = function (selectedItem) {
        return {
            fill: selectedItem[5],
            opacity: 1,
            stroke: selectedItem[5]
        };
    };
    // TODO: tooltip??? ????????? ???????????? ???????????? ????????? ?????? tooltip??? ????????? ??? ??? ????????? ??????.
    // multi tooltip??? ???????????? ?????? ????????? ???????????? ?????? ??????. ?????? ???????????? ???????????? ???????????? ???.
    // showPointAndTooltip(value: number[], selected: any[]) {
    //     // const index = Math.floor(selected.length / 2);
    //     // TODO: y???????????? ?????? ???????????? ????????????.
    //     const index: number = this.retriveColumnIndex(value, selected);
    //     if (index > -1) {
    //         const selectedItem = selected[index];
    //         if (!this.chartBase.isTooltipDisplay) {
    //             drawTooltipPointByRect(
    //                 this.selectionGroup,
    //                 [[selectedItem[0], selectedItem[1]]],
    //                 {
    //                     width: selectedItem[3],
    //                     height: selectedItem[4]
    //                 },
    //                 {
    //                     fill: selectedItem[5]
    //                 }
    //             );
    //             if (!this.chartBase.isTooltipDisplay) {
    //                 this.tooltipGroup = this.chartBase.showTooltip();
    //                 setChartTooltipByPosition(
    //                     this.tooltipGroup,
    //                     this.chartBase.tooltip && this.chartBase.tooltip.tooltipTextParser
    //                     ? this.chartBase.tooltip.tooltipTextParser(selectedItem)
    //                         : `${this.xField}: ${selectedItem[2][this.xField]} \n ${this.yField}: ${selectedItem[2][this.yField]}`,
    //                     this.geometry,
    //                     [
    //                         selectedItem[0],
    //                         selectedItem[1]
    //                     ],
    //                     {
    //                         width: selectedItem[3],
    //                         height: selectedItem[4]
    //                     }
    //                 )
    //             }
    //         }
    //     }
    //     return index;
    // }
    StackedVerticalBarSeries.prototype.retriveColumnIndex = function (value, selected) {
        var index = -1;
        for (var i = 0; i < selected.length; i++) {
            if (value[1] > selected[i][1] && value[1] < selected[i][4] + selected[i][1]) {
                // y???????????? ???????????????, ?????? ???????????? ?????????.
                index = i;
                break;
            }
        }
        return index;
    };
    return StackedVerticalBarSeries;
}(SeriesBase));
export { StackedVerticalBarSeries };
//# sourceMappingURL=stacked-vertical-bar-series.js.map