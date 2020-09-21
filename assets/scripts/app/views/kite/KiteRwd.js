var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblTime = null;
            e.lblFuQi = null;
            e.lblDate = null;
            e.lblPaiMing = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                r.kiteProxy.KITE_OPEN_PAIHANG,
                this.updateMyScore,
                this
            );
            var t = Math.ceil(r.kiteProxy.data.rwd[0].member.length / 6),
                e = 100 * t + 10 * (t - 1) + 65;
            this.list.setWidthHeight(550, e);
            this.list.data = r.kiteProxy.data.rwd;
            this.updateMyScore();

            this.lblDate.string =
                n.timeUtil.format(
                    r.kiteProxy.data.info.sTime,
                    "yyyy-MM-dd"
                ) +
                i18n.t("COMMON_ZHI") +
                n.timeUtil.format(r.kiteProxy.data.info.eTime, "yyyy-MM-dd");
        };
        e.prototype.onClickRank = function () {
            n.utils.openPrefabView("kite/KiteRankView");
        };
        e.prototype.updateMyScore = function () {
            this.lblFuQi.string = '' + r.kiteProxy.myRid.score;
            this.lblPaiMing.string = '' + r.kiteProxy.myRid.rid;
            this.lblTime.string = i18n.t("AT_LIST_ACTIVITY_CD");
            var t = this;
            l.uiUtils.countDown(
                r.kiteProxy.data.info.eTime,
                this.lblTime,
                function () {
                    t.lblTime.string = i18n.t("ACTHD_OVERDUE");
                }
            );
        };
        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblFuQi", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblDate", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblPaiMing", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;