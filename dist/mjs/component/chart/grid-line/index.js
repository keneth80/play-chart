import { axisLeft, axisTop } from 'd3-axis';
import { Placement } from '../chart-configuration';
export var drawGridLine = function (svgGeometry, scale, targetGroup, option) {
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
    if (scale.orient === Placement.TOP || scale.orient === Placement.BOTTOM) {
        targetAxis = axisTop(scale.scale).tickFormat(tickFmt).tickSize(-svgGeometry.height);
    }
    else {
        targetAxis = axisLeft(scale.scale).tickFormat(tickFmt).tickSize(-svgGeometry.width);
    }
    if (scale.tickSize) {
        targetAxis.ticks(scale.tickSize);
    }
    var gridLines = gridLineGroup.call(targetAxis);
    gridLines.select('path').remove();
    if (scale.orient === Placement.LEFT || scale.orient === Placement.RIGHT) {
        gridLines.select('g').remove();
    }
    gridLines.selectAll('line').style('stroke', option.color);
    gridLines.lower();
    return gridLines;
};
//# sourceMappingURL=index.js.map