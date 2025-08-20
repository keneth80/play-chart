import { PlayChart } from '../../../../component/play-chart';
export interface SpiderData {
    [key: string]: number;
}
export interface ImageSpiderChartConfig {
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
    labelFmt?: (d: string) => string;
    labelColor?: (text: string) => string;
    labelDecoration?: (text: string) => string;
    seriesImage: (index: number) => {};
    backgroundImage: any;
    getSeriesInfo: (index: number) => string;
    isResize?: boolean;
}
export declare class ImageSpiderChart {
    private chart;
    private features;
    constructor(config: ImageSpiderChartConfig);
    draw(): PlayChart<any>;
    setData(data: SpiderData[]): this;
    updateData(data: SpiderData[]): this;
    resize(): this;
    destroy(): void;
}
//# sourceMappingURL=image-spider-chart.d.ts.map