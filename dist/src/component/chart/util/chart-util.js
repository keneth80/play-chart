import { BasicAreaSeries, BasicLineSeries, GroupedVerticalBarSeries } from '../../../component/series';
import { SeriesType } from '../series.interface';
export var defaultChartColors = function () {
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
export var makeSeriesByConfigurationType = function (configuration) {
    var series;
    switch (configuration.type) {
        case SeriesType.SVG_VERTICAL_BAR:
            series = new GroupedVerticalBarSeries(configuration);
            break;
        case SeriesType.SVG_LINE:
            series = new BasicLineSeries(configuration);
            break;
        case SeriesType.SVG_AREA:
            series = new BasicAreaSeries(configuration);
            break;
    }
    return series;
};
//# sourceMappingURL=chart-util.js.map