import { Selection } from 'd3-selection';
import { Observable } from 'rxjs';
export interface SCROLL_BAR_MODEL {
    x: number;
    y: number;
    width: number;
    height: number;
    containerWidth: number;
    containerHeight: number;
    totalWidth: number;
    totalHeight: number;
}
export interface ScrollBarConfiguration {
    rootGroup: Selection<any, any, any, any>;
    scrollAreaSize: {
        width: number;
        height: number;
    };
    clipPathName?: string;
    viewPortBackground?: Selection<any, any, any, any>;
    padding?: number;
    scrollBarWidth?: number;
}
export declare class ObjectScrollBar {
    private SCROLLBAR_WIDTH;
    private MIN_SCROLLBAR_HEIGHT;
    private ITEM_PADDING;
    private config;
    private listViewRootGroup;
    private containerViewGroup;
    private scrollGroup;
    private SCROLL_BAR_MODEL;
    private scroller;
    constructor(config: ScrollBarConfiguration);
    get scroller$(): Observable<number>;
    get scrollBarModel(): SCROLL_BAR_MODEL;
    draw(): void;
    destroy(): void;
    private init;
    /**
     * @description : scroll 영역 setup
     * @param rootGroup : listing 되는 영역의 group element (max 사이즈를 가지는 target)
     * @param container : scroll 여부에 따라 사이즈를 조절해주기 위한 element (스크롤이 생기면 +scorllbar width, 스크롤이 없다면 -scorllbar width)
     * @param scrollButtonGroup : scroll bar 가 그려지고 동작하는 group element
     * @param scrollingWidth : scroll영역의 가로 사이즈
     */
    private setupFunctionListScrollbar;
    /**
     *
     * @param svg : svg element
     */
    private setScrollClipPath;
    private scrollUpdate;
    /**
     * @description : scroll bar move event handler
     */
    private scrollDragEventHandler;
    /**
     * @description : scroll bar wheel event handler
     */
    private scrollWheelEventHandler;
}
//# sourceMappingURL=object-scroll-bar.d.ts.map