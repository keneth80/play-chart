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
import { OptionsBase } from '../chart/options-base';
var BasicSpecArea = /** @class */ (function (_super) {
    __extends(BasicSpecArea, _super);
    function BasicSpecArea(configuration) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this) || this;
        _this.placement = 'bottom';
        _this.selector = (_a = configuration.selector) !== null && _a !== void 0 ? _a : 'spec-area';
        _this.startField = configuration.startField;
        _this.endField = configuration.endField;
        _this.stepData = (_b = configuration.data) !== null && _b !== void 0 ? _b : [];
        _this.placement = configuration.placement;
        return _this;
    }
    BasicSpecArea.prototype.setSvgElement = function (svg, mainGroup) {
        // option canvas 생성
        // this.svg = this.setOptionCanvas(svg);
        // option 을 제일 뒤로 보내기 위함.
        svg.style('z-index', 1);
        this.svg = mainGroup;
        if (!this.svg.select('.' + this.selector + '-group').node()) {
            this.mainGroup = this.svg.append('g').attr('class', this.selector + '-group');
        }
    };
    BasicSpecArea.prototype.drawOptions = function (chartData, scales, geometry) {
        var _this = this;
        if (!this.stepData || !this.stepData.length) {
            return;
        }
        var compareScale = scales.find(function (scale) { return scale.orient === _this.placement; });
        var axis = compareScale.scale;
        var elementGroup = this.mainGroup
            .selectAll('.' + this.selector + '-group')
            .data(this.stepData)
            .join(function (enter) { return enter.append('g').attr('class', _this.selector + '-group'); }, function (update) { return update; }, function (exit) { return exit.remove; })
            .attr('transform', function (data) {
            var x = _this.placement === 'bottom' ? axis(data[_this.startField]) : 0;
            var y = _this.placement === 'bottom' ? 0 : axis(data[_this.startField]);
            var translate = "translate(".concat((x < 0 ? 0 : x) + 1, ", ").concat(y > geometry.height ? geometry.height : y, ")");
            return translate;
        });
        elementGroup
            .selectAll('.' + this.selector + '-box')
            .data(function (data) { return [data]; })
            .join(function (enter) { return enter.append('rect').attr('class', _this.selector + '-box'); }, function (update) { return update; }, function (exit) { return exit.remove; })
            .style('fill', '#f9e1fa')
            .attr('width', function (data) {
            var targetWidth = _this.placement === 'bottom' ? axis(data[_this.endField]) - axis(data[_this.startField]) : geometry.width;
            return (targetWidth > geometry.width ? geometry.width : targetWidth) - 1;
        })
            .attr('height', function (data) {
            var targetHeight = _this.placement === 'bottom' ? geometry.height : axis(data[_this.endField]) - axis(data[_this.startField]);
            return targetHeight > geometry.height ? geometry.height : targetHeight;
        });
    };
    BasicSpecArea.prototype.select = function (displayName, isSelected) {
        this.mainGroup.selectAll('.' + this.selector).style('opacity', isSelected ? null : 0.4);
    };
    BasicSpecArea.prototype.hide = function (displayName, isHide) {
        this.mainGroup.selectAll('.' + this.selector).style('opacity', !isHide ? null : 0);
        this.mainGroup.lower();
    };
    BasicSpecArea.prototype.destroy = function () {
        this.subscription.unsubscribe();
        this.mainGroup.remove();
    };
    return BasicSpecArea;
}(OptionsBase));
export { BasicSpecArea };
//# sourceMappingURL=basic-svg-spec-area.js.map