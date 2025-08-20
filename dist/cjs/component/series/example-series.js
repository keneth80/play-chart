"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleSeries = void 0;
var tslib_1 = require("tslib");
var series_base_1 = require("../chart/series-base");
var ExampleSeries = /** @class */ (function (_super) {
    tslib_1.__extends(ExampleSeries, _super);
    function ExampleSeries(configuration) {
        var _this = _super.call(this, configuration) || this;
        _this.config = configuration;
        return _this;
    }
    ExampleSeries.prototype.xField = function () {
        return this.config.xField;
    };
    ExampleSeries.prototype.yField = function () {
        return null;
    };
    ExampleSeries.prototype.setSvgElement = function (svg, seriesGroup, index) {
        this.svg = svg;
        if (!seriesGroup.select('.' + this.selector + '-group').node()) {
            this.mainGroup = seriesGroup.append('g').attr('class', this.selector + '-group');
        }
    };
    ExampleSeries.prototype.drawSeries = function (chartData, scales, geometry, option) {
        var _this = this;
        var x = scales.find(function (scale) { return scale.field === _this.config.xField; }).scale;
        var y = scales.find(function (scale) { return scale.field === _this.config.yField; }).scale;
        this.mainGroup
            .selectAll('.' + this.selector)
            .data(chartData)
            .join(function (enter) { return enter.append('rect').attr('class', _this.selector); }, function (update) { return update; }, function (exit) { return exit.remove; })
            .style('stroke', '#fff')
            .style('fill', option.color)
            .attr('x', function (data) {
            return x(data[_this.config.xField]);
        })
            .attr('width', x.bandwidth())
            .attr('y', function (data) {
            return data[_this.config.yField] < 0 ? y(0) : y(data[_this.config.yField]);
        })
            .attr('height', function (data) {
            return Math.abs(y(data[_this.config.yField]) - y(0));
        });
    };
    ExampleSeries.prototype.select = function (displayName, isSelected) {
        this.mainGroup.selectAll('.' + this.selector).style('opacity', isSelected ? null : 0.4);
    };
    ExampleSeries.prototype.hide = function (displayName, isHide) {
        this.mainGroup.selectAll('.' + this.selector).style('opacity', !isHide ? null : 0);
        this.mainGroup.lower();
    };
    return ExampleSeries;
}(series_base_1.SeriesBase));
exports.ExampleSeries = ExampleSeries;
//# sourceMappingURL=example-series.js.map