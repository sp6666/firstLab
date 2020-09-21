var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../component/UrlLoad"),
    r = require("../../utils/UIUtils"),
    a = require("../../utils/Utils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTitle = null;
            e.lblCost = null;
            e.lblScore = null;
            e.iconUrl = null;
            e.lblTodayRank = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblTitle.string = i18n.t("GUO_LI_TITLE_" + t.id);
                this.lblCost.string = i18n.t("GUO_LI_COST_" + t.id, {
                    num: t.cons
                });
                this.lblScore.string =
                    i18n.t("GUO_LI_TEXT_" + t.id) +
                    "+" +
                    t.add +
                    i18n.t("GUO_LI_ADD_SCORE", {
                        num: t.add
                    });
                this.lblCost.node.color = this.lblScore.node.color = this.lblTodayRank.node.color = n.guoliPorxy.getFontColor(
                    t.id
                );
                this.iconUrl.url = r.uiHelps.getGuoliIcon(t.id);
                this.lblTodayRank.string =
                    i18n.t("GUO_LI_JIN_RI") +
                    (0 == n.guoliPorxy.getTodayRank(t.id)
                        ? i18n.t("RAKN_UNRANK")
                        : n.guoliPorxy.getTodayRank(t.id));
            }
        };
        e.prototype.onClickItem = function() {
            a.utils.openPrefabView("guoli/GuoliTodayRankRwd", null, {
                id: this._data.id
            });
        };
        __decorate([_(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([_(l.default)], e.prototype, "iconUrl", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTodayRank", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
