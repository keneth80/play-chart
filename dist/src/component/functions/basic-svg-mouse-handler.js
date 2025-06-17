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
import { FunctionsBase } from '../chart/functions-base';
import { ChartSelector } from '../chart';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
var BasicSvgMouseHandler = /** @class */ (function (_super) {
    __extends(BasicSvgMouseHandler, _super);
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
        this.pointerGroup = this.svg.select('.' + ChartSelector.ZOOM_SVG);
    };
    BasicSvgMouseHandler.prototype.drawFunctions = function (chartData, scales, geometry) {
        var _this = this;
        this.setContainerPosition(geometry, this.chartBase);
        if (this.isMoveEvent) {
            this.subscription.add(fromEvent(this.pointerGroup.node(), 'mousemove')
                .pipe(debounceTime(this.delayTime))
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
            this.subscription.add(fromEvent(this.pointerGroup.node(), 'mouseleave')
                .pipe(debounceTime(this.delayTime + 10))
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
            var mouseEvent = pointer(_this.pointerGroup.node());
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
            var mouseEvent = pointer(_this.pointerGroup.node());
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
}(FunctionsBase));
export { BasicSvgMouseHandler };
//# sourceMappingURL=basic-svg-mouse-handler.js.map