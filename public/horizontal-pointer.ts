import {max} from 'd3-array';
import {select} from 'd3-selection';
import {Observable, Observer} from 'rxjs';
import {delay, tap} from 'rxjs/operators';
import {delayExcute} from '../src/component/chart/util';
import {PlayChart} from '../src/component/play-chart';
import {HorizontalPointerSeries} from '../src/component/series/svg/horizontal-pointer';

let chart: PlayChart;

const clear = () => {
    if (chart) {
        chart.clear();
    }
};

const horizontalPointer = () => {
    const data = 63;
    const horizontalPointerChart = new PlayChart({
        selector: '#chart-div',
        data,
        margin: {
            left: 50,
            right: 80,
            bottom: 0,
            top: 0
        },
        isResize: true,
        series: [
            new HorizontalPointerSeries({
                selector: 'horizontal-pointer',
                domain: [0, 90],
                unit: '초'
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
                        case 'horizontal-pointer-chart':
                            horizontalPointer();
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
