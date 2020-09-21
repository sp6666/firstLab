var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../utils/UIUtils"),
    a = require("../../component/UrlLoad"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTitle = null;
            e.lblRank = null;
            e.lblDes = null;
            e.iconUrl = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = "GUO_LI_TITLE_" + t.id;
                this.lblTitle.string = i18n.t(e);
                this.lblRank.string =
                    i18n.t("GUO_LI_JIN_RI") +
                    (0 == t.rid ? i18n.t("RAKN_UNRANK") : t.rid);
                this.lblDes.node.color = this.lblRank.node.color = n.guoliPorxy.getFontColor(
                    t.id
                );
                this.iconUrl.url = r.uiHelps.getGuoliIcon(t.id);
            }
        };
        e.prototype.onClickItem = function() {
            l.utils.openPrefabView("guoli/GuoliTodayRankRwd", null, {
                id: this._data.id
            });
        };
        __decorate([_(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([_(a.default)], e.prototype, "iconUrl", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
