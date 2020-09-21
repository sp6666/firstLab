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
            e.list = null;
            e.lblBoci = null;
            e.dc = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                l.singleRechargeProxy.SINGLE_RECHARGE_DATA_UPDATE,
                this.onCfg,
                this
            );
            var t = this.node.openParam;
            if (t) {
                this.dc = t.id;
                var e = this;
                r.uiUtils.countDown(
                    l.singleRechargeProxy.cfg.info.eTime,
                    this.lblTime,
                    function() {
                        e.lblTime.string = i18n.t("ACTHD_OVERDUE");
                    },
                    !0,
                    "USER_REMAIN_TIME",
                    "d"
                );
                this.lblBoci.string = i18n.t("SINGLE_RECHARGE_BO_CI", {
                    num: t.id
                });
                for (var o = 0, i = 0; i < t.rwd.length; i++)
                    o < t.rwd[i].items.length && (o = t.rwd[i].items.length);
                var n = Math.ceil(o / 5),
                    a = 100 * n + 10 * (n - 1) + 150;
                this.list.setWidthHeight(630, a);
                this.list.data = t.rwd.sort(l.singleRechargeProxy.sortRwd);
            }
        };
        e.prototype.onCfg = function() {
            this.list.data = l.singleRechargeProxy
                .getRewardData(this.dc)
                .rwd.sort(l.singleRechargeProxy.sortRwd);
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
            n.utils.openPrefabView("singlerecharge/SingleRechargeMain");
        };
        e.prototype.onClickGetRwd = function(t, e) {
            var o = e.data;
            if (o) {
                var i = this.node.openParam;
                i && l.singleRechargeProxy.sendReward(i.id, o.dc);
            }
        };
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblBoci", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
