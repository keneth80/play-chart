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
import { select } from 'd3';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
import { spiderGuide } from '../../../../chart-images';
import { ChartSelector } from '../../../../component/chart';
import { SeriesBase } from '../../../../component/chart/series-base';
import { textBreak } from '../../../../component/chart/util';
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
            _this.labelDecoration = configuration.labelDecoration || undefined;
            _this.labelColor = configuration.labelColor || undefined;
            _this.backgroundImage = configuration.backgroundImage;
            _this.seriesImage = configuration.seriesImage;
            _this.getSeriesInfo = configuration.getSeriesInfo;
            _this.range = configuration.range || [0, 10];
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
        var maxRadius = this.range[1];
        // Calculate the required width/height for the spider chart content including labels
        // Add a buffer for labels and general spacing
        var requiredChartSize = (maxRadius + 50) * 2; // maxRadius + label padding, then * 2 for diameter
        // Ensure the calculated chart size does not exceed the available geometry
        var width = Math.min(requiredChartSize, geometry.width, geometry.height);
        var height = width; // Keep it square for spider chart
        var radialScale = scaleLinear()
            .domain(this.domain)
            .range([0, maxRadius]); // Use the configured range directly
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
        // Calculate the x and y translation to center the square chart within the available geometry
        var translateX = geometry.width / 2 - width / 2;
        var translateY = geometry.height / 2 - height / 2;
        this.mainGroup.attr('clip-path', null);
        this.mainGroup.attr('transform', "translate(".concat(translateX, ", ").concat(translateY, ")"));
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
            .style('fill', function (d) { return (_this.labelColor ? _this.labelColor(d.name) : ''); })
            .style('text-decoration', function (d) { return (_this.labelDecoration ? _this.labelDecoration(d.name) : ''); })
            .attr('x', function (d) { return d.labelValue.x; })
            .attr('y', function (d) {
            var compare = d.labelValue.y;
            if (width / 2 === d.labelValue.x && height / 2 < d.labelValue.y) {
                compare += 10;
            }
            return compare;
        })
            .text(function (d) { return (_this.labelFmt ? _this.labelFmt(d.name) : d.name); })
            .each(function (data, i, node) {
            textBreak(select(node[i]), /\^/, true);
        });
        var lineParser = line()
            .x(function (d) { return d.x; })
            .y(function (d) { return d.y; });
        var colors = defaultChartColors();
        var defs = this.svg.selectAll('defs');
        // draw the path element
        var seriesGroup = this.mainGroup
            .select(".".concat(this.selector, "-series-group"))
            .raise();
        var tempMask = defs
            .selectAll('mask')
            .data(chartData)
            .join(function (enter) {
            return enter
                .append('mask')
                .attr('id', function (_, i) {
                return _this.getSeriesInfo ? _this.getSeriesInfo(i) : getSeriesInfo(chartData, i);
            })
                .append('path')
                .datum(function (d) { return getPathCoordinates(d, _this.features, width, height, radialScale); })
                .attr('d', lineParser);
        }, function (update) {
            return update
                .attr('id', function (_, i) {
                return _this.getSeriesInfo ? _this.getSeriesInfo(i) : getSeriesInfo(chartData, i);
            })
                .select('path')
                .datum(function (d) { return getPathCoordinates(d, _this.features, width, height, radialScale); })
                .attr('d', lineParser);
        }, function (exite) { return exite.remove(); })
            .style('fill', '#fff')
            .style('fill-opacity', 0);
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
            .style('fill', 'none')
            .attr('stroke-width', 1)
            .attr('stroke-opacity', 0)
            .attr('stroke', '#fff');
        var tempSize = pathGroup.node().getBBox();
        var boxSize = Math.max(tempSize.width, tempSize.height);
        seriesGroup
            .selectAll('.spider-guide')
            .data(['spider-guide'])
            .join(function (enter) { return enter.append('image').attr('class', 'spider-guide'); }, function (update) { return update; }, function (exite) { return exite.remove(); })
            .attr('xlink:href', this.backgroundImage || spiderGuide)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .attr('width', boxSize + 2)
            .attr('height', boxSize + 2)
            .attr('x', width / 2 - boxSize / 2 - 1)
            .attr('y', height / 2 - boxSize / 2 - 1);
        seriesGroup
            .selectAll('.spider-series')
            .data(chartData)
            .join(function (enter) { return enter.append('image').attr('class', 'spider-series'); }, function (update) { return update; }, function (exite) { return exite.remove(); })
            .attr('mask', function (_, i) { return "url(#".concat(_this.getSeriesInfo ? _this.getSeriesInfo(i) : getSeriesInfo(chartData, i), ")"); })
            .attr('xlink:href', function (_, i) { return _this.seriesImage(i); })
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .attr('width', boxSize)
            .attr('height', boxSize)
            .attr('x', width / 2 - boxSize / 2)
            .attr('y', height / 2 - boxSize / 2)
            // .style('opacity', 0)
            // .transition()
            // .duration(1000)
            .style('opacity', 1);
        tempMask.style('fill-opacity', 0.7);
        // seriesGroup
        //     .append('svg:image')
        //     .attr('xlink:href', this.seriesImage ? this.seriesImage(0) : blueImage)
        //     .attr('mask', 'url(#blue_angular)')
        //     .attr('preserveAspectRatio', 'xMidYMid meet')
        //     .attr('width', boxSize)
        //     .attr('height', boxSize)
        //     .attr('x', width / 2 - boxSize / 2)
        //     .attr('y', height / 2 - boxSize / 2);
        // seriesGroup
        //     .append('svg:image')
        //     .attr('xlink:href', this.seriesImage ? this.seriesImage(1) : greenImage)
        //     .attr('mask', 'url(#green_angular)')
        //     .attr('preserveAspectRatio', 'xMidYMid meet')
        //     .attr('width', boxSize)
        //     .attr('height', boxSize)
        //     .attr('x', width / 2 - boxSize / 2)
        //     .attr('y', height / 2 - boxSize / 2);
    };
    return ImageSpiderSeries;
}(SeriesBase));
export { ImageSpiderSeries };
function getSeriesInfo(chartData, index) {
    return chartData.length > 1 ? (index === 1 ? 'green_angular' : 'blue_angular') : 'green_angular';
}
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
    return coordinates;
}
//# sourceMappingURL=index.js.map