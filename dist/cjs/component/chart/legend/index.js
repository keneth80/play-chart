"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartLegend = exports.legendItemListByGrouped = void 0;
var d3_selection_1 = require("d3-selection");
var chart_configuration_1 = require("../chart-configuration");
var util_1 = require("../util");
var object_scroll_bar_1 = require("../../svg-component/object-scroll-bar");
var legendItemListByGrouped = function (displayNames, colors) {
    var legendItemList = [];
    displayNames.forEach(function (displayName, index) {
        var label = displayName;
        var shape = chart_configuration_1.Shape.RECT;
        legendItemList.push({
            label: label,
            shape: shape,
            selected: true,
            isHide: false,
            color: colors ? colors[index] : undefined
        });
    });
    return legendItemList;
};
exports.legendItemListByGrouped = legendItemListByGrouped;
var ChartLegend = /** @class */ (function () {
    function ChartLegend(configuration) {
        this.legendItemList = [];
        this.legendItemSize = {
            width: 10,
            height: 10
        };
        this.legendContainerSize = {
            width: 0,
            height: 0
        };
        this.legendTopBottmPadding = 10;
        this.legendRightLeftPadding = 10;
        this.addAllWidth = 0;
        this.legendRowCount = 1;
        this.legendPadding = 5;
        this.checkBoxWidth = 15;
        this.legendItemTextHeight = 15;
        this.allWidth = 30;
        this.totalLegendWidth = 0;
        this.legendTextWidthList = [];
        this.checkboxPadding = 0;
        this.configuration = configuration;
    }
    ChartLegend.prototype.parseLegendData = function (seriesList) {
        var legendItemList = [];
        // TODO: 색상을 커스텀으로 줄시에 색상 셋팅이 안됨. 그리고 갯수가 많아지니 아래 여백이 넓어짐.
        seriesList.forEach(function (series) {
            if (series.displayNames && series.displayNames.length) {
                // TODO: series color setup
                (0, exports.legendItemListByGrouped)(series.displayNames, series.colors).forEach(function (legendItem) {
                    legendItemList.push(legendItem);
                });
            }
            else {
                var label = series.displayName ? series.displayName : series.selector;
                var shape = series.shape ? series.shape : chart_configuration_1.Shape.RECT;
                legendItemList.push({
                    label: label,
                    shape: shape,
                    selected: true,
                    isHide: false,
                    color: series.color
                });
            }
        });
        return legendItemList;
    };
    ChartLegend.prototype.init = function () {
        var _this = this;
        var titleTextHeight = (0, util_1.getTextHeight)(this.configuration.defaultLegendStyle.font.size, this.configuration.defaultLegendStyle.font.family); // 14
        // legend row 한개의 길이
        // const checkWidth = this.configuration.margin.left + this.configuration.margin.right + this.configuration.svgGeometry.width - this.legendPadding * 2;
        var checkWidth = this.configuration.svgGeometry.width - this.legendPadding * 2;
        // 초기화.
        this.legendItemList.length = 0;
        this.legendTextWidthList.length = 0;
        this.totalLegendWidth = 0;
        this.paddingQueue = {};
        this.checkboxPadding = this.configuration.isCheckBox ? this.legendItemSize.width + this.legendPadding : 0;
        this.addAllWidth = this.configuration.isAll ? this.allWidth : 0;
        var targetText = null;
        var targetTextWidth = 0;
        if (this.configuration.seriesList.length) {
            // stacked, group bar 의 경우 범례 설정.
            this.legendItemList = this.parseLegendData(this.configuration.seriesList);
            if (this.configuration.seriesList[0].displayNames && this.configuration.seriesList[0].displayNames.length) {
                targetText = (0, util_1.getMaxText)(this.configuration.seriesList[0].displayNames.map(function (displayName) { return displayName; }));
            }
            else {
                // 일반 시리즈의 경우 범례 설정.
                targetText = (0, util_1.getMaxText)(this.configuration.seriesList.map(function (series) { return series.displayName || series.selector; }));
            }
            targetTextWidth = (0, util_1.getTextWidth)(targetText, this.configuration.defaultLegendStyle.font.size, this.configuration.defaultLegendStyle.font.family);
        }
        if (this.configuration.isAll) {
            this.totalLegendWidth = this.allWidth - (this.configuration.isCheckBox ? 0 : 10);
            this.legendTextWidthList.push({
                row: 0,
                breakIndex: -1,
                width: this.totalLegendWidth
            });
        }
        this.totalLegendWidth += this.legendPadding;
        var compareWidth = this.totalLegendWidth;
        var rowNumber = 0;
        // TODO: reduce로 바꾸고 각 변수를 object key value로 할당 할 것.
        this.legendItemList.reduce(function (pre, currentItem, currentIndex) {
            var breakIndex = -1;
            var currentText = currentItem.label;
            var currentTextWidth = (0, util_1.getTextWidth)(currentText, _this.configuration.defaultLegendStyle.font.size, _this.configuration.defaultLegendStyle.font.family);
            var currentItemWidth = (_this.configuration.isCheckBox ? _this.checkBoxWidth : 0) + currentTextWidth + _this.legendItemSize.width + _this.legendPadding;
            _this.totalLegendWidth += currentItemWidth;
            if (compareWidth + currentItemWidth + _this.legendPadding >= checkWidth) {
                breakIndex = currentIndex + (_this.configuration.isAll ? 1 : 0);
                _this.paddingQueue[rowNumber + ''] = checkWidth - compareWidth;
                rowNumber++;
                compareWidth = currentItemWidth;
            }
            else {
                compareWidth += currentItemWidth + _this.legendPadding;
            }
            pre.push({
                text: currentText,
                width: currentItemWidth,
                row: rowNumber,
                breakIndex: breakIndex
            });
            return pre;
        }, this.legendTextWidthList);
        var lastKey = this.legendTextWidthList[this.legendTextWidthList.length - 1].row || 0;
        this.paddingQueue[lastKey + ''] = checkWidth - compareWidth;
        this.totalLegendWidth +=
            this.legendPadding * (this.configuration.seriesList.length - 1) +
                (this.legendItemSize.width + this.legendPadding) * this.configuration.seriesList.length;
        this.legendContainerSize.width =
            this.configuration.placement === chart_configuration_1.Placement.LEFT || this.configuration.placement === chart_configuration_1.Placement.RIGHT
                ? this.legendPadding * 2 +
                    this.legendItemSize.width +
                    this.legendPadding +
                    Math.round(targetTextWidth) +
                    (this.configuration.isCheckBox ? this.checkBoxWidth : 0) +
                    5
                : lastKey + 1 > 1
                    ? this.configuration.svgGeometry.width
                    : this.totalLegendWidth;
        this.legendContainerSize.height =
            this.configuration.placement === chart_configuration_1.Placement.LEFT || this.configuration.placement === chart_configuration_1.Placement.RIGHT
                ? this.configuration.svgGeometry.height
                : (this.legendPadding + titleTextHeight) * (lastKey + 1);
        if (this.configuration.isAll) {
            this.legendItemList.unshift({
                label: 'All',
                selected: true,
                isHide: false,
                shape: chart_configuration_1.Shape.NONE
            });
        }
        return this.legendContainerSize;
    };
    ChartLegend.prototype.drawLegend = function (legendGroup) {
        var _this = this;
        // clip path 설정
        var clipPathName = 'scrollbox-clip-path';
        legendGroup.attr('clip-path', "url(#".concat(clipPathName, ")"));
        // scroll로 인한 view position을 지정해주기 위한.group.
        legendGroup.append('g').attr('class', 'legend-item-list-group').attr('transform', "translate(0, 0)");
        var currentRow = 0;
        var currentX = 0;
        var rowStart = 0;
        var legendItemGroup = legendGroup
            .select('.legend-item-list-group')
            .selectAll('.legend-item-group')
            .data(this.legendItemList)
            .join(function (enter) { return enter.append('g').attr('class', 'legend-item-group'); }, function (update) {
            update.selectAll('*').remove();
            return update;
        }, function (exit) { return exit.remove(); })
            .attr('id', function (d) {
            return d.label === 'All' ? 'legend-all-group' : null;
        })
            .attr('transform', function (d, index) {
            if (_this.configuration.align) {
                var currentRow_1 = _this.legendTextWidthList[index].row;
                if (_this.configuration.align === chart_configuration_1.Align.RIGHT) {
                    rowStart =
                        (_this.paddingQueue[currentRow_1 + ''] ? _this.paddingQueue[currentRow_1 + ''] : rowStart) +
                            (currentRow_1 === 0 ? _this.legendPadding : 0);
                }
                else if (_this.configuration.align === chart_configuration_1.Align.CENTER) {
                    rowStart =
                        (_this.paddingQueue[currentRow_1 + ''] ? _this.paddingQueue[currentRow_1 + ''] : rowStart) +
                            (currentRow_1 === 0 ? _this.legendPadding : 0);
                    rowStart = rowStart / 2;
                }
            }
            var x = rowStart;
            var y = _this.legendTopBottmPadding;
            if (_this.configuration.placement === chart_configuration_1.Placement.LEFT || _this.configuration.placement === chart_configuration_1.Placement.RIGHT) {
                if (_this.configuration.placement === chart_configuration_1.Placement.LEFT) {
                    x = _this.legendPadding;
                }
                x += _this.configuration.addTitleWidth;
                y = index * 20 + _this.legendTopBottmPadding;
            }
            if (_this.configuration.placement === chart_configuration_1.Placement.TOP || _this.configuration.placement === chart_configuration_1.Placement.BOTTOM) {
                if (index > 0) {
                    currentX += _this.legendTextWidthList[index - 1].width + _this.legendPadding;
                }
                if (index === _this.legendTextWidthList[index].breakIndex) {
                    currentRow = _this.legendTextWidthList[index].row;
                    currentX = 0;
                }
                x += currentX;
                y = (_this.legendItemTextHeight + _this.legendPadding) * currentRow;
            }
            return "translate(".concat(x, ", ").concat(y, ")");
        });
        if (this.configuration.isCheckBox) {
            legendItemGroup.each(function (d, index, nodeList) {
                (0, util_1.drawSvgCheckBox)((0, d3_selection_1.select)(nodeList[index]), _this.configuration.onLegendCheckBoxClickHandler);
            });
        }
        var legendLabelGroup = legendItemGroup
            .selectAll('.legend-label-group')
            .data(function (d) { return [d]; })
            .join(function (enter) { return enter.append('g').attr('class', 'legend-label-group'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('id', function (d) {
            return d.label === 'All' ? 'legend-all-label' : null;
        })
            .attr('transform', "translate(".concat(this.checkboxPadding, ", 0)"))
            .on('click', this.configuration.onLegendLabelItemClickHandler);
        legendLabelGroup.each(function (d, i, nodeList) {
            var distictKeys = _this.configuration.isAll ? _this.legendItemList.filter(function (key) { return key.label !== 'All'; }) : _this.legendItemList;
            if (d.shape === chart_configuration_1.Shape.LINE) {
                (0, util_1.drawLegendColorItemByLine)((0, d3_selection_1.select)(nodeList[i]), _this.legendItemSize, distictKeys, _this.configuration.colors);
            }
            else if (d.shape === chart_configuration_1.Shape.CIRCLE) {
                (0, util_1.drawLegendColorItemByCircle)((0, d3_selection_1.select)(nodeList[i]), _this.legendItemSize, distictKeys, _this.configuration.colors);
            }
            else if (d.shape === chart_configuration_1.Shape.RECT) {
                (0, util_1.drawLegendColorItemByRect)((0, d3_selection_1.select)(nodeList[i]), _this.legendItemSize, distictKeys, _this.configuration.colors);
            }
            // if (d.shape === Shape.LINE) {
            //     drawLegendColorItemByLine(select(nodeList[i]), this.legendItemSize, distictKeys, this.configuration.colors);
            // } else if (d.shape === Shape.CIRCLE) {
            //     drawLegendColorItemByCircle(select(nodeList[i]), this.legendItemSize, distictKeys, this.configuration.colors);
            // } else if (d.shape === Shape.RECT) {
            //     drawLegendColorItemByRect(select(nodeList[i]), this.legendItemSize, distictKeys, this.configuration.colors);
            // }
        });
        legendLabelGroup
            .selectAll('.legend-label')
            .data(function (d) { return [d]; })
            .join(function (enter) { return enter.append('text').attr('class', 'legend-label'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .style('font-family', this.configuration.defaultLegendStyle.font.family)
            .style('font-size', this.configuration.defaultLegendStyle.font.size)
            .attr('dy', '.35em')
            .attr('transform', function (d, index) {
            var x = d.shape === chart_configuration_1.Shape.NONE ? 0 : _this.legendPadding + _this.legendItemSize.width;
            return "translate(".concat(x, ", 5)");
        })
            .text(function (d) {
            return d.label;
        });
        if (this.configuration.svgGeometry.height < legendGroup.node().getBBox().height) {
            console.log('draw scrollbar : ', this.configuration.svgGeometry.height, legendGroup.node().getBBox().height);
            // scroll bar initialize
            var backgroundRect = this.drawLegendContainerBackground(legendGroup, {
                width: this.legendContainerSize.width,
                height: this.configuration.svgGeometry.height
            });
            // scrollbar setup
            if (!this.scrollBar) {
                this.scrollBar = new object_scroll_bar_1.ObjectScrollBar({
                    rootGroup: legendGroup,
                    clipPathName: clipPathName,
                    viewPortBackground: backgroundRect,
                    scrollAreaSize: {
                        width: this.legendContainerSize.width,
                        height: this.configuration.svgGeometry.height
                    },
                    padding: 10
                });
                this.addEvent(legendGroup, this.scrollBar, this.scrollEventSubscription);
            }
            this.scrollBar.draw();
        }
    };
    ChartLegend.prototype.destroy = function () {
        if (this.scrollEventSubscription) {
            this.scrollEventSubscription.unsubscribe();
        }
        if (this.scrollBar) {
            this.scrollBar.destroy();
        }
    };
    ChartLegend.prototype.drawLegendContainerBackground = function (targetGroup, containerSize) {
        if (containerSize === void 0) { containerSize = { width: 150, height: 100 }; }
        var width = containerSize.width;
        var height = containerSize.height;
        return targetGroup
            .append('rect')
            .style('fill', '#fff')
            .style('fill-opacity', 0)
            .attr('class', 'legend-group-background')
            .attr('width', width)
            .attr('height', height + 10)
            .lower();
    };
    ChartLegend.prototype.addEvent = function (legendGroup, scrollBar, scrollEventSubscription) {
        // scroll bar event 등록.
        if (scrollBar) {
            scrollEventSubscription = scrollBar.scroller$.subscribe(function (position) {
                legendGroup.select('.legend-item-list-group').attr('transform', "translate(0, ".concat(-1 * position, ")"));
            });
        }
    };
    return ChartLegend;
}());
exports.ChartLegend = ChartLegend;
//# sourceMappingURL=index.js.map