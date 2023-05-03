"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawGridLine = void 0;
var d3_axis_1 = require("d3-axis");
var chart_configuration_1 = require("../chart-configuration");
var drawGridLine = function (svgGeometry, scale, targetGroup, option) {
    var gridLineGroup = targetGroup
        .selectAll("g.".concat(scale.orient, "-grid-line"))
        .data([scale])
        .join(function (enter) { return enter.append('g').attr('class', "".concat(scale.orient, "-grid-line")); }, function (update) { return update; }, function (exit) { return exit.remove(); })
        // .style('stroke', option.color)
        .style('stroke-opacity', option.opacity)
        .style('stroke-dasharray', option.dasharray)
        .style('shape-rendering', 'crispEdges');
    var tickFmt = '';
    var targetAxis;
    if (scale.orient === chart_configuration_1.Placement.TOP || scale.orient === chart_configuration_1.Placement.BOTTOM) {
        targetAxis = (0, d3_axis_1.axisTop)(scale.scale).tickFormat(tickFmt).tickSize(-svgGeometry.height);
    }
    else {
        targetAxis = (0, d3_axis_1.axisLeft)(scale.scale).tickFormat(tickFmt).tickSize(-svgGeometry.width);
    }
    if (scale.tickSize) {
        targetAxis.ticks(scale.tickSize);
    }
    var gridLines = gridLineGroup.call(targetAxis);
    gridLines.select('path').remove();
    if (scale.orient === chart_configuration_1.Placement.LEFT || scale.orient === chart_configuration_1.Placement.RIGHT) {
        gridLines.select('g').remove();
    }
    gridLines.selectAll('line').style('stroke', option.color);
    gridLines.lower();
    return gridLines;
};
exports.drawGridLine = drawGridLine;
//# sourceMappingURL=index.js.map