import { axisBottom, axisLeft, axisTop, axisRight } from 'd3-axis';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import { Placement, ScaleType } from '../chart-configuration';
export var axisSetupByScale = function (scale) {
    var orientedAxis = null;
    if (scale.orient === Placement.RIGHT) {
        orientedAxis = axisRight(scale.scale);
    }
    else if (scale.orient === Placement.LEFT) {
        orientedAxis = axisLeft(scale.scale);
    }
    else if (scale.orient === Placement.TOP) {
        orientedAxis = axisTop(scale.scale);
    }
    else {
        orientedAxis = axisBottom(scale.scale);
    }
    if (scale.type === ScaleType.NUMBER) {
        if (scale.tickFormat) {
            orientedAxis.ticks(null, scale.tickFormat);
        }
        else {
            orientedAxis.tickFormat(format(',.1f'));
        }
    }
    else if (scale.type === ScaleType.TIME) {
        if (scale.tickFormat) {
            orientedAxis.tickFormat(timeFormat(scale.tickFormat));
        }
    }
    if (scale.tickSize) {
        orientedAxis.ticks(scale.tickSize);
    }
    // orientedAxis.tickSize(0);
    return orientedAxis;
};
//# sourceMappingURL=index.js.map