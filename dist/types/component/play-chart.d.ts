import { ChartBase } from './chart/chart-base';
import { Axes, ChartConfiguration, ChartLegend, ChartStyle, ChartTitle, ChartTooltip, Margin } from './chart/chart-configuration';
import { BasicSvgMouseGuideLineHandlerConfiguration } from './functions';
import { BasicCanvasTraceConfiguration, BasicCanvasWebglLineSeriesOneConfiguration } from './series';
export interface OptionConfiguration {
    name: any;
    configuration: any;
}
export interface ZoomConfiguration {
    xDirection?: string;
    yDirection?: string;
    direction?: string;
    delayTime?: number;
}
export interface BaseConfiguration<T = any> {
    selector: string;
    style?: ChartStyle;
    tooltip?: ChartTooltip;
    title?: ChartTitle;
    isResize?: boolean;
    legend?: ChartLegend;
    margin?: Margin;
    axes?: Axes[];
    data: T[];
    colors?: string[];
    zoom?: ZoomConfiguration;
    mouseGuideLine?: BasicSvgMouseGuideLineHandlerConfiguration;
    options?: OptionConfiguration;
    displayDelay?: {
        delayTime: number;
    };
}
export interface CanvasTraceChartConfiguration extends BaseConfiguration {
    series: BasicCanvasTraceConfiguration[];
}
export interface WebglTraceChartConfiguration extends BaseConfiguration {
    series: BasicCanvasWebglLineSeriesOneConfiguration[];
}
export declare class PlayChart<T = any> extends ChartBase {
    protected originalData: T[];
    constructor(configuration: ChartConfiguration);
    bootstrap(configuration: ChartConfiguration): void;
}
//# sourceMappingURL=play-chart.d.ts.map