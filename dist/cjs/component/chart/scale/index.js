"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.axisSetupByScale = void 0;
var d3_axis_1 = require("d3-axis");
var d3_format_1 = require("d3-format");
var d3_time_format_1 = require("d3-time-format");
var chart_configuration_1 = require("../chart-configuration");
var axisSetupByScale = function (scale) {
    var orientedAxis = null;
    if (scale.orient === chart_configuration_1.Placement.RIGHT) {
        orientedAxis = (0, d3_axis_1.axisRight)(scale.scale);
    }
    else if (scale.orient === chart_configuration_1.Placement.LEFT) {
        orientedAxis = (0, d3_axis_1.axisLeft)(scale.scale);
    }
    else if (scale.orient === chart_configuration_1.Placement.TOP) {
        orientedAxis = (0, d3_axis_1.axisTop)(scale.scale);
    }
    else {
        orientedAxis = (0, d3_axis_1.axisBottom)(scale.scale);
    }
    if (scale.type === chart_configuration_1.ScaleType.NUMBER) {
        if (scale.tickFormat) {
            orientedAxis.ticks(null, scale.tickFormat);
        }
        else {
            orientedAxis.tickFormat((0, d3_format_1.format)(',.1f'));
        }
    }
    else if (scale.type === chart_configuration_1.ScaleType.TIME) {
        if (scale.tickFormat) {
            orientedAxis.tickFormat((0, d3_time_format_1.timeFormat)(scale.tickFormat));
        }
    }
    if (scale.tickSize) {
        orientedAxis.ticks(scale.tickSize);
    }
    // orientedAxis.tickSize(0);
    return orientedAxis;
};
exports.axisSetupByScale = axisSetupByScale;
//# sourceMappingURL=index.js.map