var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../models/TimeProxy"),
    n = require("../../utils/Utils"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblDes = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = i.funUtils.getWillOpen(),
                e = localcache.getItem(localdb.table_iconOpen, t.id);
            this.lblName.string = e.title;
            this.lblDes.string = e.errmsg;
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
        };
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblDes", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
