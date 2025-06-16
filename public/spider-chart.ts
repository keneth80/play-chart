import {max} from 'd3-array';
import {select} from 'd3-selection';
import {Observable, Observer} from 'rxjs';
import {delay, tap} from 'rxjs/operators';
import {delayExcute} from '../src/component/chart/util';
import {PlayChart} from '../src/component/play-chart';
import {SpiderSeries} from '../src/component/series/svg/spider';
import {SpiderChart, SpiderData} from '../src/component/series/svg/spider/spider-chart';
import { IChartBase } from '../src/component/chart/chart.interface';

let chart: IChartBase | null = null;

const clear = () => {
    if (chart !== null) {
        (chart as IChartBase).clear();
    }
};

const spiderChartDraw = () => {
    // 데이터 예제
    const data: SpiderData[] = [
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

    // 기본 설정으로 차트 생성
    const spiderChart = new SpiderChart({
        selector: '#chart-div',
        data,
        margin: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        },
        domain: [0, 10],
        range: [0, 250],
        tickCount: 5,
        tickVisible: true,
        labelWidth: 60,
        isResize: true
    });
    spiderChart.draw();

    // 데이터 업데이트 예제
    setTimeout(() => {
        const newData: SpiderData[] = [
            {
                "Speed": 9,
                "Handling": 8,
                "Safety": 9,
                "Comfort": 8,
                "Efficiency": 8
            }
        ];
        
        spiderChart.setData(newData);
    }, 3000); 
};

const spider = () => {
    const data = [
        {
            A: 10,
            B: 9,
            C: 7,
            D: 9,
            E: 8,
            F: 10
        },
        // {
        //     A: 3.3635058731329384,
        //     B: 5.646006002989791,
        //     C: 6.163650014222327,
        //     D: 3.7752088657298373,
        //     E: 7.479050824971674,
        //     F: 4.4135923186340005
        // }
        {
            A: 3.07442653193206,
            B: 3.7409662936188095,
            C: 7.958290858166398,
            D: 1.0214228991037988,
            E: 3.1262880342517683,
            F: 1.270447060499519
        }
    ];

    // const
    const SWING_SPIDER = {
        A: '스윙궤도',
        B: '리듬',
        C: '최고 속력구간',
        D: '상-하체 꼬임',
        E: '스윙순서',
        F: '자세'
    };
    const features = Object.keys(data[0]).sort();
    // const labels = ['스윙궤도', '리듬', '최고 속력구간', '상-하체 꼬임', '스윙순서', '자세'];
    const basicPieChart = new PlayChart({
        selector: '#chart-div',
        data,
        margin: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        },
        min: 0,
        max: max(data, (d: any) => d.value),
        isResize: true,
        axes: [],
        series: [
            new SpiderSeries({
                selector: 'sipder',
                domain: [0, 10],
                range: [0, 250],
                features,
                tick: {
                    tickCount: 5,
                    tickVisible: false
                },
                labelFmt: (d: string) => {
                    return SWING_SPIDER[d];
                },
                labelWidth: 60
            })
        ]
    }).draw();
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
                        case 'spider-chart':
                            spiderChartDraw();
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
