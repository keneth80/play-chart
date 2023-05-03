import { __extends } from "tslib";
import { select } from 'd3';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
import blueImage from '../../../../assets/image/blue_angular.png';
import greenImage from '../../../../assets/image/green_angular.png';
import { ChartSelector } from '../../../../component/chart';
import { SeriesBase } from '../../../../component/chart/series-base';
import { getTransformByArray, textWrapping } from '../../../../component/chart/util';
import { defaultChartColors } from '../../../../component/chart/util/chart-util';
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
            _this.backgroundImage = configuration.backgroundImage;
            _this.seriesImage = configuration.seriesImage;
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
                textWrapping(select(node[i]), _this.labelWidth, '#26282C');
            }
        });
        var lineParser = line()
            .x(function (d) { return d.x; })
            .y(function (d) { return d.y; });
        var colors = defaultChartColors();
        var defs = this.svg.selectAll('defs');
        // draw the path element
        console.log(chartData);
        var seriesGroup = this.mainGroup
            .select(".".concat(this.selector, "-series-group"))
            .raise();
        defs.selectAll('mask')
            .data(chartData)
            .join(function (enter) {
            return enter
                .append('mask')
                .attr('id', function (_, i) { return (i === 1 ? 'green_angular' : 'blue_angular'); })
                .append('path')
                .datum(function (d) { return getPathCoordinates(d, _this.features, width, height, radialScale); })
                .attr('d', lineParser);
        }, function (update) {
            return update
                .attr('id', function (_, i) { return (i === 1 ? 'green_angular' : 'blue_angular'); })
                .select('path')
                .datum(function (d) { return getPathCoordinates(d, _this.features, width, height, radialScale); })
                .attr('d', lineParser);
        }, function (exite) { return exite.remove(); })
            .style('fill', '#fff')
            .style('fill-opacity', 0.9);
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
            .attr('stroke', '#fff');
        var tempSize = pathGroup.node().getBBox();
        var boxSize = Math.max(tempSize.width, tempSize.height);
        console.log(pathGroup.node().getBBox(), width, height, boxSize);
        seriesGroup
            .append('svg:image')
            .attr('xlink:href', this.backgroundImage)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .attr('width', boxSize + 2)
            .attr('height', boxSize + 2)
            .attr('x', width / 2 - boxSize / 2 - 1)
            .attr('y', height / 2 - boxSize / 2 - 1);
        seriesGroup
            .append('svg:image')
            .attr('xlink:href', this.seriesImage ? this.seriesImage(0) : blueImage)
            .attr('mask', 'url(#blue_angular)')
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .attr('width', boxSize)
            .attr('height', boxSize)
            .attr('x', width / 2 - boxSize / 2)
            .attr('y', height / 2 - boxSize / 2);
        seriesGroup
            .append('svg:image')
            .attr('xlink:href', this.seriesImage ? this.seriesImage(1) : greenImage)
            .attr('mask', 'url(#green_angular)')
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .attr('width', boxSize)
            .attr('height', boxSize)
            .attr('x', width / 2 - boxSize / 2)
            .attr('y', height / 2 - boxSize / 2);
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