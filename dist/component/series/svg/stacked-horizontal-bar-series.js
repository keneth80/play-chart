import { __extends, __spreadArray } from "tslib";
import { format } from 'd3-format';
import { scaleOrdinal } from 'd3-scale';
import { pointer, select } from 'd3-selection';
import { stack } from 'd3-shape';
import { SeriesBase } from '../../chart/series-base';
import { colorDarker } from '../../chart/util/d3-svg-util';
var StackedHorizontalBarSeries = /** @class */ (function (_super) {
    __extends(StackedHorizontalBarSeries, _super);
    function StackedHorizontalBarSeries(configuration) {
        var _this = _super.call(this, configuration) || this;
        _this.config = configuration;
        _this.columns = __spreadArray([], configuration.columns, true);
        _this.numberFmt = format(',d');
        return _this;
    }
    StackedHorizontalBarSeries.prototype.setSvgElement = function (svg, mainGroup) {
        this.svg = svg;
        this.rootGroup = mainGroup;
        if (!mainGroup.select(".".concat(this.selector, "-group")).node()) {
            this.mainGroup = this.rootGroup.append('g').attr('class', "".concat(this.selector, "-group"));
        }
        if (!mainGroup.select('.legend-group').node()) {
            this.legendGroup = this.rootGroup
                .append('g')
                .attr('class', 'legend-group')
                .attr('font-family', 'sans-serif')
                .attr('font-size', 10)
                .attr('text-anchor', 'end');
        }
    };
    StackedHorizontalBarSeries.prototype.drawSeries = function (chartData, scales, geometry) {
        var _this = this;
        var x = scales.find(function (scale) { return scale.orient === _this.xDirection; }).scale;
        var y = scales.find(function (scale) { return scale.orient === _this.yDirection; }).scale;
        // set the colors
        var z = scaleOrdinal().range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
        var keys = this.columns;
        z.domain(keys);
        this.mainGroup
            .selectAll('.stacked-horizontal-group')
            .data(stack().keys(keys)(chartData))
            .join(function (enter) { return enter.append('g').attr('class', 'stacked-horizontal-group'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('fill', function (d) {
            return z(d.key) + '';
        })
            .attr('column', function (d) {
            return d.key;
        }) // point
            .selectAll('.stacked-horizontal-item')
            .data(function (d) {
            return d;
        })
            .join(function (enter) {
            return enter
                .append('rect')
                .attr('class', 'stacked-horizontal-item')
                .on('mouseover', function (event, d) {
                var target = event.target;
                var column = target.parentNode.getAttribute('column');
                var fill = z(column) + '';
                select(target).style('fill', function () { return colorDarker(fill, 2); }); // point
                // .style('stroke', '#f5330c')
                // .style('stroke-width', 2);
                _this.tooltipGroup = _this.chartBase.showTooltip();
                select(target).classed('tooltip', true);
            })
                .on('mouseout', function (event, d) {
                var target = event.target;
                var column = target.parentNode.getAttribute('column');
                var fill = z(column) + '';
                select(target).style('fill', function () { return fill; }); // point
                // .style('stroke', null)
                // .style('stroke-width', null);
                _this.chartBase.hideTooltip();
                select(target).classed('tooltip', false);
            })
                .on('mousemove', function (event, d) {
                var target = event.target;
                var column = target.parentNode.getAttribute('column');
                var xPosition = pointer(target)[0] + 10;
                var yPosition = pointer(target)[1] - 10;
                var textElement = _this.tooltipGroup.select('text').text("".concat(column, ": ").concat(_this.numberFmt(d.data[column])));
                _this.tooltipGroup.attr('transform', "translate(".concat(_this.chartBase.chartMargin.left + xPosition, ", ").concat(yPosition, ")"));
                _this.tooltipGroup.selectAll('rect').attr('width', textElement.node().getComputedTextLength() + 10);
                // this.tooltipGroup.select('text').text(`${d[1] - d[0]}`);
                // console.log('d : ', d, target, parent);
            });
        }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('x', function (d) {
            return x(d.data[_this.config.xField]);
        })
            .attr('height', function (d) {
            return y(d[0]) - y(d[1]);
        })
            .attr('y', function (d) {
            return d[1] < 0 ? y(0) : y(d[1]);
        })
            // TODO: 계산 적용해 볼 것.
            // .attr('height', (d: any) => { return Math.abs(y(d[0]) - y(d[1]) - y(0)); })
            .attr('width', x.bandwidth());
        // this.drawLegend(keys, z, geometry.width);
    };
    return StackedHorizontalBarSeries;
}(SeriesBase));
export { StackedHorizontalBarSeries };
//# sourceMappingURL=stacked-horizontal-bar-series.js.map