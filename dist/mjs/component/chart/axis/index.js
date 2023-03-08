import { max, min } from 'd3-array';
import { brushX, brushY } from 'd3-brush';
import { easeLinear } from 'd3-ease';
import { scaleBand, scaleLinear, scalePoint, scaleTime } from 'd3-scale';
import { transition } from 'd3-transition';
import { select } from 'd3-selection';
import { Align, Placement, ScaleType } from '../chart-configuration';
import { axisSetupByScale } from '../scale';
import { delayExcute, textWrapping } from '../util';
export var generateScaleByAxis = function (axes, data, size, currentScale, isRealTime) {
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
        if (axis.placement === Placement.BOTTOM || axis.placement === Placement.TOP) {
            range = [0, size.width];
        }
        else {
            range = [size.height, 0];
        }
        var scale = null;
        var minValue = 0;
        var maxValue = 0;
        if (axis.type === ScaleType.STRING) {
            scale = scaleBand()
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
        else if (axis.type === ScaleType.POINT) {
            scale = scalePoint()
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
            if (axis.type === ScaleType.TIME) {
                // TODO: interval option 추가
                // 참고 http://jsfiddle.net/sarathsaleem/8tmLrb9t/7/
                scale = scaleTime().range(range);
            }
            else {
                // ScaleType.NUMBER => numeric type
                // TODO: interval option 추가 (interval 일 경우에는 argument가 3개: start, end, step)
                scale = scaleLinear().range(range);
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
                    if (axis.type === ScaleType.TIME) {
                        axis.max = max(data.map(function (item) { return new Date(item[axis.field]).getTime(); }));
                    }
                    else {
                        axis.max = max(data.map(function (item) { return parseFloat(item[axis.field]); }));
                        axis.max += Math.round(axis.max * 0.05);
                    }
                }
                if (!axis.hasOwnProperty('min')) {
                    if (axis.type === ScaleType.TIME) {
                        axis.min = min(data.map(function (item) { return new Date(item[axis.field]).getTime(); }));
                    }
                    else {
                        axis.min = min(data.map(function (item) { return parseFloat(item[axis.field]); }));
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
                if (axis.type === ScaleType.NUMBER) {
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
export var drawAxisByScale = function (svgGeometry, margin, isCustomMargin, scale, targetGroup, defaultAxisLabelStyle, defaultAxisTitleStyle, axisTitleMargin, isRealTime) {
    if (isRealTime === void 0) { isRealTime = true; }
    var padding = 10; // 10 는 axis 여백.
    var orientedAxis = axisSetupByScale(scale);
    var maxTextWidth = 0;
    var bandWidth = -1;
    if (scale.type === ScaleType.STRING) {
        bandWidth = scale.scale.bandwidth();
    }
    if (scale.visible) {
        // TODO: 우선은 x 축만 tansition 적용 텍스트 길이 체크하는 로직이 돌면서 transition 적용은 아직은 어려움.
        if (isRealTime && (scale.orient === Placement.BOTTOM || scale.orient === Placement.TOP)) {
            var transitionObj = transition().duration(500).ease(easeLinear);
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
        delayExcute(50, function () {
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
        if (scale.orient === Placement.LEFT || scale.orient === Placement.RIGHT) {
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
                    var textNode = select(node[index]).select('text');
                    var textNodeWidth = textNode.node().getComputedTextLength();
                    var currentTextSize = (d + '').length;
                    if (textNodeWidth > bandWidth) {
                        textWrapping(textNode, bandWidth);
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
        setupZeroLine(svgGeometry, scale, targetGroup);
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
            return scale.orient === Placement.TOP ? '0em' : '1em';
        })
            .style('text-anchor', function (d) {
            var anchor = '';
            if (d.align === Align.TOP) {
                anchor = 'end';
            }
            else if (d.align === Align.BOTTOM) {
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
            return scale.orient === Placement.LEFT || scale.orient === Placement.RIGHT ? 'rotate(-90)' : '';
        })
            .attr('y', function (d, index, node) {
            var titlePadding = 5;
            var y = 0;
            if (scale.orient === Placement.LEFT) {
                y = 0 - (margin.left + axisTitleMargin.left - titlePadding);
            }
            else if (scale.orient === Placement.RIGHT) {
                y = margin.right - titlePadding;
            }
            else if (scale.orient === Placement.BOTTOM) {
                y = margin.bottom - titlePadding;
            }
            else {
                y = -axisTitleMargin.top - titlePadding;
            }
            return y;
        })
            .attr('x', function (d) {
            var x = 0;
            if (scale.orient === Placement.LEFT || scale.orient === Placement.RIGHT) {
                if (d.align === Align.TOP) {
                    x = 0;
                }
                else if (d.align === Align.BOTTOM) {
                    x = 0 - svgGeometry.height;
                }
                else {
                    x = 0 - svgGeometry.height / 2;
                }
            }
            else if (scale.orient === Placement.BOTTOM || scale.orient === Placement.TOP) {
                if (d.align === Align.LEFT) {
                    x = padding;
                }
                else if (d.align === Align.RIGHT) {
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
export var setupZeroLine = function (svgGeometry, scale, targetGroup) {
    var _a;
    var zeroLine = targetGroup
        .selectAll(".".concat(scale.orient, "-").concat(scale.field, "-zero-line"))
        .data([scale])
        .join(function (enter) { return enter.append('line').attr('class', "".concat(scale.orient, "-").concat(scale.field, "-zero-line")); })
        .style('stroke', (_a = scale.zeroLine.color) !== null && _a !== void 0 ? _a : '#000')
        .style('stroke-width', 1);
    if (scale.orient === Placement.LEFT || scale.orient === Placement.RIGHT) {
        zeroLine.attr('y1', scale.scale(0)).attr('y2', scale.scale(0)).attr('x2', svgGeometry.width);
    }
    else {
        zeroLine.attr('x1', scale.scale(0)).attr('y1', -svgGeometry.height).attr('x2', scale.scale(0)).attr('y2', 0);
    }
    return zeroLine;
};
export var setupBrush = function (svgGeometry, margin, scale, targetGroup, updateBrushHandler) {
    var brush = null;
    if (scale.type === ScaleType.NUMBER || scale.type === ScaleType.TIME) {
        if (scale.orient === Placement.RIGHT || scale.orient === Placement.LEFT) {
            var left = 0;
            var width = 0;
            if (scale.orient === Placement.LEFT) {
                left = -1 * margin.left;
            }
            else {
                width = svgGeometry.width;
            }
            brush = brushY().extent([
                [left, 0],
                [width, svgGeometry.height]
            ]);
        }
        else {
            var top_1 = 0;
            var height = 0;
            // top margin 때문에 처리.
            if (scale.orient === Placement.TOP) {
                top_1 = margin.top * -1;
            }
            else {
                height = margin.bottom;
            }
            brush = brushX().extent([
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
//# sourceMappingURL=index.js.map