export var baseTooltipTemplate = function (group, boxStyle, textStyle) {
    group
        .selectAll('.tooltip-background')
        .data(['background'])
        .join(function (enter) { return enter.append('rect').attr('class', 'tooltip-background'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
        .attr('rx', 3)
        .attr('ry', 3)
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 60)
        .attr('height', 20)
        .style('fill', '#111')
        .style('fill-opacity', 0.6);
    group
        .selectAll('.tooltip-text')
        .data(['text'])
        .join(function (enter) { return enter.append('text').attr('class', 'tooltip-text'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
        .attr('x', 5)
        .attr('dy', '1.2em')
        .style('text-anchor', 'start')
        .style('fill', '#fff')
        .attr('font-size', '14px')
        .attr('font-weight', '100');
    return group;
};
export var colorTooltipTemplate = function (group, boxStyle, textStyle) {
    var _a, _b, _c, _d, _e, _f;
    group
        .selectAll('.tooltip-background')
        .data(['tooltip-background'])
        .join(function (enter) { return enter.append('rect').attr('class', 'tooltip-background'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 60)
        .attr('height', 20)
        .attr('rx', 0)
        .attr('ry', 0)
        .style('stroke', (_a = boxStyle === null || boxStyle === void 0 ? void 0 : boxStyle.stroke) !== null && _a !== void 0 ? _a : '#000')
        .style('stroke-width', (_b = boxStyle === null || boxStyle === void 0 ? void 0 : boxStyle.strokeWidth) !== null && _b !== void 0 ? _b : 1)
        .style('fill', (_c = boxStyle === null || boxStyle === void 0 ? void 0 : boxStyle.fill) !== null && _c !== void 0 ? _c : '#111')
        .style('fill-opacity', (_d = boxStyle === null || boxStyle === void 0 ? void 0 : boxStyle.opacity) !== null && _d !== void 0 ? _d : 1);
    group
        .selectAll('.tooltip-text')
        .data(['tooltip-text'])
        .join(function (enter) { return enter.append('text').attr('class', 'tooltip-text'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
        .attr('x', 5)
        .attr('dy', '1.2em')
        .style('text-anchor', 'start')
        .style('fill', (_e = textStyle === null || textStyle === void 0 ? void 0 : textStyle.fiil) !== null && _e !== void 0 ? _e : '#000')
        .style('font-size', (_f = (textStyle === null || textStyle === void 0 ? void 0 : textStyle.size) + 'px') !== null && _f !== void 0 ? _f : '14px')
        .style('font-weight', '100');
    return group;
};
//# sourceMappingURL=tooltip-template.js.map