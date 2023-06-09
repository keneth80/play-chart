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
import { axisBottom } from 'd3';
import { scaleLinear } from 'd3-scale';
import { ChartSelector } from '../../../../component/chart';
import { SeriesBase } from '../../../../component/chart/series-base';
var CHART_MARGIN = {
    left: 50,
    right: 80
};
var HorizontalPointerSeries = /** @class */ (function (_super) {
    __extends(HorizontalPointerSeries, _super);
    function HorizontalPointerSeries(configuration) {
        var _this = _super.call(this, configuration) || this;
        if (configuration) {
            _this.domain = configuration.domain;
            _this.unit = configuration.unit;
        }
        return _this;
    }
    HorizontalPointerSeries.prototype.setSvgElement = function (svg, mainGroup) {
        this.svg = svg;
        this.mainGroup = mainGroup;
        mainGroup
            .selectAll('.horizontal-pointer-series')
            .data(["".concat(this.selector, "-line-group")])
            .join(function (enter) { return enter.append('g').attr('class', function (d) { return d; }); }, function (update) { return update; }, function (exite) { return exite.remove(); });
        mainGroup
            .selectAll('.horizontal-pointer-series')
            .data(["".concat(this.selector, "-circle-group")])
            .join(function (enter) { return enter.append('g').attr('class', function (d) { return d; }); }, function (update) { return update; }, function (exite) { return exite.remove(); });
    };
    HorizontalPointerSeries.prototype.drawSeries = function (chartData, scales, geometry) {
        this.svg.select('.' + ChartSelector.ZOOM_SVG).lower();
        var chartMargin = this.chartBase.chartMargin;
        // circle group position setting
        var circleGroup = this.mainGroup.selectAll(".".concat(this.selector, "-circle-group"));
        circleGroup.attr('transform', "translate(".concat(chartMargin.left, ", ").concat(geometry.height / 2, ")"));
        // line group position setting
        var lineGroup = this.mainGroup.selectAll(".".concat(this.selector, "-line-group"));
        lineGroup.attr('transform', "translate(".concat(chartMargin.left, ", ").concat(geometry.height / 2, ")"));
        var width = geometry.width - chartMargin.left - chartMargin.right;
        var scale = scaleLinear().domain(this.domain).range([0, width]);
        // bottom axis line render
        var bottomAxis = axisBottom(scale).tickSizeOuter(0);
        var line = lineGroup.call(bottomAxis);
        line.selectAll('path').style('stroke-width', 2);
        // ticks render
        var ticks = line.selectAll('.tick');
        ticks.select('line').remove();
        ticks.select('text').attr('y', 30).style('fill', 'gery');
        lineGroup
            .selectAll('.unit')
            .data(["(".concat(this.unit, ")")])
            .join(function (enter) { return enter.append('text').attr('class', 'unit'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .style('fill', 'grey')
            .style('font-size', 13)
            .text(function (d) { return d; })
            .attr('transform', "translate(".concat(width + 20, ", 38)"));
        // circle render
        var circleData = {
            x: scale(chartData),
            y: 0
        };
        circleGroup
            .selectAll('.circle-point')
            .data([circleData])
            .join(function (enter) { return enter.append('circle').attr('class', 'circle-point'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('cx', function (d) {
            return d.x;
        })
            .attr('cy', function (d) {
            return d.y;
        })
            .attr('r', 10)
            .style('fill', 'black');
    };
    return HorizontalPointerSeries;
}(SeriesBase));
export { HorizontalPointerSeries };
//# sourceMappingURL=index.js.map