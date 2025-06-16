/**
 * Generate random data for testing
 */
export declare function generateRandomData(count: number, min: number, max: number): number[];
/**
 * Format number with commas
 */
export declare function formatNumber(num: number): string;
/**
 * Format date
 */
export declare function formatDate(date: Date): string;
/**
 * Generate color palette
 */
export declare function generateColorPalette(count: number): string[];
/**
 * Debounce function
 */
export declare function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void;
/**
 * Throttle function
 */
export declare function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void;
/**
 * Deep clone object
 */
export declare function deepClone<T>(obj: T): T;
/**
 * Calculate average of numbers
 */
export declare function average(numbers: number[]): number;
/**
 * Calculate standard deviation
 */
export declare function standardDeviation(numbers: number[]): number;
/**
 * Generate time series data
 */
export declare function generateTimeSeriesData(startDate: Date, count: number, interval: 'day' | 'week' | 'month' | 'year'): Date[];
//# sourceMappingURL=chart-utils.d.ts.map