export interface DataPoint {
    [key: string]: number | string | Date | null;
}
export interface SeriesData<T extends DataPoint = DataPoint> {
    data: T[];
    metadata?: {
        name: string;
        description?: string;
        unit?: string;
    };
}
export interface ChartData<T extends DataPoint = DataPoint> {
    series: SeriesData<T>[];
    categories?: string[];
    timeRange?: {
        start: Date;
        end: Date;
    };
}
//# sourceMappingURL=data.types.d.ts.map