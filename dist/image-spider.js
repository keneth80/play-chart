import { generatorCommomConfiguration } from './component/chart-generator';
import { PlayChart } from './component/play-chart';
import { ImageSpiderSeries } from './component/series/svg/image-spider';
/*
 * @title: svg 방사형 차트
 * argument:
 * 1. configuration: chart 설정정보
 * 2. series: 출력되는 시리즈 설정정보
 * 3. options: 시리즈 외에 출력되는 시리즈 설정정보
 */
export var spiderChartBySvg = function (configuration, seriesConfiguration) {
    var chartConfiguration = generatorCommomConfiguration(configuration);
    chartConfiguration.series = [new ImageSpiderSeries(seriesConfiguration)];
    return new PlayChart(chartConfiguration);
};
export { ImageSpiderSeries };
//# sourceMappingURL=image-spider.js.map