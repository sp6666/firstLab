var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTime = null;
            e.lblCur = null;
            e.lblTotal = null;
            e.list = null;
            e.welcome = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                l.guoliPorxy.GUO_LI_DATA_UPDATE,
                this.onDataUpdate,
                this
            );
            facade.subscribe("GUO_LI_CLOSE_ALL", this.onClickClose, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            l.guoliPorxy.sendLookDayRank();
            l.guoliPorxy.sendOpenActivity();
        };
        e.prototype.onDataUpdate = function() {
            var t = this;
            r.uiUtils.countDown(
                l.guoliPorxy.data.info.eTime,
                this.lblTime,
                function() {
                    n.timeUtil.second >= l.guoliPorxy.data.info.eTime &&
                        (t.lblTime.string = i18n.t("ACTHD_OVERDUE"));
                }
            );
            this.list.data = l.guoliPorxy.rule;
            this.lblCur.string = Math.floor(l.guoliPorxy.data.allgl) + "";
            this.lblTotal.string = l.guoliPorxy.data.totalRank + "";
        };
        e.prototype.onClickTab = function(t, e) {
            "0" == e
                ? n.utils.openPrefabView("guoli/GuoliTotalRwd")
                : "1" == e
                ? n.utils.openPrefabView(
                      "ActivityShopView",
                      null,
                      l.guoliPorxy.dhShop
                  )
                : "2" == e && n.utils.openPrefabView("guoli/GuoliTotalRank");
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickCloseWelcome = function() {
            this.welcome.active = !1;
        };
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCur", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTotal", void 0);
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Node)], e.prototype, "welcome", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
