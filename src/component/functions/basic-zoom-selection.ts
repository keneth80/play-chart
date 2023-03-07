import {BaseType, Selection} from 'd3-selection';
import {zoom} from 'd3-zoom';

import {ContainerSize, Scale} from '../chart/chart.interface';
import {FunctionsBase} from '../chart/functions-base';

export interface BasicZoomSelectionConfiguration {
    targetGroup: string;
    xField: string;
    yField: string;
    xDirection?: string;
    yDirection?: string;
    direction?: string; // both, x, y default: both
}

export class BasicZoomSelection extends FunctionsBase {
    private targetGroup: string = '';

    private targetElements: any;

    private xField: string;

    private yField: string;

    private xDirection: string = 'bottom';

    private yDirection: string = 'left';

    private direction: string = 'both';

    private zoomTarget: Selection<any, any, any, any>;

    private originScaleX: any = {};

    private originScaleY: any = {};

    constructor(configuration: BasicZoomSelectionConfiguration) {
        super();
        if (configuration) {
            if (configuration.targetGroup) {
                this.targetGroup = configuration.targetGroup;
            }

            if (configuration.direction) {
                this.direction = configuration.direction;
            }

            if (configuration.xField) {
                this.xField = configuration.xField;
            }

            if (configuration.yField) {
                this.yField = configuration.yField;
            }

            if (configuration.xDirection) {
                this.xDirection = configuration.xDirection;
            }

            if (configuration.yDirection) {
                this.yDirection = configuration.yDirection;
            }
        }
    }

    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>) {
        this.svg = svg;
        this.mainGroup = mainGroup;
        if (!this.zoomTarget) {
            this.zoomTarget = this.mainGroup.append('rect').style('fill', 'none').style('pointer-events', 'all');
            this.zoomTarget.lower();
        }
    }

    drawFunctions(chartData: any[], scales: Scale[], geometry: ContainerSize) {
        const x: any = scales.find((scale: Scale) => scale.orient === this.xDirection).scale;
        const y: any = scales.find((scale: Scale) => scale.orient === this.yDirection).scale;

        Object.assign(this.originScaleX, x);
        Object.assign(this.originScaleY, y);

        this.zoomTarget.attr('width', geometry.width).attr('height', geometry.height);

        this.targetElements = this.mainGroup.select(`.${this.targetGroup}`).selectAll('*');

        const updateChart = (event: any) => {
            const newX = event.transform.rescaleX(x);
            const newY = event.transform.rescaleY(y);
            scales.find((scale: Scale) => scale.orient === this.xDirection).scale = newX;
            scales.find((scale: Scale) => scale.orient === this.yDirection).scale = newY;
            this.chartBase.updateRescaleAxis();
            this.chartBase.updateSeries();
        };

        this.mainGroup.call(
            zoom()
                .scaleExtent([0.5, 10])
                .extent([
                    [0, 0],
                    [geometry.width, geometry.height]
                ]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
                .on('zoom', updateChart)
        );
    }
}
