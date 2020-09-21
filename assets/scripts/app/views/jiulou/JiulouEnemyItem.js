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
            e.lblName = null;
            e.lblTime = null;
            e.lblOffice = null;
            e.lblShili = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_officer, t.level);
                this.lblName.string = t.name;
                this.lblTime.string = n.timeUtil.getDateDiff(t.ctime);
                this.lblOffice.string = i18n.t("COMMON_GUANPIN") + " " + e.name;
                this.lblShili.string = i18n.t("COMMON_SHILI") + " " + t.shili;
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblOffice", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblShili", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
