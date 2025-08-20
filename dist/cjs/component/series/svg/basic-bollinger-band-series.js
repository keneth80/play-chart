"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicBollingerBandSeries = void 0;
var tslib_1 = require("tslib");
var d3_shape_1 = require("d3-shape");
var series_base_1 = require("../../chart/series-base");
var BasicBollingerBandSeries = /** @class */ (function (_super) {
    tslib_1.__extends(BasicBollingerBandSeries, _super);
    function BasicBollingerBandSeries(configuration) {
        var _this = _super.call(this, configuration) || this;
        _this.config = configuration;
        return _this;
    }
    BasicBollingerBandSeries.prototype.xField = function () {
        return this.config.xField;
    };
    BasicBollingerBandSeries.prototype.yField = function () {
        return null;
    };
    BasicBollingerBandSeries.prototype.setSvgElement = function (svg, mainGroup) {
        this.svg = svg;
        if (!mainGroup.select(".".concat(this.selector, "-group")).node()) {
            this.mainGroup = mainGroup.append('g').attr('class', "".concat(this.selector, "-group"));
        }
    };
    BasicBollingerBandSeries.prototype.drawSeries = function (chartData, scales, geometry) {
        var _this = this;
        var x = scales.find(function (scale) { return scale.orient === _this.xDirection; }).scale;
        var y = scales.find(function (scale) { return scale.orient === _this.yDirection; }).scale;
        var ma = (0, d3_shape_1.line)()
            .x(function (d) {
            return x(d[_this.config.xField]);
        })
            .y(function (d) {
            return y(d.ma);
        });
        var lowBand = (0, d3_shape_1.line)()
            .x(function (d) {
            return x(d[_this.config.xField]);
        })
            .y(function (d) {
            return y(d.low);
        });
        var highBand = (0, d3_shape_1.line)()
            .x(function (d) {
            return x(d[_this.config.xField]);
        })
            .y(function (d) {
            return y(d.high);
        });
        var bandsArea = (0, d3_shape_1.area)()
            .x(function (d) {
            return x(d[_this.config.xField]);
        })
            .y0(function (d) {
            return y(d.low);
        })
            .y1(function (d) {
            return y(d.high);
        });
        this.mainGroup
            .selectAll('.area.bands')
            .data([chartData])
            .join(function (enter) { return enter.append('path').attr('class', 'area bands'); })
            .attr('d', bandsArea);
        this.mainGroup
            .selectAll('.bollinger-line.bands.low')
            .data([chartData])
            .join(function (enter) { return enter.append('path').attr('class', 'bollinger-line bands low'); })
            .attr('d', lowBand);
        this.mainGroup
            .selectAll('.bollinger-line.bands.high')
            .data([chartData])
            .join(function (enter) { return enter.append('path').attr('class', 'bollinger-line bands high'); })
            .attr('d', highBand);
        this.mainGroup
            .selectAll('.bollinger-line.ma.bands')
            .data([chartData])
            .join(function (enter) { return enter.append('path').attr('class', 'bollinger-line ma bands'); })
            .attr('d', ma);
    };
    return BasicBollingerBandSeries;
}(series_base_1.SeriesBase));
exports.BasicBollingerBandSeries = BasicBollingerBandSeries;
//# sourceMappingURL=basic-bollinger-band-series.js.map