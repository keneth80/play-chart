import { ChartDemo } from '../../utils/chart-base';
import { PlayChart } from '../../../src/component/play-chart';
import { tracePoints, stepInfo } from '../../../src/component/mock-data/trace-data';
import { BasicCanvasWebglLineSeriesOneConfiguration, BasicCanvasWebglLineSeriesOneModel, BasicCanvasWebgLineSeriesOne } from '../../../src/component/series/webgl/basic-canvas-webgl-line-series-one';
import { OptionConfiguration } from '../../../src/component/play-chart';
import { Placement, ScaleType, Direction } from '../../../src/component/chart/chart-configuration';
import { retriveOptionClass } from '../../../src/component/chart-generator';
import { IOptions } from '../../../src/component/chart';
import { BasicCanvasMouseZoomHandler } from '../../../src/component/functions/basic-canvas-mouse-zoom-handler';
import './style.css';

class BigDataLineChartDemo extends ChartDemo {
    private chart: PlayChart | null = null;
    constructor() {
        super({
            containerId: 'big-data-line-chart',
            title: 'WebGL Big Data Line Chart',
            description: 'WebGL 기반 대용량 라인 차트 데모',
            width: '1000px',
            height: '700px'
        });
    }

    createChart(): void {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
        // 기존 big-data-line.ts의 webGLBigDataLineDraw() 로직을 이곳에 옮김
        const stepData = stepInfo.map((step: any) => ({
            start: step.startCountSlot,
            end: step.startCountSlot + step.maxCount,
            label: step.step,
            data: step
        }));
        const seriesList: any[] = [];
        const alarmSeriesList: any[] = [];
        const optionList: OptionConfiguration[] = [];
        let xmin = 0;
        let xmax = 0;
        let ymin = Infinity;
        let ymax = 0;
        const setSeriesColor = (item: any) => {
            const seriesFaultType = item.referenceYn === 'Y' ? '' : item.segmentStatus;
            if (item.referenceYn === 'N' && item.fdtaFaultYn === 'Y' && seriesFaultType === 'F' && item.primeYn === 'N') {
                return '#EA3010';
            } else if (item.referenceYn === 'N' && item.fdtaFaultYn === 'N' && seriesFaultType === 'F' && item.primeYn === 'N') {
                return '#f57416';
            } else if (item.referenceYn === 'N' && item.fdtaFaultYn === 'N' && seriesFaultType === 'W' && item.primeYn === 'N') {
                return '#f7ba00';
            } else if (item.referenceYn === 'N' && item.fdtaFaultYn === 'N' && seriesFaultType === 'S' && item.primeYn === 'N') {
                return '#0dac09';
            } else if (item.referenceYn === 'Y' && item.fdtaFaultYn === 'Y' && seriesFaultType === '' && item.primeYn === 'N') {
                return '#970f94';
            } else if (item.referenceYn === 'Y' && item.fdtaFaultYn === 'N' && seriesFaultType === '' && item.primeYn === 'N') {
                return '#3766c7';
            } else if (item.referenceYn === 'Y' && item.fdtaFaultYn === 'N' && seriesFaultType === '' && item.primeYn === 'Y') {
                return '#3766c7';
            } else {
                return '#EA3010';
            }
        };
        for (let i = 0; i < tracePoints.length; i++) {
            const tempData = tracePoints[i];
            const seriesData = tempData.data.rows.map((row: any[]) => {
                const rowData: any = {};
                for (let j = 0; j < tempData.data.columns.length; j++) {
                    const columnName = tempData.data.columns[j];
                    rowData[columnName] = row[j];
                }
                const x = rowData['count_slot'];
                const y = rowData['VALUE'];
                if (xmin > x) xmin = x;
                if (xmax < x) xmax = x;
                if (ymin > y) ymin = y;
                if (ymax < y) ymax = y;
                return new BasicCanvasWebglLineSeriesOneModel(x, y, i, rowData);
            });
            const seriesColor = setSeriesColor(tempData);
            const configuration: BasicCanvasWebglLineSeriesOneConfiguration = {
                selector: (seriesColor === '#EA3010' ? 'webgl-trace-alarm' : 'webgl-trace') + i,
                xField: 'x',
                yField: 'y',
                dot: { radius: 4, fill: seriesColor },
                line: { strokeColor: seriesColor },
                data: seriesData
            };
            if (seriesColor === '#EA3010') {
                alarmSeriesList.push(configuration);
            } else {
                seriesList.push(configuration);
            }
        }
        const basicSpecArea: OptionConfiguration = {
            name: 'BasicSpecArea',
            configuration: {
                selector: 'spec-area',
                startField: 'start',
                endField: 'end',
                data: [stepData[2]],
                placement: Placement.BOTTOM
            }
        };
        const basicStepLine: OptionConfiguration = {
            name: 'BasicStepLine',
            configuration: {
                selector: 'step-line',
                xField: 'start',
                data: stepData
            }
        };
        const basicStepArea: OptionConfiguration = {
            name: 'BasicStepArea',
            configuration: {
                startField: 'start',
                labelField: 'label',
                endField: 'end',
                data: stepData
            }
        };
        optionList.push(basicSpecArea, basicStepArea, basicStepLine);
        const chartConfiguration = {
            selector: '.chart-container',
            data: [],
            title: {
                placement: Placement.TOP,
                content: 'WebGL Big Data Line Chart'
            },
            tooltip: {
                tooltipTextParser: (d: BasicCanvasWebglLineSeriesOneModel) => {
                    return `x: ${d[2].x} \ny: ${d[2].y}\ni: ${d[2].i}`;
                }
            },
            isResize: true,
            axes: [
                {
                    field: 'x',
                    type: ScaleType.NUMBER,
                    placement: Placement.BOTTOM,
                    min: xmin - (xmax * 0.01),
                    max: xmax + (xmax * 0.01)
                },
                {
                    field: 'y',
                    type: ScaleType.NUMBER,
                    placement: Placement.LEFT,
                    min: ymin,
                    max: ymax
                }
            ],
            series: seriesList.concat(alarmSeriesList).map((series: BasicCanvasWebglLineSeriesOneConfiguration) => new BasicCanvasWebgLineSeriesOne(series)),
            options: optionList.map((option: OptionConfiguration) => retriveOptionClass(option.name, option.configuration)).filter((option: IOptions) => option),
            functions: [
                new BasicCanvasMouseZoomHandler({
                    xDirection: Placement.BOTTOM,
                    yDirection: Placement.LEFT,
                    direction: Direction.BOTH
                })
            ]
        };
        this.chart = new PlayChart(chartConfiguration).draw();
    }

    destroy(): void {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BigDataLineChartDemo();
    console.log('new BigDataLineChartDemo()');
}); 