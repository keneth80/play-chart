import { PlayChart } from 'play-chart';
import { SpiderChart } from 'play-chart/spider';
import { ImageSpiderChart } from 'play-chart/image-spider';
import { spiderGuide, greenImage, blueImage } from 'play-chart/chart-images';
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
    seriesImage: function (index) { return index === 0 ? greenImage : blueImage; },
    getSeriesInfo: function (index) { return index === 0 ? 'green_info' : 'blue_info'; },
    backgroundImage: spiderGuide,
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
    var playChart = new PlayChart(dummyChartConfig);
    console.log('PlayChart imported and instantiated successfully.', playChart);
    var spiderChart = new SpiderChart(dummySpiderConfig);
    console.log('SpiderChart imported and instantiated successfully.', spiderChart);
    var imageSpiderChart = new ImageSpiderChart(dummyImageSpiderConfig);
    console.log('ImageSpiderChart imported and instantiated successfully.', imageSpiderChart);
    console.log('spiderGuide, greenImage, blueImage also imported successfully.', spiderGuide, greenImage, blueImage);
    console.log('All exports from package.json seem to be working correctly.');
}
catch (error) {
    console.error('Error during import or instantiation:', error);
}
//# sourceMappingURL=test-exports.js.map