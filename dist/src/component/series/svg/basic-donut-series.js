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
import { format } from 'd3-format';
import { interpolate, quantize } from 'd3-interpolate';
import { scaleOrdinal } from 'd3-scale';
import { interpolateSpectral } from 'd3-scale-chromatic';
import { select } from 'd3-selection';
import { arc, pie } from 'd3-shape';
import { transition } from 'd3-transition';
import { ChartSelector } from '../../chart';
import { SeriesBase } from '../../chart/series-base';
import { colorDarker, isIE } from '../../chart/util/d3-svg-util';
var BasicDonutSeries = /** @class */ (function (_super) {
    __extends(BasicDonutSeries, _super);
    function BasicDonutSeries(configuration) {
        var _this = _super.call(this, configuration) || this;
        _this.midAngle = function (d) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2;
        };
        if (configuration) {
            if (configuration.categoryField) {
                _this.categoryField = configuration.categoryField;
            }
            if (configuration.valueField) {
                _this.valueField = configuration.valueField;
            }
        }
        _this.numberFmt = format(',.4f');
        _this.transition = transition().duration(750);
        // .ease(easeQuadIn);
        _this.pieShape = pie()
            .padAngle(0.02)
            .sort(null)
            .value(function (d) { return d[_this.valueField]; });
        return _this;
    }
    BasicDonutSeries.prototype.setSvgElement = function (svg, mainGroup) {
        var _this = this;
        this.svg = svg;
        if (!mainGroup.select(".".concat(this.selector, "-group")).node()) {
            this.mainGroup = mainGroup.append('g').attr('class', "".concat(this.selector, "-group"));
            this.pieSeriesGroup = this.mainGroup
                .selectAll(".".concat(this.selector, "-pie-series-group"))
                .data(["".concat(this.selector, "-pie-series-group")])
                .join(function (enter) { return enter.append('g').attr('class', "".concat(_this.selector, "-pie-series-group")); }, function (update) { return update; }, function (exite) { return exite.remove(); });
            this.pieLabelGroup = this.mainGroup
                .selectAll(".".concat(this.selector, "-pie-label-group"))
                .data(["".concat(this.selector, "-pie-label-group")])
                .join(function (enter) { return enter.append('g').attr('class', "".concat(_this.selector, "-pie-label-group")); }, function (update) { return update; }, function (exite) { return exite.remove(); });
            this.pieLineGroup = this.mainGroup
                .selectAll(".".concat(this.selector, "-pie-line-group"))
                .data(["".concat(this.selector, "-pie-line-group")])
                .join(function (enter) { return enter.append('g').attr('class', "".concat(_this.selector, "-pie-line-group")); }, function (update) { return update; }, function (exite) { return exite.remove(); });
        }
    };
    BasicDonutSeries.prototype.drawSeries = function (chartData, scales, geometry) {
        var _this = this;
        this.svg.select('.' + ChartSelector.ZOOM_SVG).lower();
        var radius = Math.min(geometry.width, geometry.height) / 2;
        var arcs = this.pieShape(chartData);
        var colors = scaleOrdinal()
            .domain(chartData.map(function (d) { return d[_this.categoryField]; }))
            .range(quantize(function (t) { return interpolateSpectral(t * 0.8 + 0.1); }, chartData.length).reverse());
        var innerArc = arc()
            .outerRadius(radius * 0.8)
            .innerRadius(radius * 0.4);
        var outerArc = arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);
        this.mainGroup.attr('transform', "translate(".concat(geometry.width / 2, ",").concat(geometry.height / 2, ")"));
        // ------- pie series -------
        var series = this.pieSeriesGroup
            .selectAll(".".concat(this.selector, "-path"))
            .data(arcs, function (d) {
            return d.data[_this.categoryField];
        })
            .join(function (enter) { return enter.append('path').attr('class', "".concat(_this.selector, "-path")); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('fill', function (d) { return colors(d.data[_this.categoryField]) + ''; })
            .on('mouseover', function (event, d) {
            var node = event.target;
            if (node) {
                select(node).style('fill', function () { return colorDarker(colors(d.data[_this.categoryField]), 2); }); // point
                // .style('stroke', '#f5330c')
                // .style('stroke-width', 2);
                // this.tooltipGroup = this.chartBase.showTooltip();
                // select(node).classed('tooltip', true);
            }
        })
            .on('mouseout', function (event, d) {
            var node = event.target;
            if (node) {
                select(node).style('fill', function () { return colors(d.data[_this.categoryField]) + ''; }); // point
                // .style('stroke', null)
                // .style('stroke-width', null);
            }
            // this.chartBase.hideTooltip();
            // select(node).classed('tooltip', false);
        })
            .on('mousemove', function (event, d) {
            var textElement = _this.tooltipGroup
                .select('text')
                .text("".concat(d.data[_this.categoryField], ": ").concat(_this.numberFmt(d.data[_this.valueField])));
            var textWidth = textElement.node().getComputedTextLength() + 10;
            var xPosition = event.x;
            var yPosition = event.offsetY - 30;
            if (isIE()) {
                yPosition += geometry.height / 2;
            }
            // let yPosition = height / 2 - (event.clientY - rect.y);
            if (xPosition + textWidth > geometry.width) {
                xPosition = xPosition - textWidth;
            }
            // this.tooltipGroup.attr('transform', `translate(${xPosition}, ${yPosition})`).selectAll('rect').attr('width', textWidth);
        });
        var currentSeries = null;
        series
            .transition()
            .duration(1000)
            .attrTween('d', function (d) {
            currentSeries = currentSeries !== null && currentSeries !== void 0 ? currentSeries : d;
            var interpolateMng = interpolate(currentSeries, d);
            currentSeries = interpolateMng(0);
            return function (t) {
                return innerArc(interpolateMng(t));
            };
        });
        // ------- labels -------
        var labels = this.pieLabelGroup
            .selectAll(".".concat(this.selector, "-label"))
            .data(arcs, function (d) {
            return d.data[_this.categoryField];
        })
            .join(function (enter) { return enter.append('text').attr('class', "".concat(_this.selector, "-label")); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('dy', '.35em')
            .text(function (d) {
            return d.data[_this.categoryField];
        });
        var currentLabel = null;
        labels
            .transition()
            .duration(1000)
            .attrTween('transform', function (d) {
            currentLabel = currentLabel !== null && currentLabel !== void 0 ? currentLabel : d;
            var interpolateMng = interpolate(currentLabel, d);
            currentLabel = interpolateMng(0);
            return function (t) {
                var d2 = interpolateMng(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * (_this.midAngle(d2) < Math.PI ? 1 : -1);
                return "translate(".concat(pos, ")");
            };
        })
            .styleTween('text-anchor', function (d) {
            currentLabel = currentLabel !== null && currentLabel !== void 0 ? currentLabel : d;
            var interpolateMng = interpolate(currentLabel, d);
            currentLabel = interpolateMng(0);
            return function (t) {
                var d2 = interpolateMng(t);
                return _this.midAngle(d2) < Math.PI ? 'start' : 'end';
            };
        });
        // ------- poly lines -------
        var lines = this.pieLineGroup
            .selectAll(".".concat(this.selector, "-line"))
            .data(arcs, function (d) {
            return d.data[_this.categoryField];
        })
            .join(function (enter) { return enter.append('polyline').attr('class', "".concat(_this.selector, "-line")); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .style('opacity', 0.5)
            .style('stroke', '#000')
            .style('stroke-width', 2)
            .style('fill', 'none');
        var currentLine = null;
        lines
            .transition()
            .duration(1000)
            .attrTween('points', function (d) {
            currentLine = currentLine !== null && currentLine !== void 0 ? currentLine : d;
            var interpolateMng = interpolate(currentLine, d);
            currentLine = interpolateMng(0);
            return function (t) {
                var d2 = interpolateMng(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * 0.95 * (_this.midAngle(d2) < Math.PI ? 1 : -1);
                return [innerArc.centroid(d2), outerArc.centroid(d2), pos].toLocaleString();
            };
        });
    };
    return BasicDonutSeries;
}(SeriesBase));
export { BasicDonutSeries };
//# sourceMappingURL=basic-donut-series.js.map