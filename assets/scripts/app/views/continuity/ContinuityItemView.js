var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../models/TimeProxy"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.continuityList = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.data = this.node.openParam;
            this.data && (this.continuityList.data = this.data.items);
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickRecharge = function() {
            l.funUtils.openView(l.funUtils.recharge.id);
        };
        __decorate([s(i.default)], e.prototype, "continuityList", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
