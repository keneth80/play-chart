import { __extends, __spreadArray } from "tslib";
import { quadtree } from 'd3-quadtree';
import { scaleBand, scaleOrdinal } from 'd3-scale';
import { ChartSelector } from '../../chart';
import { SeriesBase } from '../../chart/series-base';
import { drawSelectionPointByRect, drawTooltipPointByRect } from '../../chart/util/d3-svg-util';
var GroupedVerticalBarSeries = /** @class */ (function (_super) {
    __extends(GroupedVerticalBarSeries, _super);
    function GroupedVerticalBarSeries(configuration) {
        var _this = _super.call(this, configuration) || this;
        _this.isHide = false;
        _this.currentBarWidth = 0;
        _this.config = configuration;
        _this.columns = __spreadArray([], configuration.columns, true);
        _this.colors = configuration.colors ? __spreadArray([], configuration.colors, true) : undefined;
        _this.displayNames = configuration.displayNames ? __spreadArray([], configuration.displayNames, true) : __spreadArray([], configuration.columns, true);
        return _this;
    }
    GroupedVerticalBarSeries.prototype.xField = function () {
        return this.config.xField;
    };
    GroupedVerticalBarSeries.prototype.yField = function () {
        return null;
    };
    GroupedVerticalBarSeries.prototype.setSvgElement = function (svg, mainGroup) {
        this.svg = svg;
        this.rootGroup = mainGroup;
        this.selectionGroup = this.svg.select('.' + ChartSelector.SELECTION_SVG);
        if (!mainGroup.select(".".concat(this.selector, "-group")).node()) {
            this.mainGroup = this.rootGroup.append('g').attr('class', "".concat(this.selector, "-group"));
        }
    };
    GroupedVerticalBarSeries.prototype.drawSeries = function (chartData, scales, geometry) {
        var _this = this;
        var x = scales.find(function (scale) { return scale.orient === _this.xDirection; }).scale;
        var y = scales.find(function (scale) { return scale.orient === _this.yDirection; }).scale;
        var barx = scaleBand().domain(this.columns).rangeRound([0, x.bandwidth()]);
        this.currentBarWidth = barx.bandwidth();
        this.geometry = {
            width: 0,
            height: 0
        };
        this.geometry.width = geometry.width;
        this.geometry.height = geometry.height;
        // set the colors
        var z = scaleOrdinal().range(this.chartBase.seriesColors);
        z.domain(this.columns);
        this.mainGroup
            .selectAll('.grouped-bar-item-group')
            .data(chartData)
            .join(function (enter) { return enter.append('g').attr('class', 'grouped-bar-item-group'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('transform', function (d) {
            return "translate( ".concat(x(d[_this.config.xField]), " ,0)");
        })
            .selectAll('.grouped-bar-item')
            .data(function (data) {
            return _this.columns.map(function (key, index) {
                return { key: key, value: data[key], data: data, index: index };
            });
        })
            .join(function (enter) { return enter.append('rect').attr('class', 'grouped-bar-item'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('column', function (d) {
            return d.key;
        })
            .attr('index', function (d, index) {
            return index;
        })
            .attr('x', function (d) {
            return barx(d.key);
        })
            .attr('y', function (d) {
            return d.value < 0 ? y(0) : y(d.value);
        })
            .attr('height', function (d) {
            return Math.abs(y(d.value) - y(0));
        })
            .attr('width', barx.bandwidth())
            .attr('fill', function (d) { return z(d.key) + ''; });
        if (this.originQuadTree) {
            this.originQuadTree = undefined;
        }
        var size = chartData.length;
        var columnSize = this.columns.length;
        var generateData = [];
        for (var i = 0; i < size; i++) {
            var d = chartData[i];
            var groupx = x(d[this.config.xField]);
            for (var j = 0; j < columnSize; j++) {
                var key = this.columns[j];
                var itemx = groupx + barx(key);
                var itemy = d[key] < 0 ? y(0) : y(d[key]);
                // POINT: quadtree ??? ?????? ?????? ????????????
                // [???????????? x???, y???, ???????????? ?????????, ????????? ?????? ?????????, ????????? ?????? ?????????, ??????, ???????????????, ?????????]
                generateData.push([itemx, itemy, d, barx.bandwidth(), Math.abs(y(d[key]) - y(0)), z(key) + '', j, key]);
            }
        }
        this.originQuadTree = quadtree()
            .extent([
            [0, 0],
            [geometry.width, geometry.height]
        ])
            .addAll(generateData);
    };
    GroupedVerticalBarSeries.prototype.select = function (displayName, isSelected) {
        var targetIndex = this.displayNames.findIndex(function (seriesName) { return seriesName === displayName; });
        if (targetIndex > -1) {
            this.mainGroup.selectAll("[index=\"".concat(targetIndex, "\"]")).style('opacity', isSelected ? null : 0.4);
        }
    };
    GroupedVerticalBarSeries.prototype.hide = function (displayName, isHide) {
        this.isHide = isHide;
        var targetIndex = this.displayNames.findIndex(function (seriesName) { return seriesName === displayName; });
        this.mainGroup.selectAll("[index=\"".concat(targetIndex, "\"]")).style('opacity', !isHide ? null : 0);
    };
    GroupedVerticalBarSeries.prototype.onSelectItem = function (value, selected) {
        var selectedItem = selected[0];
        if (value[1] < selectedItem[1]) {
            return;
        }
        drawSelectionPointByRect(this.selectionGroup, [[selectedItem[0], selectedItem[1]]], {
            width: selectedItem[3],
            height: selectedItem[4]
        }, {
            fill: selectedItem[5]
        });
    };
    GroupedVerticalBarSeries.prototype.getSeriesDataByPosition = function (value) {
        var findItem = this.search(this.originQuadTree, value[0] - this.currentBarWidth, 0, value[0], this.geometry.height);
        // y????????? ????????? ???????????? ???????????? ?????? ????????? ????????? ???????????? ?????????.
        // why? ?????? ????????? ????????? ????????? quadtree??? ???????????? ????????? ????????? ?????????.
        if (findItem.length && value[1] < findItem[0][1]) {
            return [];
        }
        return findItem;
    };
    GroupedVerticalBarSeries.prototype.drawPointer = function (value, selected) {
        // const index = Math.floor(selected.length / 2);
        var index = selected.length - 1;
        var selectedItem = selected[index];
        drawTooltipPointByRect(this.selectionGroup, [[selectedItem[0], selectedItem[1]]], {
            width: selectedItem[3],
            height: selectedItem[4]
        }, {
            fill: selectedItem[5]
        });
        return index;
    };
    GroupedVerticalBarSeries.prototype.pointerSize = function (selectedItem) {
        return {
            width: selectedItem[3],
            height: selectedItem[4]
        };
    };
    GroupedVerticalBarSeries.prototype.tooltipText = function (selectedItem) {
        var _a;
        var dataKey = selectedItem[6];
        var tooltipData = selectedItem[2];
        return "".concat((_a = this.displayName) !== null && _a !== void 0 ? _a : this.config.xField, ": ").concat(tooltipData[dataKey]);
    };
    GroupedVerticalBarSeries.prototype.tooltipStyle = function (selectedItem) {
        return {
            fill: selectedItem[5],
            opacity: 1,
            stroke: selectedItem[5]
        };
    };
    return GroupedVerticalBarSeries;
}(SeriesBase));
export { GroupedVerticalBarSeries };
//# sourceMappingURL=grouped-vertical-bar-series.js.map