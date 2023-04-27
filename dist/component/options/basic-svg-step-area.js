import { __extends } from "tslib";
import { ChartSelector } from '../chart';
import { Placement } from '../chart/chart-configuration';
import { OptionsBase } from '../chart/options-base';
import { getTextHeight } from '../chart/util';
var BasicStepArea = /** @class */ (function (_super) {
    __extends(BasicStepArea, _super);
    function BasicStepArea(configuration) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this) || this;
        _this.selector = (_a = configuration.selector) !== null && _a !== void 0 ? _a : 'step-area';
        _this.startField = configuration.startField;
        _this.endField = configuration.endField;
        _this.labelField = configuration.labelField;
        _this.stepData = (_b = configuration.data) !== null && _b !== void 0 ? _b : [];
        return _this;
    }
    BasicStepArea.prototype.setSvgElement = function (svg) {
        this.svg = svg;
        if (!this.svg.select('.' + this.selector + '-group').node()) {
            this.mainGroup = this.svg.append('g').attr('class', this.selector + '-group');
        }
    };
    BasicStepArea.prototype.drawOptions = function (chartData, scales, geometry) {
        var _this = this;
        if (!this.stepData || !this.stepData.length) {
            return;
        }
        var xScale = scales.find(function (scale) { return scale.orient === Placement.BOTTOM; });
        var x = xScale.scale;
        var textHeight = getTextHeight(12, 'Arial, Helvetica, sans-serif');
        // series-group의 영역은 clip-path가 적용 되어 있으나 현재 그룹에서는 적용이 안되어 있으므로 series-group의 clip-path를 가져와 적용함.
        this.mainGroup
            .attr('transform', "translate(".concat(this.chartBase.chartMargin.left, ", ").concat(this.chartBase.chartMargin.top - (textHeight + 3), ")"))
            .attr('clip-path', this.svg.select(".".concat(ChartSelector.SERIES_SVG)).attr('clip-path'));
        var elementGroup = this.mainGroup
            .selectAll('.' + this.selector + '-item')
            .data(this.stepData)
            .join(function (enter) { return enter.append('g').attr('class', _this.selector + '-item'); }, function (update) { return update; }, function (exit) { return exit.remove; })
            .attr('transform', function (data) {
            return "translate(".concat(x(data[_this.startField]), ", 1)");
        });
        elementGroup
            .selectAll('.' + this.selector + '-label')
            .data(function (data) { return [data]; })
            .join(function (enter) { return enter.append('text').attr('class', _this.selector + '-label'); }, function (update) { return update; }, function (exit) { return exit.remove; })
            .style('font-size', '12px')
            .style('font-family', 'Arial, Helvetica, sans-serif')
            .attr('dy', '0.71em')
            .attr('x', 2)
            // .attr('y', this.chartBase.chartMargin.top / 2)
            .text(function (data) { return data[_this.labelField]; });
        elementGroup
            .selectAll('.' + this.selector + '-box')
            .data(function (data) { return [data]; })
            .join(function (enter) { return enter.append('rect').attr('class', _this.selector + '-box'); }, function (update) { return update; }, function (exit) { return exit.remove; })
            // .style('stroke', '#000')
            // .style('fill', '#fff')
            .style('fill-opacity', 0)
            .attr('width', function (data) {
            return x(data[_this.endField]) - x(data[_this.startField]);
        })
            .attr('height', textHeight);
        elementGroup
            .on('mouseover', function (data) {
            // console.log('mouseover : ', data);
        })
            .on('mouseout', function (data) {
            // console.log('mouseout : ', data);
        });
    };
    BasicStepArea.prototype.select = function (displayName, isSelected) {
        this.mainGroup.selectAll('.' + this.selector).style('opacity', isSelected ? null : 0.4);
    };
    BasicStepArea.prototype.hide = function (displayName, isHide) {
        this.mainGroup.selectAll('.' + this.selector).style('opacity', !isHide ? null : 0);
        this.mainGroup.lower();
    };
    BasicStepArea.prototype.destroy = function () {
        this.subscription.unsubscribe();
        this.mainGroup.remove();
    };
    return BasicStepArea;
}(OptionsBase));
export { BasicStepArea };
//# sourceMappingURL=basic-svg-step-area.js.map