"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spiderChartBySvg = void 0;
var chart_generator_1 = require("./component/chart-generator");
var play_chart_1 = require("./component/play-chart");
var spider_1 = require("./component/series/svg/spider");
/*
 * @title: svg 방사형 차트
 * argument:
 * 1. configuration: chart 설정정보
 * 2. series: 출력되는 시리즈 설정정보
 * 3. options: 시리즈 외에 출력되는 시리즈 설정정보
 */
var spiderChartBySvg = function (configuration, seriesConfiguration) {
    var chartConfiguration = (0, chart_generator_1.generatorCommomConfiguration)(configuration);
    chartConfiguration.series = [new spider_1.SpiderSeries(seriesConfiguration)];
    return new play_chart_1.PlayChart(chartConfiguration);
};
exports.spiderChartBySvg = spiderChartBySvg;
//# sourceMappingURL=spider.js.map