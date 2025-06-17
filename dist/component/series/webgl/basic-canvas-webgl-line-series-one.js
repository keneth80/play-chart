var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { quadtree } from 'd3-quadtree';
import { scaleLinear } from 'd3-scale';
import { ChartSelector } from '../../chart';
import { DisplayType } from '../../chart/chart.interface';
import { SeriesBase } from '../../chart/series-base';
import { colorDarker, delayExcute } from '../../chart/util/d3-svg-util';
import { setChartTooltipByPosition } from '../../chart/util/tooltip-util';
import { createProgramFromSources, hexToRgb } from '../../chart/util/webgl-util';
var BasicCanvasWebglLineSeriesOneModel = /** @class */ (function () {
    function BasicCanvasWebglLineSeriesOneModel(x, y, i, // save the index of the point as a property, this is useful
    data) {
        Object.assign(this, {
            x: x,
            y: y,
            i: i,
            data: data
        });
    }
    return BasicCanvasWebglLineSeriesOneModel;
}());
export { BasicCanvasWebglLineSeriesOneModel };
var BasicCanvasWebgLineSeriesOne = /** @class */ (function (_super) {
    __extends(BasicCanvasWebgLineSeriesOne, _super);
    // private strokeOpacity = 1;
    function BasicCanvasWebgLineSeriesOne(configuration) {
        var _this = _super.call(this, configuration) || this;
        _this.seriesIndex = -1;
        _this.padding = 0;
        // ================= zoom 관련 변수 ================ //
        _this.displayType = DisplayType.NORMAL;
        _this.cashingVertices = [];
        // ================= style 관련 변수 =============== //
        _this.radius = 4;
        _this.dotFill = '';
        _this.strokeColor = '';
        _this.strokeWidth = 1;
        _this.config = configuration;
        return _this;
    }
    BasicCanvasWebgLineSeriesOne.prototype.xField = function () {
        return this.config.xField;
    };
    BasicCanvasWebgLineSeriesOne.prototype.yField = function () {
        return this.config.yField;
    };
    BasicCanvasWebgLineSeriesOne.prototype.setSvgElement = function (svg, mainGroup, index) {
        this.seriesIndex = index;
        this.svg = svg;
        this.svg.style('position', 'absolute');
        this.setTooltipCanvas(this.svg);
        if (!this.chartBase.chartContainer.select('.' + ChartSelector.DRAWING_CANVAS).node()) {
            this.canvas = this.chartBase.chartContainer
                .append('canvas')
                .datum({
                index: index
            })
                .attr('class', ChartSelector.DRAWING_CANVAS)
                // .style('opacity', this.strokeOpacity)
                .style('z-index', 2)
                .style('position', 'absolute');
        }
        else {
            this.canvas = this.chartBase.chartContainer.select('.' + ChartSelector.DRAWING_CANVAS);
        }
        if (!this.chartBase.chartContainer.select('.' + ChartSelector.SELECTION_CANVAS).node()) {
            this.chartBase.chartContainer
                .append('canvas')
                .attr('class', ChartSelector.SELECTION_CANVAS)
                .style('z-index', 98)
                .style('position', 'absolute');
        }
    };
    BasicCanvasWebgLineSeriesOne.prototype.drawSeries = function (chartBaseData, scales, geometry, option) {
        var _this = this;
        var _a, _b;
        this.displayType = option.displayType;
        this.seriesIndex = option.index;
        this.geometry = geometry;
        this.radius = this.config.dot ? (_a = this.config.dot.radius) !== null && _a !== void 0 ? _a : 4 : 0;
        this.color = this.strokeColor = (_b = this.checkSeriesColor()) !== null && _b !== void 0 ? _b : option.color;
        this.dotFill = this.config.dot && this.config.dot.fill ? this.config.dot.fill : option.color;
        var chartData = this.config.data ? this.config.data : chartBaseData;
        var xScale = scales.find(function (scale) { return scale.orient === _this.xDirection; });
        var yScale = scales.find(function (scale) { return scale.orient === _this.yDirection; });
        var x = xScale.scale;
        var y = yScale.scale;
        var xmin = xScale.min;
        var xmax = xScale.max;
        var ymin = yScale.min;
        var ymax = yScale.max;
        this.padding = 0;
        if (x.bandwidth) {
            this.padding = x.bandwidth() / 2;
        }
        // resize가 되면 cashing된 scale data를 초기화 한다.
        if (option.displayType === DisplayType.RESIZE) {
            this.cashingVertices.length = 0;
        }
        var lineData = !this.config.filter ? chartData : chartData.filter(function (item) { return _this.config.filter(item); });
        // .filter(
        //     (d: T) =>
        //         d[this.config.xField] >= xmin - xmin * 0.01 &&
        //         d[this.config.xField] <= xmax + xmax * 0.01 &&
        //         d[this.config.yField] >= ymin &&
        //         d[this.config.yField] <= ymax
        // );
        this.canvas
            .attr('width', geometry.width)
            .attr('height', geometry.height)
            .style('transform', "translate(".concat(this.chartBase.chartMargin.left + 1, "px, ").concat(this.chartBase.chartMargin.top, "px)"));
        this.chartBase.chartContainer
            .select('.' + ChartSelector.SELECTION_CANVAS)
            .attr('width', geometry.width)
            .attr('height', geometry.height)
            .style('transform', "translate(".concat(this.chartBase.chartMargin.left + 1, "px, ").concat(this.chartBase.chartMargin.top, "px)"));
        this.webGLStart(lineData, { min: xmin, max: xmax }, { min: ymin, max: ymax }, geometry, this.strokeColor);
        if (this.originQuadTree) {
            this.originQuadTree = undefined;
        }
        var makeQuadtree = function () {
            // quadtree setup: data indexing by position
            _this.originQuadTree = quadtree()
                .extent([
                [0, 0],
                [geometry.width, geometry.height]
            ])
                .addAll(lineData.map(function (d) {
                var xposition = x(d[_this.config.xField]);
                var yposition = y(d[_this.config.yField]);
                return [xposition, yposition, d, _this.radius, _this.radius, _this.strokeColor];
            }));
        };
        if (lineData.length >= 500000) {
            delayExcute(300 + this.seriesIndex * 10, makeQuadtree);
        }
        else {
            makeQuadtree();
        }
    };
    BasicCanvasWebgLineSeriesOne.prototype.drawPointer = function (value, selected) {
        // const index = Math.floor(selected.length / 2);
        var index = selected.length - 1;
        var selectedItem = selected[index];
        this.drawTooltipPoint(this.geometry, selectedItem, {
            radius: this.radius / 2 + 1,
            strokeColor: this.strokeColor,
            strokeWidth: this.strokeWidth
        });
        return index;
    };
    BasicCanvasWebgLineSeriesOne.prototype.select = function (displayName, isSelected) {
        this.canvas.style('opacity', isSelected ? null : 0.4);
    };
    BasicCanvasWebgLineSeriesOne.prototype.hide = function (displayName, isHide) {
        this.canvas.style('opacity', !isHide ? null : 0);
    };
    BasicCanvasWebgLineSeriesOne.prototype.onSelectItem = function (value, selected) {
        var selectedItem = selected[0];
        this.drawSelectionPoint([selectedItem[0], selectedItem[1]], this.geometry, {
            fill: this.dotFill,
            radius: this.radius * 2
        });
    };
    BasicCanvasWebgLineSeriesOne.prototype.destroy = function () {
        this.subscription.unsubscribe();
        if (this.canvas) {
            this.canvas.remove();
        }
        this.chartBase.chartContainer.select('.' + ChartSelector.TOOLTIP_CANVAS).remove();
        this.chartBase.chartContainer.select('.' + ChartSelector.SELECTION_CANVAS).remove();
    };
    BasicCanvasWebgLineSeriesOne.prototype.getSeriesDataByPosition = function (value) {
        return this.search(this.originQuadTree, value[0] - this.radius, value[1] - this.radius, value[0] + this.radius, value[1] + this.radius);
    };
    BasicCanvasWebgLineSeriesOne.prototype.showPointAndTooltip = function (value, selected) {
        // const index = Math.floor(selected.length / 2);
        var index = selected.length - 1;
        var selectedItem = selected[index];
        this.drawTooltipPoint(this.geometry, selectedItem, {
            radius: this.radius / 2 + 1,
            strokeColor: this.strokeColor,
            strokeWidth: this.strokeWidth
        });
        setChartTooltipByPosition(this.chartBase.showTooltip(), this.chartBase.tooltip && this.chartBase.tooltip.tooltipTextParser
            ? this.chartBase.tooltip.tooltipTextParser(selectedItem)
            : "".concat(this.config.xField, ": ").concat(selectedItem[2][this.config.xField], " \n ").concat(this.config.yField, ": ").concat(selectedItem[2][this.config.yField]), this.geometry, [selectedItem[0], selectedItem[1]], {
            width: this.radius,
            height: this.radius
        }, {
            left: this.chartBase.chartMargin.left,
            top: this.chartBase.chartMargin.top
        });
        // this.setChartTooltip(
        //     selectedItem,
        //     {
        //         width: this.geometry.width,
        //         height: this.geometry.height
        //     },
        //     value
        // );
        return index;
    };
    // onSelectItem(selectedItem: Array<any>, event: ChartMouseEvent) {
    //     if (selectedItem && selectedItem.length) {
    //         this.itemClickSubject.next({
    //             data: selectedItem[2],
    //             event: {
    //                 offsetX: event.position[0] + this.chartBase.chartMargin.left,
    //                 offsetY: event.position[1] + this.chartBase.chartMargin.top
    //             },
    //             target: {
    //                 width: 1,
    //                 height: 1
    //             }
    //         });
    //     }
    // }
    BasicCanvasWebgLineSeriesOne.prototype.clear = function () {
        this.viewClear();
    };
    BasicCanvasWebgLineSeriesOne.prototype.checkSeriesColor = function () {
        return this.config.line && this.config.line.strokeColor ? this.config.line.strokeColor : null;
    };
    BasicCanvasWebgLineSeriesOne.prototype.webGLStart = function (chartData, xAxis, yAxis, geometry, color) {
        var endCount = chartData.length;
        if ((this.displayType === DisplayType.NORMAL && !this.cashingVertices.length) ||
            (this.displayType === DisplayType.ZOOMOUT && !this.cashingVertices.length)) {
            this.cashingVertices = this.makeVertices(chartData, xAxis, yAxis);
        }
        // // // data generate
        // const vertices = this.isSizeUpdate ? this.makeVertices(chartData, xAxis, yAxis) : (this.isRestore ? this.cashingVertices : this.makeVertices(chartData, xAxis, yAxis));
        var vertices = this.displayType === DisplayType.ZOOMOUT ? this.cashingVertices : this.makeVertices(chartData, xAxis, yAxis);
        // 캔버스 얻어오기
        var canvas = this.canvas.node();
        // 초기화
        this.initGL(canvas);
        if (this.seriesIndex === 0) {
            // 화면 지우기
            this.viewClear();
            // this.gl.clearColor(0, 0, 0, 0); // rgba
            // 깊이버퍼 활성화
            // this.gl.enable(this.gl.DEPTH_TEST);
        }
        if (!vertices.length) {
            return;
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
    BasicCanvasWebgLineSeriesOne.prototype.initGL = function (canvas) {
        try {
            if (!this.gl) {
                var webglOption = {
                    alpha: true,
                    antialias: true,
                    preserveDrawingBuffer: true,
                    powerPreference: 'high-performance',
                    // depth: false, // 도면 버퍼에 최소 16비트의 깊이 버퍼가 있음을 나타내는 부울입니다.
                    // /**
                    //  * 웹GL 컨텍스트에 적합한 GPU 구성을 나타내는 사용자 에이전트에 대한 힌트입니다. 가능한 값은 다음과 같습니다.
                    // "default": 사용자 에이전트가 가장 적합한 GPU 구성을 결정하도록 합니다. 기본 값입니다.
                    // "high-performance": 전력 소비보다 렌더링 성능의 우선 순위를 지정합니다.
                    // "low-power": 렌더링 성능보다 절전의 우선 순위를 지정합니다.
                    //  */
                    premultipliedAlpha: true,
                    stencil: true,
                    // desynchronized: true, // 이벤트 루프에서 캔버스 페인트 주기의 비동기화를 해제하여 사용자 에이전트가 대기 시간을 줄이도록 힌트하는 부울
                    failIfMajorPerformanceCaveat: true // 시스템 성능이 낮거나 하드웨어 GPU를 사용할 수 없는 경우 컨텍스트가 생성될지 를 나타내는 부울수입니다.
                };
                this.gl = canvas.getContext('webgl', webglOption) || canvas.getContext('experimental-webgl', webglOption);
                this.gl.imageSmoothingEnabled = true;
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
    BasicCanvasWebgLineSeriesOne.prototype.initShaders = function (color, geometry, vertices, alpha) {
        var _a;
        if (alpha === void 0) { alpha = 1; }
        var radius = this.config.dot ? (_a = this.config.dot.radius) !== null && _a !== void 0 ? _a : 6 : 0;
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
        var tempColor = hexToRgb(color);
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
    BasicCanvasWebgLineSeriesOne.prototype.makeVertices = function (chartData, xAxis, yAxis) {
        // data 만들기
        var xScale = scaleLinear().domain([xAxis.min, xAxis.max]).range([-1, 1]); // [-0.99, 0.99]
        var yScale = scaleLinear().domain([yAxis.min, yAxis.max]).range([-1, 1]); // [-0.99, 0.99]
        var vertices = [];
        var endCount = chartData.length;
        var i = 0;
        for (i = 0; i < endCount; i++) {
            var xposition = xScale(chartData[i][this.config.xField]);
            var yposition = yScale(chartData[i][this.config.yField]);
            vertices.push(xposition);
            vertices.push(yposition);
            vertices.push(0);
        }
        return vertices;
    };
    BasicCanvasWebgLineSeriesOne.prototype.initBuffers = function (vertices, itemSize, numItems) {
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
    BasicCanvasWebgLineSeriesOne.prototype.drawScene = function (buffer, dataSize, canvas, glType) {
        // 창을 설정
        this.gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
        if (this.seriesIndex === 0) {
            // 화면 지우기
            this.gl.clearColor(0, 0, 0, 0); // rgba
        }
        // Bind vertex buffer object
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        // Get the attribute location
        var coord = this.gl.getAttribLocation(this.shaderProgram, 'coordinates');
        // Point an attribute to the currently bound VBO
        this.gl.vertexAttribPointer(coord, buffer.itemSize, this.gl.FLOAT, false, 0, 0);
        // Enable the attribute
        this.gl.enableVertexAttribArray(coord);
        // this.gl.lineWidth(1 / 1000);
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
    BasicCanvasWebgLineSeriesOne.prototype.execRestore = function (image, width, height) {
        var shaderCode = "\n        attribute vec2 a_position;\n\n        uniform vec2 u_resolution;\n        uniform mat3 u_matrix;\n\n        varying vec2 v_texCoord;\n\n        void main() {\n            gl_Position = vec4(u_matrix * vec3(a_position, 1), 1);\n            v_texCoord = a_position;\n        }\n        ";
        var fragCode = "\n        precision mediump float;\n\n        // our texture\n        uniform sampler2D u_image;\n\n        // the texCoords passed in from the vertex shader.\n        varying vec2 v_texCoord;\n\n        void main() {\n            gl_FragColor = texture2D(u_image, v_texCoord);\n        }\n        ";
        var canvas = this.canvas.node();
        // 초기화
        this.initGL(canvas);
        var gl = this.gl;
        // const program = createProgramFromScripts(gl, ['2d-vertex-shader', '2d-fragment-shader'], null, null, null);
        var program = createProgramFromSources(gl, [shaderCode, fragCode], null, null, null);
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
    BasicCanvasWebgLineSeriesOne.prototype.drawTooltipPoint = function (geometry, selectedItem, style) {
        var selectionCanvas = this.chartBase.chartContainer.select('.' + ChartSelector.POINTER_CANVAS);
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
    BasicCanvasWebgLineSeriesOne.prototype.drawSelectionPoint = function (position, geometry, style) {
        var selectionCanvas = this.chartBase.chartContainer.select('.' + ChartSelector.SELECTION_CANVAS);
        var context = selectionCanvas.node().getContext('2d');
        context.clearRect(0, 0, geometry.width, geometry.height);
        context.fillStyle = colorDarker(style.fill, 2);
        context.lineWidth = 2;
        context.strokeStyle = colorDarker(style.fill, 1);
        // this.drawPoint(context, {cx: selectedItem[0], cy:selectedItem[1], r: style.radius});
        // cx, cy과 해당영역에 출력이 되는지? 좌표가 마이너스면 출력 안하는 로직을 넣어야 함.
        var cx = position[0];
        var cy = position[1];
        if (cx < 0 || cy < 0) {
            return;
        }
        context.beginPath();
        context.fillRect(cx - style.radius / 2, cy - style.radius / 2, style.radius, style.radius);
        context.closePath();
        context.fill();
        context.stroke();
    };
    BasicCanvasWebgLineSeriesOne.prototype.viewClear = function () {
        // 화면 지우기
        this.gl.clearColor(0, 0, 0, 0); // rgba
        // 화면 지우기
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Enable depth testing
        // this.gl.enable(this.gl.DEPTH_TEST);
        // this.gl.depthFunc(this.gl.LEQUAL);
    };
    return BasicCanvasWebgLineSeriesOne;
}(SeriesBase));
export { BasicCanvasWebgLineSeriesOne };
//# sourceMappingURL=basic-canvas-webgl-line-series-one.js.map