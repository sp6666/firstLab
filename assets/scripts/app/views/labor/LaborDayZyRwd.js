var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.listWin = null;
            e.listLost = null;
            e.lblWin = null;
            e.url = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = null;
            if (
                (t =
                    r.laborDayProxy.data.set[0].score >
                    r.laborDayProxy.data.set[1].score
                        ? r.laborDayProxy.data.set[0]
                        : r.laborDayProxy.data.set[0].score <
                          r.laborDayProxy.data.set[1].score
                        ? r.laborDayProxy.data.set[1]
                        : null)
            ) {
                var e = localcache.getItem(localdb.table_hero, t.pkID);
                this.lblWin.string = i18n.t("LABOR_DAY_DANG_QIAN_LING_XIAN", {
                    name: e.name
                });
                this.url.url = a.uiHelps.getServantSpine(e.heroid);
            } else
                this.lblWin.string = i18n.t("LABOR_DAY_DANG_QIAN_LING_XIAN", {
                    name: i18n.t("LABOR_DAY_WEI_CHANG_CHU")
                });
            this.listWin.data = r.laborDayProxy.data.winrwd;
            this.listLost.data = r.laborDayProxy.data.lostrwd;
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        __decorate([_(i.default)], e.prototype, "listWin", void 0);
        __decorate([_(i.default)], e.prototype, "listLost", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblWin", void 0);
        __decorate([_(n.default)], e.prototype, "url", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
