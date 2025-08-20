"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicSvgMouseHandler = void 0;
var tslib_1 = require("tslib");
var d3_selection_1 = require("d3-selection");
var functions_base_1 = require("../chart/functions-base");
var chart_1 = require("../chart");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var BasicSvgMouseHandler = /** @class */ (function (_super) {
    tslib_1.__extends(BasicSvgMouseHandler, _super);
    function BasicSvgMouseHandler(configuration) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this) || this;
        _this.isMoveEvent = false;
        _this.delayTime = 30;
        if (configuration) {
            _this.isMoveEvent = (_a = configuration.isMoveEvent) !== null && _a !== void 0 ? _a : _this.isMoveEvent;
            _this.delayTime = (_b = configuration.delayTime) !== null && _b !== void 0 ? _b : _this.delayTime;
        }
        return _this;
    }
    BasicSvgMouseHandler.prototype.setSvgElement = function (svg, mainGroup, index) {
        this.svg = svg;
        this.mainGroup = mainGroup;
        this.pointerGroup = this.svg.select('.' + chart_1.ChartSelector.ZOOM_SVG);
    };
    BasicSvgMouseHandler.prototype.drawFunctions = function (chartData, scales, geometry) {
        var _this = this;
        this.setContainerPosition(geometry, this.chartBase);
        if (this.isMoveEvent) {
            this.subscription.add((0, rxjs_1.fromEvent)(this.pointerGroup.node(), 'mousemove')
                .pipe((0, operators_1.debounceTime)(this.delayTime))
                .subscribe(function (e) {
                var x = e.offsetX - _this.chartBase.chartMargin.left - 1;
                var y = e.offsetY - _this.chartBase.chartMargin.top - 1;
                var mouseEvent = [x, y];
                _this.chartBase.mouseEventSubject.next({
                    type: 'mousemove',
                    position: mouseEvent,
                    target: _this.pointerGroup
                });
            }));
            this.subscription.add((0, rxjs_1.fromEvent)(this.pointerGroup.node(), 'mouseleave')
                .pipe((0, operators_1.debounceTime)(this.delayTime + 10))
                .subscribe(function (e) {
                var x = e.offsetX - _this.chartBase.chartMargin.left - 1;
                var y = e.offsetY - _this.chartBase.chartMargin.top - 1;
                var mouseEvent = [x, y];
                _this.chartBase.mouseEventSubject.next({
                    type: 'mouseleave',
                    position: mouseEvent,
                    target: _this.pointerGroup
                });
            }));
        }
        this.pointerGroup
            .on('mousedown', function () {
            var mouseEvent = (0, d3_selection_1.pointer)(_this.pointerGroup.node());
            _this.chartBase.mouseEventSubject.next({
                type: 'mousedown',
                position: mouseEvent,
                target: _this.pointerGroup
            });
        })
            .on('mouseup', function () {
            // const mouseEvent = mouse(this.pointerGroup.node() as any);
            // this.chartBase.mouseEventSubject.next({
            //     type: 'mouseup',
            //     position: mouseEvent,
            //     target: this.pointerGroup
            // });
        })
            .on('click', function () {
            var mouseEvent = (0, d3_selection_1.pointer)(_this.pointerGroup.node());
            _this.chartBase.mouseEventSubject.next({
                type: 'click',
                position: mouseEvent,
                target: _this.pointerGroup
            });
        });
    };
    BasicSvgMouseHandler.prototype.destroy = function () {
        this.subscription.unsubscribe();
        this.pointerGroup.remove();
    };
    BasicSvgMouseHandler.prototype.setContainerPosition = function (geometry, chartBase) {
        this.pointerGroup
            .attr('width', geometry.width - 1)
            .attr('height', geometry.height - 1)
            .style('transform', "translate(".concat(chartBase.chartMargin.left + 1, "px, ").concat(chartBase.chartMargin.top + 1, "px)"));
    };
    return BasicSvgMouseHandler;
}(functions_base_1.FunctionsBase));
exports.BasicSvgMouseHandler = BasicSvgMouseHandler;
//# sourceMappingURL=basic-svg-mouse-handler.js.map