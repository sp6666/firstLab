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
            e.lblTime = null;
            e.lblFuQi = null;
            e.lblPaiMing = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.zhongyuanProxy.ZHONGYUAN_OPEN_PAIHANG,
                this.updateMyScore,
                this
            );
            var t = Math.ceil(n.zhongyuanProxy.data.rwd[0].member.length / 6),
                e = 80 * t + 10 * (t - 1) + 65;
            this.list.setWidthHeight(550, e);
            this.list.data = n.zhongyuanProxy.data.rwd;
            this.updateMyScore();
        };
        e.prototype.onClickRank = function() {
            l.utils.openPrefabView("zhongyuan/ZhongYuanRankView");
        };
        e.prototype.updateMyScore = function() {
            this.lblFuQi.string =
                i18n.t("HEDENG_LEI_JI_JI_FEN") +
                ":" +
                n.zhongyuanProxy.myRid.score;
            this.lblPaiMing.string =
                i18n.t("ARBOR_DAY_CUR_RANK") + ":" + n.zhongyuanProxy.myRid.rid;
            this.lblTime.string = i18n.t("AT_LIST_ACTIVITY_CD");
            var t = this;
            r.uiUtils.countDown(
                n.zhongyuanProxy.data.info.eTime,
                this.lblTime,
                function() {
                    t.lblTime.string = i18n.t("ACTHD_OVERDUE");
                },
                !0,
                "USER_REMAIN_TIME",
                "d"
            );
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblFuQi", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblPaiMing", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
