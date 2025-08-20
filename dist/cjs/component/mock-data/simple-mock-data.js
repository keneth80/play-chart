"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleMockTimeData = exports.sampleMockData = void 0;
var sampleMockData = function (count) {
    if (count === void 0) { count = 10; }
    var mockData = [];
    for (var i = 0; i < count; i++) {
        var x = (i + 1);
        var y = Math.round(Math.random() * 10);
        var z = Math.round(Math.random() * 10);
        var total = x + y + z;
        mockData.push({
            x: x,
            y: y,
            z: z,
            total: total,
            data: {
                label: 'number' + (i + 1)
            }
        });
    }
    return mockData;
};
exports.sampleMockData = sampleMockData;
var sampleMockTimeData = function (count) {
    if (count === void 0) { count = 10; }
    var term = 10 * 1000;
    var start = new Date().getTime() - term * count;
    var mockData = [];
    for (var i = 0; i < count; i++) {
        var date = new Date(start + term * i);
        var y = Math.round(Math.random() * 10);
        var z = Math.round(Math.random() * 10);
        mockData.push({
            date: date,
            y: y,
            z: z,
            data: {
                label: 'number' + (i + 1)
            }
        });
    }
    return mockData;
};
exports.sampleMockTimeData = sampleMockTimeData;
//# sourceMappingURL=simple-mock-data.js.map