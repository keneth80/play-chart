import { __extends } from "tslib";
import { bin, max, rollup } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { area, curveCatmullRom } from 'd3-shape';
import { SeriesBase } from '../../chart/series-base';
var BasicViolinSeries = /** @class */ (function (_super) {
    __extends(BasicViolinSeries, _super);
    function BasicViolinSeries(configuration) {
        var _this = _super.call(this, configuration) || this;
        _this.config = configuration;
        return _this;
    }
    BasicViolinSeries.prototype.xField = function () {
        return this.config.xField;
    };
    BasicViolinSeries.prototype.yField = function () {
        return this.config.yField;
    };
    BasicViolinSeries.prototype.setSvgElement = function (svg, mainGroup) {
        this.svg = svg;
        if (!mainGroup.select(".".concat(this.selector, "-group")).node()) {
            this.mainGroup = mainGroup.append('g').attr('class', "".concat(this.selector, "-group"));
        }
    };
    BasicViolinSeries.prototype.drawSeries = function (chartData, scales, geometry) {
        var _this = this;
        var x = scales.find(function (scale) { return scale.orient === _this.xDirection; }).scale;
        var y = scales.find(function (scale) { return scale.orient === _this.yDirection; }).scale;
        this.histogram = bin()
            .domain(y.domain())
            .thresholds(y.ticks(20)) // Important: how many bins approx are going to be made? It is the 'resolution' of the violin plot
            .value(function (d) { return d; });
        var sumstat = rollup(chartData, function (d) {
            // For each key..
            var input = d.map(function (g) {
                return g[_this.config.yField];
            });
            var bins = _this.histogram(input); // And compute the binning on it.
            return bins;
        }, function (d) {
            return d[_this.config.xField];
        });
        var maxNum = 0;
        for (var i in sumstat) {
            var allBins = sumstat[i].value;
            var lengths = allBins.map(function (a) {
                return a.length;
            });
            var longuest = max(lengths);
            if (longuest > maxNum) {
                maxNum = longuest;
            }
        }
        var xNum = scaleLinear().range([0, x.bandwidth()]).domain([-maxNum, maxNum]);
        this.mainGroup
            .selectAll(".".concat(this.selector))
            .data(sumstat)
            .join(function (enter) { return enter.append('g').attr('class', _this.selector); }, function (update) { return update; }, function (exit) { return exit.remove; })
            .attr('transform', function (d) {
            return 'translate(' + x(d.key) + ' ,0)';
        })
            .selectAll('.violin-area')
            .data(function (d) {
            return [d.value];
        })
            .join(function (enter) { return enter.append('path').attr('class', 'violin-area'); }, function (update) { return update; }, function (exit) { return exit.remove; })
            .style('stroke', 'none')
            .style('fill', '#69b3a2')
            .attr('d', area()
            .x0(function (d) {
            return xNum(-d.length);
        })
            .x1(function (d) {
            return xNum(d.length);
        })
            .y(function (d) {
            return y(d.x0);
        })
            .curve(curveCatmullRom));
    };
    return BasicViolinSeries;
}(SeriesBase));
export { BasicViolinSeries };
//# sourceMappingURL=basic-violin-series.js.map