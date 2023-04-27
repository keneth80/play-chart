import { __extends } from "tslib";
import { Placement } from '../chart/chart-configuration';
import { OptionsBase } from '../chart/options-base';
var BasicStepLine = /** @class */ (function (_super) {
    __extends(BasicStepLine, _super);
    function BasicStepLine(configuration) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this) || this;
        _this.selector = (_a = configuration.selector) !== null && _a !== void 0 ? _a : 'step-line';
        _this.xField = configuration.xField;
        _this.stepData = (_b = configuration.data) !== null && _b !== void 0 ? _b : [];
        return _this;
    }
    BasicStepLine.prototype.setSvgElement = function (svg, mainGroup) {
        // option canvas 생성
        // this.svg = this.setOptionCanvas(svg);
        // option 을 제일 뒤로 보내기 위함.
        svg.style('z-index', 1);
        this.svg = mainGroup;
        if (!this.svg.select('.' + this.selector + '-group').node()) {
            this.mainGroup = this.svg.append('g').attr('class', this.selector + '-group');
        }
    };
    BasicStepLine.prototype.drawOptions = function (chartData, scales, geometry) {
        var _this = this;
        if (!this.stepData || !this.stepData.length) {
            return;
        }
        var xScale = scales.find(function (scale) { return scale.orient === Placement.BOTTOM; });
        var x = xScale.scale;
        this.mainGroup
            .selectAll('.' + this.selector + '-line')
            .data(this.stepData)
            .join(function (enter) { return enter.append('line').attr('class', _this.selector + '-line'); }, function (update) { return update; }, function (exit) { return exit.remove; })
            .style('stroke', '#ccc')
            .style('stroke-width', 1)
            .attr('x1', function (data) {
            return x(data[_this.xField]);
        })
            .attr('y1', 0)
            .attr('x2', function (data) {
            return x(data[_this.xField]);
        })
            .attr('y2', geometry.height);
    };
    BasicStepLine.prototype.select = function (displayName, isSelected) {
        this.mainGroup.selectAll('.' + this.selector).style('opacity', isSelected ? null : 0.4);
    };
    BasicStepLine.prototype.hide = function (displayName, isHide) {
        this.mainGroup.selectAll('.' + this.selector).style('opacity', !isHide ? null : 0);
        this.mainGroup.lower();
    };
    BasicStepLine.prototype.destroy = function () {
        this.subscription.unsubscribe();
        this.mainGroup.remove();
    };
    return BasicStepLine;
}(OptionsBase));
export { BasicStepLine };
//# sourceMappingURL=basic-svg-step-line.js.map