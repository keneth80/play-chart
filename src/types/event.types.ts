import { DataPoint } from './data.types';

export type ChartEventType = 'click' | 'hover' | 'zoom' | 'pan' | 'resize';

export interface ChartEvent<T extends DataPoint = DataPoint> {
    type: ChartEventType;
    position: [number, number];
    data?: T;
    target?: HTMLElement;
}

export interface ZoomEvent extends ChartEvent {
    type: 'zoom';
    zoom: {
        direction: 'x' | 'y' | 'both';
        scale: [number, number];
        domain: [number, number];
    };
}

export interface PanEvent extends ChartEvent {
    type: 'pan';
    pan: {
        deltaX: number;
        deltaY: number;
    };
}

export interface ResizeEvent extends ChartEvent {
    type: 'resize';
    size: {
        width: number;
        height: number;
    };
} 