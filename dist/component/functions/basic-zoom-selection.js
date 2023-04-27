import { __extends } from "tslib";
import { zoom } from 'd3-zoom';
import { FunctionsBase } from '../chart/functions-base';
var BasicZoomSelection = /** @class */ (function (_super) {
    __extends(BasicZoomSelection, _super);
    function BasicZoomSelection(configuration) {
        var _this = _super.call(this) || this;
        _this.targetGroup = '';
        _this.xDirection = 'bottom';
        _this.yDirection = 'left';
        _this.direction = 'both';
        _this.originScaleX = {};
        _this.originScaleY = {};
        if (configuration) {
            if (configuration.targetGroup) {
                _this.targetGroup = configuration.targetGroup;
            }
            if (configuration.direction) {
                _this.direction = configuration.direction;
            }
            if (configuration.xField) {
                _this.xField = configuration.xField;
            }
            if (configuration.yField) {
                _this.yField = configuration.yField;
            }
            if (configuration.xDirection) {
                _this.xDirection = configuration.xDirection;
            }
            if (configuration.yDirection) {
                _this.yDirection = configuration.yDirection;
            }
        }
        return _this;
    }
    BasicZoomSelection.prototype.setSvgElement = function (svg, mainGroup) {
        this.svg = svg;
        this.mainGroup = mainGroup;
        if (!this.zoomTarget) {
            this.zoomTarget = this.mainGroup.append('rect').style('fill', 'none').style('pointer-events', 'all');
            this.zoomTarget.lower();
        }
    };
    BasicZoomSelection.prototype.drawFunctions = function (chartData, scales, geometry) {
        var _this = this;
        var x = scales.find(function (scale) { return scale.orient === _this.xDirection; }).scale;
        var y = scales.find(function (scale) { return scale.orient === _this.yDirection; }).scale;
        Object.assign(this.originScaleX, x);
        Object.assign(this.originScaleY, y);
        this.zoomTarget.attr('width', geometry.width).attr('height', geometry.height);
        this.targetElements = this.mainGroup.select(".".concat(this.targetGroup)).selectAll('*');
        var updateChart = function (event) {
            var newX = event.transform.rescaleX(x);
            var newY = event.transform.rescaleY(y);
            scales.find(function (scale) { return scale.orient === _this.xDirection; }).scale = newX;
            scales.find(function (scale) { return scale.orient === _this.yDirection; }).scale = newY;
            _this.chartBase.updateRescaleAxis();
            _this.chartBase.updateSeries();
        };
        this.mainGroup.call(zoom()
            .scaleExtent([0.5, 10])
            .extent([
            [0, 0],
            [geometry.width, geometry.height]
        ]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
            .on('zoom', updateChart));
    };
    return BasicZoomSelection;
}(FunctionsBase));
export { BasicZoomSelection };
//# sourceMappingURL=basic-zoom-selection.js.map