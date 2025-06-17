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
import { SeriesBase } from '../../chart/series-base';
var LabelSeries = /** @class */ (function (_super) {
    __extends(LabelSeries, _super);
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
}(SeriesBase));
export { LabelSeries };
//# sourceMappingURL=label-series.js.map