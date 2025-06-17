import { Subject, Subscription } from 'rxjs';
var OptionsBase = /** @class */ (function () {
    function OptionsBase() {
        this.itemClickSubject = new Subject();
        this.subscription = new Subscription();
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
export { OptionsBase };
//# sourceMappingURL=options-base.js.map