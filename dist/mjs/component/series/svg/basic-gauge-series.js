import { __extends } from "tslib";
import { range } from 'd3-array';
import { rgb } from 'd3-color';
import { easeElastic } from 'd3-ease';
import { format } from 'd3-format';
import { interpolateHsl } from 'd3-interpolate';
import { scaleLinear } from 'd3-scale';
import { arc, curveLinear, line } from 'd3-shape';
import { SeriesBase } from '../../chart/series-base';
var BasicGaugeSeries = /** @class */ (function (_super) {
    __extends(BasicGaugeSeries, _super);
    function BasicGaugeSeries(configuration) {
        var _this = _super.call(this, configuration) || this;
        _this.config = {
            clipWidth: 200,
            clipHeight: 110,
            ringInset: 20,
            ringWidth: 20,
            pointerWidth: 10,
            pointerTailLength: 5,
            pointerHeadLengthPercent: 0.9,
            minValue: 0,
            maxValue: 10,
            minAngle: -90,
            maxAngle: 90,
            transitionMs: 750,
            majorTicks: 5,
            labelFormat: format('d'),
            labelInset: 10,
            colors: ['#e8e2ca', '#3e6c0a']
        };
        _this.range = undefined;
        _this.r = undefined;
        _this.pointerHeadLength = undefined;
        _this.arc = undefined;
        _this.scale = undefined;
        _this.ticks = undefined;
        _this.tickData = undefined;
        _this.pointer = undefined;
        _this.arcColorFn = interpolateHsl(rgb('#e8e2ca'), rgb('#3e6c0a'));
        if (configuration) {
            var prop = void 0;
            for (prop in configuration) {
                _this.config[prop] = configuration[prop];
            }
            if (_this.config.colors) {
                _this.arcColorFn = interpolateHsl(rgb(_this.config.colors[0]), rgb(_this.config.colors[1]));
            }
            _this.range = _this.config.maxAngle - _this.config.minAngle;
            _this.scale = scaleLinear().range([0, 1]).domain([_this.config.minValue, _this.config.maxValue]);
            _this.ticks = _this.scale.ticks(_this.config.majorTicks);
            _this.tickData = range(_this.config.majorTicks);
            _this.tickData = range(_this.config.majorTicks).map(function () {
                return 1 / _this.config.majorTicks;
            });
        }
        return _this;
    }
    BasicGaugeSeries.prototype.setSvgElement = function (svg, mainGroup) {
        this.svg = svg;
        svg.select('.series-group').attr('clip-path', null);
        if (!mainGroup.select(".".concat(this.selector, "-group")).node()) {
            this.mainGroup = mainGroup.append('g').attr('class', "".concat(this.selector, "-group"));
            this.arcGroup = mainGroup.append('g').attr('class', "".concat(this.selector, "-arc-group"));
            this.labelGroup = mainGroup.append('g').attr('class', "".concat(this.selector, "-label-group"));
            this.pointerGroup = mainGroup.append('g').attr('class', "".concat(this.selector, "-pointer-group"));
        }
    };
    BasicGaugeSeries.prototype.drawSeries = function (chartData, scales, geometry) {
        var _this = this;
        this.r = geometry.height;
        this.pointerHeadLength = Math.round(this.r * this.config.pointerHeadLengthPercent);
        this.arc = arc()
            .innerRadius(this.r - this.config.ringWidth - this.config.ringInset)
            .outerRadius(this.r - this.config.ringInset)
            .startAngle(function (d, i) {
            var ratio = +d * i;
            return _this.deg2rad(_this.config.minAngle + ratio * _this.range);
        })
            .endAngle(function (d, i) {
            var ratio = +d * (i + 1);
            return _this.deg2rad(_this.config.minAngle + ratio * _this.range);
        });
        this.arcGroup
            .selectAll(".".concat(this.selector, "-path"))
            .data(this.tickData)
            .join(function (enter) { return enter.append('path').attr('class', "".concat(_this.selector, "-path")); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .style('fill', function (d, i) {
            return _this.arcColorFn(d * i);
        })
            .attr('d', this.arc);
        this.labelGroup
            .selectAll(".".concat(this.selector, "-label"))
            .data(this.ticks)
            .join(function (enter) { return enter.append('text').attr('class', "".concat(_this.selector, "-label")); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .style('text-anchor', 'middle')
            .style('font-size', '14px')
            .style('font-weight', 'bold')
            .style('fill', '#aaa')
            .attr('transform', function (d) {
            var ratio = _this.scale(d);
            var angleValue = _this.config.minAngle + ratio * _this.range;
            return "rotate(".concat(angleValue, ") translate(0, ").concat(_this.config.labelInset - _this.r, ")");
        })
            .text(this.config.labelFormat);
        var lineData = [
            [this.config.pointerWidth / 2, 0],
            [0, -this.pointerHeadLength],
            [-(this.config.pointerWidth / 2), 0],
            [0, this.config.pointerTailLength],
            [this.config.pointerWidth / 2, 0]
        ];
        var pointerLine = line().curve(curveLinear);
        var elementWidth = this.svg.select('g.series-group').node().getBBox().width;
        var svgWidth = parseFloat(this.svg.style('width'));
        this.svg.select('g.series-group').attr('transform', "translate(".concat(elementWidth / 2, ", ").concat(this.r / 2, ")"));
        var centerTx = this.centerTransition(elementWidth, svgWidth, this.r);
        this.arcGroup.attr('transform', centerTx);
        this.labelGroup.attr('transform', centerTx);
        var pg = this.pointerGroup
            .selectAll(".".concat(this.selector, "-pointer"))
            .data([lineData])
            .join(function (enter) { return enter.append('g').attr('class', "".concat(_this.selector, "-pointer")); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .style('fill', '#e85116')
            .style('stroke', '#b64011')
            .attr('transform', centerTx);
        if (!this.pointer) {
            this.pointer = pg.append('path');
        }
        this.pointer.attr('d', pointerLine).attr('transform', "rotate(".concat(this.config.minAngle, ")"));
        var mainRatio = this.scale(chartData[0] === undefined ? 0 : chartData[0]);
        var newAngle = this.config.minAngle + mainRatio * this.range;
        this.pointer
            .transition()
            .duration(this.config.transitionMs)
            .ease(easeElastic)
            .attr('transform', 'rotate(' + newAngle + ')');
    };
    BasicGaugeSeries.prototype.deg2rad = function (deg) {
        return (deg * Math.PI) / 180;
    };
    BasicGaugeSeries.prototype.centerTransition = function (elementWidth, svgWidth, r) {
        var x = svgWidth / 2 - elementWidth / 2;
        return "translate(".concat(x, ", ").concat(r / 2, ")");
    };
    return BasicGaugeSeries;
}(SeriesBase));
export { BasicGaugeSeries };
//# sourceMappingURL=basic-gauge-series.js.map