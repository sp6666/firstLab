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
                r.qiuyinProxy.QIUYIN_OPEN_PAIHANG,
                this.updateMyScore,
                this
            );
            var t = Math.ceil(r.qiuyinProxy.data.rankRwd[0].member.length / 6),
                e = 80 * t + 10 * (t - 1) + 65;
            this.list.setWidthHeight(550, e);
            this.list.data = r.qiuyinProxy.data.rankRwd;
            this.updateMyScore();
        };
        e.prototype.onClickRank = function() {
            n.utils.openPrefabView("qiuyin/QiuYinRankView");
        };
        e.prototype.updateMyScore = function() {
            this.lblFuQi.string =
                i18n.t("HEDENG_LEI_JI_JI_FEN") + ":" + r.qiuyinProxy.myRid.score;
            this.lblPaiMing.string =
                i18n.t("ARBOR_DAY_CUR_RANK") + ":" + r.qiuyinProxy.myRid.rid;
            this.lblTime.string = i18n.t("AT_LIST_ACTIVITY_CD");
            var t = this;
            l.uiUtils.countDown(
                r.qiuyinProxy.data.info.eTime,
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
            n.utils.closeView(this);
        };
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblFuQi", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblPaiMing", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
