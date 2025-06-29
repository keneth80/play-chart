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
import { pointer, select } from 'd3-selection';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FunctionsBase } from '../chart/functions-base';
import { Direction, Placement } from '../chart/chart-configuration';
import { ChartSelector } from '../chart';
var BasicSvgMouseGuideLineHandler = /** @class */ (function (_super) {
    __extends(BasicSvgMouseGuideLineHandler, _super);
    function BasicSvgMouseGuideLineHandler(configuration) {
        var _this = this;
        var _a, _b, _c, _d;
        _this = _super.call(this) || this;
        _this.xDirection = Placement.BOTTOM;
        _this.yDirection = Placement.LEFT;
        _this.delayTime = 20;
        _this.direction = Direction.BOTH;
        if (configuration) {
            _this.xDirection = (_a = configuration.xDirection) !== null && _a !== void 0 ? _a : _this.xDirection;
            _this.yDirection = (_b = configuration.yDirection) !== null && _b !== void 0 ? _b : _this.yDirection;
            _this.direction = (_c = configuration.direction) !== null && _c !== void 0 ? _c : _this.direction;
            _this.delayTime = (_d = configuration.delayTime) !== null && _d !== void 0 ? _d : _this.delayTime;
        }
        return _this;
    }
    BasicSvgMouseGuideLineHandler.prototype.setSvgElement = function (svg, mainGroup, index) {
        this.svg = svg;
        this.mainGroup = mainGroup;
        this.pointerGroup = this.svg.select('.' + ChartSelector.ZOOM_SVG);
        if (!this.pointerGroup.select('.mouse-line').node()) {
            this.pointerGroup.append('path').attr('class', 'mouse-line').style('stroke', 'black').style('stroke-width', '1px').style('opacity', 0);
        }
    };
    BasicSvgMouseGuideLineHandler.prototype.drawFunctions = function (chartData, scales, geometry) {
        var _this = this;
        var xScale = scales.find(function (scale) { return scale.orient === _this.xDirection; });
        var yScale = scales.find(function (scale) { return scale.orient === _this.yDirection; });
        var x = xScale.scale;
        var y = yScale.scale;
        this.subscription.add(fromEvent(this.pointerGroup.node(), 'mousemove')
            .pipe(debounceTime(this.delayTime))
            .subscribe(function (e) {
            var mouseEvent = [
                e.offsetX - _this.chartBase.chartMargin.left - 1,
                e.offsetY - _this.chartBase.chartMargin.top - 1
            ];
            _this.chartBase.mouseEventSubject.next({
                type: 'mousemove',
                position: mouseEvent,
                target: _this.pointerGroup
            });
        }));
        this.pointerGroup
            .on('mouseleave', function () {
            var mouseEvent = pointer(_this.pointerGroup.node());
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
        var targetList = this.svg
            .select('g.' + ChartSelector.SERIES_SVG)
            .selectAll('path')
            .filter(function (d, index, nodeList) {
            return select(nodeList[index]).style('fill') === 'none';
        });
        var targetGroup = this.svg
            .select('g.' + ChartSelector.SERIES_SVG)
            .selectAll('.mouse-per-line')
            .data(targetList.nodes().map(function (d, i) { return i; }))
            .join(function (enter) { return enter.append('g').attr('class', 'mouse-per-line'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .style('opacity', 0);
        targetGroup
            .append('circle')
            .attr('r', 7)
            .style('fill', 'none')
            .style('stroke-width', '2px')
            .style('stroke', function (data) { return _this.chartBase.getColorByIndex(data); });
        targetGroup.append('text').attr('transform', 'translate(10,3)');
        this.pointerGroup
            .on('mousemove', function () {
            var mouseEvent = pointer(_this.pointerGroup.node());
            _this.pointerGroup.select('.mouse-line').attr('d', function () {
                var d = 'M' + mouseEvent[0] + ',' + geometry.height;
                d += ' ' + mouseEvent[0] + ',' + 0;
                return d;
            });
            _this.svg
                .select('g.' + ChartSelector.SERIES_SVG)
                .selectAll('.mouse-per-line')
                .attr('transform', function (d, index, nodeList) {
                var currentTarget = targetList.nodes()[index];
                if (!currentTarget) {
                    return 'translate(' + -50 + ',' + -50 + ')';
                }
                var beginning = 0;
                var endIndex = currentTarget.getTotalLength();
                var target = null;
                var pos = null;
                while (true) {
                    target = Math.floor((beginning + endIndex) / 2);
                    pos = currentTarget.getPointAtLength(target);
                    if ((target === endIndex || target === beginning) && pos.x !== mouseEvent[0]) {
                        break;
                    }
                    if (pos.x > mouseEvent[0])
                        endIndex = target;
                    else if (pos.x < mouseEvent[0])
                        beginning = target;
                    else
                        break;
                }
                select(nodeList[index])
                    .select('text')
                    // .text(Math.round(y.invert(pos.y)));
                    .text(y.invert(pos.y).toFixed(1));
                return 'translate(' + mouseEvent[0] + ',' + pos.y + ')';
            });
        })
            .on('mouseover', function () {
            _this.pointerGroup.select('.mouse-line').style('opacity', 1);
            _this.svg
                .select('g.' + ChartSelector.SERIES_SVG)
                .selectAll('.mouse-per-line')
                .style('opacity', 1);
        })
            .on('mouseout', function () {
            _this.pointerGroup.select('.mouse-line').style('opacity', 0);
            _this.svg
                .select('g.' + ChartSelector.SERIES_SVG)
                .selectAll('.mouse-per-line')
                .style('opacity', 0);
        });
    };
    BasicSvgMouseGuideLineHandler.prototype.destroy = function () {
        this.svg
            .select('g.' + ChartSelector.SERIES_SVG)
            .selectAll('g.mouse-per-line')
            .remove();
        this.subscription.unsubscribe();
    };
    return BasicSvgMouseGuideLineHandler;
}(FunctionsBase));
export { BasicSvgMouseGuideLineHandler };
//# sourceMappingURL=basic-svg-mouse-guide-line-handler.js.map