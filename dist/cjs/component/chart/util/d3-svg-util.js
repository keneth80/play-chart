"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementInfoByEvent = exports.drawSelectionPointByRect = exports.drawTooltipPointByRect = exports.drawSelectionPointByCircle = exports.drawTooltipPointByCircle = exports.drawSelectionTooltipPointByCircle = exports.delayExcute = exports.drawLegendColorItemByLine = exports.drawLegendColorItemByCircle = exports.drawLegendColorItemByRect = exports.getAxisByPlacement = exports.drawSvgCheckBox = exports.getMaxText = exports.getTextWidthByComputedTextLength = exports.getTextHeight = exports.getTextWidth = exports.wrapTextByRowLimit = exports.getOsName = exports.textBreak = exports.textWrapping = exports.guid = exports.colorDarker = exports.isIE = exports.getTransformByArray = void 0;
var d3_axis_1 = require("d3-axis");
var d3_color_1 = require("d3-color");
var d3_selection_1 = require("d3-selection");
var d3_shape_1 = require("d3-shape");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var chart_configuration_1 = require("../chart-configuration");
var getTransformByArray = function (transform) {
    if (transform === void 0) { transform = 'translate(0, 0)'; }
    var translateString = transform.substring(transform.indexOf('translate('), transform.indexOf(')') + 1);
    var translate = ['0', '0'];
    var agent = navigator.userAgent.toLowerCase();
    if ((navigator.appName === 'Netscape' && agent.indexOf('trident') !== -1) ||
        agent.indexOf('msie') !== -1 ||
        agent.indexOf('edge') !== -1) {
        // ie일 경우
        var parseTranslate = translateString.replace('translate(', '').replace(')', '');
        translate = parseTranslate.split(/\s+/);
        // ie일 경우 y좌표 0을 아예 생략해버림.
        if (translate.length < 2) {
            translate.push('0');
        }
    }
    else {
        // ie가 아닐 경우
        // translate = translateString.replace('translate(', '').replace(')', '').split(/\s*,\s/);
        translate = translateString.replace('translate(', '').replace(')', '').split(',');
    }
    if (transform.indexOf('scale(') > -1) {
        var scaleString = transform.substring(translateString.length, transform.lastIndexOf(')') + 1);
        var scale = scaleString.replace('scale(', '').replace(')', '');
        translate.push(scale);
    }
    return translate;
};
exports.getTransformByArray = getTransformByArray;
var isIE = function () {
    var returnValue = false;
    var agent = navigator.userAgent.toLowerCase();
    if ((navigator.appName === 'Netscape' && agent.indexOf('trident') !== -1) ||
        agent.indexOf('msie') !== -1 ||
        agent.indexOf('edge') !== -1) {
        // ie일 경우
        returnValue = true;
    }
    return returnValue;
};
exports.isIE = isIE;
var colorDarker = function (fill, value) {
    if (value === void 0) { value = 2; }
    return (0, d3_color_1.color)(fill).darker(value);
};
exports.colorDarker = colorDarker;
var guid = function () {
    var s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};
