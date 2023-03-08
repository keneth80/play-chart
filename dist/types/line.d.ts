import { BaseConfiguration, OptionConfiguration, PlayChart } from './component/play-chart';
import { BasicAreaSeriesConfiguration, BasicCanvasTraceConfiguration, BasicCanvasWebglLineSeriesOneConfiguration, BasicLineSeriesConfiguration } from './component/series';
export declare const SvgAreaChart: (configuration: BaseConfiguration, series?: BasicAreaSeriesConfiguration[], options?: OptionConfiguration[]) => PlayChart;
export declare const CanvasTraceChart: (configuration: BaseConfiguration, series?: BasicCanvasTraceConfiguration[], options?: OptionConfiguration[]) => PlayChart;
export declare const WebglTraceChart: (configuration: BaseConfiguration, series?: BasicCanvasWebglLineSeriesOneConfiguration[], options?: OptionConfiguration[]) => PlayChart;
export declare const SvgTraceChart: (configuration: BaseConfiguration, series?: BasicLineSeriesConfiguration[], options?: OptionConfiguration[]) => PlayChart;
//# sourceMappingURL=line.d.ts.map