import { generatorCanvasFunctions, generatorCommomConfiguration, generatorFunctions, generatorOptions } from './component/chart-generator';
import { PlayChart } from './component/play-chart';
import { BasicAreaSeries, BasicCanvasTrace, BasicCanvasWebgLineSeriesOne, BasicLineSeries } from './component/series';
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
/*
 * desc: 캔버스 시리즈 출력 설정정보 맵핑.
 * argument:
 * 1. configuration: chart 설정정보
 * 2. series: 출력되는 시리즈 설정정보
 * 3. options: 시리즈 외에 출력되는 시리즈 설정정보
 */
export var CanvasTraceChart = function (configuration, series, options) {
    if (series === void 0) { series = []; }
    if (options === void 0) { options = []; }
    var chartConfiguration = generatorCommomConfiguration(configuration);
    chartConfiguration.series = series.map(function (traceConfiguration) {
        return new BasicCanvasTrace(traceConfiguration);
    });
    chartConfiguration.options = generatorOptions(options);
    chartConfiguration.functions = generatorCanvasFunctions(configuration);
    return new PlayChart(chartConfiguration);
};
// webgl 시리즈 출력 설정정보 맵핑.
export var WebglTraceChart = function (configuration, series, options) {
    if (series === void 0) { series = []; }
    if (options === void 0) { options = []; }
    var chartConfiguration = generatorCommomConfiguration(configuration);
    chartConfiguration.series = series.map(function (traceConfiguration) {
        return new BasicCanvasWebgLineSeriesOne(traceConfiguration);
    });
    chartConfiguration.options = generatorOptions(options);
    chartConfiguration.functions = generatorCanvasFunctions(configuration);
    return new PlayChart(chartConfiguration);
};
// svg 시리즈 출력 설정정보 맵핑.
export var SvgTraceChart = function (configuration, series, options) {
    if (series === void 0) { series = []; }
    if (options === void 0) { options = []; }
    var chartConfiguration = generatorCommomConfiguration(configuration);
    chartConfiguration.series = series.map(function (traceConfiguration) {
        return new BasicLineSeries(traceConfiguration);
    });
    chartConfiguration.options = generatorOptions(options);
    chartConfiguration.functions = generatorFunctions(configuration);
    return new PlayChart(chartConfiguration);
};
//# sourceMappingURL=line.js.map