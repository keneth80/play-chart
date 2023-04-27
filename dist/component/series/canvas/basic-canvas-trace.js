import { __extends } from "tslib";
import { rgb } from 'd3-color';
import { quadtree } from 'd3-quadtree';
import { select } from 'd3-selection';
import { curveMonotoneX, line } from 'd3-shape';
import { ChartSelector } from '../../chart';
import { DisplayType } from '../../chart/chart.interface';
import { SeriesBase } from '../../chart/series-base';
import { colorDarker, delayExcute } from '../../chart/util/d3-svg-util';
import { setChartTooltipByPosition } from '../../chart/util/tooltip-util';
var BasicCanvasTraceModel = /** @class */ (function () {
    function BasicCanvasTraceModel(x, y, i, // save the index of the point as a property, this is useful
    data) {
        Object.assign(this, {
            x: x,
            y: y,
            i: i,
            data: data
        });
    }
    return BasicCanvasTraceModel;
}());
export { BasicCanvasTraceModel };
var BasicCanvasTrace = /** @class */ (function (_super) {
    __extends(BasicCanvasTrace, _super);
    function BasicCanvasTrace(configuration) {
        var _this = _super.call(this, configuration) || this;
        _this.radius = 2;
        _this.dotFill = '';
        _this.strokeColor = '';
        _this.strokeWidth = 1;
        _this.config = configuration;
        _this.color = _this.checkSeriesColor();
        return _this;
    }
    BasicCanvasTrace.prototype.xField = function () {
        return this.config.xField;
    };
    BasicCanvasTrace.prototype.yField = function () {
        return this.config.yField;
    };
    BasicCanvasTrace.prototype.setSvgElement = function (svg, mainGroup, index) {
        this.svg = svg;
        if (!this.tooltipGroup) {
            this.tooltipGroup = this.setTooltipCanvas(this.svg);
            this.tooltipGroup.style('z-index', index + 2);
        }
        else {
            this.tooltipGroup.style('z-index', index + 2);
        }
        this.svg.style('z-index', 0).style('position', 'absolute');
        if (!this.canvas) {
            this.canvas = this.chartBase.chartContainer
                .append('canvas')
                .datum({
                index: index
            })
                .attr('class', ChartSelector.DRAWING_CANVAS)
                .style('opacity', 1)
                .style('z-index', index + 1)
                .style('position', 'absolute');
        }
        if (!this.chartBase.chartContainer.select('.' + ChartSelector.SELECTION_CANVAS).node()) {
            this.chartBase.chartContainer
                .append('canvas')
                .attr('class', ChartSelector.SELECTION_CANVAS)
                .style('z-index', index + 2)
                .style('position', 'absolute');
        }
        else {
            this.chartBase.chartContainer.select('.' + ChartSelector.SELECTION_CANVAS).style('z-index', index + 3);
        }
    };
    BasicCanvasTrace.prototype.drawSeries = function (chartBaseData, scales, geometry, option) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        this.geometry = geometry;
        this.strokeColor = (_a = this.checkSeriesColor()) !== null && _a !== void 0 ? _a : option.color;
        this.dotFill = (_d = (_c = (_b = this.config) === null || _b === void 0 ? void 0 : _b.dot) === null || _c === void 0 ? void 0 : _c.fill) !== null && _d !== void 0 ? _d : option.color;
        var chartData = this.config.data ? this.config.data : chartBaseData;
        var xScale = scales.find(function (scale) { return scale.orient === _this.xDirection; });
        var yScale = scales.find(function (scale) { return scale.orient === _this.yDirection; });
        var x = xScale.scale;
        var y = yScale.scale;
        this.radius = this.config.dot ? (_e = this.config.dot.radius) !== null && _e !== void 0 ? _e : this.radius : this.radius;
        var xmin = xScale.min;
        var xmax = xScale.max;
        var ymin = yScale.min;
        var ymax = yScale.max;
        var generateData;
        var lineData = !this.config.filter ? chartData : chartData.filter(function (item) { return _this.config.filter(item); });
        // .filter((d: T) => d[this.config.xField] >= (xmin - xmin * 0.02) && d[this.config.xField] <= (xmax + xmax * 0.02) && d[this.config.yField] >= ymin && d[this.config.yField] <= ymax);
        var padding = 0;
        if (x.bandwidth) {
            padding = x.bandwidth() / 2;
        }
        if (option.displayType === DisplayType.RESIZE) {
            this.restoreCanvas = undefined;
        }
        this.canvas
            .attr('width', geometry.width)
            .attr('height', geometry.height)
            .style('transform', "translate(".concat(this.chartBase.chartMargin.left + 1, "px, ").concat(this.chartBase.chartMargin.top, "px)"));
        this.chartBase.chartContainer
            .select('.' + ChartSelector.SELECTION_CANVAS)
            .attr('width', geometry.width)
            .attr('height', geometry.height)
            .style('transform', "translate(".concat(this.chartBase.chartMargin.left + 1, "px, ").concat(this.chartBase.chartMargin.top, "px)"));
        var context = this.canvas.node().getContext('2d');
        context.fillStyle = this.dotFill;
        context.clearRect(0, 0, geometry.width, geometry.height);
        context.beginPath();
        // context.strokeStyle = this.strokeColor;
        var rgbColor = rgb(this.strokeColor);
        context.strokeStyle = "rgba(".concat(rgbColor.r, ", ").concat(rgbColor.g, ", ").concat(rgbColor.b, ", ").concat((_h = (_g = (_f = this.config) === null || _f === void 0 ? void 0 : _f.line) === null || _g === void 0 ? void 0 : _g.strokeOpacity) !== null && _h !== void 0 ? _h : 1, ")");
        // context.lineWidth = 0.5;               // sub-pixels all points
        context.setTransform(1, 0, 0, 1, 0.5, 0.5); // not so useful for the curve itself
        if (this.config.line) {
            this.strokeWidth = (_j = this.config.line.strokeWidth) !== null && _j !== void 0 ? _j : 1;
            context.lineWidth = this.strokeWidth;
            // context.lineWidth = 0.5;
            if (this.config.line.dashArray && this.config.line.dashArray > 0) {
                context.setLineDash([this.config.line.dashArray, this.config.line.dashArray]);
            }
            if (this.config.line.isCurve === true) {
                this.line.curve(curveMonotoneX); // apply smoothing to the line
            }
        }
        // ctx.fillStyle = "rgba(0, 0, 0, 0)";
        // ctx.fillRect(left, top, width, height);
        if (option.displayType === DisplayType.ZOOMOUT && this.restoreCanvas) {
            generateData = lineData.map(function (d, i) {
                var _a;
                var xposition = x(d[_this.config.xField]) + padding;
                var yposition = y(d[_this.config.yField]);
                var obj = {
                    data: d,
                    width: _this.radius,
                    height: _this.radius,
                    strokeColor: _this.strokeColor,
                    field: _this.config.yField,
                    displayName: (_a = _this.selector) !== null && _a !== void 0 ? _a : _this.displayName
                };
                return [xposition, yposition, obj];
            });
            context.drawImage(this.restoreCanvas.node(), 0, 0);
        }
        else {
            generateData = lineData.map(function (d, i) {
                var _a;
                var xposition = x(d[_this.config.xField]) + padding;
                var yposition = y(d[_this.config.yField]);
                var obj = {
                    data: d,
                    width: _this.radius,
                    height: _this.radius,
                    strokeColor: _this.strokeColor,
                    field: _this.config.yField,
                    displayName: (_a = _this.selector) !== null && _a !== void 0 ? _a : _this.displayName
                };
                // POINT: data 만들면서 포인트 찍는다.
                if (_this.config.dot) {
                    context.fillRect(xposition - _this.radius, yposition - _this.radius, _this.radius * 2, _this.radius * 2);
                    // context.arc(xposition, yposition, this.config.dot.radius, 0, 2 * Math.PI, false);
                }
                return [xposition, yposition, obj];
            });
            this.line = line()
                .x(function (data) {
                return data[0];
            }) // set the x values for the line generator
                .y(function (data) {
                return data[1];
            })
                .context(context); // set the y values for the line generator
            if (this.config.line) {
                // 사이즈가 변경이 되면서 zoom out 경우에는 초기 사이즈를 업데이트 해준다.
                this.line(generateData);
                // context.fill();
                context.stroke();
            }
        }
        if (option.displayType === DisplayType.NORMAL || (option.displayType === DisplayType.ZOOMOUT && !this.restoreCanvas)) {
            this.restoreCanvas = select(document.createElement('CANVAS'));
            this.restoreCanvas.attr('width', geometry.width).attr('height', geometry.height);
            this.restoreCanvas.node().getContext('2d').drawImage(this.canvas.node(), 0, 0);
        }
        if (this.originQuadTree) {
            this.originQuadTree = undefined;
        }
        var makeQuadtree = function () {
            _this.originQuadTree = quadtree()
                .extent([
                [0, 0],
                [geometry.width, geometry.height]
            ])
                .addAll(generateData);
        };
        if (generateData.length >= 500000) {
            delayExcute(200, makeQuadtree);
        }
        else {
            makeQuadtree();
        }
    };
    BasicCanvasTrace.prototype.drawPointer = function (value, selected) {
        // const index = Math.floor(selected.length / 2);
        var index = selected.length - 1;
        var selectedItem = selected[index];
        this.drawTooltipPoint(this.geometry, selectedItem, {
            radius: this.radius / 2 + 1,
            strokeColor: this.strokeColor,
            strokeWidth: this.strokeWidth
        });
        return index;
    };
    BasicCanvasTrace.prototype.select = function (displayName, isSelected) {
        this.canvas.style('opacity', isSelected ? null : 0.4);
    };
    BasicCanvasTrace.prototype.hide = function (displayName, isHide) {
        this.canvas.style('opacity', !isHide ? null : 0);
    };
    BasicCanvasTrace.prototype.destroy = function () {
        this.subscription.unsubscribe();
        this.canvas.remove();
        this.chartBase.chartContainer.select('.' + ChartSelector.TOOLTIP_CANVAS).remove();
        this.chartBase.chartContainer.select('.' + ChartSelector.SELECTION_CANVAS).remove();
    };
    BasicCanvasTrace.prototype.getSeriesDataByPosition = function (value) {
        var rectSize = this.radius * 2;
        return this.canvas.style('opacity') !== '0'
            ? this.search(this.originQuadTree, value[0] - rectSize, value[1] - rectSize, value[0] + rectSize, value[1] + rectSize)
            : [];
    };
    BasicCanvasTrace.prototype.showPointAndTooltip = function (value, selected) {
        var index = selected.length - 1;
        var selectedItem = selected[index];
        this.drawTooltipPoint(this.geometry, selectedItem, {
            radius: this.radius / 2 + 1,
            strokeColor: this.strokeColor,
            strokeWidth: this.strokeWidth
        });
        if (!this.chartBase.isTooltipDisplay) {
            this.tooltipGroup = this.chartBase.showTooltip();
            setChartTooltipByPosition(this.tooltipGroup, this.chartBase.tooltip && this.chartBase.tooltip.tooltipTextParser
                ? this.chartBase.tooltip.tooltipTextParser(selectedItem)
                : "".concat(this.config.xField, ": ").concat(selectedItem[2].data[this.config.xField], " \n ").concat(this.config.yField, ": ").concat(selectedItem[2].data[this.config.yField]), this.geometry, [selectedItem[0], selectedItem[1]], {
                width: this.radius,
                height: this.radius
            }, {
                left: this.chartBase.chartMargin.left,
                top: this.chartBase.chartMargin.top
            });
        }
        return index;
    };
    BasicCanvasTrace.prototype.onSelectItem = function (value, selected) {
        var selectedItem = selected[0];
        this.drawSelectionPoint([selectedItem[0], selectedItem[1]], this.geometry, {
            fill: this.strokeColor,
            radius: this.radius * 2
        });
    };
    BasicCanvasTrace.prototype.checkSeriesColor = function () {
        return this.config.line && this.config.line.strokeColor ? this.config.line.strokeColor : undefined;
    };
    BasicCanvasTrace.prototype.drawTooltipPoint = function (geometry, position, style) {
        var selectionCanvas = this.chartBase.chartContainer.select('.' + ChartSelector.POINTER_CANVAS);
        var context = selectionCanvas.node().getContext('2d');
        context.clearRect(0, 0, geometry.width, geometry.height);
        context.fillStyle = style.strokeColor;
        context.lineWidth = style.strokeWidth;
        context.strokeStyle = '#000000';
        // this.drawPoint(context, {cx: selectedItem[0], cy:selectedItem[1], r: style.radius});
        // cx, cy과 해당영역에 출력이 되는지? 좌표가 마이너스면 출력 안하는 로직을 넣어야 함.
        var cx = position[0];
        var cy = position[1];
        if (cx < 0 || cy < 0) {
            return;
        }
        context.beginPath();
        context.fillRect(cx - style.radius * 2, cy - style.radius * 2, style.radius * 4, style.radius * 4);
        // context.strokeRect(cx - style.radius, cy - style.radius, style.radius * 2, style.radius * 2);
        // context.arc(cx, cy, style.radius, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.stroke();
    };
    BasicCanvasTrace.prototype.drawSelectionPoint = function (position, geometry, style) {
        var selectionCanvas = this.chartBase.chartContainer.select('.' + ChartSelector.SELECTION_CANVAS);
        var context = selectionCanvas.node().getContext('2d');
        context.clearRect(0, 0, geometry.width, geometry.height);
        context.fillStyle = colorDarker(style.fill, 2);
        context.lineWidth = 2;
        context.strokeStyle = colorDarker(style.fill, 1);
        // this.drawPoint(context, {cx: selectedItem[0], cy:selectedItem[1], r: style.radius});
        // cx, cy과 해당영역에 출력이 되는지? 좌표가 마이너스면 출력 안하는 로직을 넣어야 함.
        var cx = position[0];
        var cy = position[1];
        if (cx < 0 || cy < 0) {
            return;
        }
        context.beginPath();
        context.fillRect(cx - style.radius, cy - style.radius, style.radius * 2, style.radius * 2);
        context.closePath();
        context.fill();
        context.stroke();
    };
    return BasicCanvasTrace;
}(SeriesBase));
export { BasicCanvasTrace };
//# sourceMappingURL=basic-canvas-trace.js.map