var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblRank = null;
            e.lblScore = null;
            return e;
        }
        e.prototype.onLoad = function() {};
        __decorate([r(i.default)], e.prototype, "list", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblScore", void 0);
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
