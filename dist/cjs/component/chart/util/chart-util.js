"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSeriesByConfigurationType = exports.defaultChartColors = void 0;
var series_1 = require("../../../component/series");
var series_interface_1 = require("../series.interface");
var defaultChartColors = function () {
    return [
        '#FF4560',
        '#008FFB',
        '#00E396',
        '#775DD0',
        '#A300D6',
        '#1B998B',
        '#F46036',
        '#2E294E',
        '#90EE7E',
        '#4CAF50',
        '#81D4FA',
        '#5653FE'
    ];
};
exports.defaultChartColors = defaultChartColors;
var makeSeriesByConfigurationType = function (configuration) {
    var series;
    switch (configuration.type) {
        case series_interface_1.SeriesType.SVG_VERTICAL_BAR:
            series = new series_1.GroupedVerticalBarSeries(configuration);
            break;
        case series_interface_1.SeriesType.SVG_LINE:
            series = new series_1.BasicLineSeries(configuration);
            break;
        case series_interface_1.SeriesType.SVG_AREA:
            series = new series_1.BasicAreaSeries(configuration);
            break;
    }
    return series;
};
exports.makeSeriesByConfigurationType = makeSeriesByConfigurationType;
//# sourceMappingURL=chart-util.js.map