"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicCanvasLineSeries = exports.BasicCanvasLineSeriesModel = void 0;
var tslib_1 = require("tslib");
var d3_color_1 = require("d3-color");
var d3_selection_1 = require("d3-selection");
var d3_shape_1 = require("d3-shape");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var chart_1 = require("../../chart");
var series_base_1 = require("../../chart/series-base");
var d3_svg_util_1 = require("../../chart/util/d3-svg-util");
var BasicCanvasLineSeriesModel = /** @class */ (function () {
    function BasicCanvasLineSeriesModel(x, y, i, // save the index of the point as a property, this is useful
    color, memoryColor, selected, data) {
        Object.assign(this, {
            x: x,
            y: y,
            i: i,
            selected: selected,
            color: color,
            memoryColor: memoryColor,
            data: data
        });
    }
    return BasicCanvasLineSeriesModel;
}());
exports.BasicCanvasLineSeriesModel = BasicCanvasLineSeriesModel;
var BasicCanvasLineSeries = /** @class */ (function (_super) {
    tslib_1.__extends(BasicCanvasLineSeries, _super);
    function BasicCanvasLineSeries(configuration) {
        var _this = this;
        var _a;
        _this = _super.call(this, configuration) || this;
        _this.strokeWidth = 2;
        _this.move$ = new rxjs_1.Subject();
        _this.crossFilterDimension = undefined;
        _this.config = configuration;
        _this.dataFilter = configuration.filter;
        _this.strokeWidth = (_a = configuration.style.strokeWidth) !== null && _a !== void 0 ? _a : _this.strokeWidth;
        return _this;
    }
    BasicCanvasLineSeries.prototype.xField = function () {
        return this.config.xField;
    };
    BasicCanvasLineSeries.prototype.yField = function () {
        return this.config.yField;
    };
    BasicCanvasLineSeries.prototype.setSvgElement = function (svg, mainGroup, index) {
        this.svg = svg;
        this.svg.style('z-index', 1).style('position', 'absolute');
        if (!this.canvas) {
            this.canvas = this.chartBase.chartContainer
                .append('canvas')
                .datum({
                index: index
            })
                .attr('class', 'drawing-canvas')
                .style('z-index', index + 3)
                .style('position', 'absolute');
        }
        if (!this.memoryCanvas) {
            this.memoryCanvas = (0, d3_selection_1.select)(document.createElement('canvas'));
        }
        // pointer canvas는 단 한개만 존재한다. 이벤트를 받는 canvas 임.
        if (!this.chartBase.chartContainer.select('.' + chart_1.ChartSelector.POINTER_CANVAS).node()) {
            this.pointerCanvas = this.chartBase.chartContainer
                .append('canvas')
                .attr('class', chart_1.ChartSelector.POINTER_CANVAS)
                .style('z-index', index + 4)
                .style('position', 'absolute');
        }
        else {
            this.pointerCanvas = this.chartBase.chartContainer.select('.' + chart_1.ChartSelector.POINTER_CANVAS).style('z-index', index + 4);
        }
    };
    BasicCanvasLineSeries.prototype.drawSeries = function (chartData, scales, geometry, option) {
        var _this = this;
        var _a, _b, _c;
        var xScale = scales.find(function (scale) { return scale.orient === _this.xDirection; });
        var yScale = scales.find(function (scale) { return scale.orient === _this.yDirection; });
        var x = xScale.scale;
        var y = yScale.scale;
        var radius = this.config.dot ? (_a = this.config.dot.radius) !== null && _a !== void 0 ? _a : 4 : 0;
        var lineStroke = (_b = (this.config.style && this.config.style.strokeWidth)) !== null && _b !== void 0 ? _b : 1;
        var xmin = xScale.min;
        var xmax = xScale.max;
        var ymin = yScale.min;
        var ymax = yScale.max;
        var padding = 0;
        if (x.bandwidth) {
            padding = x.bandwidth() / 2;
        }
        var space = (radius + lineStroke) * 4;
        var lineData = !this.dataFilter ? chartData : chartData.filter(function (item) { return _this.dataFilter(item); });
        this.canvas
            .attr('width', geometry.width + space)
            .attr('height', geometry.height + space)
            .style('transform', "translate(".concat(this.chartBase.chartMargin.left - space / 4, "px, ").concat(this.chartBase.chartMargin.top - space / 4, "px)"));
        this.pointerCanvas
            .attr('width', geometry.width + space)
            .attr('height', geometry.height + space)
            .style('transform', "translate(".concat(this.chartBase.chartMargin.left - space / 4, "px, ").concat(this.chartBase.chartMargin.top - space / 4, "px)"));
        var context = this.canvas.node().getContext('2d');
        context.clearRect(0, 0, geometry.width + space, geometry.height + space);
        context.beginPath();
        this.line = (0, d3_shape_1.line)()
            .defined(function (data) { return data[_this.config.yField]; })
            .x(function (data) {
            var xposition = x(data[_this.config.xField]) + padding + space / 4;
            return xposition;
        }) // set the x values for the line generator
            .y(function (data) {
            var yposition = y(data[_this.config.yField]) + space / 4;
            return yposition;
        })
            .context(context); // set the y values for the line generator
        if (this.config.isCurve === true) {
            this.line.curve(d3_shape_1.curveMonotoneX); // apply smoothing to the line
        }
        this.color = option.color;
        var strokeStyle = (0, d3_color_1.hsl)(option.color);
        this.line(lineData);
        context.fillStyle = 'white';
        context.lineWidth = lineStroke;
        context.strokeStyle = strokeStyle;
        context.stroke();
        if (this.config.dot) {
            this.memoryCanvas.attr('width', geometry.width + space).attr('height', geometry.height + space);
            var memoryCanvasContext_1 = this.memoryCanvas.node().getContext('2d');
            memoryCanvasContext_1.clearRect(0, 0, geometry.width + space, geometry.height + space);
            var prevIndex_1 = (_c = this.pointerCanvas.data()[0]) !== null && _c !== void 0 ? _c : 0;
            var colorIndex_1 = 0;
            var colorData_1 = {};
            lineData.forEach(function (point, i) {
                var drawX = x(point[_this.config.xField]) + padding + space / 4;
                var drawY = y(point[_this.config.yField]) + space / 4;
                _this.drawPoint(drawX, drawY, radius, context);
                // mouse over click event를 위한 데이터 인덱싱.
                colorIndex_1 = prevIndex_1 + i;
                var memoryColor = _this.getColor(colorIndex_1 * 1000 + 1) + '';
                // Space out the colors a bit
                memoryCanvasContext_1.fillStyle = 'rgb(' + memoryColor + ')';
                memoryCanvasContext_1.beginPath();
                memoryCanvasContext_1.arc(drawX, drawY, radius, 0, 2 * Math.PI);
                memoryCanvasContext_1.fill();
                colorData_1[memoryColor] = new BasicCanvasLineSeriesModel(drawX, drawY, i, option.color, memoryColor, false, point);
            });
            // POINT: element 에 data 반영.
            this.canvas.data([
                {
                    colorData: colorData_1,
                    memoryCanvasContext: memoryCanvasContext_1
                }
            ]);
            // 머지한 데이터를 canvas에 저장한다.
            // this.pointerCanvas.data([colorIndex]);
            if (this.chartBase.series.length - 1 === option.index) {
                this.subscription.unsubscribe();
                this.subscription = this.move$.pipe((0, operators_1.debounceTime)(150)).subscribe(function (value) {
                    _this.drawTooltipPoint({
                        width: geometry.width + space,
                        height: geometry.height + space
                    }, radius, value);
                });
                this.pointerCanvas.on('mousemove', function () {
                    var mouseEvent = (0, d3_selection_1.pointer)(_this.pointerCanvas.node());
                    _this.move$.next(mouseEvent);
                });
                this.pointerCanvas.on('click', function () {
                    var mouseEvent = (0, d3_selection_1.pointer)(_this.pointerCanvas.node());
                    _this.onClickItem({
                        width: geometry.width + space,
                        height: geometry.height + space
                    }, radius, mouseEvent);
                });
            }
        }
    };
    BasicCanvasLineSeries.prototype.select = function (displayName, isSelected) {
        this.canvas.style('opacity', isSelected ? null : 0.4);
    };
    BasicCanvasLineSeries.prototype.hide = function (displayName, isHide) {
        this.canvas.style('opacity', !isHide ? null : 0);
    };
    BasicCanvasLineSeries.prototype.destroy = function () {
        if (this.crossFilterDimension) {
            this.crossFilterDimension.dispose();
        }
        this.crossFilterDimension = undefined;
        this.subscription.unsubscribe();
        this.canvas.remove();
        this.memoryCanvas.remove();
        this.pointerCanvas.remove();
    };
    BasicCanvasLineSeries.prototype.onClickItem = function (geometry, radius, mouseEvent) {
        var selectedItem = this.drawTooltipPoint(geometry, radius, mouseEvent);
        if (selectedItem) {
        }
    };
    BasicCanvasLineSeries.prototype.drawTooltipPoint = function (geometry, radius, mouseEvent) {
        var pointerContext = this.pointerCanvas.node().getContext('2d');
        pointerContext.fillStyle = '#fff';
        pointerContext.lineWidth = this.strokeWidth;
        pointerContext.clearRect(0, 0, geometry.width, geometry.height);
        pointerContext.beginPath();
        var filterTargetCanvas = this.chartBase.chartContainer
            .selectAll('.drawing-canvas')
            .filter(function (d, i, node) { return parseInt((0, d3_selection_1.select)(node[i]).style('opacity'), 16) === 1; });
        var nodes = filterTargetCanvas.nodes().reverse();
        var selected = null;
        for (var i = 0; i < nodes.length; i++) {
            var canvasData = (0, d3_selection_1.select)(nodes[i]).data()[0];
            var cContext = canvasData.memoryCanvasContext;
            var colorData = canvasData.colorData;
            var cData = cContext.getImageData(mouseEvent[0], mouseEvent[1], radius * 2, radius * 2).data;
            var cDataParse = cData.slice(0, 3);
            var ckey = cDataParse.toString();
            selected = colorData[ckey];
            if (selected) {
                pointerContext.strokeStyle = selected.color;
                this.drawPoint(selected.x, selected.y, radius * 2, pointerContext);
                this.tooltipGroup = this.chartBase.showTooltip();
                var textElement = this.tooltipGroup
                    .select('text')
                    .attr('dy', '0em')
                    .text(this.chartBase.tooltip.tooltipTextParser(selected.data));
                (0, d3_svg_util_1.textBreak)(textElement, '\n');
                var parseTextNode = textElement.node().getBBox();
                var textWidth = parseTextNode.width + 5;
                var textHeight = parseTextNode.height + 5;
                var padding = radius * 2;
                var xPosition = selected.x + padding + this.chartBase.chartMargin.left;
                var yPosition = selected.y + padding + this.chartBase.chartMargin.top;
                if (xPosition + textWidth > geometry.width) {
                    xPosition = xPosition - textWidth;
                }
                if (yPosition + textHeight > geometry.height) {
                    yPosition = yPosition - textHeight - radius * 2;
                }
                this.tooltipGroup
                    .attr('transform', "translate(".concat(xPosition, ", ").concat(yPosition, ")"))
                    .selectAll('rect')
                    .attr('width', textWidth)
                    .attr('height', textHeight);
                break;
            }
        }
        if (!selected) {
            this.tooltipGroup = this.chartBase.hideTooltip();
        }
        return selected;
    };
    BasicCanvasLineSeries.prototype.drawPoint = function (cx, cy, r, context) {
        // cx, cy과 해당영역에 출력이 되는지? 좌표가 마이너스면 출력 안하는 로직을 넣어야 함.
        if (cx < 0 || cy < 0) {
            return;
        }
        context.beginPath();
        context.arc(cx, cy, r, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.stroke();
    };
    BasicCanvasLineSeries.prototype.getColor = function (i) {
        return (i % 256) + ',' + (Math.floor(i / 256) % 256) + ',' + (Math.floor(i / 65536) % 256);
    };
    return BasicCanvasLineSeries;
}(series_base_1.SeriesBase));
exports.BasicCanvasLineSeries = BasicCanvasLineSeries;
//# sourceMappingURL=basic-canvas-line-series.js.map