import { PlayChart } from '../../../../component/play-chart';
import { ImageSpiderSeries } from './index';
import { max } from 'd3-array';
var ImageSpiderChart = /** @class */ (function () {
    function ImageSpiderChart(config) {
        this.features = Object.keys(config.data[0]).sort();
        this.chart = new PlayChart({
            selector: config.selector,
            data: config.data,
            margin: config.margin || {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            },
            min: 0,
            max: max(config.data, function (d) { return Math.max.apply(Math, Object.values(d)); }),
            isResize: config.isResize || false,
            axes: [],
            series: [
                new ImageSpiderSeries({
                    selector: 'image-spider',
                    domain: config.domain || [0, 10],
                    range: config.range || [0, 250],
                    features: this.features,
                    tick: {
                        tickCount: config.tickCount || 5,
                        tickVisible: config.tickVisible !== undefined ? config.tickVisible : true
                    },
                    labelFmt: config.labelFmt,
                    labelColor: config.labelColor,
                    labelDecoration: config.labelDecoration,
                    seriesImage: config.seriesImage,
                    backgroundImage: config.backgroundImage,
                    getSeriesInfo: config.getSeriesInfo
                })
            ]
        });
    }
    ImageSpiderChart.prototype.draw = function () {
        return this.chart.draw();
    };
    ImageSpiderChart.prototype.setData = function (data) {
        this.chart.data(data);
        return this;
    };
    ImageSpiderChart.prototype.updateData = function (data) {
        return this.setData(data);
    };
    ImageSpiderChart.prototype.resize = function () {
        this.chart.draw();
        return this;
    };
    ImageSpiderChart.prototype.destroy = function () {
        this.chart.destroy();
    };
    return ImageSpiderChart;
}());
export { ImageSpiderChart };
//# sourceMappingURL=image-spider-chart.js.map