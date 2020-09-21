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
            e.lblMyScore = null;
            e.lbldate = null;
            e.lblcd = null;
            e.lblMyRank = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                r.cooperateProxy.COOPERATE_MY_RANK,
                this.onRank,
                this
            );
            r.cooperateProxy.sendLookRank();
            this.lbldate.string =
                n.timeUtil.format(
                    r.cooperateProxy.data.info.sTime,
                    "yyyy-MM-dd"
                ) +
                i18n.t("COMMON_ZHI") +
                n.timeUtil.format(r.cooperateProxy.data.info.eTime, "yyyy-MM-dd");
            var t = this;
            l.uiUtils.countDown(
                r.cooperateProxy.data.info.eTime,
                this.lblcd,
                function () {
                    t.lblcd.string = i18n.t("ACTHD_OVERDUE");
                }
            );

            this.list.data = null;

            var e = 0,
                o = r.cooperateProxy.data.rwd[0].member.length,
                i = 10 * (Math.ceil(o / 6) - 1);
            e = 100 * Math.ceil(o / 6) + 70 + i;
            this.list.setWidthHeight(640, e);

            this.showItem();
        };
        e.prototype.showItem = function () {
            this.list.data = r.cooperateProxy.data.rwd;
        };

        e.prototype.onRank = function () {
            this.lblMyRank.string = r.cooperateProxy.myRank.rid ?
                r.cooperateProxy.myRank.rid + "" :
                i18n.t("RAKN_UNRANK");

            this.lblMyScore.string = r.cooperateProxy.myRank.score + "";

        };
        e.prototype.onClickRank = function () {
            n.utils.openPrefabView("limitactivity/AtListRankView", null, {
                isTangYuan: !0,
                id: r.cooperateProxy.data.info.type
            });
        };
        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblMyScore", void 0);
        __decorate([c(cc.Label)], e.prototype, "lbldate", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblcd", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblMyRank", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;