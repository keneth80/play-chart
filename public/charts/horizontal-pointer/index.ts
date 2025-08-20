import { ChartDemo } from '../../utils/chart-base';
import { HorizontalPointerChart } from '../../../src/component/series/svg/horizontal-pointer/horizontal-pointer-chart';
import './style.css';

export class HorizontalPointerChartDemo extends ChartDemo {
    private chart: HorizontalPointerChart | null = null;
    private currentValue: number = 50;

    constructor() {
        super({
            containerId: 'horizontal-pointer-chart',
            title: 'Horizontal Pointer Chart Demo',
            description: 'A simple horizontal pointer chart with interactive controls.',
            width: '800px',
            height: '400px'
        }, false);
        this.currentValue = 50;
        this.init();
    }

    createChart(): void {
        // Use the existing .chart-container created by ChartDemo
        const chartContainer = this.container.querySelector('.chart-container') as HTMLElement;
        chartContainer.id = 'horizontal-pointer-chart-container';
        chartContainer.style.width = '100%';
        chartContainer.style.height = '100%';

        this.chart = new HorizontalPointerChart({
            selector: '#horizontal-pointer-chart-container',
            data: [this.currentValue],
            margin: {
                left: 50,
                right: 80,
                top: 10,
                bottom: 10
            },
            domain: [0, 100],
            unit: '%',
            isResize: true
        });
        this.chart.draw();
        this.setupControls();
    }

    private setupControls(): void {
        // Increase value
        this.addControlButton('Increase', () => {
            this.currentValue = Math.min(100, this.currentValue + 5);
            this.chart?.setData([this.currentValue]);
            this.chart?.draw();
        });
        // Decrease value
        this.addControlButton('Decrease', () => {
            this.currentValue = Math.max(0, this.currentValue - 5);
            this.chart?.setData([this.currentValue]);
            this.chart?.draw();
        });
        // Randomize value
        this.addControlButton('Randomize', () => {
            this.currentValue = Math.floor(Math.random() * 101);
            this.chart?.setData([this.currentValue]);
            this.chart?.draw();
        });
        // Reset value
        this.addControlButton('Reset', () => {
            this.currentValue = 50;
            this.chart?.setData([this.currentValue]);
            this.chart?.draw();
        });
    }

    destroy(): void {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HorizontalPointerChartDemo();
    console.log('new HorizontalPointerChartDemo()');
}); 