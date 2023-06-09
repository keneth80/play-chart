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
import { quantize } from 'd3-interpolate';
import { scaleOrdinal } from 'd3-scale';
import { interpolateSpectral } from 'd3-scale-chromatic';
import { arc, pie } from 'd3-shape';
import { transition } from 'd3-transition';
import { SeriesBase } from '../../chart/series-base';
var BasicPieSeries = /** @class */ (function (_super) {
    __extends(BasicPieSeries, _super);
    function BasicPieSeries(configuration) {
        var _this = _super.call(this, configuration) || this;
        _this.innerRadius = 0;
        _this.isLabel = true;
        if (configuration) {
            if (configuration.categoryField) {
                _this.categoryField = configuration.categoryField;
            }
            if (configuration.valueField) {
                _this.valueField = configuration.valueField;
            }
            if (configuration.innerRadius) {
                _this.innerRadius = configuration.innerRadius;
            }
            if (configuration.isLabel) {
                _this.isLabel = true;
            }
        }
        _this.transition = transition().duration(750);
        // .ease(easeQuadIn);
        _this.pieShape = pie()
            .sort(null)
            .value(function (d) { return d[_this.valueField]; });
        return _this;
    }
    BasicPieSeries.prototype.setSvgElement = function (svg, mainGroup) {
        this.svg = svg;
        if (!mainGroup.select(".".concat(this.selector, "-group")).node()) {
            this.mainGroup = mainGroup.append('g').attr('class', "".concat(this.selector, "-group"));
        }
    };
    BasicPieSeries.prototype.drawSeries = function (chartData, scales, geometry) {
        var _this = this;
        var radius = Math.min(geometry.width, geometry.height) / 2 - 40;
        var color = scaleOrdinal()
            .domain(chartData.map(function (d) { return d[_this.categoryField]; }))
            .range(quantize(function (t) { return interpolateSpectral(t * 0.8 + 0.1); }, chartData.length).reverse());
        var arcShape = arc()
            .innerRadius(this.innerRadius * 0.5)
            .outerRadius(Math.min(geometry.width, geometry.height) / 2 - 1 * 0.5);
        var arcs = this.pieShape(chartData);
        this.mainGroup.attr('transform', "translate(".concat(geometry.width / 2, ",").concat(geometry.height / 2, ")"));
        this.mainGroup
            .selectAll(".".concat(this.selector, "-path"))
            .data(arcs)
            .join(function (enter) { return enter.append('path').attr('class', "".concat(_this.selector, "-path")); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('fill', function (d) { return color(d.data[_this.categoryField]) + ''; })
            .attr('stroke', 'white')
            .attr('d', arcShape)
            .selectAll('title')
            .data(function (d) {
            return [d];
        })
            .join(function (enter) { return enter.append('title').attr('class', "".concat(_this.selector, "-title")); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .text(function (d) { return "".concat(d.data[_this.categoryField], ": ").concat(d.data[_this.valueField].toLocaleString()); });
        if (this.isLabel) {
            var labelRadius = (Math.min(geometry.width, geometry.height) / 2) * 0.8;
            var arcLabel_1 = arc().innerRadius(labelRadius).outerRadius(labelRadius);
            var texts = this.mainGroup
                .selectAll(".".concat(this.selector, "-label"))
                .data(arcs)
                .join(function (enter) { return enter.append('text').attr('class', "".concat(_this.selector, "-label")); }, function (update) { return update; }, function (exit) { return exit.remove(); })
                .attr('transform', function (d) { return "translate(".concat(arcLabel_1.centroid(d), ")"); })
                .attr('dy', '0.35em');
            texts
                .selectAll('tspan.label')
                .data(function (d) { return [d]; })
                .join(function (enter) { return enter.append('tspan').attr('class', 'label'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
                .attr('x', 0)
                .attr('y', '-0.7em')
                .style('font-size', 13)
                .style('font-weight', 'bold')
                .text(function (d) { return d.data[_this.categoryField]; });
            texts
                .filter(function (d) { return d.endAngle - d.startAngle > 0.25; })
                .selectAll('tspan.value')
                .data(function (d) { return [d]; })
                .join(function (enter) { return enter.append('tspan').attr('class', 'value'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
                .attr('x', 0)
                .attr('y', '0.7em')
                .style('fill-opacity', 0.7)
                .style('font-size', 11)
                .text(function (d) { return d.data[_this.valueField].toLocaleString(); });
        }
    };
    return BasicPieSeries;
}(SeriesBase));
export { BasicPieSeries };
//# sourceMappingURL=basic-pie-series.js.map