import { ChartConfiguration, Direction } from './chart/chart-configuration';
import { PlayChart } from './play-chart';
import { IFunctions } from './chart/functions.interface';
import { SeriesConfiguration } from './chart/series.interface';
import { IOptions } from './chart/options.interface';
import { BaseConfiguration, OptionConfiguration } from './play-chart';
import { BasicAreaSeriesConfiguration } from './series/svg/basic-area-series';
import { BasicDonutSeriesConfiguration } from './series/svg/basic-donut-series';
import { GroupedHorizontalBarSeriesConfiguration } from './series/svg/grouped-horizontal-bar-series';
import { GroupedVerticalBarSeriesConfiguration } from './series/svg/grouped-vertical-bar-series';
import { StackedHorizontalBarSeriesConfiguration } from './series/svg/stacked-horizontal-bar-series';
import { StackedVerticalBarSeriesConfiguration } from './series/svg/stacked-vertical-bar-series';
export declare const SvgDonuttChart: (configuration: BaseConfiguration, series?: BasicDonutSeriesConfiguration[], options?: OptionConfiguration[]) => PlayChart;
export declare const SvgAreaChart: (configuration: BaseConfiguration, series?: BasicAreaSeriesConfiguration[], options?: OptionConfiguration[]) => PlayChart;
export declare const SvgGroupedBarChart: (configuration: BaseConfiguration, series: GroupedVerticalBarSeriesConfiguration | GroupedHorizontalBarSeriesConfiguration, options?: OptionConfiguration[], direction?: Direction) => PlayChart;
export declare const SvgStackedBarChart: (configuration: BaseConfiguration, series: StackedVerticalBarSeriesConfiguration | StackedHorizontalBarSeriesConfiguration, options?: OptionConfiguration[], direction?: Direction) => PlayChart;
export declare const SvgMultiSeriesChart: (configuration: BaseConfiguration, series: SeriesConfiguration[], options?: OptionConfiguration[], direction?: Direction) => PlayChart;
export declare const SvgTopology: (configuration: BaseConfiguration) => PlayChart<any>;
export declare const generatorCanvasFunctions: (config: BaseConfiguration) => IFunctions[];
export declare const generatorFunctions: (config: BaseConfiguration) => IFunctions[];
export declare const generatorOptions: (optionConfiguraions: OptionConfiguration[]) => IOptions[];
export declare const generatorCommomConfiguration: (configuration: BaseConfiguration) => ChartConfiguration;
export declare const retriveOptionClass: (className: string, configuration: any) => IOptions;
//# sourceMappingURL=chart-generator.d.ts.map