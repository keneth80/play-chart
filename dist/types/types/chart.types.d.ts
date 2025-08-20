import { DataPoint } from './data.types';
import { SeriesConfiguration } from './series.types';
export interface ChartDimensions {
    width: number;
    height: number;
    margin: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
}
export interface ChartTheme {
    colors: string[];
    fontFamily: string;
    fontSize: number;
    grid: {
        color: string;
        opacity: number;
    };
    axis: {
        color: string;
        fontSize: number;
    };
}
export interface AxisConfiguration {
    field: string;
    type: 'linear' | 'category' | 'time';
    position: 'left' | 'right' | 'top' | 'bottom';
    title?: string;
    format?: string;
    min?: number;
    max?: number;
    ticks?: number;
    gridLines?: boolean;
}
export interface TooltipConfiguration {
    enabled: boolean;
    formatter?: (data: DataPoint) => string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    offset?: number;
}
export interface LegendConfiguration {
    enabled: boolean;
    position?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
}
export interface ZoomConfiguration {
    enabled: boolean;
    direction?: 'x' | 'y' | 'both';
    minZoom?: number;
    maxZoom?: number;
}
export interface ChartConfiguration<T extends DataPoint = DataPoint> {
    selector: string;
    dimensions: ChartDimensions;
    theme?: ChartTheme;
    series: SeriesConfiguration<T>[];
    axes: AxisConfiguration[];
    tooltip?: TooltipConfiguration;
    legend?: LegendConfiguration;
    zoom?: ZoomConfiguration;
}
//# sourceMappingURL=chart.types.d.ts.map