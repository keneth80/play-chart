import { PlayChart } from '../../../../component/play-chart';
import { HorizontalPointerSeries, HorizontalPointerSeriesConfiguration } from './index';

export interface HorizontalPointerChartConfig {
    selector: string;
    data: number[];
    margin?: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    domain?: [number, number];
    unit?: string;
    isResize?: boolean;
}

export class HorizontalPointerChart {
    private chart: PlayChart;

    constructor(config: HorizontalPointerChartConfig) {
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
            axes: [],
            series: [
                new HorizontalPointerSeries({
                    selector: 'horizontal-pointer',
                    domain: config.domain || [0, 100],
                    unit: config.unit || '',
                } as HorizontalPointerSeriesConfiguration)
            ]
        });
    }

    draw() {
        return this.chart.draw();
    }

    setData(data: number[]) {
        this.chart.data(data);
        return this;
    }

    updateData(data: number[]) {
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
