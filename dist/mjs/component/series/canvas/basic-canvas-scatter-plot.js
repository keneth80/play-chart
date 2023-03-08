import { __extends } from "tslib";
import { range } from 'd3-array';
import { quadtree } from 'd3-quadtree';
import { from, of, Subscription, timer } from 'rxjs';
import { concatMap, map, mapTo, switchMap } from 'rxjs/operators';
import { SeriesBase } from '../../chart/series-base';
import { delayExcute } from '../../chart/util/d3-svg-util';
var BasicCanvasScatterPlotModel = /** @class */ (function () {
    function BasicCanvasScatterPlotModel(x, y, z, i, // save the index of the point as a property, this is useful
    selected, obj) {
        Object.assign(this, {
            x: x,
            y: y,
            z: z,
            i: i,
            selected: selected,
            obj: obj
        });
    }
    return BasicCanvasScatterPlotModel;
}());
export { BasicCanvasScatterPlotModel };
var BasicCanvasScatterPlot = /** @class */ (function (_super) {
    __extends(BasicCanvasScatterPlot, _super);
    function BasicCanvasScatterPlot(configuration) {
        var _this = _super.call(this, configuration) || this;
        _this.prevCanvas = null;
        _this.bufferCanvas = null;
        _this.isRestore = false;
        _this.isZoom = false;
        _this.xMinValue = NaN;
        _this.xMaxValue = NaN;
        _this.yMinValue = NaN;
        _this.yMaxValue = NaN;
        _this.pointerRadius = 4;
        _this.strokeWidth = 1;
        _this.strokeColor = '#fff';
        _this.originData = [];
        _this.config = configuration;
        if (_this.config.pointer) {
            _this.pointerRadius = _this.config.pointer.radius;
            if (_this.config.pointer.stroke) {
                _this.strokeWidth = _this.config.pointer.stroke.strokeWidth;
                _this.color = _this.strokeColor = _this.config.pointer.stroke.color;
            }
        }
        return _this;
    }
    BasicCanvasScatterPlot.prototype.xField = function () {
        return this.config.xField;
    };
    BasicCanvasScatterPlot.prototype.yField = function () {
        return this.config.yField;
    };
    BasicCanvasScatterPlot.prototype.setSvgElement = function (svg) {
        this.svg = svg;
        this.chartBase.chartContainer.select('svg').style('z-index', 1).style('position', 'absolute');
        if (!this.canvas) {
            this.canvas = this.chartBase.chartContainer
                .append('canvas')
                .attr('class', 'drawing-canvas')
                .style('z-index', 2)
                .style('position', 'absolute');
        }
    };
    BasicCanvasScatterPlot.prototype.drawSeries = function (chartData, scales, geometry, option) {
        var _this = this;
        this.originQuadTree = undefined;
        this.setContainerPosition(geometry, this.chartBase);
        var xScale = scales.find(function (scale) { return scale.orient === _this.xDirection; });
        var yScale = scales.find(function (scale) { return scale.orient === _this.yDirection; });
        var x = xScale.scale;
        var y = yScale.scale;
        // 최초 setup why? min max를 비교해서 full scan 시에는 filtering 하지 않게 하기 위함.
        if (!this.xMinValue) {
            this.xMaxValue = xScale.min;
        }
        if (!this.xMaxValue) {
            this.xMaxValue = xScale.max;
        }
        if (!this.yMinValue) {
            this.yMaxValue = yScale.min;
        }
        if (!this.yMaxValue) {
            this.yMaxValue = yScale.max;
        }
        var xmin = xScale.min;
        var xmax = xScale.max;
        var ymin = yScale.min;
        var ymax = yScale.max;
        // const pointerContext = (this.pointerCanvas.node() as any).getContext('2d');
        var context = this.canvas.node().getContext('2d');
        context.clearRect(0, 0, geometry.width, geometry.height);
        context.fillStyle = 'steelblue';
        context.strokeWidth = this.strokeWidth;
        context.strokeStyle = this.strokeColor;
        console.time('filterdata');
        var initialize = false;
        if (!this.originData.length) {
            initialize = true;
        }
        var generateData = [];
        if (this.isRestore) {
            generateData = this.originData;
        }
        else {
            var filterData = this.xMaxValue === xmax && this.yMaxValue === ymax
                ? chartData
                : chartData
                    // .filter((d: T) => d[this.config.xField] >= xmin && d[this.config.xField] <= xmax && d[this.config.yField] >= ymin && d[this.config.yField] <= ymax)
                    .map(function (d, i) {
                    var xposition = x(d[_this.config.xField]);
                    var yposition = y(d[_this.config.yField]);
                    if (initialize) {
                        _this.originData.push([xposition, yposition, d]);
                    }
                    return [xposition, yposition, d];
                });
            generateData = filterData;
        }
        console.timeEnd('filterdata');
        if (this.isRestore && this.bufferCanvas) {
            console.time('restoreputimage');
            context.drawImage(this.bufferCanvas, 0, 0);
            // context.putImageData(this.prevCanvas, 0, 0);
            // this.isRestore = false;
            console.timeEnd('restoreputimage');
        }
        else {
            // 갯수를 끊어 그리기
            var totalCount_1 = generateData.length;
            if (!this.isZoom && totalCount_1 >= 100000) {
                var svgWidth_1 = +this.svg.style('width').replace('px', '');
                var svgHeight_1 = +this.svg.style('height').replace('px', '');
                var progressSvg_1 = this.chartBase.chartContainer
                    .append('svg')
                    .style('z-index', 4)
                    .style('position', 'absolute')
                    .style('background-color', 'none')
                    .style('width', this.svg.style('width'))
                    .style('height', this.svg.style('height'))
                    .lower();
                var shareCount_1 = Math.ceil(totalCount_1 / 20000);
                var arrayAsObservable = of(null).pipe(switchMap(function () { return _this.getObjectWithArrayInPromise(range(shareCount_1)); }), map(function (val) {
                    return val.data;
                }), switchMap(function (val) { return from(val); }));
                var eachElementAsObservable = arrayAsObservable.pipe(concatMap(function (value) { return timer(400).pipe(mapTo(value)); }), // Not working : we want to wait 500ms for each value
                map(function (val) {
                    return val;
                }));
                eachElementAsObservable.subscribe(function (val) {
                    var currentIndex = +val;
                    var start = Math.round(currentIndex * (totalCount_1 / shareCount_1));
                    var end = (currentIndex + 1) * (totalCount_1 / shareCount_1) > totalCount_1
                        ? totalCount_1
                        : Math.round((currentIndex + 1) * (totalCount_1 / shareCount_1));
                    console.time('pointdraw');
                    for (var j = start; j < end; j++) {
                        // this.drawPoint(chartData[j], this.pointerRadius, x, y, context);
                        _this.drawCircle(generateData[j], _this.pointerRadius, context);
                    }
                    console.timeEnd('pointdraw');
                    _this.drawProgress(totalCount_1, (currentIndex + 1) * (totalCount_1 / shareCount_1), {
                        width: svgWidth_1,
                        height: svgHeight_1,
                        target: progressSvg_1
                    });
                }, function (error) {
                    console.log('scatter plot Error', error);
                }, function () {
                    if (!_this.bufferCanvas) {
                        _this.bufferCanvas = document.createElement('canvas');
                        _this.bufferCanvas.width = _this.canvas.node().width;
                        _this.bufferCanvas.height = _this.canvas.node().height;
                        _this.bufferCanvas.setAttribute('style', 'opacity: 0.5;');
                        _this.bufferCanvas.getContext('2d').drawImage(_this.canvas.node(), 0, 0);
                    }
                    context.closePath();
                    progressSvg_1.remove();
                });
            }
            else {
                this.isZoom = false;
                for (var i = 0; i < generateData.length; i++) {
                    this.drawCircle(generateData[i], this.pointerRadius, context);
                }
                if (!this.bufferCanvas) {
                    this.bufferCanvas = document.createElement('canvas');
                    this.bufferCanvas.width = this.canvas.node().width;
                    this.bufferCanvas.height = this.canvas.node().height;
                    this.bufferCanvas.getContext('2d').drawImage(this.canvas.node(), 0, 0);
                }
            }
        }
        if (!this.originQuadTree) {
            delayExcute(50, function () {
                _this.originQuadTree = quadtree()
                    .extent([
                    [-1, -1],
                    [geometry.width + 1, geometry.height + 1]
                ])
                    .addAll(generateData);
            });
        }
        this.subscription.unsubscribe();
        this.subscription = new Subscription();
        delayExcute(100, function () {
            _this.addMouseEvent(x, y);
        });
    };
    BasicCanvasScatterPlot.prototype.destroy = function () {
        this.subscription.unsubscribe();
        this.canvas.remove();
    };
    BasicCanvasScatterPlot.prototype.addMouseEvent = function (x, y) {
        var _this = this;
        var startX = 0;
        var startY = 0;
        var endX = 0;
        var endY = 0;
        this.subscription.add(this.chartBase.mouseEvent$.subscribe(function (event) {
            if (event.type === 'mousemove') {
            }
            else if (event.type === 'mouseup') {
                endX = event.position[0];
                endY = event.position[1];
                var selected = _this.search(_this.originQuadTree, endX - _this.pointerRadius, endY - _this.pointerRadius, endX + _this.pointerRadius, endY + _this.pointerRadius);
                if (selected.length) {
                    var selectedItem = selected[0];
                    var selectX = selectedItem[0];
                    var selectY = selectedItem[1];
                    // const selectX = Math.round(selected[selected.length - 1][0]);
                    // const selectY = Math.round(selected[selected.length - 1][1]);
                    if (selectedItem) {
                        var pointerContext = event.target.node().getContext('2d');
                        pointerContext.fillStyle = 'red';
                        pointerContext.strokeStyle = 'white';
                        _this.drawCircle([selectX, selectY], _this.pointerRadius, pointerContext);
                    }
                }
            }
            else if (event.type === 'mousedown') {
                startX = event.position[0];
                startY = event.position[1];
            }
            else if (event.type === 'zoomin') {
                _this.isRestore = false;
                endX = event.position[0];
                endY = event.position[1];
                // TODO: zoom 스케일이 깊어질 수록 정확도가 떨어짐.
                var xStartValue = x.invert(startX);
                var yStartValue = y.invert(startY);
                var xEndValue = x.invert(endX);
                var yEndValue = y.invert(endY);
                // this.chartBase.updateAxisForZoom([
                //     {
                //         field: this.xField,
                //         min: xStartValue,
                //         max: xEndValue
                //     },
                //     {
                //         field: this.yField,
                //         min: yEndValue,
                //         max: yStartValue
                //     }
                // ]);
            }
            else if (event.type === 'zoomout') {
                _this.isRestore = true;
                // delayExcute(50, () => {
                //     this.chartBase.updateAxisForZoom([]);
                // });
            }
            else {
            }
        }));
    };
    BasicCanvasScatterPlot.prototype.setContainerPosition = function (geometry, chartBase) {
        this.canvas
            .attr('width', geometry.width - 1)
            .attr('height', geometry.height - 1)
            .style('transform', "translate(".concat(chartBase.chartMargin.left + 1, "px, ").concat(chartBase.chartMargin.top + 1, "px)"));
    };
    BasicCanvasScatterPlot.prototype.getObjectWithArrayInPromise = function (list) {
        var data = list.map(function (item, index) { return index; });
        return new Promise(function (resolve) {
            setTimeout(function () {
                return resolve({
                    data: data
                });
            }, 20);
        });
    };
    BasicCanvasScatterPlot.prototype.drawZoomBox = function (pointerContext, startX, startY, endX, endY) {
        pointerContext.strokeStyle = 'blue';
        pointerContext.fillStyle = 'rgba(5,222,255,0.5)';
        pointerContext.beginPath();
        pointerContext.rect(startX, startY, Math.abs(endX - startX), Math.abs(endY - startY));
        pointerContext.fill();
        pointerContext.stroke();
    };
    BasicCanvasScatterPlot.prototype.drawCircle = function (point, r, context) {
        if (point[0] < 0 || point[1] < 0) {
            return;
        }
        context.beginPath();
        context.arc(point[0], point[1], r, 0, 2 * Math.PI);
        context.fill();
        // context.stroke();
    };
    return BasicCanvasScatterPlot;
}(SeriesBase));
export { BasicCanvasScatterPlot };
//# sourceMappingURL=basic-canvas-scatter-plot.js.map