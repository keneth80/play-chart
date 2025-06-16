import { ChartDemo } from '../../utils/chart-base';
import { SpiderChart, SpiderData } from '../../../src/component/series/svg/spider/spider-chart';
import { generateRandomData } from '../../utils/chart-utils';
import './style.css';

export class SpiderChartDemo extends ChartDemo {
    private chart: SpiderChart | null = null;
    private features = ['Speed', 'Handling', 'Safety', 'Comfort', 'Efficiency'];
    private currentData: SpiderData[] = [];

    constructor() {
        super({
            containerId: 'spider-chart',
            title: 'Spider Chart Demo',
            description: 'A radar/spider chart showing multiple data points across different features.',
            width: '800px',
            height: '800px'
        });
    }

    createChart(): void {
        // Create chart container inside the chart-container
        const chartContainer = document.createElement('div');
        chartContainer.id = 'spider-chart-container';
        chartContainer.style.width = '100%';
        chartContainer.style.height = '100%';
        this.container.querySelector('.chart-container')?.appendChild(chartContainer);

        this.currentData = this.generateInitialData();
        this.chart = new SpiderChart({
            selector: '#spider-chart-container',
            data: this.currentData,
            margin: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            },
            domain: [0, 10],
            range: [0, 300],
            tickCount: 5,
            tickVisible: true,
            labelWidth: 80,
            isResize: true
        });
        this.chart.draw();

        this.setupControls();
    }

    private generateInitialData(): SpiderData[] {
        return [
            {
                "Speed": 8,
                "Handling": 7,
                "Safety": 9,
                "Comfort": 8,
                "Efficiency": 7
            },
            {
                "Speed": 6,
                "Handling": 8,
                "Safety": 7,
                "Comfort": 9,
                "Efficiency": 8
            }
        ];
    }

    private setupControls(): void {
        // Add data point button
        this.addControlButton('Add Data Point', () => {
            const newData = this.generateRandomDataPoint();
            this.currentData = [...this.currentData, newData];
            this.chart?.setData(this.currentData);
        });

        // Remove data point button
        this.addControlButton('Remove Data Point', () => {
            if (this.currentData.length > 1) {
                this.currentData = this.currentData.slice(0, -1);
                this.chart?.setData(this.currentData);
            }
        });

        // Reset data button
        this.addControlButton('Reset Data', () => {
            this.currentData = this.generateInitialData();
            this.chart?.setData(this.currentData);
        });

        // Update all data button
        this.addControlButton('Update All Data', () => {
            this.currentData = Array.from({ length: 2 }, () => this.generateRandomDataPoint());
            this.chart?.setData(this.currentData);
        });
    }

    private generateRandomDataPoint(): SpiderData {
        const data: SpiderData = {};
        this.features.forEach(feature => {
            data[feature] = Math.floor(Math.random() * 10) + 1;
        });
        return data;
    }

    destroy(): void {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    }
}

// Initialize the demo when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SpiderChartDemo();
    console.log('new SpiderChartDemo()');
}); 