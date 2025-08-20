import { Selection, BaseType } from 'd3-selection';
import { Margin } from '../chart-configuration';
import { ContainerSize, LegendItem } from '../chart.interface';
import { ISeries } from '../series.interface';
export interface ChartLegendConfiguration {
    isCheckBox: boolean;
    isAll: boolean;
    addTitleWidth: number;
    placement: string;
    align?: string;
    colors: string[];
    defaultLegendStyle: any;
    onLegendLabelItemClickHandler?: any;
    onLegendCheckBoxClickHandler?: any;
    seriesList: ISeries[];
    margin: Margin;
    svgGeometry: ContainerSize;
    mainGeometry: ContainerSize;
}
export declare const legendItemListByGrouped: (displayNames: string[], colors?: string[]) => LegendItem[];
export declare class ChartLegend {
    private configuration;
    private legendItemList;
    private legendItemSize;
    private legendContainerSize;
    private legendTopBottmPadding;
    private legendRightLeftPadding;
    private addAllWidth;
    private legendRowCount;
    private legendPadding;
    private checkBoxWidth;
    private legendItemTextHeight;
    private allWidth;
    private totalLegendWidth;
    private legendTextWidthList;
    private paddingQueue;
    private checkboxPadding;
    private scrollBar;
    private scrollEventSubscription;
    constructor(configuration: ChartLegendConfiguration);
    parseLegendData(seriesList: ISeries[]): LegendItem[];
    init(): ContainerSize;
    drawLegend(legendGroup: Selection<BaseType, any, BaseType, any>): void;
    destroy(): void;
    private drawLegendContainerBackground;
    private addEvent;
}
//# sourceMappingURL=index.d.ts.map