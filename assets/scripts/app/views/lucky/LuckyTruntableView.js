var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../truntable/TrunTableItem"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemArr = [];
            e.lblTime = null;
            e.lblHqCount = null;
            return e;
        }
        e.prototype.onLoad = function() {};
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([a([n.default])], e.prototype, "itemArr", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblHqCount", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
