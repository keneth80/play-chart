"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retriveOptionClass = exports.generatorCommomConfiguration = exports.generatorOptions = exports.generatorFunctions = exports.generatorCanvasFunctions = exports.SvgTopology = exports.SvgMultiSeriesChart = exports.SvgStackedBarChart = exports.SvgGroupedBarChart = exports.SvgAreaChart = exports.SvgDonuttChart = void 0;
var chart_configuration_1 = require("./chart/chart-configuration");
var play_chart_1 = require("./play-chart");
var chart_util_1 = require("./chart/util/chart-util");
var basic_canvas_mouse_handler_1 = require("./functions/basic-canvas-mouse-handler");
var basic_canvas_mouse_zoom_handler_1 = require("./functions/basic-canvas-mouse-zoom-handler");
var basic_svg_mouse_guide_line_handler_1 = require("./functions/basic-svg-mouse-guide-line-handler");
var basic_svg_mouse_handler_1 = require("./functions/basic-svg-mouse-handler");
var basic_svg_spec_area_1 = require("./options/basic-svg-spec-area");
var basic_svg_step_area_1 = require("./options/basic-svg-step-area");
var basic_svg_step_line_1 = require("./options/basic-svg-step-line");
var series_1 = require("./series");
var basic_area_series_1 = require("./series/svg/basic-area-series");
var basic_donut_series_1 = require("./series/svg/basic-donut-series");
var grouped_horizontal_bar_series_1 = require("./series/svg/grouped-horizontal-bar-series");
var grouped_vertical_bar_series_1 = require("./series/svg/grouped-vertical-bar-series");
var stacked_horizontal_bar_series_1 = require("./series/svg/stacked-horizontal-bar-series");
var stacked_vertical_bar_series_1 = require("./series/svg/stacked-vertical-bar-series");
var SvgDonuttChart = function (configuration, series, options) {
    if (series === void 0) { series = []; }
    if (options === void 0) { options = []; }
    var chartConfiguration = (0, exports.generatorCommomConfiguration)(configuration);
    chartConfiguration.series = series.map(function (seriesConfiguration) {
        return new basic_donut_series_1.BasicDonutSeries(seriesConfiguration);
    });
    chartConfiguration.options = (0, exports.generatorOptions)(options);
    chartConfiguration.functions = (0, exports.generatorFunctions)(configuration);
    return new play_chart_1.PlayChart(chartConfiguration);
};
exports.SvgDonuttChart = SvgDonuttChart;
var SvgAreaChart = function (configuration, series, options) {
    if (series === void 0) { series = []; }
    if (options === void 0) { options = []; }
    var chartConfiguration = (0, exports.generatorCommomConfiguration)(configuration);
    chartConfiguration.series = series.map(function (traceConfiguration) {
        return new basic_area_series_1.BasicAreaSeries(traceConfiguration);
    });
    chartConfiguration.options = (0, exports.generatorOptions)(options);
    chartConfiguration.functions = (0, exports.generatorFunctions)(configuration);
    return new play_chart_1.PlayChart(chartConfiguration);
};
exports.SvgAreaChart = SvgAreaChart;
// svg 시리즈 출력 설정정보 맵핑.
var SvgGroupedBarChart = function (configuration, series, options, direction) {
    if (options === void 0) { options = []; }
    if (direction === void 0) { direction = chart_configuration_1.Direction.VERTICAL; }
    var chartConfiguration = (0, exports.generatorCommomConfiguration)(configuration);
    chartConfiguration.series = [direction === chart_configuration_1.Direction.VERTICAL ? new grouped_vertical_bar_series_1.GroupedVerticalBarSeries(series) : new grouped_horizontal_bar_series_1.GroupedHorizontalBarSeries(series)];
    chartConfiguration.options = (0, exports.generatorOptions)(options);
    chartConfiguration.functions = (0, exports.generatorFunctions)(configuration);
    return new play_chart_1.PlayChart(chartConfiguration);
};
exports.SvgGroupedBarChart = SvgGroupedBarChart;
var SvgStackedBarChart = function (configuration, series, options, direction) {
    if (options === void 0) { options = []; }
    if (direction === void 0) { direction = chart_configuration_1.Direction.VERTICAL; }
    var chartConfiguration = (0, exports.generatorCommomConfiguration)(configuration);
    chartConfiguration.series = [direction === chart_configuration_1.Direction.VERTICAL ? new stacked_vertical_bar_series_1.StackedVerticalBarSeries(series) : new stacked_horizontal_bar_series_1.StackedHorizontalBarSeries(series)];
    chartConfiguration.options = (0, exports.generatorOptions)(options);
    chartConfiguration.functions = (0, exports.generatorFunctions)(configuration);
    return new play_chart_1.PlayChart(chartConfiguration);
};
exports.SvgStackedBarChart = SvgStackedBarChart;
var SvgMultiSeriesChart = function (configuration, series, options, direction) {
    if (options === void 0) { options = []; }
    if (direction === void 0) { direction = chart_configuration_1.Direction.VERTICAL; }
    var chartConfiguration = (0, exports.generatorCommomConfiguration)(configuration);
    chartConfiguration.series = series.map(function (seriesItem) { return (0, chart_util_1.makeSeriesByConfigurationType)(seriesItem); }); // configuration type을 체크 해야함.
    chartConfiguration.options = (0, exports.generatorOptions)(options);
    chartConfiguration.functions = (0, exports.generatorFunctions)(configuration);
    return new play_chart_1.PlayChart(chartConfiguration);
};
exports.SvgMultiSeriesChart = SvgMultiSeriesChart;
var SvgTopology = function (configuration) {
    var chartConfiguration = (0, exports.generatorCommomConfiguration)(configuration);
    chartConfiguration.series = [
        new series_1.BasicTopology({
            selector: 'topology'
        })
    ];
    return new play_chart_1.PlayChart(chartConfiguration);
};
exports.SvgTopology = SvgTopology;
// 마우스 이벤트 같은 이벤트 함수설정 정보 맵핑.
var generatorCanvasFunctions = function (config) {
    var functions = [];
    if (config.zoom) {
        functions.push(new basic_canvas_mouse_zoom_handler_1.BasicCanvasMouseZoomHandler(config.zoom));
    }
    else {
        functions.push(new basic_canvas_mouse_handler_1.BasicCanvasMouseHandler({ isMoveEvent: true }));
    }
    return functions;
};
exports.generatorCanvasFunctions = generatorCanvasFunctions;
// 마우스 이벤트 같은 이벤트 함수설정 정보 맵핑.
var generatorFunctions = function (config) {
    var functions = [];
    if (config.zoom) {
        config.zoom.delayTime = 50;
        // functions.push(new BasicSvgMouseZoomHandler(config.zoom));
        functions.push(new basic_canvas_mouse_zoom_handler_1.BasicCanvasMouseZoomHandler(config.zoom));
    }
    else {
        functions.push(new basic_svg_mouse_handler_1.BasicSvgMouseHandler({
            isMoveEvent: true,
            delayTime: 50
        }));
    }
    if (config.mouseGuideLine) {
        functions.push(new basic_svg_mouse_guide_line_handler_1.BasicSvgMouseGuideLineHandler(config.mouseGuideLine));
    }
    return functions;
};
exports.generatorFunctions = generatorFunctions;
// external 기능 출력 설정정보 맵핑.
var generatorOptions = function (optionConfiguraions) {
    var options = optionConfiguraions
        .map(function (option) {
        return (0, exports.retriveOptionClass)(option.name, option.configuration);
    })
        .filter(function (option) { return option; });
    return options;
};
exports.generatorOptions = generatorOptions;
// 공통부분 설정정보 맵핑
var generatorCommomConfiguration = function (configuration) {
    var chartConfiguration = {
        selector: configuration.selector,
        style: configuration.style,
        tooltip: configuration.tooltip,
        title: configuration.title,
        isResize: configuration.isResize,
        legend: configuration.legend,
        margin: configuration.margin,
        axes: configuration.axes,
        data: configuration.data,
        displayDelay: configuration.displayDelay
    };
    return chartConfiguration;
};
exports.generatorCommomConfiguration = generatorCommomConfiguration;
var retriveOptionClass = function (className, configuration) {
    var optionItem;
    if (className === 'BasicSpecArea') {
        optionItem = new basic_svg_spec_area_1.BasicSpecArea(configuration);
    }
    else if (className === 'BasicStepLine') {
        optionItem = new basic_svg_step_line_1.BasicStepLine(configuration);
    }
    else if (className === 'BasicStepArea') {
        optionItem = new basic_svg_step_area_1.BasicStepArea(configuration);
    }
    else {
        if (console && console.log) {
            console.log('not support option => ', className);
        }
    }
    return optionItem;
};
exports.retriveOptionClass = retriveOptionClass;
//# sourceMappingURL=chart-generator.js.map