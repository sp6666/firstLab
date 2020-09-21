var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../Initializer"),
    r = require("../../utils/Utils"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblShili = null;
            e.lblValue = null;
            e.proBar = null;
            e.servantHead = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                var e = localcache.getItem(localdb.table_hero, t.id),
                    o = localcache.getItem(localdb.table_powerStar, e.star);
                this.lblName.string = e.name;
                var i = l.taskProxy.getCurPower(),
                    n = t.aep.e1 + t.aep.e2 + t.aep.e3 + t.aep.e4,
                    r = Math.floor(
                        (i.power / l.servantProxy.servantList.length) *
                            (o.point / 1e4)
                    );
                this.lblShili.string =
                    i18n.t("STRONG_SHI_LI") +
                    (n >= r
                        ? i18n.t("STRONG_QIANG_DA")
                        : i18n.t("STRONG_RUO_XIAO"));
                this.proBar.progress = n / r;
                this.lblValue.string = i18n.t("COMMON_NUM", {
                    f: n,
                    s: r
                });
                this.servantHead.url = a.uiHelps.getServantHead(e.heroid);
            }
        };
        e.prototype.onClickGo = function() {
            r.utils.openPrefabView("stronger/StrongerWindow", null, this.data);
        };
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblShili", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblValue", void 0);
        __decorate([_(cc.ProgressBar)], e.prototype, "proBar", void 0);
        __decorate([_(n.default)], e.prototype, "servantHead", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
