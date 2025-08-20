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
import { max, min } from 'd3-array';
import { drag } from 'd3-drag';
import { pointer } from 'd3-selection';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ChartSelector } from '../chart';
import { Direction, Placement, ScaleType } from '../chart/chart-configuration';
import { FunctionsBase } from '../chart/functions-base';
var BasicSvgMouseZoomHandler = /** @class */ (function (_super) {
    __extends(BasicSvgMouseZoomHandler, _super);
    function BasicSvgMouseZoomHandler(configuration) {
        var _this = this;
        var _a, _b, _c, _d, _e;
        _this = _super.call(this) || this;
        _this.xDirection = Placement.BOTTOM;
        _this.yDirection = Placement.LEFT;
        _this.isZoom = true;
        _this.delayTime = 30;
        _this.xMinValue = NaN;
        _this.xMaxValue = NaN;
        _this.yMinValue = NaN;
        _this.yMaxValue = NaN;
        _this.direction = Direction.BOTH;
        _this.isMoveEvent = true;
        _this.isDrag = false;
        if (configuration) {
            _this.xDirection = (_a = configuration.xDirection) !== null && _a !== void 0 ? _a : _this.xDirection;
            _this.yDirection = (_b = configuration.yDirection) !== null && _b !== void 0 ? _b : _this.yDirection;
            _this.direction = (_c = configuration.direction) !== null && _c !== void 0 ? _c : _this.direction;
            _this.isMoveEvent = (_d = configuration.isMoveEvent) !== null && _d !== void 0 ? _d : _this.isMoveEvent;
            _this.delayTime = (_e = configuration.delayTime) !== null && _e !== void 0 ? _e : _this.delayTime;
        }
        return _this;
    }
    BasicSvgMouseZoomHandler.prototype.setSvgElement = function (svg, mainGroup, index) {
        this.svg = svg;
        this.mainGroup = mainGroup;
        this.pointerGroup = this.svg.select('.' + ChartSelector.ZOOM_SVG);
        // zoom mask setup
        if (!this.svg.select('defs').select('#zoommask').node()) {
            var mask = this.svg.select('defs').append('mask').attr('id', 'zoommask').attr('x', 0).attr('y', 0);
            this.zoomBackDrop = mask.append('rect').attr('class', 'zoom-back-drop').attr('x', 0).attr('y', 0).style('fill', '#fff');
            this.zoomBox = mask.append('rect').attr('class', 'zoom-box').attr('x', 0).attr('y', 0);
        }
        else {
            var mask = this.svg.select('defs').select('#zoommask');
            this.zoomBackDrop = mask.select('.zoom-back-drop');
            this.zoomBox = mask.select('.zoom-box');
        }
        // TODO: mask로 했더니 버벅이는 현상이 나옴. 다른 방법 강구 (예로 그냥 박스 그리기로 할 것.)
    };
    BasicSvgMouseZoomHandler.prototype.drawFunctions = function (chartData, scales, geometry) {
        try {
            this.disable();
            this.enable(chartData, scales, geometry);
        }
        catch (error) {
            console.log('error : ', error);
        }
    };
    BasicSvgMouseZoomHandler.prototype.enable = function (chartData, scales, geometry) {
        var _this = this;
        if (this.isEnable) {
            return;
        }
        this.isEnable = true;
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
        var start = {
            x: 0,
            y: 0
        };
        var end = {
            x: 0,
            y: 0
        };
        if (this.isMoveEvent) {
            this.moveSubscription = fromEvent(this.pointerGroup.node(), 'mousemove')
                .pipe(debounceTime(this.delayTime))
                .subscribe(function (e) {
                if (_this.isDrag) {
                    return;
                }
                var mouseEvent = [
                    e.offsetX - _this.chartBase.chartMargin.left - 1,
                    e.offsetY - _this.chartBase.chartMargin.top - 1
                ];
                _this.chartBase.mouseEventSubject.next({
                    type: 'mousemove',
                    position: mouseEvent,
                    target: _this.pointerGroup
                });
            });
            this.subscription.add(this.moveSubscription);
        }
        this.pointerGroup
            .call(drag()
            .on('start', function () {
            var mouseEvent = pointer(_this.pointerGroup.node());
            startX = mouseEvent[0];
            startY = mouseEvent[1];
            _this.isDrag = true;
            _this.chartBase.zoomEventSubject.next({
                type: 'dragstart',
                position: mouseEvent,
                target: _this.pointerGroup
            });
        })
            .on('drag', function (event) {
            if (event.dx === 0 || event.dy === 0) {
                return;
            }
            if (!_this.tempZoomBox) {
                _this.tempZoomBox = _this.dragElementInit(_this.mainGroup, geometry);
                _this.zoomBackDrop.attr('width', geometry.width).attr('height', geometry.height);
            }
            var mouseEvent = pointer(_this.pointerGroup.node());
            var moveX = mouseEvent[0];
            var moveY = mouseEvent[1];
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
            _this.drawZoomBox(_this.zoomBox, start, end, geometry, startX > moveX && startY > moveY);
            // this.chartBase.zoomEventSubject.next({
            //     type: 'drag',
            //     position: mouseEvent,
            //     target: this.pointerGroup
            // });
        })
            .on('end', function () {
            _this.isDrag = false;
            var mouseEvent = pointer(_this.pointerGroup.node());
            endX = mouseEvent[0];
            endY = mouseEvent[1];
            _this.dragElementClear(_this.zoomBox, _this.tempZoomBox);
            _this.tempZoomBox = undefined;
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
                        target: _this.pointerGroup,
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
                            target: _this.pointerGroup
                        });
                        return;
                    }
                    _this.chartBase.zoomEventSubject.next({
                        type: 'zoomout',
                        position: [endX, endY],
                        target: _this.pointerGroup
                    });
                }
            }
        }))
            .on('mouseleave', function () {
            var mouseEvent = pointer(_this.pointerGroup.node());
            _this.isDrag = false;
            _this.chartBase.mouseEventSubject.next({
                type: 'mouseleave',
                position: mouseEvent,
                target: _this.pointerGroup
            });
        })
            .on('mousedown', function () {
            var mouseEvent = pointer(_this.pointerGroup.node());
            _this.chartBase.mouseEventSubject.next({
                type: 'mousedown',
                position: mouseEvent,
                target: _this.pointerGroup
            });
        })
            .on('mouseup', function () {
            console.log('mouseup');
            var mouseEvent = pointer(_this.pointerGroup.node());
            _this.chartBase.mouseEventSubject.next({
                type: 'mouseup',
                position: mouseEvent,
                target: _this.pointerGroup
            });
        })
            .on('click', function () {
            console.log('click');
            var mouseEvent = pointer(_this.pointerGroup.node());
            _this.chartBase.mouseEventSubject.next({
                type: 'click',
                position: mouseEvent,
                target: _this.pointerGroup
            });
        });
    };
    BasicSvgMouseZoomHandler.prototype.disable = function () {
        if (this.moveSubscription) {
            this.subscription.remove(this.moveSubscription);
        }
        if (this.isMoveEvent) {
            this.pointerGroup.on('mousemove', null);
        }
        this.pointerGroup.on('mouseleave', null).on('mousedown', null).on('mouseup', null).on('click', null);
        this.pointerGroup.call(drag().on('start', null).on('drag', null).on('end', null));
        this.isEnable = false;
    };
    BasicSvgMouseZoomHandler.prototype.destroy = function () {
        this.disable();
        this.subscription.unsubscribe();
        this.pointerGroup.remove();
    };
    BasicSvgMouseZoomHandler.prototype.dragElementInit = function (targetGroup, size) {
        return (targetGroup
            .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('height', size.width)
            .attr('width', size.width)
            .attr('mask', 'url(#zoommask)')
            // .style('fill', '#ccc')
            .attr('fill-opacity', 0.3));
        /**
         * <rect x='0' y='0' width='500' height='300' mask='url(#mask)' fill-opacity='0.7'/>
         */
    };
    BasicSvgMouseZoomHandler.prototype.dragElementClear = function (zoomBox, tempZoomBox) {
        zoomBox
            // .style('fill', '#fff')
            .attr('width', 0)
            .attr('height', 0);
        if (tempZoomBox) {
            tempZoomBox.remove();
        }
    };
    BasicSvgMouseZoomHandler.prototype.drawZoomBox = function (zoomBox, start, end, size, isRestore) {
        if (isRestore === void 0) { isRestore = false; }
        zoomBox
            .attr('x', start.x)
            .attr('y', start.y)
            .attr('width', Math.abs(end.x - start.x))
            .attr('height', Math.abs(end.y - start.y));
    };
    BasicSvgMouseZoomHandler.prototype.drawZoomBox2 = function (zoomBox, start, end, size, isRestore) {
        if (isRestore === void 0) { isRestore = false; }
        zoomBox
            .style('fill', '#000')
            .attr('x', start.x)
            .attr('y', start.y)
            .attr('width', Math.abs(end.x - start.x))
            .attr('height', Math.abs(end.y - start.y));
    };
    return BasicSvgMouseZoomHandler;
}(FunctionsBase));
export { BasicSvgMouseZoomHandler };
//# sourceMappingURL=basic-svg-mouse-zoom-handler.js.map