var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblCost = null;
            e.list = null;
            e.lblScore = null;
            return e;
        }
        e.prototype.onLoad = function() {};
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
        };
        __decorate([a(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([a(n.default)], e.prototype, "list", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblScore", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
