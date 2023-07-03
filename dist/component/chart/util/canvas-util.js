export var clearCanvas = function (canvasContext, width, height) {
    canvasContext.clearRect(0, 0, width, height);
    canvasContext.beginPath();
    canvasContext.closePath();
    canvasContext.fill();
};
//# sourceMappingURL=canvas-util.js.map