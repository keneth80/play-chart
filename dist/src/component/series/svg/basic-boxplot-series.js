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
import { SeriesBase } from '../../chart/series-base';
var BasicBoxplotSeries = /** @class */ (function (_super) {
    __extends(BasicBoxplotSeries, _super);
    function BasicBoxplotSeries(configuration) {
        var _this = _super.call(this, configuration) || this;
        _this.config = configuration;
        if (configuration.maxWidth) {
            _this.maxWidth = configuration.maxWidth;
        }
        return _this;
    }
    BasicBoxplotSeries.prototype.xField = function () {
        return this.config.xField;
    };
    BasicBoxplotSeries.prototype.yField = function () {
        return null;
    };
    BasicBoxplotSeries.prototype.setSvgElement = function (svg, mainGroup) {
        this.svg = svg;
        if (!mainGroup.select(".".concat(this.selector, "-group")).node()) {
            this.mainGroup = mainGroup.append('g').attr('class', "".concat(this.selector, "-group"));
        }
    };
    BasicBoxplotSeries.prototype.drawSeries = function (chartData, scales, geometry) {
        var _this = this;
        var x = scales.find(function (scale) { return scale.orient === _this.xDirection; }).scale;
        var y = scales.find(function (scale) { return scale.orient === _this.yDirection; }).scale;
        var padding = 0;
        var barWidth = 10;
        if (x.bandwidth) {
            barWidth = x.bandwidth();
            padding = x.bandwidth() / 2;
        }
        if (this.maxWidth && this.maxWidth < barWidth) {
            barWidth = this.maxWidth;
        }
        // Draw the box plot vertical lines
        this.mainGroup
            .selectAll('.verticalLines')
            .data(chartData)
            .join(function (enter) { return enter.append('line').attr('class', 'verticalLines'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('x1', function (datum) {
            return x(datum.key) + padding;
        })
            .attr('y1', function (datum) {
            return y(datum.whiskers[0]);
        })
            .attr('x2', function (datum) {
            return x(datum.key) + padding;
        })
            .attr('y2', function (datum) {
            return y(datum.whiskers[1]);
        })
            .attr('stroke', '#000')
            .attr('stroke-width', 1)
            .attr('fill', 'none');
        // Draw the boxes of the box plot, filled and on top of vertical lines
        this.mainGroup
            .selectAll('.quartile')
            .data(chartData)
            .join(function (enter) { return enter.append('rect').attr('class', 'quartile'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('width', barWidth)
            .attr('height', function (datum) {
            var quartiles = datum.quartile;
            var height = y(quartiles[0]) - y(quartiles[2]);
            return height;
        })
            .attr('x', function (datum) {
            return x(datum.key) + padding - barWidth / 2;
        })
            .attr('y', function (datum) {
            return y(datum.quartile[2]);
        })
            .attr('fill', function (datum) {
            return datum.color;
        })
            .attr('stroke', '#000')
            .attr('stroke-width', 1);
        // Now render all the horizontal lines at once - the whiskers and the median
        var horizontalLineConfigs = [
            // Top whisker
            {
                type: 'top',
                x1: function (datum) {
                    return x(datum.key) + padding - barWidth / 2;
                },
                y1: function (datum) {
                    return y(datum.whiskers[0]);
                },
                x2: function (datum) {
                    return x(datum.key) + padding + barWidth / 2;
                },
                y2: function (datum) {
                    return y(datum.whiskers[0]);
                }
            },
            // Median line
            {
                type: 'median',
                x1: function (datum) {
                    return x(datum.key) + padding - barWidth / 2;
                },
                y1: function (datum) {
                    return y(datum.quartile[1]);
                },
                x2: function (datum) {
                    return x(datum.key) + padding + barWidth / 2;
                },
                y2: function (datum) {
                    return y(datum.quartile[1]);
                }
            },
            // Bottom whisker
            {
                type: 'bottom',
                x1: function (datum) {
                    return x(datum.key) + padding - barWidth / 2;
                },
                y1: function (datum) {
                    return y(datum.whiskers[1]);
                },
                x2: function (datum) {
                    return x(datum.key) + padding + barWidth / 2;
                },
                y2: function (datum) {
                    return y(datum.whiskers[1]);
                }
            }
        ];
        var _loop_1 = function (i) {
            var lineConfig = horizontalLineConfigs[i];
            // Draw the whiskers at the min for this series
            this_1.mainGroup
                .selectAll(".whiskers-".concat(lineConfig.type))
                .data(chartData)
                .join(function (enter) { return enter.append('line').attr('class', "whiskers-".concat(lineConfig.type)); }, function (update) { return update; }, function (exit) { return exit.remove(); })
                .attr('x1', lineConfig.x1)
                .attr('y1', lineConfig.y1)
                .attr('x2', lineConfig.x2)
                .attr('y2', lineConfig.y2)
                .attr('stroke', '#000')
                .attr('stroke-width', 1)
                .attr('fill', 'none');
        };
        var this_1 = this;
        for (var i = 0; i < horizontalLineConfigs.length; i++) {
            _loop_1(i);
        }
    };
    return BasicBoxplotSeries;
}(SeriesBase));
export { BasicBoxplotSeries };
//# sourceMappingURL=basic-boxplot-series.js.map