"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCanvas = void 0;
var clearCanvas = function (canvasContext, width, height) {
    canvasContext.clearRect(0, 0, width, height);
    canvasContext.beginPath();
    canvasContext.closePath();
    canvasContext.fill();
};
exports.clearCanvas = clearCanvas;
//# sourceMappingURL=canvas-util.js.map