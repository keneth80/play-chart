import { __assign, __extends, __spreadArray } from "tslib";
import { select } from 'd3-selection';
import { linkVertical } from 'd3-shape';
import { SeriesBase } from '../../chart/series-base';
import { getElementInfoByEvent, getTransformByArray, wrapTextByRowLimit } from '../../chart/util/d3-svg-util';
var Geometry = /** @class */ (function () {
    function Geometry(id, x, y, width, height, rx, ry) {
        if (id === void 0) { id = ''; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        if (rx === void 0) { rx = 0; }
        if (ry === void 0) { ry = 0; }
        this.id = '';
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.rx = 0;
        this.ry = 0;
        Object.assign(this, {
            id: id,
            x: x,
            y: y,
            width: width,
            height: height,
            rx: rx,
            ry: ry
        });
    }
    return Geometry;
}());
export { Geometry };
var TopologyGroupElement = /** @class */ (function (_super) {
    __extends(TopologyGroupElement, _super);
    function TopologyGroupElement(id, x, y, width, height, rx, ry, data, members) {
        if (id === void 0) { id = ''; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        if (rx === void 0) { rx = 0; }
        if (ry === void 0) { ry = 0; }
        if (data === void 0) { data = {}; }
        if (members === void 0) { members = []; }
        var _this = _super.call(this) || this;
        _this.members = [];
        Object.assign(_this, {
            id: id,
            x: x,
            y: y,
            width: width,
            height: height,
            rx: rx,
            ry: ry,
            data: __assign({}, data),
            members: __spreadArray([], members, true)
        });
        return _this;
    }
    return TopologyGroupElement;
}(Geometry));
export { TopologyGroupElement };
var GeometryLink = /** @class */ (function () {
    function GeometryLink(id, parent, from, to) {
        if (id === void 0) { id = ''; }
        if (parent === void 0) { parent = ''; }
        if (from === void 0) { from = ''; }
        if (to === void 0) { to = ''; }
        this.id = '';
        this.parent = '';
        this.from = '';
        this.to = '';
        Object.assign(this, {
            id: id,
            parent: parent,
            from: from,
            to: to
        });
    }
    return GeometryLink;
}());
export { GeometryLink };
var TopologyData = /** @class */ (function () {
    function TopologyData(groups, machines) {
        if (groups === void 0) { groups = []; }
        if (machines === void 0) { machines = []; }
        this.groups = [];
        this.machines = [];
        Object.assign(this, {
            groups: groups,
            machines: machines
        });
    }
    return TopologyData;
}());
export { TopologyData };
var BasicTopology = /** @class */ (function (_super) {
    __extends(BasicTopology, _super);
    function BasicTopology(configuration) {
        var _this = _super.call(this, configuration) || this;
        _this.boldColor = '#0384fc';
        _this.onMachineOver = function (event, data) {
            _this.currentSector = select(event.target).style('stroke', _this.boldColor);
            var machineAlias = data.data.machineAlias.toLowerCase();
            var links = _this.linkGroup.selectAll("path.".concat(_this.selector, "-machine-link")).data();
            // member opacity 조정
            _this.mainGroup
                .selectAll("g.".concat(_this.selector, "-member-group"))
                .filter(function (item, i, node) {
                var memeberId = select(node[i]).attr('id');
                return (links.findIndex(function (link) {
                    return link[0].data === memeberId && link[1].data === machineAlias;
                }) === -1);
            })
                .style('opacity', 0.5);
            // member filter
            _this.mainGroup
                .selectAll("g.".concat(_this.selector, "-member-group"))
                .filter(function (item, i, node) {
                var memeberId = select(node[i]).attr('id');
                return (links.findIndex(function (link) {
                    return link[0].data === memeberId && link[1].data === machineAlias;
                }) > -1);
            })
                .style('stroke', _this.boldColor);
            // line filter
            _this.linkGroup
                .selectAll("path.".concat(_this.selector, "-machine-link"))
                .filter(function (item) { return item[1].data === machineAlias; })
                .style('stroke', _this.boldColor);
            // machine opacity 조정.
            _this.mainGroup
                .selectAll("g.".concat(_this.selector, "-sector-machine-group"))
                .filter(function (item) { return item.id !== data.id; })
                .style('opacity', 0.5);
            event.stopPropagation();
        };
        _this.onMachineOut = function (event, data) {
            _this.currentSector = select(event.target).style('stroke', '');
            _this.mainGroup.selectAll("g.".concat(_this.selector, "-sector-machine-group")).style('opacity', '');
            _this.mainGroup.selectAll("g.".concat(_this.selector, "-member-group")).style('stroke', '').style('opacity', '');
            _this.initStyle();
            event.stopPropagation();
        };
        _this.onSectorMouseOver = function (event, data) {
            _this.currentSector = select(event.target).style('stroke', _this.boldColor);
            var selectIps = [];
            var currentIp = '';
            data.members.forEach(function (member) {
                if (currentIp !== member.machineIP) {
                    selectIps.push(member.machineIP);
                    currentIp = member.machineIP;
                }
            });
            // machine filter
            _this.mainGroup
                .selectAll("g.".concat(_this.selector, "-sector-machine-group"))
                .filter(function (item) { return selectIps.indexOf(item.data.machineID) > -1; })
                .style('stroke', _this.boldColor);
            // machine opacity 조정.
            _this.mainGroup
                .selectAll("g.".concat(_this.selector, "-sector-machine-group"))
                .filter(function (item) { return selectIps.indexOf(item.data.machineID) === -1; })
                .style('opacity', 0.5);
            _this.mainGroup
                .selectAll("g.".concat(_this.selector, "-sector-top-group"))
                .filter(function (item) { return data.id !== item.id; })
                .style('opacity', 0.5);
            _this.mainGroup
                .selectAll("g.".concat(_this.selector, "-sector-bottom-group"))
                .filter(function (item) { return data.id !== item.id; })
                .style('opacity', 0.5);
            _this.linkGroup
                .selectAll(".".concat(_this.selector, "-machine-link"))
                .filter(function (item) {
                return data.members.findIndex(function (member) { return member.memberID.toLowerCase() === item[0].data; }) > -1;
            })
                .style('stroke', _this.boldColor);
            _this.linkGroup
                .selectAll(".".concat(_this.selector, "-machine-link"))
                .filter(function (item) {
                return data.members.findIndex(function (member) { return member.memberID.toLowerCase() === item[0].data; }) === -1;
            })
                .style('opacity', 0.5);
            event.stopPropagation();
        };
        _this.onSectorMouseOut = function (event, data) {
            _this.currentSector = select(event.target).style('stroke', '');
            _this.initStyle();
            event.stopPropagation();
        };
        _this.onMemberMouseOver = function (event, data) {
            var index = getElementInfoByEvent(event).index;
            var memberData = data.members[index];
            var machineData = _this.mainGroup
                .selectAll("g.".concat(_this.selector, "-sector-machine-group"))
                .filter(function (item) { return memberData.machineIP === item.data.machineID; })
                .data()[0];
            // machine filter
            _this.mainGroup
                .selectAll("g.".concat(_this.selector, "-sector-machine-group"))
                .filter(function (item) { return memberData.machineIP === item.data.machineID; })
                .style('stroke', _this.boldColor);
            // machine opacity 조정.
            _this.mainGroup
                .selectAll("g.".concat(_this.selector, "-sector-machine-group"))
                .filter(function (item) { return memberData.machineIP !== item.data.machineID; })
                .style('opacity', 0.5);
            // 선택된 타깃 bold
            _this.currentSector = select(event.target).style('stroke', _this.boldColor);
            // 맴버에 연결된 라인 bold
            _this.linkGroup.select("#".concat(memberData.memberID.toLowerCase(), "-").concat(machineData.data.machineAlias.toLowerCase())).style('stroke', _this.boldColor);
            // 선택된 맴버를 제외한 나머지 맴버의 opacity를 조정.
            _this.mainGroup
                .selectAll("g.".concat(_this.selector, "-sector-top-group"))
                .filter(function (item) { return item.data.frameworkID === memberData.frameworkID; })
                .selectAll("g.".concat(_this.selector, "-member-group"))
                .filter(function (item, i) {
                return i !== index;
            })
                .style('opacity', 0.5);
            _this.mainGroup
                .selectAll("g.".concat(_this.selector, "-sector-bottom-group"))
                .filter(function (item) { return item.data.frameworkID === memberData.frameworkID; })
                .selectAll("g.".concat(_this.selector, "-member-group"))
                .filter(function (item, i) {
                return i !== index;
            })
                .style('opacity', 0.5);
            // 선택된 맴버가 속하지 않는 framework opacity 조정.
            _this.mainGroup
                .selectAll("g.".concat(_this.selector, "-sector-top-group"))
                .filter(function (item) { return data.id !== item.id; })
                .style('opacity', 0.5);
            // 선택된 맴버가 속하지 않는 framework opacity 조정.
            _this.mainGroup
                .selectAll("g.".concat(_this.selector, "-sector-bottom-group"))
                .filter(function (item) { return data.id !== item.id; })
                .style('opacity', 0.5);
            // 다른 라인들의 opacity 조정.
            _this.linkGroup
                .selectAll(".".concat(_this.selector, "-machine-link"))
                .filter(function (item) {
                return memberData.memberID.toLowerCase() !== item[0].data;
            })
                .style('opacity', 0.5);
            event.stopPropagation();
        };
        _this.onMemberMouseOut = function (event, data) {
            var index = getElementInfoByEvent(event).index;
            _this.currentSector = select(event.target).style('stroke', '');
            _this.initStyleByMember(data, index);
            _this.initStyle();
            event.stopPropagation();
        };
        return _this;
    }
    BasicTopology.prototype.setSvgElement = function (svg, mainGroup) {
        this.svg = svg;
        if (!mainGroup.select(".".concat(this.selector, "-group")).node()) {
            this.mainGroup = mainGroup.append('g').attr('class', "".concat(this.selector, "-group"));
        }
        if (!mainGroup.select(".".concat(this.selector, "-link-group")).node()) {
            this.linkGroup = mainGroup.append('g').attr('class', "".concat(this.selector, "-link-group"));
        }
        // TODO: svg zoom group을 삭제 한다? 아니면 mouse handler 연결
        // 우선 zoom group 삭제.
        if (this.svg.select('g.zoom-group').node()) {
            this.svg.select('g.zoom-group').remove();
        }
    };
    BasicTopology.prototype.drawSeries = function (chartData, scales, geometry) {
        var _this = this;
        var groups = chartData[0].groups;
        var SECTOR_PADDING = 10;
        var MEMBER_PADDING = 5;
        var MACHINE_PADDING = 10;
        var MAX_MEMBER_WIDTH = 100;
        var MAX_MACHINE_WIDTH = 100;
        var sectorSize = groups.length;
        var currentMemberCount = 0;
        var bottomStartIndex = 0;
        var memberCountList = groups.map(function (item, index) {
            return item.members.length;
        });
        var memberSize = memberCountList.reduce(function (prev, current) { return +prev + +current; });
        for (var i = 0; i < memberCountList.length; i++) {
            currentMemberCount += memberCountList[i];
            // console.log(`MemberCount ${i}: ${memberCountList[i]} => ${currentMemberCount}`);
            if (memberSize / 2 <= currentMemberCount) {
                bottomStartIndex = i;
                break;
            }
        }
        var topSectorSize = bottomStartIndex + 1;
        var memberPaddingCount = currentMemberCount + topSectorSize;
        var bottomGroupSize = sectorSize - topSectorSize;
        // padding 을 뺀 width
        var calcWidth = geometry.width - SECTOR_PADDING * (topSectorSize - 1) - MEMBER_PADDING * memberPaddingCount;
        // sector y point
        var sectorPoint = geometry.height / (sectorSize > 1 ? 3 : 2);
        // secgor height
        var sectorHeight = sectorPoint * 0.75;
        var memberWidth = calcWidth / currentMemberCount > MAX_MEMBER_WIDTH ? MAX_MEMBER_WIDTH : calcWidth / currentMemberCount;
        // group title height
        var titleHeight = 30;
        // group title height를 뺀 값을 height로
        var memberHeight = sectorHeight - titleHeight * 2;
        // background 설정
        this.mainGroup
            .selectAll('.background')
            .data(['background'])
            .join(function (enter) { return enter.append('rect').attr('class', 'background'); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('width', geometry.width)
            .attr('height', geometry.height)
            .style('fill', 'none');
        var sectorPositions = [];
        var topSectors = groups.filter(function (data, index) { return index < topSectorSize; });
        var bottomSectors = groups.filter(function (data, index) { return index >= topSectorSize; });
        var machineSectors = chartData[0].machines;
        // 상단 그리기
        var topSectorGroup = this.mainGroup
            .selectAll(".".concat(this.selector, "-sector-top-group"))
            .data(topSectors)
            .join(function (enter) { return enter.append('g').attr('class', "".concat(_this.selector, "-sector-top-group")); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('id', function (data, index) {
            return data.data.frameworkID.toLowerCase();
        })
            .attr('transform', function (data, index) {
            var x = 0;
            var y = 0;
            if (index > 0) {
                var prevData = topSectors[index - 1];
                var prevDataMemberSize = prevData.members.length;
                x = prevDataMemberSize * memberWidth + MEMBER_PADDING * (prevDataMemberSize + 1);
                x += sectorPositions[index - 1][0] + SECTOR_PADDING;
                y += sectorPositions[index - 1][1];
            }
            // POINT: 좌표, 사이즈 갱신
            data.x = x;
            data.y = y;
            data.width = data.members.length * memberWidth + MEMBER_PADDING * (data.members.length + 1);
            data.height = sectorHeight;
            sectorPositions.push([data.x, data.y, data.width, data.height]);
            return "translate(".concat(data.x, ", ").concat(data.y, ")");
        });
        // top sector background
        this.drawSectorBackground(topSectorGroup, "".concat(this.selector, "-sector-top-group-background"), '#e1e1e3');
        // top sector title
        this.drawSectorTitle(topSectorGroup, "".concat(this.selector, "-sector-top-group-title"), 'top');
        topSectorGroup.on('mouseover', this.onSectorMouseOver).on('mouseout', this.onSectorMouseOut);
        var topGroupTotalWidth = sectorPositions[topSectorSize - 1][0] + sectorPositions[topSectorSize - 1][2];
        if (sectorPositions.length && geometry.width > topGroupTotalWidth) {
            // 상단 center 정렬
            var moveX_1 = geometry.width / 2 - topGroupTotalWidth / 2;
            topSectorGroup.attr('transform', function (data) {
                data.x = data.x + moveX_1;
                // sector가 하나일 경우에만 예외로 가운데 정렬.
                if (sectorSize < 2) {
                    var moveY = sectorPoint / 2 - data.height / 2;
                    data.y = data.y + moveY;
                }
                return "translate(".concat(data.x, ", ").concat(data.y, ")");
            });
        }
        // member draw start
        this.drawMember(topSectorGroup, this.selector, {
            width: memberWidth,
            height: memberHeight,
            limitWidth: MAX_MEMBER_WIDTH
        }, MEMBER_PADDING, 'top')
            .on('mouseover', this.onMemberMouseOver)
            .on('mouseout', this.onMemberMouseOut);
        // 하단 그리기
        var bottomSectorGroup = this.mainGroup
            .selectAll(".".concat(this.selector, "-sector-bottom-group"))
            .data(bottomSectors)
            .join(function (enter) { return enter.append('g').attr('class', "".concat(_this.selector, "-sector-bottom-group")); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('id', function (data, index) {
            return data.data.frameworkID.toLowerCase();
        })
            .attr('transform', function (data, index) {
            var x = 0;
            var y = sectorPoint * 2 + (sectorPoint - sectorHeight);
            if (index > 0) {
                var prevData = bottomSectors[index - 1];
                var prevDataMemberSize = prevData.members.length;
                x = prevDataMemberSize * memberWidth + MEMBER_PADDING * (prevDataMemberSize + 1);
                x += sectorPositions[topSectorSize + index - 1][0] + SECTOR_PADDING;
            }
            data.x = x;
            data.y = y;
            data.width = data.members.length * memberWidth + MEMBER_PADDING * (data.members.length + 1);
            data.height = sectorHeight;
            sectorPositions.push([data.x, data.y, data.width, data.height]);
            return "translate(".concat(data.x, ", ").concat(data.y, ")");
        });
        // bottom sector background
        this.drawSectorBackground(bottomSectorGroup, "".concat(this.selector, "-sector-bottom-group-background"));
        // bottom sector title
        this.drawSectorTitle(bottomSectorGroup, "".concat(this.selector, "-sector-bottom-group-title"), 'bottom');
        // TODO: 타이틀과 백그라운드 클릭 포인트를 같게 하기위해 투명한 판 생성
        bottomSectorGroup.on('mouseover', this.onSectorMouseOver).on('mouseout', this.onSectorMouseOut);
        var bottomGroupTotalWidth = sectorPositions[sectorPositions.length - 1][0] + sectorPositions[sectorPositions.length - 1][2];
        if (sectorPositions.length && geometry.width > bottomGroupTotalWidth) {
            // 하단 center 정렬
            var moveX_2 = geometry.width / 2 - bottomGroupTotalWidth / 2;
            bottomSectorGroup.attr('transform', function (data) {
                data.x = data.x + moveX_2;
                return "translate(".concat(data.x, ", ").concat(data.y, ")");
            });
        }
        this.drawMember(bottomSectorGroup, this.selector, { width: memberWidth, height: memberHeight, limitWidth: MAX_MEMBER_WIDTH }, MEMBER_PADDING, 'bottom')
            .on('mouseover', this.onMemberMouseOver)
            .on('mouseout', this.onMemberMouseOut);
        // machine 그리기
        var machinePosition = [];
        var calcMachineWidth = (geometry.width - MACHINE_PADDING * (machineSectors.length - 1)) / machineSectors.length;
        var machineWidth = Math.min(Math.min(sectorHeight, MAX_MACHINE_WIDTH), calcMachineWidth);
        var machineTotalWidth = MACHINE_PADDING * (machineSectors.length - 1) + machineWidth * machineSectors.length;
        var movex = geometry.width / 2 - machineTotalWidth / 2;
        var machineGroup = this.mainGroup
            .selectAll(".".concat(this.selector, "-sector-machine-group"))
            .data(machineSectors)
            .join(function (enter) { return enter.append('g').attr('class', "".concat(_this.selector, "-sector-machine-group")); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('id', function (data) {
            return data.data.machineAlias.toLowerCase();
        })
            .attr('transform', function (data, index) {
            var x = index * (machineWidth + MACHINE_PADDING) + movex;
            var y = sectorPoint + (sectorPoint - machineWidth) / 2;
            data.x = x;
            data.y = y;
            data.width = machineWidth;
            data.height = machineWidth;
            machinePosition.push([data.x, data.y, data.width, data.height]);
            return "translate(".concat(data.x, ", ").concat(data.y, ")");
        });
        this.drawSectorBackground(machineGroup, "".concat(this.selector, "-sector-machine-group-background"), '#fff', '#ccc');
        this.drawMachine(machineGroup, this.selector, { width: machineWidth, height: machineWidth, limitWidth: MAX_MACHINE_WIDTH });
        machineGroup.on('mouseover', this.onMachineOver).on('mouseout', this.onMachineOut);
        var positions = this.getPositionFromTarget(this.mainGroup, topSectors, machineSectors, { width: memberWidth, height: memberHeight }, { width: machineWidth, height: machineWidth }, 'top').concat(this.getPositionFromTarget(this.mainGroup, bottomSectors, machineSectors, { width: memberWidth, height: memberHeight }, { width: machineWidth, height: machineWidth }, 'bottom'));
        // link draw
        var vlink = linkVertical()
            .source(function (d) { return d[0]; })
            .target(function (d) { return d[1]; })
            .x(function (d) {
            return d.x;
        })
            .y(function (d) {
            return d.y;
        });
        this.linkGroup
            .selectAll(".".concat(this.selector, "-machine-link"))
            .data(positions)
            .join(function (enter) { return enter.append('path').attr('class', "".concat(_this.selector, "-machine-link")); })
            .attr('id', function (d) {
            return d[0].data + '-' + d[1].data;
        })
            .attr('d', vlink)
            .style('stroke', '#888')
            .style('stroke-width', 1)
            .style('fill', 'none');
    };
    BasicTopology.prototype.initStyleByMember = function (data, index) {
        var memberData = data.members[index];
        this.mainGroup
            .selectAll("g.".concat(this.selector, "-sector-top-group"))
            .filter(function (item) { return item.data.frameworkID === memberData.frameworkID; })
            .selectAll("g.".concat(this.selector, "-member-group"))
            .filter(function (item) { return item.memberID !== memberData.memberID; })
            .style('opacity', '');
        this.mainGroup
            .selectAll("g.".concat(this.selector, "-sector-bottom-group"))
            .filter(function (item) { return item.data.frameworkID === memberData.frameworkID; })
            .selectAll("g.".concat(this.selector, "-member-group"))
            .filter(function (item) { return item.memberID !== memberData.memberID; })
            .style('opacity', '');
    };
    BasicTopology.prototype.initStyle = function () {
        this.mainGroup.selectAll("g.".concat(this.selector, "-sector-top-group")).style('opacity', '');
        this.mainGroup.selectAll("g.".concat(this.selector, "-sector-bottom-group")).style('opacity', '');
        this.mainGroup.selectAll("g.".concat(this.selector, "-sector-machine-group")).style('stroke', '').style('opacity', '');
        this.linkGroup.selectAll("path.".concat(this.selector, "-machine-link")).style('stroke', '#888').style('opacity', '');
    };
    BasicTopology.prototype.getPositionFromTarget = function (targetGroup, sectors, machines, memberSize, machineSize, placement) {
        var positions = [];
        sectors.forEach(function (item) {
            var currentSector = targetGroup.select("#".concat(item.data.frameworkID.toLowerCase()));
            var parentPosition = getTransformByArray(currentSector.attr('transform'));
            for (var i = 0; i < item.members.length; i++) {
                var currentMember = currentSector.select("#".concat(item.members[i].memberID.toLowerCase()));
                var memberPosition = getTransformByArray(currentMember.attr('transform'));
                var position = [];
                position.push({
                    x: +parentPosition[0] + +memberPosition[0] + memberSize.width / 2,
                    y: +parentPosition[1] + +memberPosition[1] + (placement === 'top' ? memberSize.height : 0),
                    data: item.members[i].memberID.toLowerCase()
                });
                for (var j = 0; j < machines.length; j++) {
                    if (item.members[i].machineIP === machines[j].data.machineID) {
                        var currentMachine = targetGroup.select("#".concat(machines[j].data.machineAlias.toLowerCase()));
                        var machinePosition = getTransformByArray(currentMachine.attr('transform'));
                        position.push({
                            x: +machinePosition[0] + machineSize.width / 2,
                            y: +machinePosition[1] + (placement === 'top' ? 0 : machineSize.height),
                            data: machines[j].data.machineAlias.toLowerCase()
                        });
                        positions.push(position);
                        break;
                    }
                }
            }
        });
        return positions;
    };
    BasicTopology.prototype.drawSectorBackground = function (targetGroup, selector, color, stroke) {
        if (color === void 0) { color = '#e1e1e3'; }
        if (stroke === void 0) { stroke = 'none'; }
        // sector background
        return targetGroup
            .selectAll(".".concat(selector))
            .data(function (d) { return [d]; })
            .join(function (enter) { return enter.append('rect').attr('class', selector); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('rx', function (data) {
            return data.rx;
        })
            .attr('ry', function (data) {
            return data.ry;
        })
            .attr('width', function (data) {
            return data.width;
        })
            .attr('height', function (data) {
            return data.height;
        })
            .style('stroke', stroke)
            .style('fill', color);
    };
    BasicTopology.prototype.drawSectorTitle = function (targetGroup, selector, placement) {
        if (placement === void 0) { placement = 'top'; }
        // sector title
        return targetGroup
            .selectAll(".".concat(selector))
            .data(function (d) { return [d]; })
            .join(function (enter) { return enter.append('text').attr('class', selector); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('x', 10)
            .attr('y', function (data) {
            return placement === 'top' ? 20 : data.height - 8;
        })
            .style('font-size', '16px')
            .text(function (data) {
            var txts = data.data.fullName.split('.');
            return "".concat(txts[1]);
        });
    };
    BasicTopology.prototype.drawMember = function (targetGroup, selector, memberGeometry, memberPadding, placement) {
        if (placement === void 0) { placement = 'top'; }
        var topPadding = 30;
        // image size
        var imagePadding = memberGeometry.width * 0.1;
        var imageWidth = memberGeometry.width - imagePadding * 2;
        var imageHeight = memberGeometry.width - imagePadding * 2;
        // text size
        // TODO: text height를 구해야함.
        var textHeight = 12;
        var r = (imageWidth * 0.7) / 2;
        // member draw start
        var memberGroup = targetGroup
            .selectAll(".".concat(selector, "-member-group"))
            .data(function (d) { return d.members; })
            .join(function (enter) { return enter.append('g').attr('class', "".concat(selector, "-member-group")); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('id', function (data) {
            return data.memberID.toLowerCase();
        })
            .attr('transform', function (data, index) {
            var x = memberPadding + (memberPadding + memberGeometry.width) * index;
            var y = topPadding;
            // const y = placement === 'top' ? topPadding : bottomPadding;
            return "translate(".concat(x, ", ").concat(y, ")");
        });
        memberGroup
            .selectAll(".".concat(selector, "-member-group-background"))
            .data(function (d) { return [d]; })
            .join(function (enter) { return enter.append('rect').attr('class', "".concat(selector, "-member-group-background")); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .style('fill', '#fff')
            .attr('rx', 5)
            .attr('ry', 5)
            .attr('width', memberGeometry.width)
            .attr('height', memberGeometry.height);
        memberGroup
            .selectAll(".".concat(selector, "-member-icon"))
            .data(function (d) { return [d]; })
            .join(function (enter) { return enter.append('image').attr('class', "".concat(selector, "-member-icon")); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('x', imagePadding)
            .attr('y', imagePadding)
            .attr('width', imageWidth)
            .attr('height', imageHeight)
            .attr('xlink:href', function (d) {
            return 'assets/image/topology_container_stopped.svg';
        });
        var texts = memberGroup
            .selectAll(".".concat(selector, "-member-title"))
            .data(function (d) { return [d]; })
            .join(function (enter) { return enter.append('text').attr('class', "".concat(selector, "-member-title")); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .text(function (data) {
            var fullNames = data.fullName.split('_');
            return fullNames[fullNames.length - 1];
        })
            .style('font-size', function (d, index, nodeList) {
            // const r = (imageWidth - imagePadding) / 2;
            // return Math.min(2 * r, (2 * r - 8) / nodeList[index].getComputedTextLength() * 24) + 'px';
            var fontSize = memberGeometry.width < memberGeometry.limitWidth ? 12 : 14;
            // TODO: max width check
            return fontSize + 'px';
        })
            .attr('x', function (d, index, nodeList) {
            return memberGeometry.width / 2 - nodeList[index].getComputedTextLength() / 2;
        })
            .attr('y', function (d, index, nodeList) {
            textHeight = nodeList[index].getBBox().height;
            return imageHeight + textHeight;
        })
            .attr('dy', '.35em');
        // y position 센터로 정렬
        var movey = (memberGeometry.height - imagePadding * 2) / 2 - (imageHeight + textHeight) / 2;
        memberGroup.selectAll(".".concat(selector, "-member-icon")).attr('y', imagePadding + movey);
        memberGroup.selectAll(".".concat(selector, "-member-title")).attr('y', imageHeight + textHeight + imagePadding + movey);
        // text 자르기
        texts.each(function (d, index, nodeList) {
            wrapTextByRowLimit(select(nodeList[index]), memberGeometry.width, 1);
        });
        return memberGroup;
    };
    BasicTopology.prototype.drawMachine = function (targetGroup, selector, machineGeometry) {
        // image size
        var imagePadding = machineGeometry.width * 0.15;
        var imageWidth = machineGeometry.width - imagePadding * 2.5;
        var imageHeight = machineGeometry.width - imagePadding * 2.5;
        // text size
        var textHeight = 12;
        var r = (imageWidth * 0.7) / 2;
        // machine draw start
        targetGroup
            .selectAll(".".concat(selector, "-machine-icon"))
            .data(function (d) { return [d]; })
            .join(function (enter) { return enter.append('image').attr('class', "".concat(selector, "-machine-icon")); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .attr('x', machineGeometry.width / 2 - imageWidth / 2)
            .attr('y', imagePadding / 2)
            .attr('width', imageWidth)
            .attr('height', imageHeight)
            .attr('xlink:href', function (d) {
            return 'assets/image/topology_machine_connected.svg';
        });
        var texts = targetGroup
            .selectAll(".".concat(selector, "-machine-title"))
            .data(function (d) { return [d]; })
            .join(function (enter) { return enter.append('text').attr('class', "".concat(selector, "-machine-title")); }, function (update) { return update; }, function (exit) { return exit.remove(); })
            .text(function (data) {
            return data.data.machineAlias;
        })
            .style('font-size', function () {
            // const r = (imageWidth - imagePadding) / 2;
            // return Math.min(2 * r, (2 * r - 8) / nodeList[index].getComputedTextLength() * 24) + 'px';
            var fontSize = machineGeometry.width < machineGeometry.limitWidth ? 12 : 14;
            // TODO: max width check
            return fontSize + 'px';
        })
            .attr('x', function (d, index, nodeList) {
            // textWrapping(select(nodeList[index]), machineGeometry.width);
            return machineGeometry.width / 2 - nodeList[index].getComputedTextLength() / 2;
        })
            .attr('y', function (d, index, nodeList) {
            textHeight = nodeList[index].getBBox().height;
            return imageHeight + textHeight + imagePadding / 2;
        });
        // .attr('dy', '.35em')
        // text 자르기
        texts.each(function (d, index, nodeList) {
            wrapTextByRowLimit(select(nodeList[index]), machineGeometry.width, 1);
        });
        // y position 센터로 정렬
        // const movey = (memberGeometry.height - imagePadding * 2) / 2 - (imageHeight + textHeight) / 2;
        // memberGroup.selectAll(`.${this.selector}-member-icon`)
        //     .attr('y', imagePadding + movey);
        // memberGroup.selectAll(`.${this.selector}-member-title`)
        //     .attr('y', imageHeight + textHeight +imagePadding + movey);
        return targetGroup;
    };
    return BasicTopology;
}(SeriesBase));
export { BasicTopology };
//# sourceMappingURL=basic-topology.js.map