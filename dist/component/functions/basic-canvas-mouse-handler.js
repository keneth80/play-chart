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
import { pointer } from 'd3-selection';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FunctionsBase } from '../chart/functions-base';
import { ChartSelector } from '../chart';
var BasicCanvasMouseHandler = /** @class */ (function (_super) {
    __extends(BasicCanvasMouseHandler, _super);
    function BasicCanvasMouseHandler(configuration) {
        var _this = _super.call(this) || this;
        _this.isMoveEvent = false;
        _this.move$ = new Subject();
        _this.delayTime = 30;
        if (configuration) {
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
    BasicCanvasMouseHandler.prototype.setSvgElement = function (svg, mainGroup, index) {
        this.svg = svg;
        this.mainGroup = mainGroup;
        if (!this.chartBase.chartContainer.select('.' + ChartSelector.POINTER_CANVAS).node()) {
            this.pointerCanvas = this.chartBase.chartContainer
                .append('canvas')
                .attr('class', ChartSelector.POINTER_CANVAS)
                .style('z-index', index + 20)
                .style('position', 'absolute');
        }
        else {
            this.pointerCanvas = this.chartBase.chartContainer.select('.' + ChartSelector.POINTER_CANVAS);
        }
    };
    BasicCanvasMouseHandler.prototype.drawFunctions = function (chartData, scales, geometry) {
        this.setContainerPosition(geometry, this.chartBase);
        this.disable();
        this.enable(chartData, scales, geometry);
    };
    BasicCanvasMouseHandler.prototype.enable = function (chartData, scales, geometry) {
        var _this = this;
        if (this.isEnable) {
            return;
        }
        this.isEnable = true;
        this.addEvent();
        if (this.isMoveEvent) {
            this.pointerCanvas.on('mousemove', function () {
                var mouseEvent = pointer(_this.pointerCanvas.node());
                _this.move$.next(mouseEvent);
            });
        }
        this.pointerCanvas
            .on('mouseleave', function () {
            var mouseEvent = pointer(_this.pointerCanvas.node());
            _this.chartBase.mouseEventSubject.next({
                type: 'mouseleave',
                position: mouseEvent,
                target: _this.pointerCanvas
            });
        })
            .on('mousedown', function () {
            var mouseEvent = pointer(_this.pointerCanvas.node());
            _this.chartBase.mouseEventSubject.next({
                type: 'mousedown',
                position: mouseEvent,
                target: _this.pointerCanvas
            });
        })
            .on('mouseup', function () {
            var mouseEvent = pointer(_this.pointerCanvas.node());
            _this.chartBase.mouseEventSubject.next({
                type: 'mouseup',
                position: mouseEvent,
                target: _this.pointerCanvas
            });
        });
    };
    BasicCanvasMouseHandler.prototype.disable = function () {
        if (this.moveSubscription) {
            this.subscription.remove(this.moveSubscription);
        }
        if (this.isMoveEvent) {
            this.pointerCanvas.on('mousemove', null);
        }
        this.pointerCanvas.on('mouseleave', null).on('mousedown', null).on('mouseup', null);
        this.isEnable = false;
    };
    BasicCanvasMouseHandler.prototype.destroy = function () {
        this.disable();
        this.subscription.unsubscribe();
        this.pointerCanvas.remove();
    };
    BasicCanvasMouseHandler.prototype.addEvent = function () {
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
    BasicCanvasMouseHandler.prototype.setContainerPosition = function (geometry, chartBase) {
        this.pointerCanvas
            .attr('width', geometry.width - 1)
            .attr('height', geometry.height - 1)
            .style('transform', "translate(".concat(chartBase.chartMargin.left + 1, "px, ").concat(chartBase.chartMargin.top + 1, "px)"));
    };
    return BasicCanvasMouseHandler;
}(FunctionsBase));
export { BasicCanvasMouseHandler };
//# sourceMappingURL=basic-canvas-mouse-handler.js.map