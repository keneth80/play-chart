"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupBrush = exports.setupZeroLine = exports.drawAxisByScale = exports.generateScaleByAxis = void 0;
var d3_array_1 = require("d3-array");
var d3_brush_1 = require("d3-brush");
var d3_ease_1 = require("d3-ease");
var d3_scale_1 = require("d3-scale");
var d3_transition_1 = require("d3-transition");
var d3_selection_1 = require("d3-selection");
var chart_configuration_1 = require("../chart-configuration");
var scale_1 = require("../scale");
var util_1 = require("../util");
var generateScaleByAxis = function (axes, data, size, currentScale, isRealTime) {
    if (axes === void 0) { axes = []; }
    if (data === void 0) { data = []; }
    if (size === void 0) { size = {
        width: 0,
        height: 0
    }; }
    if (isRealTime === void 0) { isRealTime = false; }
    var returnAxes = [];
    axes.map(function (axis) {
        var range = [];
        if (axis.placement === chart_configuration_1.Placement.BOTTOM || axis.placement === chart_configuration_1.Placement.TOP) {
            range = [0, size.width];
        }
        else {
            range = [size.height, 0];
        }
        var scale = null;
        var minValue = 0;
        var maxValue = 0;
        if (axis.type === chart_configuration_1.ScaleType.STRING) {
            scale = (0, d3_scale_1.scaleBand)()
                .range(range)
                .padding(axis.padding ? +axis.padding : 0)
                .paddingOuter(0.1);
            if (axis.domain) {
                scale.domain(axis.domain);
            }
            else {
                scale.domain(data.map(function (item) { return item[axis.field]; }));
            }
        }
        else if (axis.type === chart_configuration_1.ScaleType.POINT) {
            scale = (0, d3_scale_1.scalePoint)()
                .range(range)
                .padding(axis.padding ? +axis.padding : 0.1);
            if (axis.domain) {
                scale.domain(axis.domain);
            }
            else {
                scale.domain(data.map(function (item) { return item[axis.field]; }));
            }
        }
        else {
            if (axis.type === chart_configuration_1.ScaleType.TIME) {
                // TODO: interval option 추가
                // 참고 http://jsfiddle.net/sarathsaleem/8tmLrb9t/7/
                scale = (0, d3_scale_1.scaleTime)().range(range);
            }
            else {
                // ScaleType.NUMBER => numeric type
                // TODO: interval option 추가 (interval 일 경우에는 argument가 3개: start, end, step)
                scale = (0, d3_scale_1.scaleLinear)().range(range);
            }
            // POINT: zoom 시 현재 scale을 유지하기 위함.
            // min max setup
            if (currentScale.length) {
                var tempScale = currentScale.find(function (scaleItem) { return scaleItem.field === axis.field; });
                minValue = tempScale ? tempScale.min : 0;
                maxValue = tempScale ? tempScale.max : 0;
            }
            else {
                if (!axis.hasOwnProperty('max')) {
                    if (axis.type === chart_configuration_1.ScaleType.TIME) {
                        axis.max = (0, d3_array_1.max)(data.map(function (item) { return new Date(item[axis.field]).getTime(); }));
                    }
                    else {
                        axis.max = (0, d3_array_1.max)(data.map(function (item) { return parseFloat(item[axis.field]); }));
                        axis.max += Math.round(axis.max * 0.05);
                    }
                }
                if (!axis.hasOwnProperty('min')) {
                    if (axis.type === chart_configuration_1.ScaleType.TIME) {
                        axis.min = (0, d3_array_1.min)(data.map(function (item) { return new Date(item[axis.field]).getTime(); }));
                    }
                    else {
                        axis.min = (0, d3_array_1.min)(data.map(function (item) { return parseFloat(item[axis.field]); }));
                        axis.min -= Math.round(axis.min * 0.05);
                    }
                }
                minValue = axis.min;
                maxValue = axis.max;
            }
            // axis domain label setup
            if (axis.domain) {
                scale.domain(axis.domain);
            }
            else {
                // POINT: zoom 시 적용될 scale
                if (currentScale.length) {
                    var reScale = currentScale.find(function (d) { return d.field === axis.field; });
                    minValue = reScale.min;
                    maxValue = reScale.max;
                }
                if (axis.type === chart_configuration_1.ScaleType.NUMBER) {
                    // TODO : index string domain 지정.
                    scale.domain([minValue, maxValue]);
                    if (axis.isRound === true) {
                        scale.nice();
                    }
                }
                else {
                    scale.domain([new Date(minValue), new Date(maxValue)]);
                }
            }
        }
        returnAxes.push({
            field: axis.field,
            orient: axis.placement,
            scale: scale,
            type: axis.type,
            visible: axis.visible === false ? false : true,
            tickFormat: axis.tickFormat ? axis.tickFormat : undefined,
            tickTextParser: axis.tickTextParser ? axis.tickTextParser : undefined,
            tickSize: axis.tickSize ? axis.tickSize : undefined,
            gridLine: axis.gridLine,
            zeroLine: axis.zeroLine,
            isZoom: axis.isZoom === true ? true : false,
            min: minValue,
            max: maxValue,
            title: axis.title
        });
    });
    return returnAxes;
};
exports.generateScaleByAxis = generateScaleByAxis;
var drawAxisByScale = function (svgGeometry, margin, isCustomMargin, scale, targetGroup, defaultAxisLabelStyle, defaultAxisTitleStyle, axisTitleMargin, isRealTime) {
    if (isRealTime === void 0) { isRealTime = true; }
    var padding = 10; // 10 는 axis 여백.
    var orientedAxis = (0, scale_1.axisSetupByScale)(scale);
    var maxTextWidth = 0;
    var bandWidth = -1;
    if (scale.type === chart_configuration_1.ScaleType.STRING) {
        bandWidth = scale.scale.bandwidth();
    }
    if (scale.visible) {
        // TODO: 우선은 x 축만 tansition 적용 텍스트 길이 체크하는 로직이 돌면서 transition 적용은 아직은 어려움.
        if (isRealTime && (scale.orient === chart_configuration_1.Placement.BOTTOM || scale.orient === chart_configuration_1.Placement.TOP)) {
            var transitionObj = (0, d3_transition_1.transition)().duration(500).ease(d3_ease_1.easeLinear);
            targetGroup.transition(transitionObj);
        }
        targetGroup
            // .transition(transitionObj)
            .call(orientedAxis)
            .selectAll('text')
            .style('font-size', defaultAxisLabelStyle.font.size + 'px')
            .style('font-family', defaultAxisLabelStyle.font.family);
        // .style('font-weight', 100)
        // .style('stroke-width', 0.5)
        // .style('stroke', this.defaultAxisLabelStyle.font.color);
    }
    if (scale.tickTextParser) {
        (0, util_1.delayExcute)(50, function () {
            targetGroup.selectAll('text').text(function (d) {
                return scale.tickTextParser(d);
            });
        });
    }
    // if (scale.isZoom === true) {
    //     ChartAxis.setupBrush(svgGeometry, margin, scale, targetGroup, updateBrushHandler);
    // }
    // axis의 텍스트가 길어지면 margin도 덩달아 늘어나야함. 단, config.margin이 없을 때
    // TODO: axis transition을 걸면 delay 때문에 텍스트 길이 체크가 안되니 트랜지션의 duration 만큼 지연이 필요하다.
    if (!isCustomMargin) {
        // 가장 긴 텍스트를 찾아서 사이즈를 저장하고 margin에 더해야함
        var textLength_1 = 0;
        var longTextNode_1 = null;
        if (scale.orient === chart_configuration_1.Placement.LEFT || scale.orient === chart_configuration_1.Placement.RIGHT) {
            targetGroup.selectAll('.tick').each(function (d, index, node) {
                var currentTextSize = (d + '').length;
                if (textLength_1 < currentTextSize) {
                    textLength_1 = currentTextSize;
                    longTextNode_1 = node[index];
                }
            });
            if (longTextNode_1) {
                var textWidth = Math.round(longTextNode_1.getBoundingClientRect().width);
                if (maxTextWidth < textWidth) {
                    maxTextWidth = textWidth;
                }
            }
        }
        else {
            targetGroup.selectAll('.tick').each(function (d, index, node) {
                // string일 때 bandWidth 보다 텍스트 사이즈가 더 크면 wordrap한다.
                if (bandWidth > 0) {
                    var textNode = (0, d3_selection_1.select)(node[index]).select('text');
                    var textNodeWidth = textNode.node().getComputedTextLength();
                    var currentTextSize = (d + '').length;
                    if (textNodeWidth > bandWidth) {
                        (0, util_1.textWrapping)(textNode, bandWidth);
                    }
                    if (textLength_1 < currentTextSize) {
                        textLength_1 = currentTextSize;
                        longTextNode_1 = node[index];
                    }
                }
            });
            if (longTextNode_1) {
                var textHeight = Math.round(longTextNode_1.getBoundingClientRect().height);
                if (maxTextWidth < textHeight) {
                    maxTextWidth = textHeight;
                }
            }
        }
    }
    if (scale.zeroLine && scale.min < 0) {
        (0, exports.setupZeroLine)(svgGeometry, scale, targetGroup);
    }
    else {
        targetGroup.selectAll(".".concat(scale.orient, "-").concat(scale.field, "-zero-line")).remove();
    }
    if (scale.title) {
        targetGroup
            .selectAll(".axis-".concat(scale.orient, "-title"))
            .data([scale.title])
            .join(function (enter) { return enter.append('text').attr('class', "axis-".concat(scale.orient, "-title")); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('dy', function () {
            return scale.orient === chart_configuration_1.Placement.TOP ? '0em' : '1em';
        })
            .style('text-anchor', function (d) {
            var anchor = '';
            if (d.align === chart_configuration_1.Align.TOP) {
                anchor = 'end';
            }
            else if (d.align === chart_configuration_1.Align.BOTTOM) {
                anchor = 'start';
            }
            else {
                anchor = 'middle';
            }
            return anchor;
        })
            .style('font-weight', 100)
            .style('fill', defaultAxisTitleStyle.font.color)
            .style('font-size', defaultAxisTitleStyle.font.size)
            .style('font-family', defaultAxisTitleStyle.font.family)
            .text(function (d) {
            return d.content;
        })
            .attr('transform', function (d) {
            return scale.orient === chart_configuration_1.Placement.LEFT || scale.orient === chart_configuration_1.Placement.RIGHT ? 'rotate(-90)' : '';
        })
            .attr('y', function (d, index, node) {
            var titlePadding = 5;
            var y = 0;
            if (scale.orient === chart_configuration_1.Placement.LEFT) {
                y = 0 - (margin.left + axisTitleMargin.left - titlePadding);
            }
            else if (scale.orient === chart_configuration_1.Placement.RIGHT) {
                y = margin.right - titlePadding;
            }
            else if (scale.orient === chart_configuration_1.Placement.BOTTOM) {
                y = margin.bottom - titlePadding;
            }
            else {
                y = -axisTitleMargin.top - titlePadding;
            }
            return y;
        })
            .attr('x', function (d) {
            var x = 0;
            if (scale.orient === chart_configuration_1.Placement.LEFT || scale.orient === chart_configuration_1.Placement.RIGHT) {
                if (d.align === chart_configuration_1.Align.TOP) {
                    x = 0;
                }
                else if (d.align === chart_configuration_1.Align.BOTTOM) {
                    x = 0 - svgGeometry.height;
                }
                else {
                    x = 0 - svgGeometry.height / 2;
                }
            }
            else if (scale.orient === chart_configuration_1.Placement.BOTTOM || scale.orient === chart_configuration_1.Placement.TOP) {
                if (d.align === chart_configuration_1.Align.LEFT) {
                    x = padding;
                }
                else if (d.align === chart_configuration_1.Align.RIGHT) {
                    x = svgGeometry.width - padding;
                }
                else {
                    x = svgGeometry.width / 2;
                }
            }
            return x;
        });
    }
    return maxTextWidth;
};
exports.drawAxisByScale = drawAxisByScale;
var setupZeroLine = function (svgGeometry, scale, targetGroup) {
    var _a;
    var zeroLine = targetGroup
        .selectAll(".".concat(scale.orient, "-").concat(scale.field, "-zero-line"))
        .data([scale])
        .join(function (enter) { return enter.append('line').attr('class', "".concat(scale.orient, "-").concat(scale.field, "-zero-line")); })
        .style('stroke', (_a = scale.zeroLine.color) !== null && _a !== void 0 ? _a : '#000')
        .style('stroke-width', 1);
    if (scale.orient === chart_configuration_1.Placement.LEFT || scale.orient === chart_configuration_1.Placement.RIGHT) {
        zeroLine.attr('y1', scale.scale(0)).attr('y2', scale.scale(0)).attr('x2', svgGeometry.width);
    }
    else {
        zeroLine.attr('x1', scale.scale(0)).attr('y1', -svgGeometry.height).attr('x2', scale.scale(0)).attr('y2', 0);
    }
    return zeroLine;
};
exports.setupZeroLine = setupZeroLine;
var setupBrush = function (svgGeometry, margin, scale, targetGroup, updateBrushHandler) {
    var brush = null;
    if (scale.type === chart_configuration_1.ScaleType.NUMBER || scale.type === chart_configuration_1.ScaleType.TIME) {
        if (scale.orient === chart_configuration_1.Placement.RIGHT || scale.orient === chart_configuration_1.Placement.LEFT) {
            var left = 0;
            var width = 0;
            if (scale.orient === chart_configuration_1.Placement.LEFT) {
                left = -1 * margin.left;
            }
            else {
                width = svgGeometry.width;
            }
            brush = (0, d3_brush_1.brushY)().extent([
                [left, 0],
                [width, svgGeometry.height]
            ]);
        }
        else {
            var top_1 = 0;
            var height = 0;
            // top margin 때문에 처리.
            if (scale.orient === chart_configuration_1.Placement.TOP) {
                top_1 = margin.top * -1;
            }
            else {
                height = margin.bottom;
            }
            brush = (0, d3_brush_1.brushX)().extent([
                [0, top_1],
                [svgGeometry.width, height]
            ]);
        }
        brush.on('end', function () {
            updateBrushHandler(scale.orient, brush);
        });
    }
    if (brush) {
        if (!targetGroup.select('.brush' + scale.orient).node()) {
            targetGroup.append('g').attr('class', 'brush' + scale.orient);
        }
        targetGroup.select('.brush' + scale.orient).call(brush);
    }
};
exports.setupBrush = setupBrush;
//# sourceMappingURL=index.js.map