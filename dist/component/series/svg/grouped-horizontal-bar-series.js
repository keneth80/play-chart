var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { select } from 'd3-selection';
import { scaleOrdinal, scaleBand } from 'd3-scale';
import { format } from 'd3-format';
import { SeriesBase } from '../../chart/series-base';
import { colorDarker } from '../../chart/util/d3-svg-util';
var GroupedHorizontalBarSeries = /** @class */ (function (_super) {
    __extends(GroupedHorizontalBarSeries, _super);
    function GroupedHorizontalBarSeries(configuration) {
        var _this = _super.call(this, configuration) || this;
        _this.config = configuration;
        _this.columns = __spreadArray([], _this.config.columns, true);
        _this.numberFmt = format(',d');
        return _this;
    }
    GroupedHorizontalBarSeries.prototype.xField = function () {
        return this.config.xField;
    };
    GroupedHorizontalBarSeries.prototype.yField = function () {
        return null;
    };
    GroupedHorizontalBarSeries.prototype.setSvgElement = function (svg, mainGroup) {
        this.svg = svg;
        this.rootGroup = mainGroup;
        if (!mainGroup.select(".".concat(this.selector, "-group")).node()) {
            this.mainGroup = this.rootGroup.append('g').attr('class', "".concat(this.selector, "-group"));
        }
        if (!mainGroup.select('.legend-group').node()) {
            this.legendGroup = this.rootGroup
                .append('g')
                .attr('class', 'legend-group')
                .attr('font-family', 'sans-serif')
                .attr('font-size', 10)
                .attr('text-anchor', 'end');
        }
    };
    GroupedHorizontalBarSeries.prototype.drawSeries = function (chartData, scales, geometry) {
        var _this = this;
        var x = scales.find(function (scale) { return scale.orient === 'bottom'; }).scale;
        var y = scales.find(function (scale) { return scale.orient === 'left'; }).scale;
        var barx = scaleBand().domain(this.columns).rangeRound([0, x.bandwidth()]);
        // set the colors
        var z = scaleOrdinal().range(this.chartBase.seriesColors);
        z.domain(this.columns);
        this.mainGroup
            .selectAll('.grouped-horizontal-item-group')
            .data(chartData)
            .join(function (enter) { return enter.append('g').attr('class', 'grouped-horizontal-item-group'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('transform', function (d) {
            return "translate( ".concat(x(d[_this.config.xField]), " ,0)");
        })
            .selectAll('.grouped-horizontal-item')
            .data(function (data) {
            return _this.columns.map(function (key, index) {
                return { key: key, value: data[key], data: data, index: index };
            });
        })
            .join(function (enter) {
            var enterElements = enter.append('rect').attr('class', 'grouped-horizontal-item');
            if (_this.chartBase.tooltip) {
                enterElements
                    .on('mouseover', function (event, d) {
                    var target = event.target;
                    select(target).style('fill', function () { return colorDarker(z(d.key), 2); }); // point
                    // .style('stroke', '#f5330c')
                    // .style('stroke-width', 2);
                    _this.tooltipGroup = _this.chartBase.showTooltip();
                    select(target).classed('tooltip', true);
                })
                    .on('mouseout', function (event, d) {
                    var target = event.target;
                    select(target).style('fill', function () { return z(d.key) + ''; }); // point
                    // .style('stroke', null)
                    // .style('stroke-width', null);
                    _this.chartBase.hideTooltip();
                    select(target).classed('tooltip', false);
                })
                    .on('mousemove', function (event, d) {
                    var textElement = _this.tooltipGroup.select('text').text("".concat(d.key, ": ").concat(_this.numberFmt(d.value)));
                    var textWidth = textElement.node().getComputedTextLength() + 10;
                    var xPosition = x(d.data[_this.config.xField]) + d.index * barx.bandwidth();
                    var yPosition = event.offsetY - 30;
                    if (xPosition + textWidth > geometry.width) {
                        xPosition = xPosition - textWidth;
                    }
                    _this.tooltipGroup
                        .attr('transform', "translate(".concat(xPosition, ", ").concat(yPosition, ")"))
                        .selectAll('rect')
                        .attr('width', textWidth);
                });
            }
            return enterElements;
        }, function (update) { return update; }, function (exit) { return exit.remove(); })
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
        // this.drawLegend(this.columns, z, geometry.width);
    };
    return GroupedHorizontalBarSeries;
}(SeriesBase));
export { GroupedHorizontalBarSeries };
//# sourceMappingURL=grouped-horizontal-bar-series.js.map