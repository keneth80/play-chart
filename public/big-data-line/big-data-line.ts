import {select} from 'd3-selection';
import {Observable, Observer} from 'rxjs';
import {delay, tap} from 'rxjs/operators';
import {delayExcute} from '../../src/component/chart/util';
import {PlayChart} from '../../src/component/play-chart';
import { tracePoints, stepInfo } from '../../src/component/mock-data/trace-data';
import { BasicCanvasWebglLineSeriesOneConfiguration, BasicCanvasWebglLineSeriesOneModel, BasicCanvasWebgLineSeriesOne } from '../../src/component/series/webgl/basic-canvas-webgl-line-series-one';
import { OptionConfiguration } from '../../src/component/play-chart';
import { Placement, ScaleType, Direction } from '../../src/component/chart/chart-configuration';
import { ChartConfiguration } from '../../src/component/chart/chart-configuration';
import { retriveOptionClass } from '../../src/component/chart-generator';
import { IOptions } from '../../src/component/chart';
import { BasicCanvasMouseZoomHandler } from '../../src/component/functions';


let chart: any | null = null;

const setSeriesColor = (item: any) => {
    const seriesFaultType = item.referenceYn === 'Y' ? '' : item.segmentStatus;
    if (item.referenceYn === 'N' && item.fdtaFaultYn === 'Y' && seriesFaultType === 'F' && item.primeYn === 'N') { // selectedAlarm
        return '#EA3010';
    } else if (item.referenceYn === 'N' && item.fdtaFaultYn === 'N' && seriesFaultType === 'F' && item.primeYn === 'N') { // Fault
        return '#f57416';
    } else if (item.referenceYn === 'N' && item.fdtaFaultYn === 'N' && seriesFaultType === 'W' && item.primeYn === 'N') { // Warning
        return '#f7ba00';
    } else if (item.referenceYn === 'N' && item.fdtaFaultYn === 'N' && seriesFaultType === 'S' && item.primeYn === 'N') { // Safe
        return '#0dac09';
    } else if (item.referenceYn === 'Y' && item.fdtaFaultYn === 'Y' && seriesFaultType === '' && item.primeYn === 'N') { // referenceAlarm
        return '#970f94';
    } else if (item.referenceYn === 'Y' && item.fdtaFaultYn === 'N' && seriesFaultType === '' && item.primeYn === 'N') { // referenceNonAlarm
        return '#3766c7';
    } else if (item.referenceYn === 'Y' && item.fdtaFaultYn === 'N' && seriesFaultType === '' && item.primeYn === 'Y') { // primeReference
        return '#3766c7';
    } else {
        return '#EA3010';
    }
};

const clear = () => {
    if (chart !== null) {
        chart.destroy();
        chart = null;
    }
};

const webGLBigDataLineDraw = () => {
    const stepData = stepInfo.map((step: any) => {
        return {
            start: step.startCountSlot,
            end: step.startCountSlot + step.maxCount,
            label: step.step,
            data: step
        };
    });

    const seriesList: any[] = [];

    const alarmSeriesList: any[] = [];

    const optionList: OptionConfiguration[] = [];

    let xmin = 0;
    let xmax = 0;
    let ymin = Infinity;
    let ymax = 0;

    const parseData = () => {
        seriesList.length = 0;
        alarmSeriesList.length = 0;
        optionList.length = 0;

        xmin = 0;
        xmax = 0;
        ymin = Infinity;
        ymax = 0;

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
                if (xmin > x) {
                    xmin = x;
                }
                if (xmax < x) {
                    xmax = x;
                }
                if (ymin > y) {
                    ymin = y;
                }
                if (ymax < y) {
                    ymax = y;
                }

                return new BasicCanvasWebglLineSeriesOneModel(
                    x,
                    y,
                    i,
                    rowData
                );
            });
            // test data 늘리기
            const tempRow: BasicCanvasWebglLineSeriesOneModel = seriesData[seriesData.length - 1];
            for (let index = 1; index < 50000; index++) {
                const x = tempRow.x + index;
                const y = tempRow.y;
                if (xmax < x) {
                    xmax = x;
                }
                seriesData.push(
                    new BasicCanvasWebglLineSeriesOneModel(x, y, i, tempRow)
                );
            }
            // type별 컬러 지정.
            const seriesColor = setSeriesColor(tempData);
            const configuration: BasicCanvasWebglLineSeriesOneConfiguration = {
                selector: (seriesColor === '#EA3010' ? 'webgl-trace-alarm' : 'webgl-trace')  + i,
                xField: 'x',
                yField: 'y',
                dot: {
                    radius: 4,
                    fill: seriesColor
                },
                line: {
                    strokeColor: seriesColor,
                    // opacity: seriesColor === '#EA3010' ? 1 :  0.9
                },
                data: seriesData
            }

            if (seriesColor === '#EA3010') {
                alarmSeriesList.push(configuration);
            } else {
                seriesList.push(configuration);
            }
        }
    }

    parseData();

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

    optionList.push(basicSpecArea);
    optionList.push(basicStepArea);
    optionList.push(basicStepLine);
    

    const chartConfiguration: ChartConfiguration = {
        selector: '#chart-div',
        data: [],
        title: {
            placement: Placement.TOP,
            content: 'WebGL Big Data Line Chart'
        },
        tooltip: {
            tooltipTextParser: (d: BasicCanvasWebglLineSeriesOneModel) => {
                return `x: ${d[2].x} \ny: ${d[2].y}\ni: ${d[2].i}`
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
        series: seriesList.concat(alarmSeriesList).map((series: BasicCanvasWebglLineSeriesOneConfiguration) => {
            return new BasicCanvasWebgLineSeriesOne(series);
        }),
        options: optionList.map((option: OptionConfiguration) => {
            return retriveOptionClass(option.name, option.configuration)
        }).filter((option: IOptions) => option),
        functions: [
            new BasicCanvasMouseZoomHandler({
                xDirection: Placement.BOTTOM,
                yDirection: Placement.LEFT,
                direction: Direction.BOTH
            })
        ]
    };

    chart = new PlayChart(chartConfiguration).draw();
};

const hideLoader = () => {
    select('.back-drop').classed('show', false);
};

const showLoader = () => {
    select('.back-drop').classed('show', true);
};

const buttonMapping = () => {
    select('.container-button-bar').on('click', (event: PointerEvent) => {
        const seriesId = (event.target as HTMLElement).id;

        new Observable((observ: Observer<any>) => {
            observ.next(true);
            observ.complete();
        })
            .pipe(
                tap(() => {
                    if (seriesId) {
                        showLoader();
                        clear();
                    }
                }),
                delay(200),
                tap(() => {
                    switch (seriesId) {
                        case 'webgl-bigdata-line-series':
                            webGLBigDataLineDraw();
                            break;
                        default:
                            break;
                    }
                }),
                delay(300),
                tap(() => {
                    hideLoader();
                })
            )
            .subscribe(() => {
                console.log('exec => ', seriesId);
            });
    });
};

delayExcute(200, () => {
    buttonMapping();
});