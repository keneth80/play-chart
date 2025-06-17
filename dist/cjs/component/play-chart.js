"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayChart = void 0;
var tslib_1 = require("tslib");
var chart_base_1 = require("./chart/chart-base");
var PlayChart = /** @class */ (function (_super) {
    tslib_1.__extends(PlayChart, _super);
    function PlayChart(configuration) {
        return _super.call(this, configuration) || this;
    }
    PlayChart.prototype.bootstrap = function (configuration) {
        _super.prototype.bootstrap.call(this, configuration);
    };
    return PlayChart;
}(chart_base_1.ChartBase));
exports.PlayChart = PlayChart;
//# sourceMappingURL=play-chart.js.map