var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/SliderCount"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblGold = null;
            e.silderCount = null;
            e.lblCount = null;
            e.lblCost = null;
            return e;
        }
        e.prototype.onLoad = function() {};
        e.prototype.onClickTaofa = function() {};
        e.prototype.onClickClost = function() {
            this.node.active = !1;
        };
        __decorate([r(cc.Label)], e.prototype, "lblGold", void 0);
        __decorate([r(i.default)], e.prototype, "silderCount", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblCost", void 0);
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
