import {ChartConfiguration} from './component/chart';
import {generatorCommomConfiguration} from './component/chart-generator';
import {BaseConfiguration, PlayChart} from './component/play-chart';
import {SpiderSeries, SpiderSeriesConfiguration} from './component/series/svg/spider';

/*
 * @title: svg 방사형 차트
 * argument:
 * 1. configuration: chart 설정정보
 * 2. series: 출력되는 시리즈 설정정보
 * 3. options: 시리즈 외에 출력되는 시리즈 설정정보
 */
export const spiderChartBySvg = (configuration: BaseConfiguration, seriesConfiguration: SpiderSeriesConfiguration): PlayChart => {
    const chartConfiguration: ChartConfiguration = generatorCommomConfiguration(configuration);

    chartConfiguration.series = [new SpiderSeries(seriesConfiguration)];

    return new PlayChart(chartConfiguration);
};