exports.guid = guid;
var textWrapping = function (text, width, color) {
    if (color === void 0) { color = '#000'; }
    text.each(function (d, index, node) {
        var _a, _b, _c;
        var targetText = (0, d3_selection_1.select)(node[index]);
        var lines = [];
        // const words = text.text().split(/\s+/).reverse();
        var words = text.text().split('').reverse();
        var word = null;
        var lineNumber = 0;
        var lineHeight = 1.1; // ems
        var x = (_a = text.attr('x')) !== null && _a !== void 0 ? _a : 0;
        var y = (_b = text.attr('y')) !== null && _b !== void 0 ? _b : 0;
        var dy = parseFloat((_c = text.attr('dy')) !== null && _c !== void 0 ? _c : '0');
        var tspan = text
            .text(null)
            .append('tspan')
            .attr('x', x)
            .attr('y', y)
            .attr('dy', dy + 'em');
        while ((word = words.pop())) {
            lines.push(word);
            tspan.text(lines.join(''));
            if (tspan.node().getComputedTextLength() > width) {
                lines.pop();
                tspan.text(lines.join(''));
                lines = [word];
                // line.length = 0;
                // line.concat([word]);
                tspan = text
                    .append('tspan')
                    .attr('x', x)
                    .attr('y', y)
                    .attr('dy', ++lineNumber * lineHeight + dy + 'em')
                    .text(word)
                    .style('fill', color || '#000');
            }
        }
    });
};
exports.textWrapping = textWrapping;
var textBreak = function (target, pattern) {
    if (pattern === void 0) { pattern = /\s+/; }
    // /(\n|\r\n)/g
    target.each(function (d, index, node) {
        var _a, _b, _c;
        var text = (0, d3_selection_1.select)(node[index]);
        var lines = [];
        var words = text.text().split(pattern).reverse();
        // const words = text.text().split('').reverse();
        var word = null;
        var lineNumber = 0;
        var lineHeight = 1.1; // ems
        var x = (_a = text.attr('x')) !== null && _a !== void 0 ? _a : 0;
        var y = (_b = text.attr('y')) !== null && _b !== void 0 ? _b : 0;
        var dy = parseFloat((_c = text.attr('dy')) !== null && _c !== void 0 ? _c : '0');
        var tspan = text
            .text(null)
            .append('tspan')
            .attr('x', x)
            .attr('y', y)
            .attr('dy', dy + 'em');
        while ((word = words.pop())) {
            lines.push(word);
            tspan.text(lines.join(''));
            lines.pop();
            tspan.text(lines.join(''));
            lines = [word];
            // line.length = 0;
            // line.concat([word]);
            tspan = text
                .append('tspan')
                .attr('x', x)
                .attr('y', y)
                .attr('dy', ++lineNumber * lineHeight + dy + 'em')
                .text(word);
        }
    });
};
exports.textBreak = textBreak;
var getOsName = function () {
    var OSName = 'Unknown';
    // if (window.navigator.userAgent.indexOf('Windows NT 10.0')!= -1) OSName='Windows 10';
    // if (window.navigator.userAgent.indexOf('Windows NT 6.2') != -1) OSName='Windows 8';
    // if (window.navigator.userAgent.indexOf('Windows NT 6.1') != -1) OSName='Windows 7';
    // if (window.navigator.userAgent.indexOf('Windows NT 6.0') != -1) OSName='Windows Vista';
    // if (window.navigator.userAgent.indexOf('Windows NT 5.1') != -1) OSName='Windows XP';
    // if (window.navigator.userAgent.indexOf('Windows NT 5.0') != -1) OSName='Windows 2000';
    // if (window.navigator.userAgent.indexOf('Mac')            != -1) OSName='Mac/iOS';
    // if (window.navigator.userAgent.indexOf('X11')            != -1) OSName='UNIX';
    // if (window.navigator.userAgent.indexOf('Linux')          != -1) OSName='Linux';
    if (window.navigator.userAgent.indexOf('Windows') !== -1)
        OSName = 'Windows';
    if (window.navigator.userAgent.indexOf('Mac') !== -1)
        OSName = 'Mac/iOS';
    if (window.navigator.userAgent.indexOf('X11') !== -1)
        OSName = 'UNIX';
    if (window.navigator.userAgent.indexOf('Linux') !== -1)
        OSName = 'Linux';
    return OSName;
};
exports.getOsName = getOsName;
var osName = (0, exports.getOsName)();
var wrapTextByRowLimit = function (text, width, limitRowCount) {
    var _a, _b;
    if (limitRowCount === void 0) { limitRowCount = 10; }
    // let words = text.text().split(/\s+/).reverse(),
    if (text.node().getComputedTextLength() < width) {
        return text;
    }
    var compare = osName.indexOf('Windows') > -1 ? ((0, exports.isIE)() ? 0 : 4) : 3;
    var words = text.text().split('').reverse();
    var lineHeight = 1.1; // ems
    var y = (_a = text.attr('y')) !== null && _a !== void 0 ? _a : 0;
    var dy = (_b = parseFloat(text.attr('dy'))) !== null && _b !== void 0 ? _b : 0;
    var word;
    var lines = [];
    var lineNumber = 0;
    var lineCount = 1;
    var tspan = text
        .text(null)
        .append('tspan')
        .attr('x', 2)
        .attr('y', y)
        .attr('dy', dy + 'em');
    var isOver = false;
    while ((word = words.pop()) && !isOver) {
        lines.push(word);
        tspan.text(lines.join(''));
        if (tspan.node().getComputedTextLength() > width - compare) {
            // OS에 따라 ...의 사이즈 차이가 있음.
            lineCount++;
            lines.pop();
            tspan.text(lines.join(''));
            lines = [word];
            tspan = text
                .append('tspan')
                .attr('x', 2)
                .attr('y', y)
                .attr('dy', ++lineNumber * lineHeight + dy + 'em')
                .text(word);
            if (lineCount > limitRowCount) {
                isOver = true;
                var targetText = text.selectAll('tspan').filter(function (d, i) { return i === limitRowCount - 1; });
                var tempStr = targetText.text();
                targetText.text(tempStr.substring(0, tempStr.length - 1) + '...');
                tspan.remove();
            }
        }
    }
    return text;
};
exports.wrapTextByRowLimit = wrapTextByRowLimit;
var getTextWidth = function (text, fontSize, fontFace) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = fontSize + 'px ' + fontFace;
    var targetText = context.measureText(text);
    var width = targetText.width;
    return width;
};
exports.getTextWidth = getTextWidth;
var getTextHeight = function (fontSize, fontFace) {
    var body = document.getElementsByTagName('body')[0];
    var dummy = document.createElement('div');
    var dummyText = document.createTextNode('m');
    dummy.appendChild(dummyText);
    dummy.setAttribute('style', 'font-family: ' + fontFace + '; font-size: ' + fontSize + 'px;');
    body.appendChild(dummy);
    var result = dummy.offsetHeight;
    body.removeChild(dummy);
    return result;
};
exports.getTextHeight = getTextHeight;
var getTextWidthByComputedTextLength = function (text) {
    return text.getComputedTextLength();
};
exports.getTextWidthByComputedTextLength = getTextWidthByComputedTextLength;
var getMaxText = function (texts) {
    if (texts === void 0) { texts = []; }
    var maxLength = 0;
    var targetIndex = 0;
    texts.forEach(function (text, index) {
        if (maxLength < text.length) {
            maxLength = text.length;
            targetIndex = index;
        }
    });
    return texts[targetIndex];
};
exports.getMaxText = getMaxText;
var drawSvgCheckBox = function (selection, clickEvent, size, x, y, rx, ry, markStrokeWidth, boxStrokeWidth, checked) {
    if (clickEvent === void 0) { clickEvent = null; }
    if (size === void 0) { size = 10; }
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (rx === void 0) { rx = 0; }
    if (ry === void 0) { ry = 0; }
    if (markStrokeWidth === void 0) { markStrokeWidth = 1; }
    if (boxStrokeWidth === void 0) { boxStrokeWidth = 1; }
    if (checked === void 0) { checked = true; }
    var g = selection
        .selectAll('.checkbox-group')
        .data(function (d) { return [
        {
            size: size,
            x: x,
            y: y,
            rx: rx,
            ry: ry,
            markStrokeWidth: markStrokeWidth,
            boxStrokeWidth: boxStrokeWidth,
            checked: checked,
            data: d
        }
    ]; })
        .join(function (enter) { return enter.append('g').attr('class', 'checkbox-group'); }, function (update) { return update; }, function (exit) { return exit.remove(); });
    var box = g
        .selectAll('.checkbox-background')
        .data(function (d) { return [d]; })
        .join(function (enter) { return enter.append('rect').attr('class', 'checkbox-background'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
        .attr('width', function (d) { return d.size; })
        .attr('height', function (d) { return d.size; })
        .attr('x', function (d) { return d.x; })
        .attr('y', function (d) { return d.y; })
        .attr('rx', function (d) { return d.rx; })
        .attr('ry', function (d) { return d.ry; })
        .style('fill-opacity', 0)
        .style('stroke-width', function (d) { return d.boxStrokeWidth; })
        .style('stroke', 'black')
        .style('shape-rendering', 'crispEdges');
    var coordinates = [
        [x + size / 8, y + size / 3],
        [x + size / 2.2, y + size - size / 4],
        [x + size - size / 8, y + size / 10]
    ];
    var lineObj = (0, d3_shape_1.line)()
        .x(function (d) {
        return d[0];
    })
        .y(function (d) {
        return d[1];
    });
    var mark = g
        .selectAll('.checkbox-mark')
        .data(function (d) { return [d]; })
        .join(function (enter) { return enter.append('path').attr('class', 'checkbox-mark'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
        .attr('d', lineObj(coordinates))
        .style('shape-rendering', 'crispEdges')
        .style('stroke-width', function (d) { return d.markStrokeWidth; })
        .style('stroke', 'black')
        .style('fill', 'none')
        .style('opacity', function (d) { return (d.checked ? 1 : 0); });
    g.on('click', function (event, d) {
        d.checked = !d.checked;
        mark.style('opacity', d.checked ? 1 : 0);
        if (clickEvent) {
            var _a = (0, exports.getElementInfoByEvent)(event), index = _a.index, nodeList = _a.nodeList;
            clickEvent(d.data, index, nodeList);
        }
        event.stopPropagation();
    });
    return g;
};
exports.drawSvgCheckBox = drawSvgCheckBox;
var getAxisByPlacement = function (placement, scale) {
    if (placement === chart_configuration_1.Placement.TOP) {
        return (0, d3_axis_1.axisTop)(scale);
    }
    else if (placement === chart_configuration_1.Placement.LEFT) {
        return (0, d3_axis_1.axisLeft)(scale);
    }
    else if (placement === chart_configuration_1.Placement.RIGHT) {
        return (0, d3_axis_1.axisRight)(scale);
    }
    else {
        return (0, d3_axis_1.axisBottom)(scale);
    }
};
exports.getAxisByPlacement = getAxisByPlacement;
var drawLegendColorItemByRect = function (targetGroup, legendItemSize, keys, colors) {
    if (keys === void 0) { keys = []; }
    if (colors === void 0) { colors = []; }
    return targetGroup
        .selectAll('.legend-item')
        .data(function (d) { return [d]; })
        .join(function (enter) { return enter.append('rect').attr('class', 'legend-item'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
        .attr('width', legendItemSize.width)
        .attr('height', legendItemSize.height)
        .attr('fill', function (d) {
        var _a;
        var index = keys.findIndex(function (key) { return d.label === key.label; });
        // return colors[index];
        return (_a = d.color) !== null && _a !== void 0 ? _a : colors[index];
    });
};
exports.drawLegendColorItemByRect = drawLegendColorItemByRect;
var drawLegendColorItemByCircle = function (targetGroup, legendItemSize, keys, colors) {
    if (keys === void 0) { keys = []; }
    if (colors === void 0) { colors = []; }
    return targetGroup
        .selectAll('.legend-item')
        .data(function (d) { return [d]; })
        .join(function (enter) { return enter.append('circle').attr('class', 'legend-item'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
        .attr('r', legendItemSize.width / 2)
        .attr('cx', legendItemSize.width / 2)
        .attr('cy', legendItemSize.width / 2)
        .attr('fill', function (d) {
        var _a;
        var index = keys.findIndex(function (key) { return d.label === key.label; });
        // return colors[index];
        return (_a = d.color) !== null && _a !== void 0 ? _a : colors[index];
    });
};
exports.drawLegendColorItemByCircle = drawLegendColorItemByCircle;
var drawLegendColorItemByLine = function (targetGroup, legendItemSize, keys, colors) {
    if (keys === void 0) { keys = []; }
    if (colors === void 0) { colors = []; }
    return targetGroup
        .selectAll('.legend-item')
        .data(function (d) { return [d]; })
        .join(function (enter) { return enter.append('rect').attr('class', 'legend-item'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
        .attr('width', legendItemSize.width)
        .attr('height', 3)
        .attr('y', legendItemSize.width / 2 - 1)
        .attr('fill', function (d) {
        var _a;
        var index = keys.findIndex(function (key) { return d.label === key.label; });
        // return colors[index];
        return (_a = d.color) !== null && _a !== void 0 ? _a : colors[index];
    });
};
exports.drawLegendColorItemByLine = drawLegendColorItemByLine;
var delayExcute = function (delayTime, callback) {
    if (delayTime === void 0) { delayTime = 100; }
    return new rxjs_1.Observable(function (observ) {
        observ.next(true);
        observ.complete();
    })
        .pipe((0, operators_1.delay)(delayTime))
        .subscribe(function () {
        callback();
    });
};
exports.delayExcute = delayExcute;
var drawSelectionTooltipPointByCircle = function (selector, targetGroup, position, style) {
    targetGroup
        .selectAll(".tooltip-point-".concat(selector))
        .data(position)
        .join(function (enter) { return enter.append('circle').attr('class', "tooltip-point-".concat(selector)); }, function (update) { return update; }, function (exit) { return exit.remove(); })
        .style('stroke-width', style.strokeWidth)
        .style('stroke', style.strokeColor)
        .style('fill', '#fff')
        .attr('type', 'tooltip-point')
        .attr('cx', function (d) { return d[0]; })
        .attr('cy', function (d) { return d[1]; })
        .attr('r', style.radius);
};
exports.drawSelectionTooltipPointByCircle = drawSelectionTooltipPointByCircle;
var drawTooltipPointByCircle = function (targetGroup, position, style) {
    targetGroup
        .selectAll('.tooltip-point')
        .data(position)
        .join(function (enter) { return enter.append('circle').attr('class', 'tooltip-point'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
        .style('stroke-width', style.strokeWidth)
        .style('stroke', style.strokeColor)
        .style('fill', '#fff')
        .attr('cx', function (d) { return d[0]; })
        .attr('cy', function (d) { return d[1]; })
        .attr('r', style.radius);
};
exports.drawTooltipPointByCircle = drawTooltipPointByCircle;
var drawSelectionPointByCircle = function (targetGroup, position, style) {
    targetGroup.selectAll('.selection-point').remove();
    targetGroup
        .append('circle')
        .attr('class', 'selection-point')
        .style('stroke-width', 3)
        .style('stroke', (0, exports.colorDarker)(style.fill, 2))
        .attr('fill', (0, exports.colorDarker)(style.fill, 1))
        .attr('cx', position[0][0])
        .attr('cy', position[0][1])
        .attr('r', style.radius);
    // targetGroup.selectAll('.selection-point')
    //     .data(position)
    //     .join(
    //         (enter) => enter.append('circle').attr('class', 'selection-point'),
    //         (update) => update,
    //         (exit) => exit.remove()
    //     )
    //     .style('stroke-width', 3)
    //     .style('stroke', colorDarker(style.fill, 2))
    //     .attr('fill', colorDarker(style.fill, 1))
    //     .attr('cx', (d: number[]) => d[0])
    //     .attr('cy', (d: number[]) => d[1])
    //     .attr('r', style.radius);
};
exports.drawSelectionPointByCircle = drawSelectionPointByCircle;
var drawTooltipPointByRect = function (targetGroup, position, itemSize, style) {
    targetGroup
        .selectAll('.tooltip-point')
        .data(position)
        .join(function (enter) { return enter.append('rect').attr('class', 'tooltip-point'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
        .attr('x', function (d) { return d[0]; })
        .attr('y', function (d) { return d[1]; })
        .attr('height', itemSize.height)
        .attr('width', itemSize.width)
        .attr('fill', (0, exports.colorDarker)(style.fill, 2));
};
exports.drawTooltipPointByRect = drawTooltipPointByRect;
var drawSelectionPointByRect = function (targetGroup, position, itemSize, style) {
    targetGroup.selectAll('.selection-point').remove();
    targetGroup
        .append('rect')
        .attr('class', 'selection-point')
        .style('stroke-width', 3)
        .style('stroke', (0, exports.colorDarker)(style.fill, 2))
        .attr('fill', (0, exports.colorDarker)(style.fill, 1))
        .attr('x', position[0][0])
        .attr('y', position[0][1])
        .attr('height', itemSize.height)
        .attr('width', itemSize.width);
    // targetGroup.selectAll('.selection-point')
    //     .data(position)
    //     .join(
    //         (enter) => enter.append('rect').attr('class', 'selection-point'),
    //         (update) => update,
    //         (exit) => exit.remove()
    //     )
    //     .style('stroke-width', 3)
    //     .style('stroke', colorDarker(style.fill, 2))
    //     .attr('fill', colorDarker(style.fill, 1))
    //     .attr('x', (d: number[]) => d[0])
    //     .attr('y', (d: number[]) => d[1])
    //     .attr('height', itemSize.height)
    //     .attr('width', itemSize.width);
};
exports.drawSelectionPointByRect = drawSelectionPointByRect;
var getElementInfoByEvent = function (event, selector) {
    if (selector === void 0) { selector = '*'; }
    var nodes = (0, d3_selection_1.select)(event.target.parentNode)
        .selectAll(selector)
        .nodes();
    var index = nodes.indexOf(event.target);
    return { index: index, nodeList: nodes };
};
exports.getElementInfoByEvent = getElementInfoByEvent;
//# sourceMappingURL=d3-svg-util.js.map