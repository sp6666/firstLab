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
            e.lblTitle = null;
            e.lbldate = null;
            e.lblcd = null;
            e.lblMyRank = null;
            e.lblMyScore = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                r.loverProxy.LOVER_MY_RANK,
                this.onRank,
                this
            );
            r.loverProxy.sendRank();
            this.lbldate.string =
                n.timeUtil.format(
                    r.loverProxy.data.info.sTime,
                    "yyyy-MM-dd"
                ) +
                i18n.t("COMMON_ZHI") +
                n.timeUtil.format(r.loverProxy.data.info.eTime, "yyyy-MM-dd");
            var t = this;
            l.uiUtils.countDown(
                r.loverProxy.data.info.eTime,
                this.lblcd,
                function() {
                    t.lblcd.string = i18n.t("ACTHD_OVERDUE");
                }
            );

            this.list.data = r.loverProxy.data.rwd;

            var e = 0,
            o = r.loverProxy.data.rwd[0].member.length,
            i = 10 * (Math.ceil(o / 6) - 1);
            e = 100 * Math.ceil(o / 6) + 70 + i;
            this.list.setWidthHeight(640, e);

            this.list.data = r.loverProxy.data.rwd;
        };
        e.prototype.onRank = function() {
            this.lblMyRank.string = r.loverProxy.myRank.rid
                ? r.loverProxy.myRank.rid + ""
                : i18n.t("RAKN_UNRANK");
                this.lblMyScore.string = r.loverProxy.myRank.score + "";
        };
        e.prototype.onClickRank = function() {
            n.utils.openPrefabView("limitactivity/AtListRankView", null, {
                isTangYuan: !0,
                id: r.loverProxy.data.info.type
            });
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([c(cc.Label)], e.prototype, "lbldate", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblcd", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblMyRank", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblMyScore", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
