import {BaseType} from 'd3';
import {EnterElement, Selection} from 'd3-selection';
import {scaleLinear} from 'd3-scale';
import {line} from 'd3-shape';
import {ChartSelector} from '../../../../component/chart';
import {ContainerSize, Scale} from '../../../../component/chart/chart.interface';
import {SeriesBase} from '../../../../component/chart/series-base';
import {SeriesConfiguration} from '../../../../component/chart/series.interface';
import {defaultChartColors} from '../../../../component/chart/util/chart-util';

interface DataPosition {
    x: number;
    y: number;
}

export interface SpiderData {
    [key: string]: number;
}

export interface SpiderSeriesConfiguration extends SeriesConfiguration {
    domain: [number, number];
    range: [number, number];
    features: Array<string>;
    tickCount: number;
}

export class SpiderSeries extends SeriesBase {
    private domain: [number, number];
    private features: Array<string>;
    private tickCount: number;

    constructor(configuration: SpiderSeriesConfiguration) {
        super(configuration);
        if (configuration) {
            this.selector = configuration.selector || 'spider';
            this.domain = configuration.domain || [0, 10];
            this.features = configuration.features || ['A', 'B', 'C', 'D', 'E'];
            this.tickCount = configuration.tickCount;
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
        const height = width;
        const radialScale = scaleLinear()
            .domain(this.domain)
            .range([0, width / 2 - 50]);
        const ticks = radialScale.ticks(this.tickCount);
        console.log('radialScale : ', chartData, geometry, this.features, this.domain);
        const guideLine: Array<SpiderData> = [];

        for (let i = 0; i < ticks.length; i++) {
            const point: SpiderData = {};
            this.features.forEach((f) => (point[f] = ticks[i]));
            guideLine.push(point);
        }

        // draw tick labels
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

        const featureData = this.features.map((f: string, i: number) => {
            const angle = Math.PI / 2 + (2 * Math.PI * i) / this.features.length;
            return {
                name: f,
                angle: angle,
                lineValue: angleToCoordinate(angle, radialScale(10), width, height),
                labelValue: angleToCoordinate(angle, radialScale(11), width, height)
            };
        });

        console.log('featureData : ', featureData);

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
                ) =>
                    enter
                        .append('line')
                        .attr('class', 'axis-line')
                        .attr('x1', width / 2)
                        .attr('y1', height / 2)
                        .attr('x2', (d) => d.lineValue.x)
                        .attr('y2', (d) => d.lineValue.y)
                        .attr('stroke', 'black')
                        .attr('stroke-opacity', 0.2)
            );

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
                ) =>
                    enter
                        .append('text')
                        .attr('class', 'axis-label')
                        .style('text-anchor', 'middle')
                        .attr('x', (d) => d.labelValue.x)
                        .attr('y', (d) => d.labelValue.y)
                        .text((d) => d.name)
            );

        const lineParser = line<DataPosition>()
            .x((d: DataPosition) => d.x)
            .y((d: DataPosition) => d.y);

        const colors = defaultChartColors();

        // draw the path element
        const seriesGroup: Selection<BaseType, any, HTMLElement, any> = this.mainGroup.select(`.${this.selector}-series-group`);
        seriesGroup
            .selectAll('.spider-path')
            .data(chartData)
            .join((enter: any) =>
                enter
                    .append('path')
                    .attr('class', 'spider-path')
                    .datum((d: SpiderData) => getPathCoordinates(d, this.features, width, height, radialScale))
                    .attr('d', lineParser)
                    .attr('stroke-width', 3)
                    .attr('stroke', (_: SpiderData, i: number) => colors[i])
                    .attr('fill', (_: SpiderData, i: number) => colors[i])
                    .attr('stroke-opacity', 1)
                    .attr('opacity', 0.5)
            );

        this.mainGroup
            .select(`.${this.selector}-guide-group`)
            .selectAll('.spider-guide-path')
            .data(guideLine)
            .join((enter: any) =>
                enter
                    .append('path')
                    .attr('class', 'spider-guide-path')
                    .datum((d: SpiderData) => {
                        const coordinates = getPathCoordinates(d, this.features, width, height, radialScale);
                        coordinates.push(coordinates[0]);
                        return coordinates;
                    })
                    .attr('d', lineParser)
                    .attr('stroke-width', 1)
                    .attr('stroke', 'black')
                    .attr('fill', 'white')
                    .attr('fill-opacity', 0)
                    .attr('opacity', 0.1)
            );
    }
}

function angleToCoordinate(angle: number, value: number, width: number, height: number) {
    let x = Math.cos(angle) * value;
    let y = Math.sin(angle) * value;
    return {x: width / 2 + x, y: height / 2 - y};
}

function getPathCoordinates(dataPoint: SpiderData, features: Array<string>, width: number, height: number, radialScale: any) {
    const coordinates = [];
    for (let i = 0; i < features.length; i++) {
        const angle = Math.PI / 2 + (2 * Math.PI * i) / features.length;
        coordinates.push(angleToCoordinate(angle, radialScale(dataPoint[features[i]]), width, height));
    }
    return coordinates;
}
