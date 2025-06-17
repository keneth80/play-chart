import { Direction } from './chart/chart-configuration';
import { PlayChart } from './play-chart';
import { makeSeriesByConfigurationType } from './chart/util/chart-util';
import { BasicCanvasMouseHandler } from './functions/basic-canvas-mouse-handler';
import { BasicCanvasMouseZoomHandler } from './functions/basic-canvas-mouse-zoom-handler';
import { BasicSvgMouseGuideLineHandler } from './functions/basic-svg-mouse-guide-line-handler';
import { BasicSvgMouseHandler } from './functions/basic-svg-mouse-handler';
import { BasicSpecArea } from './options/basic-svg-spec-area';
import { BasicStepArea } from './options/basic-svg-step-area';
import { BasicStepLine } from './options/basic-svg-step-line';
import { BasicTopology } from './series';
import { BasicAreaSeries } from './series/svg/basic-area-series';
import { BasicDonutSeries } from './series/svg/basic-donut-series';
import { GroupedHorizontalBarSeries } from './series/svg/grouped-horizontal-bar-series';
import { GroupedVerticalBarSeries } from './series/svg/grouped-vertical-bar-series';
import { StackedHorizontalBarSeries } from './series/svg/stacked-horizontal-bar-series';
import { StackedVerticalBarSeries } from './series/svg/stacked-vertical-bar-series';
export var SvgDonuttChart = function (configuration, series, options) {
    if (series === void 0) { series = []; }
    if (options === void 0) { options = []; }
    var chartConfiguration = generatorCommomConfiguration(configuration);
    chartConfiguration.series = series.map(function (seriesConfiguration) {
        return new BasicDonutSeries(seriesConfiguration);
    });
    chartConfiguration.options = generatorOptions(options);
    chartConfiguration.functions = generatorFunctions(configuration);
    return new PlayChart(chartConfiguration);
};
export var SvgAreaChart = function (configuration, series, options) {
    if (series === void 0) { series = []; }
    if (options === void 0) { options = []; }
    var chartConfiguration = generatorCommomConfiguration(configuration);
    chartConfiguration.series = series.map(function (traceConfiguration) {
        return new BasicAreaSeries(traceConfiguration);
    });
    chartConfiguration.options = generatorOptions(options);
    chartConfiguration.functions = generatorFunctions(configuration);
    return new PlayChart(chartConfiguration);
};
// svg 시리즈 출력 설정정보 맵핑.
export var SvgGroupedBarChart = function (configuration, series, options, direction) {
    if (options === void 0) { options = []; }
    if (direction === void 0) { direction = Direction.VERTICAL; }
    var chartConfiguration = generatorCommomConfiguration(configuration);
    chartConfiguration.series = [direction === Direction.VERTICAL ? new GroupedVerticalBarSeries(series) : new GroupedHorizontalBarSeries(series)];
    chartConfiguration.options = generatorOptions(options);
    chartConfiguration.functions = generatorFunctions(configuration);
    return new PlayChart(chartConfiguration);
};
export var SvgStackedBarChart = function (configuration, series, options, direction) {
    if (options === void 0) { options = []; }
    if (direction === void 0) { direction = Direction.VERTICAL; }
    var chartConfiguration = generatorCommomConfiguration(configuration);
    chartConfiguration.series = [direction === Direction.VERTICAL ? new StackedVerticalBarSeries(series) : new StackedHorizontalBarSeries(series)];
    chartConfiguration.options = generatorOptions(options);
    chartConfiguration.functions = generatorFunctions(configuration);
    return new PlayChart(chartConfiguration);
};
export var SvgMultiSeriesChart = function (configuration, series, options, direction) {
    if (options === void 0) { options = []; }
    if (direction === void 0) { direction = Direction.VERTICAL; }
    var chartConfiguration = generatorCommomConfiguration(configuration);
    chartConfiguration.series = series.map(function (seriesItem) { return makeSeriesByConfigurationType(seriesItem); }); // configuration type을 체크 해야함.
    chartConfiguration.options = generatorOptions(options);
    chartConfiguration.functions = generatorFunctions(configuration);
    return new PlayChart(chartConfiguration);
};
export var SvgTopology = function (configuration) {
    var chartConfiguration = generatorCommomConfiguration(configuration);
    chartConfiguration.series = [
        new BasicTopology({
            selector: 'topology'
        })
    ];
    return new PlayChart(chartConfiguration);
};
// 마우스 이벤트 같은 이벤트 함수설정 정보 맵핑.
export var generatorCanvasFunctions = function (config) {
    var functions = [];
    if (config.zoom) {
        functions.push(new BasicCanvasMouseZoomHandler(config.zoom));
    }
    else {
        functions.push(new BasicCanvasMouseHandler({ isMoveEvent: true }));
    }
    return functions;
};
// 마우스 이벤트 같은 이벤트 함수설정 정보 맵핑.
export var generatorFunctions = function (config) {
    var functions = [];
    if (config.zoom) {
        config.zoom.delayTime = 50;
        // functions.push(new BasicSvgMouseZoomHandler(config.zoom));
        functions.push(new BasicCanvasMouseZoomHandler(config.zoom));
    }
    else {
        functions.push(new BasicSvgMouseHandler({
            isMoveEvent: true,
            delayTime: 50
        }));
    }
    if (config.mouseGuideLine) {
        functions.push(new BasicSvgMouseGuideLineHandler(config.mouseGuideLine));
    }
    return functions;
};
// external 기능 출력 설정정보 맵핑.
export var generatorOptions = function (optionConfiguraions) {
    var options = optionConfiguraions
        .map(function (option) {
        return retriveOptionClass(option.name, option.configuration);
    })
        .filter(function (option) { return option; });
    return options;
};
// 공통부분 설정정보 맵핑
export var generatorCommomConfiguration = function (configuration) {
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
export var retriveOptionClass = function (className, configuration) {
    var optionItem;
    if (className === 'BasicSpecArea') {
        optionItem = new BasicSpecArea(configuration);
    }
    else if (className === 'BasicStepLine') {
        optionItem = new BasicStepLine(configuration);
    }
    else if (className === 'BasicStepArea') {
        optionItem = new BasicStepArea(configuration);
    }
    else {
        if (console && console.log) {
            console.log('not support option => ', className);
        }
    }
    return optionItem;
};
//# sourceMappingURL=chart-generator.js.map