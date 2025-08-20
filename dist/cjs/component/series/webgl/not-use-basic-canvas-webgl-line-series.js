"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicCanvasWebgLineSeries = exports.BasicCanvasWebglLineSeriesModel = void 0;
var tslib_1 = require("tslib");
var d3_selection_1 = require("d3-selection");
var d3_quadtree_1 = require("d3-quadtree");
var d3_scale_1 = require("d3-scale");
var rxjs_1 = require("rxjs");
var chart_interface_1 = require("../../chart/chart.interface");
var series_base_1 = require("../../chart/series-base");
var d3_svg_util_1 = require("../../chart/util/d3-svg-util");
var d3_svg_util_2 = require("../../chart/util/d3-svg-util");
var chart_configuration_1 = require("../../chart/chart-configuration");
var webgl_util_1 = require("../../chart/util/webgl-util");
var chart_1 = require("../../chart");
var BasicCanvasWebglLineSeriesModel = /** @class */ (function () {
    function BasicCanvasWebglLineSeriesModel(x, y, i, // save the index of the point as a property, this is useful
    data) {
        Object.assign(this, {
            x: x,
            y: y,
            i: i,
            data: data
        });
    }
    return BasicCanvasWebglLineSeriesModel;
}());
exports.BasicCanvasWebglLineSeriesModel = BasicCanvasWebglLineSeriesModel;
var BasicCanvasWebgLineSeries = /** @class */ (function (_super) {
    tslib_1.__extends(BasicCanvasWebgLineSeries, _super);
    function BasicCanvasWebgLineSeries(configuration) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, configuration) || this;
        _this.strokeWidth = 2;
        _this.strokeOpacity = 1;
        _this.seriesIndex = -1;
        // private isAnimation: boolean = false;
        _this.move$ = new rxjs_1.Subject();
        // ================= style 관련 변수 =============== //
        _this.radius = 4;
        _this.lineStroke = 1;
        _this.lineColor = '#000000';
        _this.config = configuration;
        _this.dataFilter = configuration.filter;
        if (configuration.style) {
            _this.strokeWidth = (_a = configuration.style.strokeWidth) !== null && _a !== void 0 ? _a : _this.strokeWidth;
            _this.strokeColor = (_b = configuration.style.strokeColor) !== null && _b !== void 0 ? _b : null;
            _this.strokeOpacity = (_c = configuration.style.opacity) !== null && _c !== void 0 ? _c : 1;
        }
        if (configuration.data) {
            _this.seriesData = configuration.data;
        }
        return _this;
    }
    BasicCanvasWebgLineSeries.prototype.setSvgElement = function (svg, mainGroup, index) {
        this.seriesIndex = index;
        this.svg = svg;
        this.svg.style('position', 'absolute');
        this.setTooltipCanvas(this.svg);
        if (!this.chartBase.chartContainer.select('.' + chart_1.ChartSelector.DRAWING_CANVAS).node()) {
            this.canvas = this.chartBase.chartContainer
                .append('canvas')
                .datum({
                index: index
            })
                .attr('class', chart_1.ChartSelector.DRAWING_CANVAS)
                .style('opacity', this.strokeOpacity)
                .style('z-index', 2)
                .style('position', 'absolute');
        }
        else {
            this.canvas = this.chartBase.chartContainer.select('.' + chart_1.ChartSelector.DRAWING_CANVAS);
        }
        if (!this.chartBase.chartContainer.select('.' + chart_1.ChartSelector.SELECTION_CANVAS).node()) {
            this.chartBase.chartContainer
                .append('canvas')
                .datum({
                index: index
            })
                .attr('class', chart_1.ChartSelector.SELECTION_CANVAS)
                .style('z-index', 98)
                .style('position', 'absolute');
        }
    };
    BasicCanvasWebgLineSeries.prototype.drawSeries = function (chartBaseData, scales, geometry, option) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        this.seriesIndex = option.index;
        this.geometry = geometry;
        this.radius = (_c = (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.dot) === null || _b === void 0 ? void 0 : _b.radius) !== null && _c !== void 0 ? _c : 4;
        this.lineStroke = (_f = (_e = (_d = this.config) === null || _d === void 0 ? void 0 : _d.style) === null || _e === void 0 ? void 0 : _e.strokeWidth) !== null && _f !== void 0 ? _f : 1;
        this.lineColor = this.strokeColor ? this.strokeColor : option.color;
        var chartData = this.seriesData ? this.seriesData : chartBaseData;
        var xScale = scales.find(function (scale) { return scale.orient === chart_configuration_1.Placement.BOTTOM; });
        var yScale = scales.find(function (scale) { return scale.orient === chart_configuration_1.Placement.LEFT; });
        // const yScale: Scale = scales.find((scale: Scale) => scale.field === this.yField);
        var x = xScale.scale;
        var y = yScale.scale;
        var xmin = xScale.min;
        var xmax = xScale.max;
        var ymin = yScale.min;
        var ymax = yScale.max;
        var padding = 0;
        if (x.bandwidth) {
            padding = x.bandwidth() / 2;
        }
        var lineData = (!this.dataFilter ? chartData : chartData.filter(function (item) { return _this.dataFilter(item); })).filter(function (d) {
            return d[_this.config.xField] >= xmin - xmin * 0.01 &&
                d[_this.config.xField] <= xmax + xmax * 0.01 &&
                d[_this.config.yField] >= ymin &&
                d[_this.config.yField] <= ymax;
        });
        // console.timeEnd('data_generate' + this.selector);
        this.canvas
            .attr('width', geometry.width)
            .attr('height', geometry.height)
            .style('transform', "translate(".concat(this.chartBase.chartMargin.left + 1, "px, ").concat(this.chartBase.chartMargin.top, "px)"));
        this.chartBase.chartContainer
            .select('.' + chart_1.ChartSelector.SELECTION_CANVAS)
            .attr('width', geometry.width)
            .attr('height', geometry.height)
            .style('transform', "translate(".concat(this.chartBase.chartMargin.left + 1, "px, ").concat(this.chartBase.chartMargin.top, "px)"));
        if (this.restoreCanvas && option.displayType === chart_interface_1.DisplayType.ZOOMOUT) {
            this.canvas.node()
                .getContext('2d')
                .drawImage(this.restoreCanvas.node(), 0, 0, geometry.width, geometry.height, 0, 0, geometry.width, geometry.height);
        }
        else {
            this.webGLStart(lineData, { min: xmin, max: xmax }, { min: ymin, max: ymax }, geometry, this.lineColor);
        }
        // canvas로 drawImage 했을때 라인이 픽셀로 지그재그로 보이는 현상이 있음 antialicing 적용방법이 필요함.
        // 아니면 그냥 다시 그리도록 함.
        if (option.displayType === chart_interface_1.DisplayType.RESIZE) {
            this.restoreCanvas = undefined;
        }
        (0, d3_svg_util_2.delayExcute)(150, function () {
            // TODO: restore 시에만 적용.
            if (option.displayType === chart_interface_1.DisplayType.ZOOMOUT) {
                _this.canvas.node()
                    .getContext('2d')
                    .drawImage(_this.chartBase.webglCanvasElement.node(), 0, 0, geometry.width * 6, geometry.height * 6, 0, 0, geometry.width * 6, geometry.height * 6);
            }
            if (option.displayType === chart_interface_1.DisplayType.ZOOMOUT && !_this.restoreCanvas) {
                _this.restoreCanvas = (0, d3_selection_1.select)(document.createElement('CANVAS'));
                _this.restoreCanvas.attr('width', geometry.width).attr('height', geometry.height);
                _this.restoreCanvas.node().getContext('2d').drawImage(_this.chartBase.webglCanvasElement.node(), 0, 0);
            }
        });
        (0, d3_svg_util_2.delayExcute)(200, function () {
            _this.viewClear();
        });
        if (this.originQuadTree) {
            this.originQuadTree = undefined;
        }
        (0, d3_svg_util_2.delayExcute)(300 + this.seriesIndex * 10, function () {
            // quadtree setup: data indexing by position
            _this.originQuadTree = (0, d3_quadtree_1.quadtree)()
                .extent([
                [0, 0],
                [geometry.width, geometry.height]
            ])
                .addAll(lineData.map(function (d) {
                var xposition = x(d[_this.config.xField]);
                var yposition = y(d[_this.config.yField]);
                return [xposition, yposition, d];
            }));
        });
    };
    BasicCanvasWebgLineSeries.prototype.select = function (displayName, isSelected) {
        this.canvas.style('opacity', isSelected ? null : 0.4);
    };
    BasicCanvasWebgLineSeries.prototype.hide = function (displayName, isHide) {
        this.canvas.style('opacity', !isHide ? null : 0);
    };
    BasicCanvasWebgLineSeries.prototype.destroy = function () {
        if (this.seriesData) {
            this.seriesData.length = 0;
        }
        this.subscription.unsubscribe();
        this.canvas.remove();
    };
    BasicCanvasWebgLineSeries.prototype.getSeriesDataByPosition = function (value) {
        return this.search(this.originQuadTree, value[0] - this.radius, value[1] - this.radius, value[0] + this.radius, value[1] + this.radius);
    };
    BasicCanvasWebgLineSeries.prototype.showPointAndTooltip = function (value, selected) {
        // const index = Math.floor(selected.length / 2);
        var index = selected.length - 1;
        var selectedItem = selected[index];
        this.drawTooltipPoint(this.geometry, selectedItem, {
            radius: this.radius / 2 + 1,
            strokeColor: this.lineColor,
            strokeWidth: this.strokeWidth
        });
        this.setChartTooltip(selectedItem, {
            width: this.geometry.width,
            height: this.geometry.height
        }, value);
        return index;
    };
    BasicCanvasWebgLineSeries.prototype.onSelectItem = function (selectedItem, position) { };
    BasicCanvasWebgLineSeries.prototype.clear = function () {
        this.viewClear();
    };
    // TEST
    BasicCanvasWebgLineSeries.prototype.getCanvasNode = function () {
        return this.canvas.node();
    };
    // TEST
    BasicCanvasWebgLineSeries.prototype.getGeometry = function () {
        return this.geometry;
    };
    BasicCanvasWebgLineSeries.prototype.drawTargetSeries = function () {
        this.canvas.node().getContext('2d').drawImage(this.chartBase.webglCanvasElement.node(), 0, 0);
    };
    // TODO: tooltip에 시리즈 아이디를 부여하여 시리즈 마다 tooltip을 컨트롤 할 수 있도록 한다.
    // multi tooltip도 구현해야 하기 때문에 이방법이 가장 좋음. 현재 중복으로 발생해서 왔다갔다 함.
    BasicCanvasWebgLineSeries.prototype.setChartTooltip = function (seriesData, geometry, mouseEvent) {
        var _a;
        if (this.chartBase.isTooltipDisplay) {
            return;
        }
        this.tooltipGroup = this.chartBase.showTooltip();
        var textElement = this.tooltipGroup
            .select('text')
            .attr('dy', '.1em')
            .text(this.chartBase.tooltip && this.chartBase.tooltip.tooltipTextParser
            ? this.chartBase.tooltip.tooltipTextParser(seriesData)
            : "".concat(this.xField, ": ").concat(seriesData[2][this.config.xField], " \n ").concat(this.yField, ": ").concat(seriesData[2][this.config.yField]));
        (0, d3_svg_util_1.textBreak)(textElement, '\n');
        // const parseTextNode = textElement.node().getBoundingClientRect();
        var parseTextNode = textElement.node().getBBox();
        var textWidth = parseTextNode.width + 7;
        var textHeight = parseTextNode.height + 5;
        var radius = this.config.dot ? (_a = this.config.dot.radius) !== null && _a !== void 0 ? _a : 4 : 0;
        var xPosition = mouseEvent[0] + this.chartBase.chartMargin.left + radius;
        var yPosition = mouseEvent[1];
        if (xPosition + textWidth > geometry.width) {
            xPosition = xPosition - textWidth;
        }
        if (yPosition + textHeight > geometry.height) {
            yPosition = yPosition - textHeight;
        }
        this.tooltipGroup
            .attr('transform', "translate(".concat(xPosition, ", ").concat(yPosition, ")"))
            .selectAll('rect')
            .attr('width', textWidth)
            .attr('height', textHeight);
    };
    BasicCanvasWebgLineSeries.prototype.webGLStart = function (chartData, xAxis, yAxis, geometry, color) {
        var endCount = chartData.length;
        // data generate
        var vertices = this.makeVertices(chartData, xAxis, yAxis);
        // 캔버스 얻어오기
        var canvas = this.canvas.node();
        // 초기화
        this.initGL(canvas);
        // this.viewClear();
        if (this.seriesIndex === 0) {
            // 화면 지우기
            this.viewClear();
            // 깊이버퍼 활성화
            // this.gl.enable(this.gl.DEPTH_TEST);
        }
        // 버퍼 초기화
        var lineVertexBuffer = this.initBuffers(vertices, 3, endCount);
        // 쉐이더 초기화
        this.initShaders(color, geometry, vertices, 0.9);
        // console.time('webgldraw-' + this.selector);
        // 라인 그리기
        this.drawScene(lineVertexBuffer, endCount, canvas, this.gl.LINE_STRIP);
        // 버퍼 초기화
        var pointVertexBuffer = this.initBuffers(vertices, 3, endCount);
        // 쉐이더 초기화
        this.initShaders(color, geometry, vertices, 1);
        // 포인트 그리기
        this.drawScene(pointVertexBuffer, endCount, canvas, this.gl.POINTS);
        // console.timeEnd('webgldraw-' + this.selector);
    };
    BasicCanvasWebgLineSeries.prototype.initGL = function (canvas) {
        try {
            if (!this.gl) {
                this.gl = this.chartBase.webglElementContext;
            }
            this.gl.viewportWidth = canvas.width;
            this.gl.viewportHeight = canvas.height;
        }
        catch (e) {
            if (console && console.log) {
                console.log(e);
            }
        }
        if (!this.gl) {
            alert('Could not initialise WebGL, sorry T.T');
        }
    };
    BasicCanvasWebgLineSeries.prototype.initShaders = function (color, geometry, vertices, alpha) {
        var _a, _b, _c;
        if (alpha === void 0) { alpha = 1; }
        var radius = (_c = (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.dot) === null || _b === void 0 ? void 0 : _b.radius) !== null && _c !== void 0 ? _c : 6;
        // Vertex shader source code
        var vertCodeSquare = "\n        attribute vec3 coordinates;\n\n        void main(void) {\n            gl_Position = vec4(coordinates, 1.0);\n            gl_PointSize = ".concat(radius, ".0;\n        }\n        ");
        // const vertCodeSquare =
        // `
        // attribute vec3 coordinates;
        // attribute vec2 a_normal;
        // uniform float u_linewidth;
        // uniform mat4 u_mv_matrix;
        // uniform mat4 u_p_matrix;
        // void main() {
        //     u_linewidth = 0.5;
        //     a_normal = 1;
        //     vec4 delta = vec4(a_normal * u_linewidth, 0, 0);
        //     vec4 pos = u_mv_matrix * vec4(coordinates, 0, 1);
        //     gl_Position = u_p_matrix * (pos + delta);
        // }
        // `;
        // Create a vertex shader object
        var vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        // Attach vertex shader source code
        this.gl.shaderSource(vertShader, vertCodeSquare);
        // Compile the vertex shader
        this.gl.compileShader(vertShader);
        // const colors = [
        //     1.0,  1.0,  1.0,  1.0,    // 흰색
        //     1.0,  0.0,  0.0,  1.0,    // 빨간색
        //     0.0,  1.0,  0.0,  1.0,    // 녹색
        //     0.0,  0.0,  1.0,  1.0     // 파란색
        // ];
        var tempColor = (0, webgl_util_1.hexToRgb)(color);
        var colorStr = "".concat((tempColor[0] / 255).toFixed(1), ", ").concat((tempColor[1] / 255).toFixed(1), ", ").concat((tempColor[2] / 255).toFixed(1), ", ").concat(alpha === 1 ? '1.0' : alpha + '');
        var fragCode = "\n        precision mediump float;\n        void main(void) {\n            // float r = 0.0, delta = 0.0, alpha = 1.0;\n            // vec2 cxy = 2.0 * gl_PointCoord - 1.0;\n            // r = dot(cxy, cxy);\n            // if (r > 1.0) {\n            //     discard;\n            // }\n            gl_FragColor = vec4(".concat(colorStr, ");\n        }");
        // Create fragment shader object
        var fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        // Attach fragment shader source code
        this.gl.shaderSource(fragShader, fragCode);
        // Compile the fragmentt shader
        this.gl.compileShader(fragShader);
        // Create a shader program object to store
        // the combined shader program
        this.shaderProgram = this.gl.createProgram();
        // Attach a vertex shader
        this.gl.attachShader(this.shaderProgram, vertShader);
        // Attach a fragment shader
        this.gl.attachShader(this.shaderProgram, fragShader);
        // Link both the programs
        this.gl.linkProgram(this.shaderProgram);
        // Use the combined shader program object
        this.gl.useProgram(this.shaderProgram);
        // this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgram, 'antialiased'), 1);
        // const pointSizeRange = this.gl.getParameter(this.gl.ALIASED_POINT_SIZE_RANGE);
        // const pointRadius = Math.min(pointSizeRange[1]/2, 16);
        // const pointSizeUniformLocation = this.gl.getUniformLocation(this.shaderProgram, 'pointSize');
        // this.gl.uniform1f(pointSizeUniformLocation, pointRadius * 2);
        // this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgram, 'pointSize'), 4 * 2);
        // this.gl.blendFuncSeparate(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA, this.gl.ZERO, this.gl.ONE);
        this.gl.enable(this.gl.BLEND);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.cullFace(this.gl.FRONT);
    };
    BasicCanvasWebgLineSeries.prototype.makeVertices = function (chartData, xAxis, yAxis) {
        // data 만들기
        var xScale = (0, d3_scale_1.scaleLinear)().domain([xAxis.min, xAxis.max]).range([-1, 1]); // [-0.99, 0.99]
        var yScale = (0, d3_scale_1.scaleLinear)().domain([yAxis.min, yAxis.max]).range([-1, 1]); // [-0.99, 0.99]
        var vertices = [];
        var endCount = chartData.length;
        for (var i = 0; i < endCount; i++) {
            var xposition = xScale(chartData[i][this.config.xField]);
            var yposition = yScale(chartData[i][this.config.yField]);
            vertices.push(xposition);
            vertices.push(yposition);
            vertices.push(0);
        }
        return vertices;
    };
    BasicCanvasWebgLineSeries.prototype.initBuffers = function (vertices, itemSize, numItems) {
        // example
        /*
        // 사각형 좌표
        vertices = [
            1.0,  1.0,  0.0,
            -1.0,  1.0,  0.0,
            1.0, -1.0,  0.0,
            -1.0, -1.0,  0.0
        ];

        vertexBuffer.itemSize = 3; // 3 (col)
        vertexBuffer.numItems = 4; // 4 (row)
        */
        if (vertices === void 0) { vertices = []; }
        // Create an empty buffer object
        var vertexBuffer = this.gl.createBuffer();
        vertexBuffer.itemSize = itemSize;
        vertexBuffer.numItems = numItems;
        // Bind appropriate array buffer to it
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        // Pass the vertex data to the buffer
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
        // Unbind the buffer
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        return vertexBuffer;
    };
    BasicCanvasWebgLineSeries.prototype.drawScene = function (buffer, dataSize, canvas, glType) {
        // 창을 설정
        this.gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
        if (this.seriesIndex === 0) {
            // 화면 지우기
            this.viewClear();
        }
        // Bind vertex buffer object
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        // Get the attribute location
        var coord = this.gl.getAttribLocation(this.shaderProgram, 'coordinates');
        // Point an attribute to the currently bound VBO
        this.gl.vertexAttribPointer(coord, buffer.itemSize, this.gl.FLOAT, false, 0, 0);
        // Enable the attribute
        this.gl.enableVertexAttribArray(coord);
        this.gl.lineWidth(1 / 1000);
        this.gl.drawArrays(glType, 0, dataSize);
        // Bind vertex buffer object
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        // delayExcute(100 + this.seriesIndex * 10, () => {
        //     if (!this.originalChartImage) {
        //         // this.originalChartImage = new Image();
        //         // this.originalChartImage.src = canvas.toDataURL('image/png');
        //         canvas.toBlob((blob) => {
        //             this.originalChartImage = new Image();
        //             // this.originalChartImage.src = canvas.toDataURL('image/png');
        //             this.originalChartImage.onload = () =>  URL.revokeObjectURL(this.originalChartImage.src);  // no longer need to read the blob so it's revoked
        //             this.originalChartImage.src = URL.createObjectURL(blob);
        //         });
        //     }
        // });
    };
    BasicCanvasWebgLineSeries.prototype.execRestore = function (image, width, height) {
        var shaderCode = "\n        attribute vec2 a_position;\n\n        uniform vec2 u_resolution;\n        uniform mat3 u_matrix;\n\n        varying vec2 v_texCoord;\n\n        void main() {\n\n            gl_Position = vec4(u_matrix * vec3(a_position, 1), 1);\n            v_texCoord = a_position;\n        }\n        ";
        var fragCode = "\n        precision mediump float;\n\n        // our texture\n        uniform sampler2D u_image;\n\n        // the texCoords passed in from the vertex shader.\n        varying vec2 v_texCoord;\n\n        void main() {\n            gl_FragColor = texture2D(u_image, v_texCoord);\n        }\n        ";
        var canvas = this.canvas.node();
        // 초기화
        this.initGL(canvas);
        var gl = this.gl;
        // const program = createProgramFromScripts(gl, ['2d-vertex-shader', '2d-fragment-shader'], null, null, null);
        var program = (0, webgl_util_1.createProgramFromSources)(gl, [shaderCode, fragCode], null, null, null);
        gl.useProgram(program);
        // look up where the vertex data needs to go.
        var positionLocation = gl.getAttribLocation(program, 'a_position');
        // look up uniform locations
        var uImageLoc = gl.getUniformLocation(program, 'u_image');
        var uMatrixLoc = gl.getUniformLocation(program, 'u_matrix');
        // provide texture coordinates for the rectangle.
        var positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // Set the parameters so we can render any size image.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        // Upload the image into the texture.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        var dstX = 0;
        var dstY = 0;
        var dstWidth = width;
        var dstHeight = height;
        // convert dst pixel coords to clipspace coords
        var clipX = (dstX / gl.canvas.width) * 2 - 1;
        var clipY = (dstY / gl.canvas.height) * -2 + 1;
        var clipWidth = (dstWidth / gl.canvas.width) * 2;
        var clipHeight = (dstHeight / gl.canvas.height) * -2;
        // build a matrix that will stretch our
        // unit quad to our desired size and location
        gl.uniformMatrix3fv(uMatrixLoc, false, [clipWidth, 0, 0, 0, clipHeight, 0, clipX, clipY, 1]);
        // Draw the rectangle.
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    BasicCanvasWebgLineSeries.prototype.drawTooltipPoint = function (geometry, selectedItem, style) {
        var selectionCanvas = this.chartBase.chartContainer.select('.' + chart_1.ChartSelector.SELECTION_CANVAS);
        var context = selectionCanvas.node().getContext('2d');
        context.clearRect(0, 0, geometry.width, geometry.height);
        context.fillStyle = style.strokeColor;
        context.lineWidth = style.strokeWidth;
        context.strokeStyle = '#000000';
        // cx, cy과 해당영역에 출력이 되는지? 좌표가 마이너스면 출력 안하는 로직을 넣어야 함.
        var cx = +selectedItem[0];
        var cy = +selectedItem[1];
        if (cx < 0 || cy < 0) {
            return;
        }
        var rectSize = style.radius * 2.5;
        context.beginPath();
        context.fillRect(cx - rectSize / 2, cy - rectSize / 2, rectSize, rectSize);
        // context.strokeRect(cx - style.radius - 0.5, cy - style.radius + 0.5, style.radius * 2, style.radius * 2);
        // context.arc(pointer.cx, pointer.cy, pointer.r, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.stroke();
    };
    BasicCanvasWebgLineSeries.prototype.viewClear = function () {
        // 화면 지우기
        this.gl.clearColor(0, 0, 0, 0); // rgba
        // 화면 지우기
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Enable depth testing
        // this.gl.enable(this.gl.DEPTH_TEST);
        // this.gl.depthFunc(this.gl.LEQUAL);
    };
    return BasicCanvasWebgLineSeries;
}(series_base_1.SeriesBase));
exports.BasicCanvasWebgLineSeries = BasicCanvasWebgLineSeries;
//# sourceMappingURL=not-use-basic-canvas-webgl-line-series.js.map