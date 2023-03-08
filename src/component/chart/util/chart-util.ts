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
        '#A300D6',
        '#7D02EB',
        '#5653FE',
        '#2983FF',
        '#00B1F2',
        '#E2C044',
        '#F46036',
        '#2E294E',
        '#1B998B',
        '#C5D86D',
        '#FD6A6A',
        '#F9A3A4'
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
