"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackedHorizontalBarSeries = void 0;
var tslib_1 = require("tslib");
var d3_format_1 = require("d3-format");
var d3_scale_1 = require("d3-scale");
var d3_selection_1 = require("d3-selection");
var d3_shape_1 = require("d3-shape");
var series_base_1 = require("../../chart/series-base");
var d3_svg_util_1 = require("../../chart/util/d3-svg-util");
var StackedHorizontalBarSeries = /** @class */ (function (_super) {
    tslib_1.__extends(StackedHorizontalBarSeries, _super);
    function StackedHorizontalBarSeries(configuration) {
        var _this = _super.call(this, configuration) || this;
        _this.config = configuration;
        _this.columns = tslib_1.__spreadArray([], configuration.columns, true);
        _this.numberFmt = (0, d3_format_1.format)(',d');
        return _this;
    }
    StackedHorizontalBarSeries.prototype.setSvgElement = function (svg, mainGroup) {
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
    StackedHorizontalBarSeries.prototype.drawSeries = function (chartData, scales, geometry) {
        var _this = this;
        var x = scales.find(function (scale) { return scale.orient === _this.xDirection; }).scale;
        var y = scales.find(function (scale) { return scale.orient === _this.yDirection; }).scale;
        // set the colors
        var z = (0, d3_scale_1.scaleOrdinal)().range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
        var keys = this.columns;
        z.domain(keys);
        this.mainGroup
            .selectAll('.stacked-horizontal-group')
            .data((0, d3_shape_1.stack)().keys(keys)(chartData))
            .join(function (enter) { return enter.append('g').attr('class', 'stacked-horizontal-group'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('fill', function (d) {
            return z(d.key) + '';
        })
            .attr('column', function (d) {
            return d.key;
        }) // point
            .selectAll('.stacked-horizontal-item')
            .data(function (d) {
            return d;
        })
            .join(function (enter) {
            return enter
                .append('rect')
                .attr('class', 'stacked-horizontal-item')
                .on('mouseover', function (event, d) {
                var target = event.target;
                var column = target.parentNode.getAttribute('column');
                var fill = z(column) + '';
                (0, d3_selection_1.select)(target).style('fill', function () { return (0, d3_svg_util_1.colorDarker)(fill, 2); }); // point
                // .style('stroke', '#f5330c')
                // .style('stroke-width', 2);
                _this.tooltipGroup = _this.chartBase.showTooltip();
                (0, d3_selection_1.select)(target).classed('tooltip', true);
            })
                .on('mouseout', function (event, d) {
                var target = event.target;
                var column = target.parentNode.getAttribute('column');
                var fill = z(column) + '';
                (0, d3_selection_1.select)(target).style('fill', function () { return fill; }); // point
                // .style('stroke', null)
                // .style('stroke-width', null);
                _this.chartBase.hideTooltip();
                (0, d3_selection_1.select)(target).classed('tooltip', false);
            })
                .on('mousemove', function (event, d) {
                var target = event.target;
                var column = target.parentNode.getAttribute('column');
                var xPosition = (0, d3_selection_1.pointer)(target)[0] + 10;
                var yPosition = (0, d3_selection_1.pointer)(target)[1] - 10;
                var textElement = _this.tooltipGroup.select('text').text("".concat(column, ": ").concat(_this.numberFmt(d.data[column])));
                _this.tooltipGroup.attr('transform', "translate(".concat(_this.chartBase.chartMargin.left + xPosition, ", ").concat(yPosition, ")"));
                _this.tooltipGroup.selectAll('rect').attr('width', textElement.node().getComputedTextLength() + 10);
                // this.tooltipGroup.select('text').text(`${d[1] - d[0]}`);
                // console.log('d : ', d, target, parent);
            });
        }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('x', function (d) {
            return x(d.data[_this.config.xField]);
        })
            .attr('height', function (d) {
            return y(d[0]) - y(d[1]);
        })
            .attr('y', function (d) {
            return d[1] < 0 ? y(0) : y(d[1]);
        })
            // TODO: 계산 적용해 볼 것.
            // .attr('height', (d: any) => { return Math.abs(y(d[0]) - y(d[1]) - y(0)); })
            .attr('width', x.bandwidth());
        // this.drawLegend(keys, z, geometry.width);
    };
    return StackedHorizontalBarSeries;
}(series_base_1.SeriesBase));
exports.StackedHorizontalBarSeries = StackedHorizontalBarSeries;
//# sourceMappingURL=stacked-horizontal-bar-series.js.map