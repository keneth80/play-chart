"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiderChart = void 0;
var play_chart_1 = require("../../../../component/play-chart");
var index_1 = require("./index");
var d3_array_1 = require("d3-array");
var SpiderChart = /** @class */ (function () {
    function SpiderChart(config) {
        this.features = Object.keys(config.data[0]).sort();
        this.chart = new play_chart_1.PlayChart({
            selector: config.selector,
            data: config.data,
            margin: config.margin || {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            },
            min: 0,
            max: (0, d3_array_1.max)(config.data, function (d) { return Math.max.apply(Math, Object.values(d)); }),
            isResize: config.isResize || false,
            axes: [],
            series: [
                new index_1.SpiderSeries({
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
exports.SpiderChart = SpiderChart;
//# sourceMappingURL=spider-chart.js.map