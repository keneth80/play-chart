import {
    BasicAreaSeries,
    BasicAreaSeriesConfiguration,
    BasicLineSeries,
    BasicLineSeriesConfiguration,
    GroupedVerticalBarSeries,
    GroupedVerticalBarSeriesConfiguration
} from '../../../component/series';
import {SeriesBase} from '../series-base';
import {SeriesConfiguration, SeriesType} from '../series.interface';

export const defaultChartColors = () => {
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

export const makeSeriesByConfigurationType = (configuration: SeriesConfiguration): SeriesBase => {
    let series: SeriesBase;
    switch (configuration.type) {
        case SeriesType.SVG_VERTICAL_BAR:
            series = new GroupedVerticalBarSeries(configuration as GroupedVerticalBarSeriesConfiguration);
            break;
        case SeriesType.SVG_LINE:
            series = new BasicLineSeries(configuration as BasicLineSeriesConfiguration);
            break;
        case SeriesType.SVG_AREA:
            series = new BasicAreaSeries(configuration as BasicAreaSeriesConfiguration);
            break;
    }
    return series;
};
