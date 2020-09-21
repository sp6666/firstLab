var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTip = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.onChInfo();
        };
        e.prototype.onChInfo = function() {
            var t = this.node.openParam;
            this.lblTip.string = t ? t.des : "";
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this, !0);
        };
        __decorate([r(cc.Label)], e.prototype, "lblTip", void 0);
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
