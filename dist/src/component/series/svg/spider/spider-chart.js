import { PlayChart } from '../../../../component/play-chart';
import { SpiderSeries } from './index';
import { max } from 'd3-array';
var SpiderChart = /** @class */ (function () {
    function SpiderChart(config) {
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
                new SpiderSeries({
                    selector: 'spider',
                    domain: config.domain || [0, 10],
                    range: config.range || [0, 250],
                    features: this.features,
                    tick: {
                        tickCount: config.tickCount || 5,
                        tickVisible: config.tickVisible !== undefined ? config.tickVisible : true
                    },
                    labelFmt: config.labelFmt,
                    labelWidth: config.labelWidth || 60
                })
            ]
        });
    }
    SpiderChart.prototype.draw = function () {
        return this.chart.draw();
    };
    SpiderChart.prototype.setData = function (data) {
        this.chart.data(data);
        return this;
    };
    SpiderChart.prototype.updateData = function (data) {
        return this.setData(data);
    };
    SpiderChart.prototype.resize = function () {
        this.chart.draw();
        return this;
    };
    SpiderChart.prototype.destroy = function () {
        this.chart.destroy();
    };
    return SpiderChart;
}());
export { SpiderChart };
//# sourceMappingURL=spider-chart.js.map