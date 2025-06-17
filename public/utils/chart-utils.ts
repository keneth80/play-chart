/**
 * Generate random data for testing
 */
export function generateRandomData(count: number, min: number, max: number): number[] {
    return Array.from({ length: count }, () => Math.random() * (max - min) + min);
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
    return num.toLocaleString();
}

/**
 * Format date
 */
export function formatDate(date: Date): string {
    return date.toLocaleDateString();
}

/**
 * Generate color palette
 */
export function generateColorPalette(count: number): string[] {
    const colors = [
        '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
        '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
    ];
    
    if (count <= colors.length) {
        return colors.slice(0, count);
    }

    // Generate additional colors if needed
    const additionalColors = Array.from({ length: count - colors.length }, (_, i) => {
        const hue = (i * 137.5) % 360; // Golden angle approximation
        return `hsl(${hue}, 70%, 50%)`;
    });

    return [...colors, ...additionalColors];
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    
    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    
    return function executedFunction(...args: Parameters<T>) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Calculate average of numbers
 */
export function average(numbers: number[]): number {
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

/**
 * Calculate standard deviation
 */
export function standardDeviation(numbers: number[]): number {
    const avg = average(numbers);
    const squareDiffs = numbers.map(value => {
        const diff = value - avg;
        return diff * diff;
    });
    const avgSquareDiff = average(squareDiffs);
    return Math.sqrt(avgSquareDiff);
}

/**
 * Generate time series data
 */
export function generateTimeSeriesData(
    startDate: Date,
    count: number,
    interval: 'day' | 'week' | 'month' | 'year'
): Date[] {
    const dates: Date[] = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < count; i++) {
        dates.push(new Date(currentDate));
        
        switch (interval) {
            case 'day':
                currentDate.setDate(currentDate.getDate() + 1);
                break;
            case 'week':
                currentDate.setDate(currentDate.getDate() + 7);
                break;
            case 'month':
                currentDate.setMonth(currentDate.getMonth() + 1);
                break;
            case 'year':
                currentDate.setFullYear(currentDate.getFullYear() + 1);
                break;
        }
    }
    
    return dates;
} 