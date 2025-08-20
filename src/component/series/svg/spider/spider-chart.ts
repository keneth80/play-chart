import { PlayChart } from '../../../../component/play-chart';
import { SpiderSeries } from './index';
import { max } from 'd3-array';

export interface SpiderData {
    [key: string]: number;
}

export interface SpiderChartConfig {
    selector: string;
    data: SpiderData[];
    margin?: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    domain?: [number, number];
    range?: [number, number];
    tickCount?: number;
    tickVisible?: boolean;
    labelWidth?: number;
    labelFmt?: (d: string) => string;
    isResize?: boolean;
}

export class SpiderChart {
    private chart: PlayChart;
    private features: string[];

    constructor(config: SpiderChartConfig) {
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
            max: max(config.data, (d: SpiderData) => Math.max(...Object.values(d) as number[])),
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

    draw() {
        return this.chart.draw();
    }

    setData(data: SpiderData[]) {
        this.chart.data(data);
        return this;
    }

    updateData(data: SpiderData[]) {
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