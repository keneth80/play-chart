import { __extends } from "tslib";
import { select } from 'd3';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
import { ChartSelector } from '../../../../component/chart';
import { SeriesBase } from '../../../../component/chart/series-base';
import { defaultChartColors } from '../../../../component/chart/util/chart-util';
import { blueImage, greenImage, spiderGuide } from '../../../../chart-images';
import { getTransformByArray, textWrapping } from '../../../../component/chart/util';
var ImageSpiderSeries = /** @class */ (function (_super) {
    __extends(ImageSpiderSeries, _super);
    function ImageSpiderSeries(configuration) {
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
    ImageSpiderSeries.prototype.setSvgElement = function (svg, mainGroup) {
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
    ImageSpiderSeries.prototype.drawSeries = function (chartData, scales, geometry) {
        var _this = this;
        this.svg.select('.' + ChartSelector.ZOOM_SVG).lower();
        var width = Math.min(geometry.width, geometry.height);
        var height = width;
        var radialScale = scaleLinear()
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
        var mainTransform = getTransformByArray(this.mainGroup.attr('transform'));
        this.mainGroup.attr('clip-path', null);
        this.mainGroup.attr('transform', "translate(".concat(geometry.width / 2 - width / 2, ", ").concat(mainTransform[1], ")"));
        var defs = this.svg.selectAll('defs');
        defs.append('svg:pattern')
            .attr('id', 'green_angular')
            .attr('width', width)
            .attr('height', height)
            .attr('patternUnits', 'userSpaceOnUse')
            .append('svg:image')
            .attr('xlink:href', greenImage)
            .attr('width', width)
            .attr('height', height)
            .attr('x', 0)
            .attr('y', 0);
        defs.append('svg:pattern')
            .attr('id', 'blue_angular')
            .attr('width', width)
            .attr('height', height)
            .attr('patternUnits', 'userSpaceOnUse')
            .append('svg:image')
            .attr('xlink:href', blueImage)
            .attr('width', width)
            .attr('height', height)
            .attr('x', 0)
            .attr('y', 0);
        defs.append('svg:pattern')
            .attr('id', 'spider_guide')
            .attr('width', width)
            .attr('height', height)
            .attr('patternUnits', 'userSpaceOnUse')
            .append('svg:image')
            .attr('xlink:href', spiderGuide)
            .attr('width', width)
            .attr('height', height)
            .attr('x', 0)
            .attr('y', 0);
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
            .attr('stroke-opacity', 0);
        // draw axis label
        this.mainGroup
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
                textWrapping(select(node[i]), _this.labelWidth);
            }
        });
        var lineParser = line()
            .x(function (d) { return d.x; })
            .y(function (d) { return d.y; });
        var colors = defaultChartColors();
        // draw the path element
        console.log(chartData);
        var seriesGroup = this.mainGroup
            .select(".".concat(this.selector, "-series-group"))
            .raise();
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
            .attr('fill', function (_, i) { return (i === 1 ? 'url(#green_angular)' : 'url(#blue_angular)'); })
            .attr('fill-opacity', 0.9);
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
            .attr('stroke-opacity', 0)
            .attr('stroke', 'black')
            .attr('fill', 'url(#spider_guide)');
    };
    return ImageSpiderSeries;
}(SeriesBase));
export { ImageSpiderSeries };
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
        // if (i === features.length - 1) {
        //     coordinates.push(angleToCoordinate(angle, radialScale(dataPoint[features[0]]), width, height));
        // }
    }
    console.log(coordinates);
    return coordinates;
}
//# sourceMappingURL=index.js.map