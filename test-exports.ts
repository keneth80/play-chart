import { PlayChart } from 'play-chart';
import { SpiderChart } from 'play-chart/spider';
import { ImageSpiderChart, SpiderData } from 'play-chart/image-spider';
import { spiderGuide, greenImage, blueImage } from 'play-chart/chart-images';

// Dummy configuration for testing
const dummyChartConfig = {
    selector: '#dummy-chart',
    data: [] as any[],
    width: '100px',
    height: '100px'
};

const dummyImageSpiderConfig = {
    selector: '#dummy-image-spider-chart',
    data: [] as SpiderData[],
    margin: { left: 10, right: 10, top: 10, bottom: 10 },
    domain: [0, 10] as [number, number],
    range: [0, 100] as [number, number],
    tickCount: 5,
    tickVisible: true,
    labelFmt: (d: string) => d,
    seriesImage: (index: number) => index === 0 ? greenImage : blueImage,
    getSeriesInfo: (index: number) => index === 0 ? 'green_info' : 'blue_info',
    backgroundImage: spiderGuide,
    isResize: true
};

const dummySpiderConfig = {
    selector: '#dummy-spider-chart',
    data: [] as any[],
    margin: { left: 10, right: 10, top: 10, bottom: 10 },
    domain: [0, 10] as [number, number],
    range: [0, 100] as [number, number],
    tickCount: 5,
    tickVisible: true,
    labelFmt: (d: string) => d,
    isResize: true
};

try {
    const playChart = new PlayChart(dummyChartConfig);
    console.log('PlayChart imported and instantiated successfully.', playChart);

    const spiderChart = new SpiderChart(dummySpiderConfig);
    console.log('SpiderChart imported and instantiated successfully.', spiderChart);

    const imageSpiderChart = new ImageSpiderChart(dummyImageSpiderConfig);
    console.log('ImageSpiderChart imported and instantiated successfully.', imageSpiderChart);

    console.log('spiderGuide, greenImage, blueImage also imported successfully.', spiderGuide, greenImage, blueImage);

    console.log('All exports from package.json seem to be working correctly.');

} catch (error) {
    console.error('Error during import or instantiation:', error);
} 