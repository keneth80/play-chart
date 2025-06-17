"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorizontalPointerSeries = void 0;
var tslib_1 = require("tslib");
var d3_1 = require("d3");
var d3_scale_1 = require("d3-scale");
var chart_1 = require("../../../../component/chart");
var series_base_1 = require("../../../../component/chart/series-base");
var CHART_MARGIN = {
    left: 50,
    right: 80
};
var HorizontalPointerSeries = /** @class */ (function (_super) {
    tslib_1.__extends(HorizontalPointerSeries, _super);
    function HorizontalPointerSeries(configuration) {
        var _this = _super.call(this, configuration) || this;
        if (configuration) {
            _this.domain = configuration.domain;
            _this.unit = configuration.unit;
        }
        return _this;
    }
    HorizontalPointerSeries.prototype.setSvgElement = function (svg, mainGroup) {
        this.svg = svg;
        this.mainGroup = mainGroup;
        mainGroup
            .selectAll('.horizontal-pointer-series')
            .data(["".concat(this.selector, "-line-group")])
            .join(function (enter) { return enter.append('g').attr('class', function (d) { return d; }); }, function (update) { return update; }, function (exite) { return exite.remove(); });
        mainGroup
            .selectAll('.horizontal-pointer-series')
            .data(["".concat(this.selector, "-circle-group")])
            .join(function (enter) { return enter.append('g').attr('class', function (d) { return d; }); }, function (update) { return update; }, function (exite) { return exite.remove(); });
    };
    HorizontalPointerSeries.prototype.drawSeries = function (chartData, scales, geometry) {
        this.svg.select('.' + chart_1.ChartSelector.ZOOM_SVG).lower();
        var chartMargin = this.chartBase.chartMargin;
        // circle group position setting
        var circleGroup = this.mainGroup.selectAll(".".concat(this.selector, "-circle-group"));
        circleGroup.attr('transform', "translate(".concat(chartMargin.left, ", ").concat(geometry.height / 2, ")"));
        // line group position setting
        var lineGroup = this.mainGroup.selectAll(".".concat(this.selector, "-line-group"));
        lineGroup.attr('transform', "translate(".concat(chartMargin.left, ", ").concat(geometry.height / 2, ")"));
        var width = geometry.width - chartMargin.left - chartMargin.right;
        var scale = (0, d3_scale_1.scaleLinear)().domain(this.domain).range([0, width]);
        // bottom axis line render
        var bottomAxis = (0, d3_1.axisBottom)(scale).tickSizeOuter(0);
        var line = lineGroup.call(bottomAxis);
        line.selectAll('path').style('stroke-width', 2);
        // ticks render
        var ticks = line.selectAll('.tick');
        ticks.select('line').remove();
        ticks.select('text').attr('y', 30).style('fill', 'gery');
        lineGroup
            .selectAll('.unit')
            .data(["(".concat(this.unit, ")")])
            .join(function (enter) { return enter.append('text').attr('class', 'unit'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .style('fill', 'grey')
            .style('font-size', 13)
            .text(function (d) { return d; })
            .attr('transform', "translate(".concat(width + 20, ", 38)"));
        // circle render
        var circleData = {
            x: scale(chartData),
            y: 0
        };
        circleGroup
            .selectAll('.circle-point')
            .data([circleData])
            .join(function (enter) { return enter.append('circle').attr('class', 'circle-point'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('cx', function (d) {
            return d.x;
        })
            .attr('cy', function (d) {
            return d.y;
        })
            .attr('r', 10)
            .style('fill', 'black');
    };
    return HorizontalPointerSeries;
}(series_base_1.SeriesBase));
exports.HorizontalPointerSeries = HorizontalPointerSeries;
//# sourceMappingURL=index.js.map