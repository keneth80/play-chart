"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsBase = void 0;
var rxjs_1 = require("rxjs");
var OptionsBase = /** @class */ (function () {
    function OptionsBase() {
        this.itemClickSubject = new rxjs_1.Subject();
        this.subscription = new rxjs_1.Subscription();
    }
    Object.defineProperty(OptionsBase.prototype, "chartBase", {
        get: function () {
            return this.chart;
        },
        set: function (value) {
            this.chart = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OptionsBase.prototype, "$currentItem", {
        get: function () {
            return this.itemClickSubject.asObservable();
        },
        enumerable: false,
        configurable: true
    });
    OptionsBase.prototype.changeConfiguration = function (configuration) { };
    OptionsBase.prototype.setSvgElement = function (svg, mainGroup, index) { };
    OptionsBase.prototype.drawOptions = function (chartData, scales, geometry) { };
    OptionsBase.prototype.destroy = function () {
        this.subscription.unsubscribe();
    };
    return OptionsBase;
}());
exports.OptionsBase = OptionsBase;
//# sourceMappingURL=options-base.js.map