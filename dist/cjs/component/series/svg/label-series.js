"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelSeries = void 0;
var tslib_1 = require("tslib");
var series_base_1 = require("../../chart/series-base");
var LabelSeries = /** @class */ (function (_super) {
    tslib_1.__extends(LabelSeries, _super);
    function LabelSeries(configuration) {
        var _this = _super.call(this, configuration) || this;
        _this.config = configuration;
        if (configuration.templete) {
            _this.templete = configuration.templete;
        }
        return _this;
    }
    LabelSeries.prototype.xField = function () {
        return this.config.xField;
    };
    LabelSeries.prototype.yField = function () {
        return this.config.yField;
    };
    LabelSeries.prototype.setSvgElement = function (svg, mainGroup) {
        this.svg = svg;
        if (!mainGroup.select(".".concat(this.selector, "-group")).node()) {
            this.mainGroup = mainGroup.append('g').attr('class', "".concat(this.selector, "-group"));
        }
    };
    LabelSeries.prototype.drawSeries = function (chartData, scales, geometry) {
        var _this = this;
        var x = scales.find(function (scale) { return scale.orient === _this.xDirection; }).scale;
        var y = scales.find(function (scale) { return scale.orient === _this.yDirection; }).scale;
        this.mainGroup
            .selectAll(".".concat(this.selector))
            .data(chartData)
            .join(function (enter) { return enter.append('text').attr('class', _this.selector); }, function (update) { return update; }, function (exit) { return exit.remove; })
            .attr('x', function (data) {
            return x(data[_this.config.xField]);
        })
            .attr('y', function (data) {
            return y(data[_this.config.yField]) - 7;
        })
            .text(function (data) {
            var returnText = "".concat(_this.yField, ": ").concat(data[_this.config.yField]);
            if (_this.templete) {
                returnText = _this.templete(data);
            }
            return returnText;
        });
    };
    return LabelSeries;
}(series_base_1.SeriesBase));
exports.LabelSeries = LabelSeries;
//# sourceMappingURL=label-series.js.map