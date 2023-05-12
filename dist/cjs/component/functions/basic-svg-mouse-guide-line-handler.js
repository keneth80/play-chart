"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicSvgMouseGuideLineHandler = void 0;
var tslib_1 = require("tslib");
var d3_selection_1 = require("d3-selection");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var functions_base_1 = require("../chart/functions-base");
var chart_configuration_1 = require("../chart/chart-configuration");
var chart_1 = require("../chart");
var BasicSvgMouseGuideLineHandler = /** @class */ (function (_super) {
    tslib_1.__extends(BasicSvgMouseGuideLineHandler, _super);
    function BasicSvgMouseGuideLineHandler(configuration) {
        var _this = this;
        var _a, _b, _c, _d;
        _this = _super.call(this) || this;
        _this.xDirection = chart_configuration_1.Placement.BOTTOM;
        _this.yDirection = chart_configuration_1.Placement.LEFT;
        _this.delayTime = 20;
        _this.direction = chart_configuration_1.Direction.BOTH;
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
        this.pointerGroup = this.svg.select('.' + chart_1.ChartSelector.ZOOM_SVG);
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
        this.subscription.add((0, rxjs_1.fromEvent)(this.pointerGroup.node(), 'mousemove')
            .pipe((0, operators_1.debounceTime)(this.delayTime))
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
            var mouseEvent = (0, d3_selection_1.pointer)(_this.pointerGroup.node());
            _this.chartBase.mouseEventSubject.next({
                type: 'mouseleave',
                position: mouseEvent,
                target: _this.pointerGroup
            });
        })
            .on('mousedown', function () {
            var mouseEvent = (0, d3_selection_1.pointer)(_this.pointerGroup.node());
            _this.chartBase.mouseEventSubject.next({
                type: 'mousedown',
                position: mouseEvent,
                target: _this.pointerGroup
            });
        })
            .on('mouseup', function () {
            console.log('mouseup');
            var mouseEvent = (0, d3_selection_1.pointer)(_this.pointerGroup.node());
            _this.chartBase.mouseEventSubject.next({
                type: 'mouseup',
                position: mouseEvent,
                target: _this.pointerGroup
            });
        })
            .on('click', function () {
            console.log('click');
            var mouseEvent = (0, d3_selection_1.pointer)(_this.pointerGroup.node());
            _this.chartBase.mouseEventSubject.next({
                type: 'click',
                position: mouseEvent,
                target: _this.pointerGroup
            });
        });
        var targetList = this.svg
            .select('g.' + chart_1.ChartSelector.SERIES_SVG)
            .selectAll('path')
            .filter(function (d, index, nodeList) {
            return (0, d3_selection_1.select)(nodeList[index]).style('fill') === 'none';
        });
        var targetGroup = this.svg
            .select('g.' + chart_1.ChartSelector.SERIES_SVG)
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
            var mouseEvent = (0, d3_selection_1.pointer)(_this.pointerGroup.node());
            _this.pointerGroup.select('.mouse-line').attr('d', function () {
                var d = 'M' + mouseEvent[0] + ',' + geometry.height;
                d += ' ' + mouseEvent[0] + ',' + 0;
                return d;
            });
            _this.svg
                .select('g.' + chart_1.ChartSelector.SERIES_SVG)
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
                (0, d3_selection_1.select)(nodeList[index])
                    .select('text')
                    // .text(Math.round(y.invert(pos.y)));
                    .text(y.invert(pos.y).toFixed(1));
                return 'translate(' + mouseEvent[0] + ',' + pos.y + ')';
            });
        })
            .on('mouseover', function () {
            _this.pointerGroup.select('.mouse-line').style('opacity', 1);
            _this.svg
                .select('g.' + chart_1.ChartSelector.SERIES_SVG)
                .selectAll('.mouse-per-line')
                .style('opacity', 1);
        })
            .on('mouseout', function () {
            _this.pointerGroup.select('.mouse-line').style('opacity', 0);
            _this.svg
                .select('g.' + chart_1.ChartSelector.SERIES_SVG)
                .selectAll('.mouse-per-line')
                .style('opacity', 0);
        });
    };
    BasicSvgMouseGuideLineHandler.prototype.destroy = function () {
        this.svg
            .select('g.' + chart_1.ChartSelector.SERIES_SVG)
            .selectAll('g.mouse-per-line')
            .remove();
        this.subscription.unsubscribe();
    };
    return BasicSvgMouseGuideLineHandler;
}(functions_base_1.FunctionsBase));
exports.BasicSvgMouseGuideLineHandler = BasicSvgMouseGuideLineHandler;
//# sourceMappingURL=basic-svg-mouse-guide-line-handler.js.map