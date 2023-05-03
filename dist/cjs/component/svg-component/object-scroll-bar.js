"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectScrollBar = void 0;
var d3_drag_1 = require("d3-drag");
var d3_zoom_1 = require("d3-zoom");
var rxjs_1 = require("rxjs");
var ObjectScrollBar = /** @class */ (function () {
    function ObjectScrollBar(config) {
        var _this = this;
        this.SCROLLBAR_WIDTH = 6;
        this.MIN_SCROLLBAR_HEIGHT = 15;
        this.ITEM_PADDING = 0;
        // scrollbar information
        this.SCROLL_BAR_MODEL = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            containerWidth: 0,
            containerHeight: 0,
            totalWidth: 0,
            totalHeight: 0
        };
        this.scroller = new rxjs_1.Subject();
        /**
         * @description : scroll bar move event handler
         */
        this.scrollDragEventHandler = function (event) {
            _this.scrollUpdate(event.dy);
        };
        /**
         * @description : scroll bar wheel event handler
         */
        this.scrollWheelEventHandler = function (event) {
            event.stopPropagation();
            _this.scrollUpdate(event.deltaY);
        };
        this.config = config;
        this.listViewRootGroup = config.rootGroup;
        this.containerViewGroup = config.viewPortBackground;
        this.ITEM_PADDING = this.config.padding || this.ITEM_PADDING;
        this.SCROLLBAR_WIDTH = this.config.scrollBarWidth || this.SCROLLBAR_WIDTH;
        this.init();
    }
    Object.defineProperty(ObjectScrollBar.prototype, "scroller$", {
        get: function () {
            return this.scroller.asObservable();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ObjectScrollBar.prototype, "scrollBarModel", {
        get: function () {
            return this.SCROLL_BAR_MODEL;
        },
        enumerable: false,
        configurable: true
    });
    ObjectScrollBar.prototype.draw = function () {
        // 전부 그린 후 scrollbar 를 setup.
        this.SCROLL_BAR_MODEL = this.setupFunctionListScrollbar(this.listViewRootGroup, this.containerViewGroup, this.scrollGroup, this.config.scrollAreaSize, {
            width: this.SCROLLBAR_WIDTH,
            height: this.MIN_SCROLLBAR_HEIGHT,
            padding: this.ITEM_PADDING
        });
    };
    ObjectScrollBar.prototype.destroy = function () {
        this.listViewRootGroup.selectAll('*').remove();
    };
    ObjectScrollBar.prototype.init = function () {
        // scroll wheel event
        var notZoom = (0, d3_zoom_1.zoom)().scaleExtent([1, 1]).on('zoom', null);
        // wheel event만 살리고 zoom은 처리 안하기 위함.
        this.listViewRootGroup.call(notZoom).on('wheel.zoom', this.scrollWheelEventHandler);
        this.setScrollClipPath(this.listViewRootGroup, this.config.scrollAreaSize, this.config.clipPathName);
        this.listViewRootGroup.append('rect').attr('class', 'scroll-bar-background').style('fill', '#aaa');
        this.scrollGroup = this.listViewRootGroup.append('g').attr('class', 'scroll-group');
        this.scrollGroup.append('rect').attr('class', 'scroll-bar');
        this.scrollGroup.call((0, d3_drag_1.drag)().touchable(true).on('drag', this.scrollDragEventHandler));
    };
    /**
     * @description : scroll 영역 setup
     * @param rootGroup : listing 되는 영역의 group element (max 사이즈를 가지는 target)
     * @param container : scroll 여부에 따라 사이즈를 조절해주기 위한 element (스크롤이 생기면 +scorllbar width, 스크롤이 없다면 -scorllbar width)
     * @param scrollButtonGroup : scroll bar 가 그려지고 동작하는 group element
     * @param scrollingWidth : scroll영역의 가로 사이즈
     */
    ObjectScrollBar.prototype.setupFunctionListScrollbar = function (rootGroup, container, scrollButtonGroup, scrollingAreaSize, scrollBarSize) {
        // 전체 사이즈 기준 element
        var totalTargetElement = rootGroup.node().getBBox();
        // if (rootGroup instanceof SVGElement) { // check if node is svg element
        //     totalTargetElement = (rootGroup.node() as any).getBBox();
        // } else { // else is html element
        //     totalTargetElement = (rootGroup.node() as any).getBoundingClientRect();
        // }
        var totalWidth = totalTargetElement.width;
        var totalHeight = totalTargetElement.height + scrollBarSize.padding; // bottom padding
        // 보여지는 사이즈 기준 element (scroll 영역)
        var width = scrollingAreaSize.width;
        var height = scrollingAreaSize.height;
        var scrollBarWidth = scrollBarSize.width;
        var scrollBarHeight = height - (totalHeight - height);
        var x = width - scrollBarWidth;
        // scroll 여부.
        if (totalHeight - scrollBarSize.padding > height) {
            rootGroup
                .select('rect.scroll-bar-background')
                .attr('x', width - scrollBarWidth)
                .attr('y', 0)
                .attr('width', scrollBarWidth)
                .attr('height', height);
            scrollButtonGroup.attr('transform', "translate(".concat(x, ", 0)"));
            scrollButtonGroup
                .select('rect.scroll-bar')
                .style('fill', '#333')
                .attr('width', scrollBarWidth)
                .attr('height', scrollBarHeight < 0 ? scrollBarSize.height : scrollBarHeight)
                .attr('rx', 1)
                .attr('ry', 1);
            if (container) {
                container.attr('width', scrollingAreaSize.width);
            }
        }
        else {
            rootGroup.select('rect.scroll-bar-background').attr('width', 0).attr('height', 0);
            scrollButtonGroup.select('rect.scroll-bar').style('fill', 'none').attr('width', 0).attr('height', 0);
            if (container) {
                container.attr('width', scrollingAreaSize.width - scrollBarSize.width);
            }
        }
        // wheel, drag event를 처리 하기위한 fix된 data.
        var SCROLL_BAR_MODEL = {
            x: x,
            y: 0,
            width: scrollBarWidth,
            height: scrollBarHeight,
            totalWidth: totalWidth,
            totalHeight: totalHeight,
            containerHeight: height,
            containerWidth: width
        };
        return SCROLL_BAR_MODEL;
    };
    /**
     *
     * @param svg : svg element
     */
    ObjectScrollBar.prototype.setScrollClipPath = function (target, containerSize, clipPathName) {
        if (containerSize === void 0) { containerSize = { width: 150, height: 50 }; }
        if (clipPathName === void 0) { clipPathName = 'scrollbox-clip-path'; }
        var width = containerSize.width;
        var height = containerSize.height;
        var clipRect = target.append('clipPath').attr('id', clipPathName).append('rect');
        clipRect
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', width + 4)
            .attr('height', height);
    };
    ObjectScrollBar.prototype.scrollUpdate = function (diff) {
        if (this.SCROLL_BAR_MODEL.height >= this.SCROLL_BAR_MODEL.containerHeight)
            return;
        var max = this.SCROLL_BAR_MODEL.containerHeight - (this.SCROLL_BAR_MODEL.height < 0 ? this.MIN_SCROLLBAR_HEIGHT : this.SCROLL_BAR_MODEL.height);
        this.SCROLL_BAR_MODEL.y += diff;
        this.SCROLL_BAR_MODEL.y = Math.max(0, this.SCROLL_BAR_MODEL.y);
        this.SCROLL_BAR_MODEL.y = Math.min(max, this.SCROLL_BAR_MODEL.y);
        this.scrollGroup.attr('transform', "translate(".concat(this.SCROLL_BAR_MODEL.x, ", ").concat(this.SCROLL_BAR_MODEL.y, ")"));
        var compare = 0;
        if (this.SCROLL_BAR_MODEL.height < 0) {
            compare = this.SCROLL_BAR_MODEL.y / (this.SCROLL_BAR_MODEL.containerHeight - this.MIN_SCROLLBAR_HEIGHT); // 10은 scrollbar height
            compare = this.SCROLL_BAR_MODEL.totalHeight * compare - (this.SCROLL_BAR_MODEL.y + this.MIN_SCROLLBAR_HEIGHT * compare); // 10은 scrollbar height
        }
        else {
            compare = this.SCROLL_BAR_MODEL.y;
        }
        this.scroller.next(compare);
        // this.functionListViewGroup.select('.function-item-group')
        //     .attr('transform', `translate(10, ${-1*(compare)})`);
    };
    return ObjectScrollBar;
}());
exports.ObjectScrollBar = ObjectScrollBar;
//# sourceMappingURL=object-scroll-bar.js.map