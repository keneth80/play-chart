"use strict";
exports.__esModule = true;
var play_chart_1 = require("play-chart");
var spider_1 = require("play-chart/spider");
var image_spider_1 = require("play-chart/image-spider");
var chart_images_1 = require("play-chart/chart-images");
// Dummy configuration for testing
var dummyChartConfig = {
    selector: '#dummy-chart',
    data: [],
    width: '100px',
    height: '100px'
};
var dummyImageSpiderConfig = {
    selector: '#dummy-image-spider-chart',
    data: [],
    margin: { left: 10, right: 10, top: 10, bottom: 10 },
    domain: [0, 10],
    range: [0, 100],
    tickCount: 5,
    tickVisible: true,
    labelFmt: function (d) { return d; },
    seriesImage: function (index) { return index === 0 ? chart_images_1.greenImage : chart_images_1.blueImage; },
    getSeriesInfo: function (index) { return index === 0 ? 'green_info' : 'blue_info'; },
    backgroundImage: chart_images_1.spiderGuide,
    isResize: true
};
var dummySpiderConfig = {
    selector: '#dummy-spider-chart',
    data: [],
    margin: { left: 10, right: 10, top: 10, bottom: 10 },
    domain: [0, 10],
    range: [0, 100],
    tickCount: 5,
    tickVisible: true,
    labelFmt: function (d) { return d; },
    isResize: true
};
try {
    var playChart = new play_chart_1.PlayChart(dummyChartConfig);
    console.log('PlayChart imported and instantiated successfully.', playChart);
    var spiderChart = new spider_1.SpiderChart(dummySpiderConfig);
    console.log('SpiderChart imported and instantiated successfully.', spiderChart);
    var imageSpiderChart = new image_spider_1.ImageSpiderChart(dummyImageSpiderConfig);
    console.log('ImageSpiderChart imported and instantiated successfully.', imageSpiderChart);
    console.log('spiderGuide, greenImage, blueImage also imported successfully.', chart_images_1.spiderGuide, chart_images_1.greenImage, chart_images_1.blueImage);
    console.log('All exports from package.json seem to be working correctly.');
}
catch (error) {
    console.error('Error during import or instantiation:', error);
}
