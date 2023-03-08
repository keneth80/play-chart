import { BasicAreaSeries, BasicLineSeries, GroupedVerticalBarSeries } from '../../../component/series';
import { SeriesType } from '../series.interface';
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