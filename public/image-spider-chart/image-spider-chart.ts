import {max} from 'd3-array';
import {select} from 'd3-selection';
import {Observable, Observer} from 'rxjs';
import {delay, tap} from 'rxjs/operators';
import {delayExcute} from '../../src/component/chart/util';
import {PlayChart} from '../../src/component/play-chart';
import {ImageSpiderSeries} from '../../src/component/series/svg/image-spider';
import {spiderGuide, greenImage, blueImage, spiderGuideOpacitySvg, spiderGuideOpacity} from '../../src/chart-images';

let chart: PlayChart | null = null;

const spider = () => {
    const data = [
        // {
        //     swingPath: 10,
        //     rhythm: 8,
        //     topSpeedRange: 8,
        //     xfactor: 5,
        //     sequence: 9,
        //     posture: 10
        // },
        // {
        //     swingPath: 9,
        //     rhythm: 9,
        //     topSpeedRange: 7,
        //     xfactor: 4,
        //     sequence: 8,
        //     posture: 9
        // }
        {
            a: 3.3635058731329384,
            b: 5.646006002989791,
            c: 6.163650014222327,
            d: 3.7752088657298373,
            e: 7.479050824971674,
            f: 4.4135923186340005
        },
        {
            a: 3.07442653193206,
            b: 3.7409662936188095,
            c: 7.958290858166398,
            d: 1.0214228991037988,
            e: 3.1262880342517683,
            f: 1.270447060499519
        }
    ];

    // const
    const SWING_SPIDER = {
        a: '키네마틱 시퀀스',
        b: '자세',
        c: 'X-factor',
        d: '리듬',
        e: '스윙궤적',
        f: '헤드^스피드'
    };
    const features = Object.keys(data[0]).sort();
    console.log('features : ', features);
    // const labels = ['스윙궤도', '리듬', '최고 속력구간', '상-하체 꼬임', '스윙순서', '자세'];
    chart = new PlayChart({
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
            new ImageSpiderSeries({
                selector: 'sipder',
                domain: [0, 10],
                range: [0, 250],
                features,
                tick: {
                    tickCount: 5,
                    tickVisible: false
                },
                labelColor: (d: string) => {
                    return d === 'F' ? '#a7acb5' : '';
                },
                labelFmt: (d: string) => {
                    return SWING_SPIDER[d];
                },
                backgroundImage: spiderGuide,
                seriesImage: (index: number) => {
                    return data.length > 1 ? (index === 1 ? greenImage : blueImage) : greenImage;
                },
                getSeriesInfo: (index: number) => {
                    return index === 1 ? 'green_angular' : 'blue_angular';
                }
            })
        ]
    }).draw();
};

const clear = () => {
    if (chart) {
        chart?.clear();
    }
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
                            spider();
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
