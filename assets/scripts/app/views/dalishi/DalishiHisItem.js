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
            e.lblIndex = null;
            e.lblName = null;
            e.lblDate = null;
            e.lblTxt = null;
            e.lblMsg = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblIndex.string = t.uid + "";
                this.lblName.string = i18n.t("DALISI_USER_NAME_SCORE", {
                    n: t.name,
                    d: t.fscore
                });
                this.lblDate.string = n.timeUtil.getDateDiff(t.dtime);
                var e = localcache.getItem(localdb.table_hero, t.hid);
                this.lblTxt.string = i18n.t("DALISI_DEF_TXT", {
                    name: e.name,
                    num: t.kill
                });
                this.lblMsg.string = i18n.t("DALISI_DEF_MSG", {
                    value: t.mscore < 0 ? t.mscore : "+" + t.mscore
                });
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblIndex", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblDate", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblTxt", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblMsg", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
