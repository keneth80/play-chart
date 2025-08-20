import { DataPoint } from './data.types';
export type SeriesRendererType = 'svg' | 'canvas' | 'webgl';
export interface SeriesStyle {
    color: string;
    opacity?: number;
    strokeWidth?: number;
    fill?: string;
    stroke?: string;
}
export interface SeriesConfiguration<T extends DataPoint = DataPoint> {
    type: string;
    selector: string;
    displayName: string;
    shape: string;
    data: T[];
    style?: SeriesStyle;
    filter?: (data: T) => boolean;
    xField: keyof T;
    yField: keyof T;
    renderer?: SeriesRendererType;
}
export interface SeriesOptions {
    animation?: {
        duration: number;
        easing: string;
    };
    interaction?: {
        hoverable: boolean;
        selectable: boolean;
    };
    tooltip?: {
        enabled: boolean;
        formatter?: (data: DataPoint) => string;
    };
}
//# sourceMappingURL=series.types.d.ts.map