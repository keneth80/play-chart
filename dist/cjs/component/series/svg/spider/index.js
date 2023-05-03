"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiderSeries = void 0;
var tslib_1 = require("tslib");
var d3_1 = require("d3");
var d3_scale_1 = require("d3-scale");
var d3_shape_1 = require("d3-shape");
var chart_1 = require("../../../../component/chart");
var series_base_1 = require("../../../../component/chart/series-base");
var chart_util_1 = require("../../../../component/chart/util/chart-util");
var util_1 = require("../../../../component/chart/util");
var SpiderSeries = /** @class */ (function (_super) {
    tslib_1.__extends(SpiderSeries, _super);
    function SpiderSeries(configuration) {
        var _this = _super.call(this, configuration) || this;
        if (configuration) {
            _this.selector = configuration.selector || 'spider';
            _this.domain = configuration.domain || [0, 10];
            _this.features = configuration.features || ['A', 'B', 'C', 'D', 'E'];
            _this.tick = configuration.tick;
            _this.labelFmt = configuration.labelFmt || undefined;
            _this.labelWidth = configuration.labelWidth || 0;
        }
        return _this;
    }
    SpiderSeries.prototype.setSvgElement = function (svg, mainGroup) {
        this.svg = svg;
        this.mainGroup = mainGroup;
        mainGroup
            .selectAll('.spider-series')
            .data(["".concat(this.selector, "-series-group")])
            .join(function (enter) { return enter.append('g').attr('class', function (d) { return d; }); }, function (update) { return update; }, function (exite) { return exite.remove(); });
        mainGroup
            .selectAll('.spider-series')
            .data(["".concat(this.selector, "-guide-group")])
            .join(function (enter) { return enter.append('g').attr('class', function (d) { return d; }); }, function (update) { return update; }, function (exite) { return exite.remove(); });
    };
    SpiderSeries.prototype.drawSeries = function (chartData, scales, geometry) {
        var _this = this;
        this.svg.select('.' + chart_1.ChartSelector.ZOOM_SVG).lower();
        var width = Math.min(geometry.width, geometry.height);
        console.log('width : ', width, geometry);
        var height = width;
        var radialScale = (0, d3_scale_1.scaleLinear)()
            .domain(this.domain)
            .range([0, width / 2 - 50]);
        var ticks = radialScale.ticks(this.tick.tickCount);
        var guideLine = [];
        var _loop_1 = function (i) {
            var point = {};
            this_1.features.forEach(function (f) { return (point[f] = ticks[i]); });
            guideLine.push(point);
        };
        var this_1 = this;
        for (var i = 0; i < ticks.length; i++) {
            _loop_1(i);
        }
        var mainTransform = (0, util_1.getTransformByArray)(this.mainGroup.attr('transform'));
        this.mainGroup.attr('clip-path', null);
        this.mainGroup.attr('transform', "translate(".concat(geometry.width / 2 - width / 2, ", ").concat(mainTransform[1], ")"));
        // draw tick labels
        if (this.tick.tickVisible !== false) {
            this.mainGroup
                .selectAll('.ticklabel')
                .data(ticks)
                .join(function (enter) {
                return enter
                    .append('text')
                    .attr('class', 'ticklabel')
                    .attr('x', width / 2 + 5)
                    .attr('y', function (d) { return height / 2 - radialScale(d); })
                    .text(function (d) { return d.toString(); });
            });
        }
        var featureData = this.features.map(function (f, i) {
            var angle = getAngle(i, _this.features.length);
            return {
                name: f,
                angle: angle,
                lineValue: angleToCoordinate(angle, radialScale(ticks[ticks.length - 1]), width, height),
                labelValue: angleToCoordinate(angle, radialScale(ticks[ticks.length - 1]) + radialScale(ticks[ticks.length - 1] * 0.2), width, height)
            };
        });
        // draw axis line
        this.mainGroup
            .selectAll('.axis-line')
            .data(featureData)
            .join(function (enter) { return enter.append('line').attr('class', 'axis-line'); }, function (update) { return update; }, function (exite) { return exite.remove(); })
            .attr('x1', width / 2)
            .attr('y1', height / 2)
            .attr('x2', function (d) { return d.lineValue.x; })
            .attr('y2', function (d) { return d.lineValue.y; })
            .attr('stroke', 'black')
            .attr('stroke-opacity', 0.2);
        // draw axis label
        var axisLabel = this.mainGroup
            .selectAll('.axis-label')
            .data(featureData)
            .join(function (enter) { return enter.append('text').attr('class', 'axis-label'); }, function (update) { return update; }, function (exite) { return exite.remove(); })
            .style('text-anchor', function (d) {
            if (width / 2 === d.labelValue.x) {
                return 'middle';
            }
            else if (width / 2 > d.labelValue.x) {
                return 'end';
            }
            else {
                return 'start';
            }
        })
            .attr('x', function (d) { return d.labelValue.x; })
            .attr('y', function (d) { return d.labelValue.y; })
            .text(function (d) { return (_this.labelFmt ? _this.labelFmt(d.name) : d.name); })
            .each(function (data, i, node) {
            if (_this.labelWidth) {
                (0, util_1.textWrapping)((0, d3_1.select)(node[i]), _this.labelWidth);
            }
        });
        var lineParser = (0, d3_shape_1.line)()
            .x(function (d) { return d.x; })
            .y(function (d) { return d.y; });
        var colors = (0, chart_util_1.defaultChartColors)();
        // draw the path element
        var seriesGroup = this.mainGroup.select(".".concat(this.selector, "-series-group"));
        seriesGroup
            .selectAll('.spider-path')
            .data(chartData)
            .join(function (enter) {
            return enter
                .append('path')
                .attr('class', 'spider-path')
                .datum(function (d) { return getPathCoordinates(d, _this.features, width, height, radialScale); })
                .attr('d', lineParser);
        }, function (update) {
            return update
                .datum(function (d) { return getPathCoordinates(d, _this.features, width, height, radialScale); })
                .attr('d', lineParser);
        }, function (exite) { return exite.remove(); })
            .attr('stroke-width', 3)
            .attr('stroke', function (_, i) { return colors[i]; })
            .attr('fill', function (_, i) { return colors[i]; })
            .attr('stroke-opacity', 1)
            .attr('opacity', 0.7);
        var pathGroup = this.mainGroup.select(".".concat(this.selector, "-guide-group"));
        pathGroup
            .selectAll('.spider-guide-path')
            .data(guideLine)
            .join(function (enter) {
            return enter
                .append('path')
                .attr('class', 'spider-guide-path')
                .datum(function (d) {
                var coordinates = getPathCoordinates(d, _this.features, width, height, radialScale);
                coordinates.push(coordinates[0]);
                return coordinates;
            })
                .attr('d', lineParser);
        }, function (update) {
            return update
                .datum(function (d) {
                var coordinates = getPathCoordinates(d, _this.features, width, height, radialScale);
                coordinates.push(coordinates[0]);
                return coordinates;
            })
                .attr('d', lineParser);
        }, function (exite) { return exite.remove(); })
            .attr('stroke-width', 1)
            .attr('stroke', 'black')
            .attr('fill', 'white')
            .attr('fill-opacity', 0)
            .attr('opacity', 0.1);
    };
    return SpiderSeries;
}(series_base_1.SeriesBase));
exports.SpiderSeries = SpiderSeries;
function getAngle(index, featuresLength) {
    return Math.PI / 2 - (2 * Math.PI * index) / featuresLength;
}
function angleToCoordinate(angle, value, width, height) {
    var x = Math.cos(angle) * value;
    var y = Math.sin(angle) * value;
    return { x: width / 2 + x, y: height / 2 - y };
}
function getPathCoordinates(dataPoint, features, width, height, radialScale) {
    var coordinates = [];
    for (var i = 0; i < features.length; i++) {
        var angle = getAngle(i, features.length);
        coordinates.push(angleToCoordinate(angle, radialScale(dataPoint[features[i]]), width, height));
    }
    return coordinates;
}
//# sourceMappingURL=index.js.map