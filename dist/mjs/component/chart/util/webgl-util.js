var defaultShaderType = ['VERTEX_SHADER', 'FRAGMENT_SHADER'];
export var hexToRgb = function (hex) {
    return hex
        .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b) { return '#' + r + r + g + g + b + b; })
        .substring(1)
        .match(/.{2}/g)
        .map(function (x) { return parseInt(x, 16); });
};
export var rgbToHex = function (r, g, b) { return '#' + [r, g, b].map(function (x) { return x.toString(16).padStart(2, '0'); }).join(''); };
export var createProgramFromScripts = function (gl, shaderScriptIds, optAttribs, optLocations, optErrorCallback) {
    var shaders = [];
    for (var ii = 0; ii < shaderScriptIds.length; ++ii) {
        shaders.push(createShaderFromScript(gl, shaderScriptIds[ii], gl[defaultShaderType[ii]], optErrorCallback));
    }
    return createProgram(gl, shaders, optAttribs, optLocations, optErrorCallback);
};
export var createProgramFromSources = function (gl, shaderSources, optAttribs, optLocations, optErrorCallback) {
    var shaders = [];
    for (var ii = 0; ii < shaderSources.length; ++ii) {
        var shaderType = defaultShaderType[ii];
        shaders.push(loadShader(gl, shaderSources[ii], gl[shaderType], optErrorCallback));
    }
    return createProgram(gl, shaders, optAttribs, optLocations, optErrorCallback);
};
export var setupWebglContext = function (canvas) {
    var _a;
    var webglOption = {
        alpha: true,
        antialias: true,
        // preserveDrawingBuffer: true, // 값이 true인 경우 버퍼가 지워지지 않으며 작성자가 지우거나 덮어쓸 때까지 해당 값을 보존합니다.
        powerPreference: 'high-performance',
        // depth: false, // 도면 버퍼에 최소 16비트의 깊이 버퍼가 있음을 나타내는 부울입니다.
        // /**
        //  * 웹GL 컨텍스트에 적합한 GPU 구성을 나타내는 사용자 에이전트에 대한 힌트입니다. 가능한 값은 다음과 같습니다.
        // 'default': 사용자 에이전트가 가장 적합한 GPU 구성을 결정하도록 합니다. 기본 값입니다.
        // 'high-performance': 전력 소비보다 렌더링 성능의 우선 순위를 지정합니다.
        // 'low-power': 렌더링 성능보다 절전의 우선 순위를 지정합니다.
        //  */
        premultipliedAlpha: true,
        stencil: true,
        // desynchronized: true, // 이벤트 루프에서 캔버스 페인트 주기의 비동기화를 해제하여 사용자 에이전트가 대기 시간을 줄이도록 힌트하는 부울
        failIfMajorPerformanceCaveat: true // 시스템 성능이 낮거나 하드웨어 GPU를 사용할 수 없는 경우 컨텍스트가 생성될지 를 나타내는 부울수입니다.
    };
    return (_a = canvas.node().getContext('webgl', webglOption)) !== null && _a !== void 0 ? _a : canvas.node().getContext('experimental-webgl', webglOption);
};
var createShaderFromScript = function (gl, scriptId, optShaderType, optErrorCallback) {
    var shaderSource = '';
    var shaderType;
    var shaderScript = document.getElementById(scriptId);
    if (!shaderScript) {
        throw new Error('*** Error: unknown script element' + scriptId);
    }
    shaderSource = shaderScript.text;
    if (!optShaderType) {
        if (shaderScript.type === 'x-shader/x-vertex') {
            shaderType = gl.VERTEX_SHADER;
        }
        else if (shaderScript.type === 'x-shader/x-fragment') {
            shaderType = gl.FRAGMENT_SHADER;
        }
        else if (shaderType !== gl.VERTEX_SHADER && shaderType !== gl.FRAGMENT_SHADER) {
            throw new Error('*** Error: unknown shader type');
        }
    }
    return loadShader(gl, shaderSource, optShaderType ? optShaderType : shaderType, optErrorCallback);
};
var loadShader = function (gl, shaderSource, shaderType, optErrorCallback) {
    var errFn = optErrorCallback !== null && optErrorCallback !== void 0 ? optErrorCallback : error;
    // Create the shader object
    var shader = gl.createShader(shaderType);
    // Load the shader source
    gl.shaderSource(shader, shaderSource);
    // Compile the shader
    gl.compileShader(shader);
    // Check the compile status
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        // Something went wrong during compilation; get the error
        var lastError = gl.getShaderInfoLog(shader);
        errFn('*** Error compiling shader ' + shader + ':' + lastError);
        gl.deleteShader(shader);
        return null;
    }
    return shader;
};
var createProgram = function (gl, shaders, optAttribs, optLocations, optErrorCallback) {
    var errFn = optErrorCallback !== null && optErrorCallback !== void 0 ? optErrorCallback : error;
    var program = gl.createProgram();
    shaders.forEach(function (shader) {
        gl.attachShader(program, shader);
    });
    if (optAttribs) {
        optAttribs.forEach(function (attrib, ndx) {
            gl.bindAttribLocation(program, optLocations ? optLocations[ndx] : ndx, attrib);
        });
    }
    gl.linkProgram(program);
    // Check the link status
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        // something went wrong with the link
        var lastError = gl.getProgramInfoLog(program);
        errFn('Error in program linking:' + lastError);
        gl.deleteProgram(program);
        return null;
    }
    return program;
};
var error = function (msg) {
    if (console && console.log) {
        console.log('error : ', msg);
    }
};
//# sourceMappingURL=webgl-util.js.map