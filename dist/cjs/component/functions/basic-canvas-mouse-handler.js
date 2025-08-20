"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicCanvasMouseHandler = void 0;
var tslib_1 = require("tslib");
var d3_selection_1 = require("d3-selection");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var functions_base_1 = require("../chart/functions-base");
var chart_1 = require("../chart");
var BasicCanvasMouseHandler = /** @class */ (function (_super) {
    tslib_1.__extends(BasicCanvasMouseHandler, _super);
    function BasicCanvasMouseHandler(configuration) {
        var _this = _super.call(this) || this;
        _this.isMoveEvent = false;
        _this.move$ = new rxjs_1.Subject();
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
        if (!this.chartBase.chartContainer.select('.' + chart_1.ChartSelector.POINTER_CANVAS).node()) {
            this.pointerCanvas = this.chartBase.chartContainer
                .append('canvas')
                .attr('class', chart_1.ChartSelector.POINTER_CANVAS)
                .style('z-index', index + 20)
                .style('position', 'absolute');
        }
        else {
            this.pointerCanvas = this.chartBase.chartContainer.select('.' + chart_1.ChartSelector.POINTER_CANVAS);
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
                var mouseEvent = (0, d3_selection_1.pointer)(_this.pointerCanvas.node());
                _this.move$.next(mouseEvent);
            });
        }
        this.pointerCanvas
            .on('mouseleave', function () {
            var mouseEvent = (0, d3_selection_1.pointer)(_this.pointerCanvas.node());
            _this.chartBase.mouseEventSubject.next({
                type: 'mouseleave',
                position: mouseEvent,
                target: _this.pointerCanvas
            });
        })
            .on('mousedown', function () {
            var mouseEvent = (0, d3_selection_1.pointer)(_this.pointerCanvas.node());
            _this.chartBase.mouseEventSubject.next({
                type: 'mousedown',
                position: mouseEvent,
                target: _this.pointerCanvas
            });
        })
            .on('mouseup', function () {
            var mouseEvent = (0, d3_selection_1.pointer)(_this.pointerCanvas.node());
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
            this.moveSubscription = this.move$.pipe((0, operators_1.debounceTime)(this.delayTime)).subscribe(function (value) {
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
}(functions_base_1.FunctionsBase));
exports.BasicCanvasMouseHandler = BasicCanvasMouseHandler;
//# sourceMappingURL=basic-canvas-mouse-handler.js.map