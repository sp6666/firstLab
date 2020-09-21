var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/Utils"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblDes = null;
            e.lblTime = null;
            e.lblInfo = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_feast, t.id);
                this.lblDes.string = i18n.t("JIULOU_DES", {
                    n: e.name,
                    c: t.num
                });
                this.lblTime.string = n.timeUtil.format(t.ctime);
                this.lblInfo.string = i18n.t("JIULOU_INFO_SCORE", {
                    s: (t.score >= 0 ? "+" : "-") + t.score
                });
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblInfo", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
