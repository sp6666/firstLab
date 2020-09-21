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
            e.lblSilver = null;
            e.lblZZ = null;
            e.lblName = null;
            e.list = null;
            e.oneKeyTip = null;
            e.nodeBtnOne = null;
            e.nodeConfirm = null;
            return e;
        }
        e.prototype.onLoad = function() {};
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
        };
        __decorate([a(cc.Label)], e.prototype, "lblSilver", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblZZ", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(n.default)], e.prototype, "list", void 0);
        __decorate([a(cc.Node)], e.prototype, "oneKeyTip", void 0);
        __decorate([a(cc.Node)], e.prototype, "nodeBtnOne", void 0);
        __decorate([a(cc.Node)], e.prototype, "nodeConfirm", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
