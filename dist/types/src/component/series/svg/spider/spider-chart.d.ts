import { PlayChart } from '../../../../component/play-chart';
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
export declare class SpiderChart {
    private chart;
    private features;
    constructor(config: SpiderChartConfig);
    draw(): PlayChart<any>;
    setData(data: SpiderData[]): this;
    updateData(data: SpiderData[]): this;
    resize(): this;
    destroy(): void;
}
//# sourceMappingURL=spider-chart.d.ts.map