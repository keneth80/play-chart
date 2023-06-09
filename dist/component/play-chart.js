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
import { ChartBase } from './chart/chart-base';
var PlayChart = /** @class */ (function (_super) {
    __extends(PlayChart, _super);
    function PlayChart(configuration) {
        return _super.call(this, configuration) || this;
    }
    PlayChart.prototype.bootstrap = function (configuration) {
        _super.prototype.bootstrap.call(this, configuration);
    };
    return PlayChart;
}(ChartBase));
export { PlayChart };
//# sourceMappingURL=play-chart.js.map