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
import { SeriesBase } from '../chart/series-base';
var ExampleSeries = /** @class */ (function (_super) {
    __extends(ExampleSeries, _super);
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
}(SeriesBase));
export { ExampleSeries };
//# sourceMappingURL=example-series.js.map