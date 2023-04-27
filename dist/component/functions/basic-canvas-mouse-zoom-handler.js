import { __extends } from "tslib";
import { max, min } from 'd3-array';
import { drag } from 'd3-drag';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ChartSelector } from '../chart';
import { Direction, Placement, ScaleType } from '../chart/chart-configuration';
import { FunctionsBase } from '../chart/functions-base';
var BasicCanvasMouseZoomHandler = /** @class */ (function (_super) {
    __extends(BasicCanvasMouseZoomHandler, _super);
    function BasicCanvasMouseZoomHandler(configuration) {
        var _this = _super.call(this) || this;
        _this.xDirection = Placement.BOTTOM;
        _this.yDirection = Placement.LEFT;
        _this.isZoom = true;
        _this.xMinValue = NaN;
        _this.xMaxValue = NaN;
        _this.yMinValue = NaN;
        _this.yMaxValue = NaN;
        _this.direction = Direction.BOTH;
        _this.isMoveEvent = true;
        _this.delayTime = 30;
        _this.move$ = new Subject();
        if (configuration) {
            if (configuration.hasOwnProperty('xDirection')) {
                _this.xDirection = configuration.xDirection;
            }
            if (configuration.hasOwnProperty('yDirection')) {
                _this.yDirection = configuration.yDirection;
            }
            if (configuration.hasOwnProperty('direction')) {
                _this.direction = configuration.direction;
            }
            if (configuration.hasOwnProperty('isMoveEvent')) {
                _this.isMoveEvent = configuration.isMoveEvent;
            }
            if (configuration.hasOwnProperty('delayTime')) {
                _this.delayTime = configuration.delayTime;
            }
        }
        return _this;
        // this.addEvent();
    }
    BasicCanvasMouseZoomHandler.prototype.setSvgElement = function (svg, mainGroup, index) {
        this.svg = svg;
        this.mainGroup = mainGroup;
        if (!this.chartBase.chartContainer.select('.zoom-canvas').node()) {
            this.zoomCanvas = this.chartBase.chartContainer
                .append('canvas')
                .attr('class', 'zoom-canvas')
                .style('z-index', index + 10)
                .style('position', 'absolute');
        }
        else {
            this.zoomCanvas = this.chartBase.chartContainer.select('.zoom-canvas');
        }
        if (!this.chartBase.chartContainer.select('.' + ChartSelector.POINTER_CANVAS).node()) {
            this.pointerCanvas = this.chartBase.chartContainer
                .append('canvas')
                .attr('class', ChartSelector.POINTER_CANVAS)
                .style('z-index', 99)
                .style('position', 'absolute');
        }
        else {
            this.pointerCanvas = this.chartBase.chartContainer.select('.' + ChartSelector.POINTER_CANVAS);
        }
    };
    BasicCanvasMouseZoomHandler.prototype.drawFunctions = function (chartData, scales, geometry) {
        try {
            this.setContainerPosition(geometry, this.chartBase);
            this.disable();
            this.enable(chartData, scales, geometry);
        }
        catch (error) {
            console.log('error : ', error);
        }
    };
    BasicCanvasMouseZoomHandler.prototype.enable = function (chartData, scales, geometry) {
        var _this = this;
        if (this.isEnable) {
            return;
        }
        this.isEnable = true;
        this.addEvent();
        var xScale = scales.find(function (scale) { return scale.orient === _this.xDirection; });
        var yScale = scales.find(function (scale) { return scale.orient === _this.yDirection; });
        var x = xScale.scale;
        var y = yScale.scale;
        var startX = 0;
        var startY = 0;
        var endX = 0;
        var endY = 0;
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
        var zoomContext = this.zoomCanvas.node().getContext('2d');
        var start = {
            x: 0,
            y: 0
        };
        var end = {
            x: 0,
            y: 0
        };
        if (this.isMoveEvent) {
            this.pointerCanvas.on('mousemove', function (event) {
                // const mouseEvent = pointer(this.pointerCanvas.node() as any);
                var mouseEvent = [event.x, event.y];
                _this.move$.next(mouseEvent);
            });
        }
        this.pointerCanvas
            .on('click', function (event) {
            // const mouseEvent = pointer(this.pointerCanvas.node() as any);
            var mouseEvent = [event.x, event.y];
            _this.chartBase.mouseEventSubject.next({
                type: 'click',
                position: mouseEvent,
                target: _this.pointerCanvas
            });
        })
            .on('mouseleave', function (event) {
            // const mouseEvent = pointer(this.pointerCanvas.node() as any);
            var mouseEvent = [event.x, event.y];
            _this.chartBase.mouseEventSubject.next({
                type: 'mouseleave',
                position: mouseEvent,
                target: _this.pointerCanvas
            });
        })
            .on('mousedown', function (event) {
            // const mouseEvent = pointer(this.pointerCanvas.node() as any);
            var mouseEvent = [event.x, event.y];
            _this.chartBase.mouseEventSubject.next({
                type: 'mousedown',
                position: mouseEvent,
                target: _this.pointerCanvas
            });
        })
            .on('mouseup', function (event) {
            // const mouseEvent = pointer(this.pointerCanvas.node() as any);
            var mouseEvent = [event.x, event.y];
            _this.chartBase.mouseEventSubject.next({
                type: 'mouseup',
                position: mouseEvent,
                target: _this.pointerCanvas
            });
        });
        this.pointerCanvas.call(drag()
            .on('start', function (event) {
            // const mouseEvent = pointer(event);
            var mouseEvent = [event.x, event.y];
            startX = mouseEvent[0];
            startY = mouseEvent[1];
            _this.chartBase.zoomEventSubject.next({
                type: 'dragstart',
                position: mouseEvent,
                target: _this.pointerCanvas
            });
        })
            .on('drag', function (event) {
            // const mouseEvent = pointer(event);
            var mouseEvent = [event.x, event.y];
            var moveX = mouseEvent[0];
            var moveY = mouseEvent[1];
            zoomContext.clearRect(0, 0, geometry.width, geometry.height);
            if (_this.direction === Direction.HORIZONTAL) {
                start.x = min([startX, moveX]);
                start.y = 0;
                end.x = max([startX, moveX]);
                end.y = geometry.height;
            }
            else if (_this.direction === Direction.VERTICAL) {
                start.x = 0;
                start.y = min([startY, moveY]);
                end.x = geometry.width;
                end.y = max([startY, moveY]);
            }
            else {
                start.x = min([startX, moveX]);
                start.y = min([startY, moveY]);
                end.x = max([startX, moveX]);
                end.y = max([startY, moveY]);
            }
            if (start.x <= 0) {
                start.x = 1;
            }
            if (end.x > geometry.width) {
                end.x = geometry.width - 1;
            }
            if (start.y <= 0) {
                start.y = 1;
            }
            if (end.y > geometry.height) {
                end.y = geometry.height - 1;
            }
            _this.drawZoomBox(zoomContext, start, end, geometry, startX > moveX && startY > moveY);
            _this.chartBase.zoomEventSubject.next({
                type: 'drag',
                position: mouseEvent,
                target: _this.pointerCanvas
            });
        })
            .on('end', function (event) {
            // const mouseEvent = pointer(event);
            var mouseEvent = [event.x, event.y];
            endX = mouseEvent[0];
            endY = mouseEvent[1];
            zoomContext.clearRect(0, 0, geometry.width, geometry.height);
            var isZoomArea = true;
            if (_this.direction === Direction.VERTICAL) {
                isZoomArea = Math.abs(startY - endY) > 4;
            }
            else if (_this.direction === Direction.HORIZONTAL) {
                isZoomArea = Math.abs(startX - endX) > 4;
            }
            else {
                isZoomArea = Math.abs(startX - endX) > 4 && Math.abs(startY - endY) > 4;
            }
            if (_this.isZoom && isZoomArea) {
                var xStartValue = xScale.type === ScaleType.TIME ? x.invert(start.x).getTime() : x.invert(start.x);
                var yStartValue = xScale.type === ScaleType.TIME ? y.invert(start.y) : y.invert(start.y);
                var xEndValue = xScale.type === ScaleType.TIME ? x.invert(end.x).getTime() : x.invert(end.x);
                var yEndValue = xScale.type === ScaleType.TIME ? y.invert(end.y) : y.invert(end.y);
                if (startX < endX && startY < endY) {
                    _this.chartBase.zoomEventSubject.next({
                        type: 'zoomin',
                        position: [endX, endY],
                        target: _this.pointerCanvas,
                        zoom: {
                            direction: _this.direction,
                            field: {
                                x: xScale.field,
                                y: yScale.field
                            },
                            start: {
                                x: xStartValue,
                                y: yEndValue
                            },
                            end: {
                                x: xEndValue,
                                y: yStartValue
                            }
                        }
                    });
                }
                else {
                    if (_this.xMaxValue === xmax && _this.yMaxValue === ymax) {
                        _this.chartBase.zoomEventSubject.next({
                            type: 'not',
                            position: [endX, endY],
                            target: _this.pointerCanvas
                        });
                        return;
                    }
                    _this.chartBase.zoomEventSubject.next({
                        type: 'zoomout',
                        position: [endX, endY],
                        target: _this.pointerCanvas
                    });
                }
            }
        }));
    };
    BasicCanvasMouseZoomHandler.prototype.disable = function () {
        if (this.moveSubscription) {
            this.subscription.remove(this.moveSubscription);
        }
        if (this.pointerCanvas) {
            this.pointerCanvas.on('mouseleave', null).on('mousedown', null).on('mouseup', null).on('mousemove', null);
            this.pointerCanvas.call(drag().on('start', null).on('drag', null).on('end', null));
        }
        this.isEnable = false;
    };
    BasicCanvasMouseZoomHandler.prototype.destroy = function () {
        this.disable();
        this.subscription.unsubscribe();
        this.zoomCanvas.remove();
        this.pointerCanvas.remove();
    };
    BasicCanvasMouseZoomHandler.prototype.addEvent = function () {
        var _this = this;
        if (!this.moveSubscription) {
            this.moveSubscription = this.move$.pipe(debounceTime(this.delayTime)).subscribe(function (value) {
                _this.chartBase.mouseEventSubject.next({
                    type: 'mousemove',
                    position: value,
                    target: _this.pointerCanvas
                });
            });
        }
        this.subscription.add(this.moveSubscription);
    };
    BasicCanvasMouseZoomHandler.prototype.drawZoomBox = function (zoomContext, start, end, size, isRestore) {
        // zoomContext.strokeStyle = 'blue';
        // zoomContext.fillStyle = 'rgba(5,222,255,0.5)';
        // zoomContext.beginPath();
        // zoomContext.rect(start.x, start.y, Math.abs(end.x - start.x), Math.abs(end.y - start.y));
        // zoomContext.fill();
        // zoomContext.stroke();
        if (isRestore === void 0) { isRestore = false; }
        zoomContext.beginPath();
        zoomContext.fillStyle = 'rgba(179,176,191,0.5)';
        zoomContext.moveTo(0, 0);
        zoomContext.lineTo(0, size.height);
        zoomContext.lineTo(size.width, size.height);
        zoomContext.lineTo(size.width, 0);
        // zoomContext.clip();
        zoomContext.rect(start.x, start.y, Math.abs(end.x - start.x), Math.abs(end.y - start.y));
        zoomContext.fill();
        if (isRestore) {
            zoomContext.beginPath();
            zoomContext.strokeStyle = 'rgba(255,255,255)';
            zoomContext.lineWidth = 5;
            zoomContext.moveTo(start.x, start.y);
            zoomContext.lineTo(start.x + Math.abs(end.x - start.x), start.y + Math.abs(end.y - start.y));
            zoomContext.moveTo(start.x + Math.abs(end.x - start.x), start.y);
            zoomContext.lineTo(start.x, start.y + Math.abs(end.y - start.y));
            zoomContext.stroke();
        }
    };
    BasicCanvasMouseZoomHandler.prototype.setContainerPosition = function (geometry, chartBase) {
        this.zoomCanvas
            .attr('width', geometry.width - 1)
            .attr('height', geometry.height - 1)
            .style('transform', "translate(".concat(chartBase.chartMargin.left + 1, "px, ").concat(chartBase.chartMargin.top + 1, "px)"));
        this.pointerCanvas
            .attr('width', geometry.width - 1)
            .attr('height', geometry.height - 1)
            .style('transform', "translate(".concat(chartBase.chartMargin.left + 1, "px, ").concat(chartBase.chartMargin.top + 1, "px)"));
    };
    return BasicCanvasMouseZoomHandler;
}(FunctionsBase));
export { BasicCanvasMouseZoomHandler };
//# sourceMappingURL=basic-canvas-mouse-zoom-handler.js.map