import {axisBottom, BaseType} from 'd3';
import {scaleLinear} from 'd3-scale';
import {EnterElement, Selection} from 'd3-selection';
import {ChartSelector} from '../../../../component/chart';
import {ContainerSize, Scale} from '../../../../component/chart/chart.interface';
import {SeriesBase} from '../../../../component/chart/series-base';
import {SeriesConfiguration} from '../../../../component/chart/series.interface';

export interface HorizontalPointerSeriesConfiguration extends SeriesConfiguration {
    domain: [number, number];
    unit: string;
    data: number;
}

const CHART_MARGIN = {
    left: 50,
    right: 80
};

export class HorizontalPointerSeries extends SeriesBase {
    private domain: [number, number];
    constructor(configuration: HorizontalPointerSeriesConfiguration) {
        super(configuration);
        if (configuration) {
            this.domain = configuration.domain;
        }
    }

    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>) {
        this.svg = svg;
        this.mainGroup = mainGroup;
        mainGroup
            .selectAll('.horizontal-pointer-series')
            .data([`${this.selector}-line-group`])
            .join(
                (enter: Selection<EnterElement, string, BaseType, any>) => enter.append('g').attr('class', (d: string) => d),
                (update: Selection<BaseType, any, BaseType, any>) => update,
                (exite: Selection<BaseType, any, BaseType, any>) => exite.remove()
            );
        mainGroup
            .selectAll('.horizontal-pointer-series')
            .data([`${this.selector}-circle-group`])
            .join(
                (enter: Selection<EnterElement, string, BaseType, any>) => enter.append('g').attr('class', (d: string) => d),
                (update: Selection<BaseType, any, BaseType, any>) => update,
                (exite: Selection<BaseType, any, BaseType, any>) => exite.remove()
            );
    }

    drawSeries(chartData: any, scales: Scale[], geometry: ContainerSize) {
        this.svg.select('.' + ChartSelector.ZOOM_SVG).lower();
        // circle group position setting
        const circleGroup = this.mainGroup.selectAll(`${this.selector}-circle-group`);
        circleGroup.attr('transform', `translate(${CHART_MARGIN.left}, ${geometry.height / 2})`);
        // line group position setting
        const lineGroup = this.mainGroup.selectAll(`${this.selector}-line-group`);
        lineGroup.attr('transform', `translate(${CHART_MARGIN.left}, ${geometry.height / 2})`);

        const width = geometry.width - CHART_MARGIN.left - CHART_MARGIN.right;
        let scale = scaleLinear().domain(this.domain).range([0, width]);

        // bottom axis line render
        const bottomAxis: any = axisBottom(scale).tickSizeOuter(0);
        const line = lineGroup.call(bottomAxis);
        line.selectAll('path').style('stroke-width', 2);
        // ticks render
        const ticks = line.selectAll('.tick');
        ticks.select('line').remove();
        ticks.select('text').attr('y', 30).style('fill', 'gery');

        lineGroup
            .selectAll('.unit')
            .data(['(초)'])
            .join(
                (enter) => enter.append('text').attr('class', 'unit'),
                (update) => update,
                (exit) => exit.remove()
            )
            .style('fill', 'grey')
            .style('font-size', 13)
            .text((d) => d)
            .attr('transform', `translate(${width + 20}, 38)`);

        // circle render
        const circleData = {
            x: scale(chartData),
            y: 0
        };
        circleGroup
            .selectAll('.circle-point')
            .data([circleData])
            .join(
                (enter) => enter.append('circle').attr('class', 'circle-point'),
                (update) => update,
                (exit) => exit.remove()
            )
            .attr('cx', (d) => {
                return d.x;
            })
            .attr('cy', (d) => {
                return d.y;
            })
            .attr('r', 10)
            .style('fill', 'black');
    }
}
