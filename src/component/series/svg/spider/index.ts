import {BaseType} from 'd3';
import {EnterElement, Selection} from 'd3-selection';
import {scaleLinear} from 'd3-scale';
import {line} from 'd3-shape';
import {ChartSelector} from '../../../../component/chart';
import {ContainerSize, Scale} from '../../../../component/chart/chart.interface';
import {SeriesBase} from '../../../../component/chart/series-base';
import {SeriesConfiguration} from '../../../../component/chart/series.interface';
import {defaultChartColors} from '../../../../component/chart/util/chart-util';
import {getTransformByArray} from '../../../../component/chart/util';

interface DataPosition {
    x: number;
    y: number;
}

interface ITick {
    tickCount: number;
    tickLabel?: Function;
    tickVisible?: boolean;
}

export interface SpiderData {
    [key: string]: number;
}

export interface SpiderSeriesConfiguration extends SeriesConfiguration {
    domain: [number, number];
    range: [number, number];
    features: Array<string>;
    labelFmt?: Function;
    tick: ITick;
}

export class SpiderSeries extends SeriesBase {
    private domain: [number, number];
    private features: Array<string>;
    private labelFmt: Function;
    private tick: ITick;

    constructor(configuration: SpiderSeriesConfiguration) {
        super(configuration);
        if (configuration) {
            this.selector = configuration.selector || 'spider';
            this.domain = configuration.domain || [0, 10];
            this.features = configuration.features || ['A', 'B', 'C', 'D', 'E'];
            this.tick = configuration.tick;
            this.labelFmt = configuration.labelFmt || undefined;
        }
    }

    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>) {
        this.svg = svg;
        this.mainGroup = mainGroup;
        mainGroup
            .selectAll('.spider-series')
            .data([`${this.selector}-series-group`])
            .join(
                (enter: Selection<EnterElement, string, BaseType, any>) => enter.append('g').attr('class', (d: string) => d),
                (update: Selection<BaseType, any, BaseType, any>) => update,
                (exite: Selection<BaseType, any, BaseType, any>) => exite.remove()
            );
        mainGroup
            .selectAll('.spider-series')
            .data([`${this.selector}-guide-group`])
            .join(
                (enter: Selection<EnterElement, string, BaseType, any>) => enter.append('g').attr('class', (d: string) => d),
                (update: Selection<BaseType, any, BaseType, any>) => update,
                (exite: Selection<BaseType, any, BaseType, any>) => exite.remove()
            );
    }

    drawSeries(chartData: any[], scales: Scale[], geometry: ContainerSize) {
        this.svg.select('.' + ChartSelector.ZOOM_SVG).lower();

        const width = Math.min(geometry.width, geometry.height);
        console.log('width : ', width, geometry);
        const height = width;
        const radialScale = scaleLinear()
            .domain(this.domain)
            .range([0, width / 2 - 50]);
        const ticks = radialScale.ticks(this.tick.tickCount);
        const guideLine: Array<SpiderData> = [];

        for (let i = 0; i < ticks.length; i++) {
            const point: SpiderData = {};
            this.features.forEach((f) => (point[f] = ticks[i]));
            guideLine.push(point);
        }
        const mainTransform = getTransformByArray(this.mainGroup.attr('transform'));
        this.mainGroup.attr('clip-path', null);
        this.mainGroup.attr('transform', `translate(${geometry.width / 2 - width / 2}, ${mainTransform[1]})`);

        // draw tick labels
        if (this.tick.tickVisible !== false) {
            this.mainGroup
                .selectAll('.ticklabel')
                .data(ticks)
                .join((enter: Selection<EnterElement, number, BaseType, any>) =>
                    enter
                        .append('text')
                        .attr('class', 'ticklabel')
                        .attr('x', width / 2 + 5)
                        .attr('y', (d: number) => height / 2 - radialScale(d))
                        .text((d: number) => d.toString())
                );
        }

        const featureData = this.features.map((f: string, i: number) => {
            const angle = getAngle(i, this.features.length);
            return {
                name: f,
                angle: angle,
                lineValue: angleToCoordinate(angle, radialScale(ticks[ticks.length - 1]), width, height),
                labelValue: angleToCoordinate(
                    angle,
                    radialScale(ticks[ticks.length - 1]) + radialScale(ticks[ticks.length - 1] * 0.2),
                    width,
                    height
                )
            };
        });

        // draw axis line
        this.mainGroup
            .selectAll('.axis-line')
            .data(featureData)
            .join(
                (
                    enter: Selection<
                        EnterElement,
                        {
                            name: string;
                            angle: number;
                            lineValue: {
                                x: number;
                                y: number;
                            };
                            labelValue: {
                                x: number;
                                y: number;
                            };
                        },
                        BaseType,
                        any
                    >
                ) => enter.append('line').attr('class', 'axis-line'),
                (update: Selection<BaseType, any, BaseType, any>) => update,
                (exite: Selection<BaseType, any, BaseType, any>) => exite.remove()
            )
            .attr('x1', width / 2)
            .attr('y1', height / 2)
            .attr('x2', (d) => d.lineValue.x)
            .attr('y2', (d) => d.lineValue.y)
            .attr('stroke', 'black')
            .attr('stroke-opacity', 0.2);

        // draw axis label
        this.mainGroup
            .selectAll('.axis-label')
            .data(featureData)
            .join(
                (
                    enter: Selection<
                        EnterElement,
                        {
                            name: string;
                            angle: number;
                            lineValue: {
                                x: number;
                                y: number;
                            };
                            labelValue: {
                                x: number;
                                y: number;
                            };
                        },
                        BaseType,
                        any
                    >
                ) => enter.append('text').attr('class', 'axis-label'),
                (update: Selection<BaseType, any, BaseType, any>) => update,
                (exite: Selection<BaseType, any, BaseType, any>) => exite.remove()
            )
            .style('text-anchor', (d) => {
                if (width / 2 === d.labelValue.x) {
                    return 'middle';
                } else if (width / 2 > d.labelValue.x) {
                    return 'end';
                } else {
                    return 'start';
                }
            })
            .attr('x', (d) => d.labelValue.x)
            .attr('y', (d) => d.labelValue.y)
            .text((d) => (this.labelFmt ? this.labelFmt(d.name) : d.name));

        const lineParser = line<DataPosition>()
            .x((d: DataPosition) => d.x)
            .y((d: DataPosition) => d.y);

        const colors = defaultChartColors();

        // draw the path element
        const seriesGroup: Selection<BaseType, any, HTMLElement, any> = this.mainGroup.select(`.${this.selector}-series-group`);
        seriesGroup
            .selectAll('.spider-path')
            .data(chartData)
            .join(
                (enter: any) =>
                    enter
                        .append('path')
                        .attr('class', 'spider-path')
                        .datum((d: SpiderData) => getPathCoordinates(d, this.features, width, height, radialScale))
                        .attr('d', lineParser),
                (update: Selection<BaseType, any, BaseType, any>) =>
                    update
                        .datum((d: SpiderData) => getPathCoordinates(d, this.features, width, height, radialScale))
                        .attr('d', lineParser as any),
                (exite: Selection<BaseType, any, BaseType, any>) => exite.remove()
            )
            .attr('stroke-width', 3)
            .attr('stroke', (_: SpiderData, i: number) => colors[i])
            .attr('fill', (_: SpiderData, i: number) => colors[i])
            .attr('stroke-opacity', 1)
            .attr('opacity', 0.5);

        this.mainGroup
            .select(`.${this.selector}-guide-group`)
            .selectAll('.spider-guide-path')
            .data(guideLine)
            .join(
                (enter: any) =>
                    enter
                        .append('path')
                        .attr('class', 'spider-guide-path')
                        .datum((d: SpiderData) => {
                            const coordinates = getPathCoordinates(d, this.features, width, height, radialScale);
                            coordinates.push(coordinates[0]);
                            return coordinates;
                        })
                        .attr('d', lineParser),
                (update: any) =>
                    update
                        .datum((d: SpiderData) => {
                            const coordinates = getPathCoordinates(d, this.features, width, height, radialScale);
                            coordinates.push(coordinates[0]);
                            return coordinates;
                        })
                        .attr('d', lineParser),
                (exite: Selection<BaseType, any, BaseType, any>) => exite.remove()
            )
            .attr('stroke-width', 1)
            .attr('stroke', 'black')
            .attr('fill', 'white')
            .attr('fill-opacity', 0)
            .attr('opacity', 0.1);
    }
}

function getAngle(index: number, featuresLength: number): number {
    return Math.PI / 2 - (2 * Math.PI * index) / featuresLength;
}

function angleToCoordinate(angle: number, value: number, width: number, height: number): DataPosition {
    let x = Math.cos(angle) * value;
    let y = Math.sin(angle) * value;
    return {x: width / 2 + x, y: height / 2 - y};
}

function getPathCoordinates(
    dataPoint: SpiderData,
    features: Array<string>,
    width: number,
    height: number,
    radialScale: any
): Array<DataPosition> {
    const coordinates = [];
    for (let i = 0; i < features.length; i++) {
        const angle = getAngle(i, features.length);
        coordinates.push(angleToCoordinate(angle, radialScale(dataPoint[features[i]]), width, height));
    }
    return coordinates;
}
