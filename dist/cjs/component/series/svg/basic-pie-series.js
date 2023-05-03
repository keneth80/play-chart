"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicPieSeries = void 0;
var tslib_1 = require("tslib");
var d3_interpolate_1 = require("d3-interpolate");
var d3_scale_1 = require("d3-scale");
var d3_scale_chromatic_1 = require("d3-scale-chromatic");
var d3_shape_1 = require("d3-shape");
var d3_transition_1 = require("d3-transition");
var series_base_1 = require("../../chart/series-base");
var BasicPieSeries = /** @class */ (function (_super) {
    tslib_1.__extends(BasicPieSeries, _super);
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
        _this.transition = (0, d3_transition_1.transition)().duration(750);
        // .ease(easeQuadIn);
        _this.pieShape = (0, d3_shape_1.pie)()
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
        var color = (0, d3_scale_1.scaleOrdinal)()
            .domain(chartData.map(function (d) { return d[_this.categoryField]; }))
            .range((0, d3_interpolate_1.quantize)(function (t) { return (0, d3_scale_chromatic_1.interpolateSpectral)(t * 0.8 + 0.1); }, chartData.length).reverse());
        var arcShape = (0, d3_shape_1.arc)()
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
            var arcLabel_1 = (0, d3_shape_1.arc)().innerRadius(labelRadius).outerRadius(labelRadius);
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
}(series_base_1.SeriesBase));
exports.BasicPieSeries = BasicPieSeries;
//# sourceMappingURL=basic-pie-series.js.map