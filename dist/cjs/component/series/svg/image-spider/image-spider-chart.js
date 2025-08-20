"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSpiderChart = void 0;
var play_chart_1 = require("../../../../component/play-chart");
var index_1 = require("./index");
var d3_array_1 = require("d3-array");
var ImageSpiderChart = /** @class */ (function () {
    function ImageSpiderChart(config) {
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
                new index_1.ImageSpiderSeries({
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
exports.ImageSpiderChart = ImageSpiderChart;
//# sourceMappingURL=image-spider-chart.js.map