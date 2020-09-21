var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblTitle = null;
            e.lblRank = null;
            e.lblDes = null;
            e.lblDate = null;
            e.lblTime = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.luckyTableProxy.LUCKY_TABLE_DAY_RANK,
                this.onDayRank,
                this
            );
            facade.subscribe(
                n.luckyTableProxy.LUCKY_TABLE_TOTAL_RANK,
                this.onTotalRank,
                this
            );
            var t = this.node.openParam;
            if (1 == t.type) {
                this.lblTitle.string = i18n.t("LUCKY_TABLE_DAY_RANK");
                var e = n.luckyTableProxy.data.rwd.everyday[0].member.length,
                    o = 10 * Math.ceil(e / 6 - 1),
                    i = 100 * Math.ceil(e / 6) + 70 + o;
                this.list.setWidthHeight(640, i);
                this.list.data = n.luckyTableProxy.data.rwd.everyday;
                n.luckyTableProxy.sendLookRank(1);
                this.lblDes.string = i18n.t("LUCKY_TABLE_RWD_DES_1");
            } else if (2 == t.type) {
                this.lblTitle.string = i18n.t("LUCKY_TABLE_TOTAL_RANK");
                var a = n.luckyTableProxy.data.rwd.total[0].member.length,
                    s = 10 * Math.ceil(a / 6 - 1),
                    c = 100 * Math.ceil(a / 6) + 70 + s;
                this.list.setWidthHeight(640, c);
                this.list.data = n.luckyTableProxy.data.rwd.total;
                n.luckyTableProxy.sendLookRank(2);
                this.lblDes.string = i18n.t("LUCKY_TABLE_RWD_DES_2");
            }
            var _ = this;
            r.uiUtils.countDown(
                n.luckyTableProxy.data.info.eTime,
                this.lblDate,
                function() {
                    _.lblDate.string = i18n.t("ACTHD_OVERDUE");
                },
                !0,
                "USER_REMAIN_TIME",
                "d"
            );
            this.lblTime.string =
                l.timeUtil.format(
                    n.luckyTableProxy.data.info.sTime,
                    "yyyy-MM-dd"
                ) +
                i18n.t("COMMON_ZHI") +
                l.timeUtil.format(
                    n.luckyTableProxy.data.info.eTime,
                    "yyyy-MM-dd"
                );
        };
        e.prototype.onDayRank = function() {
            n.luckyTableProxy.dayRid.rid
                ? (this.lblRank.string = n.luckyTableProxy.dayRid.rid + "")
                : (this.lblRank.string = i18n.t("RAKN_UNRANK"));
        };
        e.prototype.onTotalRank = function() {
            n.luckyTableProxy.totalRid.rid
                ? (this.lblRank.string = n.luckyTableProxy.totalRid.rid + "")
                : (this.lblRank.string = i18n.t("RAKN_UNRANK"));
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        e.prototype.onClickRank = function() {
            var t = this.node.openParam;
            l.utils.openPrefabView("luckytable/LuckyTableRank", null, {
                type: t.type
            });
        };
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblDate", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
