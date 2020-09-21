var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = require("../../models/TimeProxy"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTime = null;
            e.lblTodayRecharge = null;
            e.lblTotalDay = null;
            e.lblDes = null;
            e.dailyList = null;
            e.totalList = null;
            e.btnGo = null;
            e.btnGetDaily = null;
            e.btnGetTotal = null;
            e.dailyBar = null;
            e.totalBar = null;
            e.dailyYlq = null;
            e.totalYlq = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                l.dailyRechargeProxy.DAILY_RECHARGE_DATA_UPDATE,
                this.onDataUpdate,
                this
            );
            l.dailyRechargeProxy.sendOpenActivity();
        };
        e.prototype.onDataUpdate = function() {
            var t = l.dailyRechargeProxy.data.cfg,
                e = l.dailyRechargeProxy.data;
            if (e && t) {
                this.lblTodayRecharge.string =
                    i18n.t("DAILY_RECHARGE_TODAT") +
                    i18n.t("COMMON_NEED", {
                        f: e.cons,
                        s: t.quota
                    });
                this.lblTotalDay.string =
                    i18n.t("DAILY_RECHARGE_LIAN_XU") +
                    i18n.t("COMMON_NEED", {
                        f: e.day,
                        s: t.duration
                    });
                this.btnGetTotal.interactable = e.day >= t.duration;
                this.btnGetTotal.node.active = 0 == e.dayGet;
                this.btnGo.active = 0 == e.consGet && e.cons < t.quota;
                this.btnGetDaily.active = 0 == e.consGet && e.cons >= t.quota;
                this.dailyBar.progress = 1 == e.consGet ? 1 : e.cons / t.quota;
                this.totalBar.progress = 1 == e.dayGet ? 1 : e.day / t.duration;
                this.lblDes.string = t.msg;
                this.dailyList.data = t.rwd;
                this.totalList.data = t.totalrwd;
                this.dailyYlq.active = 1 == e.consGet;
                this.totalYlq.active = 1 == e.dayGet;
                var o = this;
                r.uiUtils.countDown(t.info.showTime, this.lblTime, function() {
                    n.timeUtil.second > t.info.showTime &&
                        (o.lblTime.string = i18n.t("ACTHD_OVERDUE"));
                });
            }
        };
        e.prototype.onClickRecharge = function() {
            a.funUtils.openView(a.funUtils.recharge.id);
        };
        e.prototype.onClickGetDaily = function() {
            l.dailyRechargeProxy.sendGetDailyReward();
        };
        e.prototype.onClickGetTotal = function() {
            l.dailyRechargeProxy.sendGetTotalReward();
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([_(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTodayRecharge", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTotalDay", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([_(i.default)], e.prototype, "dailyList", void 0);
        __decorate([_(i.default)], e.prototype, "totalList", void 0);
        __decorate([_(cc.Node)], e.prototype, "btnGo", void 0);
        __decorate([_(cc.Node)], e.prototype, "btnGetDaily", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnGetTotal", void 0);
        __decorate([_(cc.ProgressBar)], e.prototype, "dailyBar", void 0);
        __decorate([_(cc.ProgressBar)], e.prototype, "totalBar", void 0);
        __decorate([_(cc.Node)], e.prototype, "dailyYlq", void 0);
        __decorate([_(cc.Node)], e.prototype, "totalYlq", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
