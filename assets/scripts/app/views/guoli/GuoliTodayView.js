var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblRank = null;
            e.lblGuoli = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                l.guoliPorxy.GUO_LI_TODAY_RANKS,
                this.onTodayRanks,
                this
            );
            facade.subscribe("GUO_LI_CLOSE_ALL", this.onClickClose, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            l.guoliPorxy.sendLookDayRank();
            this.lblGuoli.string =
                i18n.t("GUO_LI_JIN_RI_GUO_LI") + l.guoliPorxy.data.daygl;
            this.lblRank.string =
                i18n.t("GUO_LI_JIN_RI") + l.guoliPorxy.data.dayRank;
        };
        e.prototype.onTodayRanks = function() {
            this.list.data = l.guoliPorxy.todayRanks;
        };
        e.prototype.onClickRank = function() {
            n.utils.openPrefabView("guoli/GuoliTodayRankRwd", null, {
                id: 0
            });
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
            facade.send("GUO_LI_CLOSE_ALL");
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblGuoli", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
