"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionsBase = void 0;
var rxjs_1 = require("rxjs");
var FunctionsBase = /** @class */ (function () {
    function FunctionsBase() {
        this.itemClickSubject = new rxjs_1.Subject();
        this.subscription = new rxjs_1.Subscription();
        this.isEnable = false;
    }
    Object.defineProperty(FunctionsBase.prototype, "chartBase", {
        get: function () {
            return this.chart;
        },
        set: function (value) {
            this.chart = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FunctionsBase.prototype, "$currentItem", {
        get: function () {
            return this.itemClickSubject.asObservable();
        },
        enumerable: false,
        configurable: true
    });
    FunctionsBase.prototype.enable = function (data, scales, geometry) { };
    FunctionsBase.prototype.disable = function () { };
    FunctionsBase.prototype.changeConfiguration = function (configuration) { };
    FunctionsBase.prototype.setSvgElement = function (svg, mainGroup, index) { };
    FunctionsBase.prototype.drawFunctions = function (chartData, scales, geometry) { };
    FunctionsBase.prototype.destroy = function () {
        this.subscription.unsubscribe();
    };
    return FunctionsBase;
}());
exports.FunctionsBase = FunctionsBase;
//# sourceMappingURL=functions-base.js.map