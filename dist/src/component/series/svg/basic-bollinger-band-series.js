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
import { area, line } from 'd3-shape';
import { SeriesBase } from '../../chart/series-base';
var BasicBollingerBandSeries = /** @class */ (function (_super) {
    __extends(BasicBollingerBandSeries, _super);
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
        var ma = line()
            .x(function (d) {
            return x(d[_this.config.xField]);
        })
            .y(function (d) {
            return y(d.ma);
        });
        var lowBand = line()
            .x(function (d) {
            return x(d[_this.config.xField]);
        })
            .y(function (d) {
            return y(d.low);
        });
        var highBand = line()
            .x(function (d) {
            return x(d[_this.config.xField]);
        })
            .y(function (d) {
            return y(d.high);
        });
        var bandsArea = area()
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
}(SeriesBase));
export { BasicBollingerBandSeries };
//# sourceMappingURL=basic-bollinger-band-series.js.map