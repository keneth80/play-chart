"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicAreaSeries = void 0;
var tslib_1 = require("tslib");
var d3_shape_1 = require("d3-shape");
var series_base_1 = require("../../chart/series-base");
var d3_svg_util_1 = require("../../chart/util/d3-svg-util");
var BasicAreaSeries = /** @class */ (function (_super) {
    tslib_1.__extends(BasicAreaSeries, _super);
    function BasicAreaSeries(configuration) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, configuration) || this;
        _this.lineStyle = {
            strokeWidth: 1,
            strokeColor: null
        };
        _this.areaStyle = {
            color: null,
            opacity: 0.7,
            isCurve: false
        };
        _this.config = configuration;
        _this.areaStyle.isCurve = (_b = (_a = configuration === null || configuration === void 0 ? void 0 : configuration.area) === null || _a === void 0 ? void 0 : _a.isCurve) !== null && _b !== void 0 ? _b : _this.areaStyle.isCurve;
        return _this;
    }
    BasicAreaSeries.prototype.xField = function () {
        return this.config.xField;
    };
    BasicAreaSeries.prototype.yField = function () {
        return this.config.yField;
    };
    BasicAreaSeries.prototype.setSvgElement = function (svg, mainGroup) {
        this.svg = svg;
        if (!mainGroup.select(".".concat(this.selector, "-group")).node()) {
            this.mainGroup = mainGroup.append('g').attr('class', "".concat(this.selector, "-group"));
        }
    };
    BasicAreaSeries.prototype.drawSeries = function (chartData, scales, geometry, option) {
        var _this = this;
        var _a, _b;
        var x = scales.find(function (scale) { return scale.orient === _this.xDirection; }).scale;
        var y = scales.find(function (scale) { return scale.orient === _this.yDirection; }).scale;
        this.color = (_a = this.areaStyle.color) !== null && _a !== void 0 ? _a : option.color;
        this.area = (0, d3_shape_1.area)()
            .x(function (d) {
            return x(d[_this.config.xField]) + 1;
        })
            .y0(y(0))
            .y1(function (d) {
            return y(d[_this.config.yField]);
        });
        this.line = (0, d3_shape_1.line)()
            .x(function (d) {
            return x(d[_this.config.xField]);
        })
            .y(function (d) {
            return y(d[_this.config.yField]);
        });
        if (this.areaStyle.isCurve) {
            this.line.curve(d3_shape_1.curveMonotoneX);
            this.area.curve(d3_shape_1.curveMonotoneX);
        }
        this.mainGroup
            .selectAll(".".concat(this.selector, "-path"))
            .data([chartData])
            .join(function (enter) { return enter.append('path').attr('class', "".concat(_this.selector, "-path")); }, function (update) { return update; }, function (exit) { return exit.remove; })
            .style('fill', this.color)
            .style('fill-opacity', this.areaStyle.opacity)
            .attr('d', this.area);
        this.mainGroup
            .selectAll(".".concat(this.selector, "-line"))
            .data([chartData])
            .join(function (enter) { return enter.append('path').attr('class', "".concat(_this.selector, "-line")); }, function (update) { return update; }, function (exit) { return exit.remove; })
            .style('fill', 'none')
            .style('stroke', (0, d3_svg_util_1.colorDarker)((_b = this.lineStyle.strokeColor) !== null && _b !== void 0 ? _b : this.color, 2))
            .style('stroke-width', this.lineStyle.strokeWidth)
            .attr('d', this.line);
    };
    return BasicAreaSeries;
}(series_base_1.SeriesBase));
exports.BasicAreaSeries = BasicAreaSeries;
//# sourceMappingURL=basic-area-series.js.map