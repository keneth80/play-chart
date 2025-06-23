import { PlayChart } from '../../play-chart';
import { BasicCanvasWebgLineSeriesOne, BasicCanvasWebglLineSeriesOneConfiguration } from './basic-canvas-webgl-line-series-one';

export interface BasicCanvasWebglLineChartConfig {
    selector: string;
    data: any[];
    margin?: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    axes?: any[];
    isResize?: boolean;
    series?: Partial<BasicCanvasWebglLineSeriesOneConfiguration>;
}

export class BasicCanvasWebglLineChart {
    private chart: PlayChart;

    constructor(config: BasicCanvasWebglLineChartConfig) {
        this.chart = new PlayChart({
            selector: config.selector,
            data: config.data,
            margin: config.margin || {
                left: 50,
                right: 80,
                top: 10,
                bottom: 10
            },
            isResize: config.isResize || false,
            axes: config.axes || [],
            series: [
                new BasicCanvasWebgLineSeriesOne({
                    ...config.series,
                } as BasicCanvasWebglLineSeriesOneConfiguration)
            ]
        });
    }

    draw() {
        return this.chart.draw();
    }

    setData(data: any[]) {
        this.chart.data(data);
        return this;
    }

    updateData(data: any[]) {
        return this.setData(data);
    }

    resize() {
        this.chart.draw();
        return this;
    }

    destroy() {
        this.chart.destroy();
    }
} 