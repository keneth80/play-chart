"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiderChart = exports.ImageSpiderChart = exports.PlayChart = void 0;
exports.default = {
    install: function () {
        console.log('install');
    }
};
var play_chart_1 = require("./component/play-chart");
Object.defineProperty(exports, "PlayChart", { enumerable: true, get: function () { return play_chart_1.PlayChart; } });
var image_spider_chart_1 = require("./component/series/svg/image-spider/image-spider-chart");
Object.defineProperty(exports, "ImageSpiderChart", { enumerable: true, get: function () { return image_spider_chart_1.ImageSpiderChart; } });
var spider_chart_1 = require("./component/series/svg/spider/spider-chart");
Object.defineProperty(exports, "SpiderChart", { enumerable: true, get: function () { return spider_chart_1.SpiderChart; } });
//# sourceMappingURL=index.js.map