import { Selection, BaseType } from 'd3-selection';
import { Scale, ContainerSize } from '../../chart/chart.interface';
import { SeriesBase } from '../../chart/series-base';
import { SeriesConfiguration } from '../../chart/series.interface';
export declare class Geometry {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    rx: number;
    ry: number;
    constructor(id?: string, x?: number, y?: number, width?: number, height?: number, rx?: number, ry?: number);
}
export declare class TopologyGroupElement extends Geometry {
    data: any;
    members: any[];
    constructor(id?: string, x?: number, y?: number, width?: number, height?: number, rx?: number, ry?: number, data?: any, members?: any[]);
}
export declare class GeometryLink {
    id: string;
    parent: string;
    from: string;
    to: string;
    constructor(id?: string, parent?: string, from?: string, to?: string);
}
export declare class TopologyData {
    groups: TopologyGroupElement[];
    machines: TopologyGroupElement[];
    constructor(groups?: TopologyGroupElement[], machines?: TopologyGroupElement[]);
}
export interface BasicTopologyConfiguration extends SeriesConfiguration {
    memberSelectedHandler?: any;
}
export declare class BasicTopology extends SeriesBase {
    protected linkGroup: Selection<any, any, HTMLElement, any>;
    private currentSector;
    private boldColor;
    constructor(configuration: BasicTopologyConfiguration);
    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, mainGroup: Selection<BaseType, any, HTMLElement, any>): void;
    drawSeries(chartData: TopologyData[], scales: Scale[], geometry: ContainerSize): void;
    private onMachineOver;
    private onMachineOut;
    private onSectorMouseOver;
    private onSectorMouseOut;
    private onMemberMouseOver;
    private onMemberMouseOut;
    private initStyleByMember;
    private initStyle;
    private getPositionFromTarget;
    private drawSectorBackground;
    private drawSectorTitle;
    private drawMember;
    private drawMachine;
}
//# sourceMappingURL=basic-topology.d.ts.map