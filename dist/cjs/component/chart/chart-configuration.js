"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shape = exports.Align = exports.ScaleType = exports.Placement = exports.Direction = void 0;
var Direction;
(function (Direction) {
    Direction["BOTH"] = "both";
    Direction["HORIZONTAL"] = "horizontal";
    Direction["VERTICAL"] = "vertical";
})(Direction = exports.Direction || (exports.Direction = {}));
var Placement;
(function (Placement) {
    Placement["TOP"] = "top";
    Placement["BOTTOM"] = "bottom";
    Placement["LEFT"] = "left";
    Placement["RIGHT"] = "right";
})(Placement = exports.Placement || (exports.Placement = {}));
var ScaleType;
(function (ScaleType) {
    ScaleType["NUMBER"] = "number";
    ScaleType["TIME"] = "time";
    ScaleType["STRING"] = "string";
    ScaleType["POINT"] = "point";
})(ScaleType = exports.ScaleType || (exports.ScaleType = {}));
var Align;
(function (Align) {
    Align["CENTER"] = "center";
    Align["LEFT"] = "left";
    Align["RIGHT"] = "right";
    Align["TOP"] = "top";
    Align["BOTTOM"] = "bottom";
})(Align = exports.Align || (exports.Align = {}));
var Shape;
(function (Shape) {
    Shape["LINE"] = "line";
    Shape["RECT"] = "rect";
    Shape["CIRCLE"] = "circle";
    Shape["NONE"] = "none";
})(Shape = exports.Shape || (exports.Shape = {}));
//# sourceMappingURL=chart-configuration.js.map