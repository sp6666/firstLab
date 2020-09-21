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
            e.lbldate = null;
            e.lblcd = null;
            e.lblMyRank = null;
            e.lblMyScore = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.tangyuanProxy.TANG_YUAN_MY_RANK,
                this.onRank,
                this
            );
            n.tangyuanProxy.sendLookRank();
            this.lbldate.string =
                l.timeUtil.format(
                    n.tangyuanProxy.info.info.sTime,
                    "yyyy-MM-dd"
                ) +
                i18n.t("COMMON_ZHI") +
                l.timeUtil.format(
                    n.tangyuanProxy.info.info.eTime,
                    "yyyy-MM-dd"
                );
            var t = this;
            r.uiUtils.countDown(
                n.tangyuanProxy.info.info.eTime,
                this.lblcd,
                function() {
                    t.lblcd.string = i18n.t("ACTHD_OVERDUE");
                }
            );
            this.list.data = n.tangyuanProxy.info.rwd;
            this.lblMyScore.string =n.tangyuanProxy.base.count;
        };
        e.prototype.onRank = function() {
            this.lblMyRank.string = n.tangyuanProxy.myRank.rid
                ? n.tangyuanProxy.myRank.rid + ""
                : i18n.t("RAKN_UNRANK");
        };
        e.prototype.onClickRank = function() {
            l.utils.openPrefabView("limitactivity/AtListRankView", null, {
                isTangYuan: !0,
                id: n.tangyuanProxy.info.info.id
            });
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([c(cc.Label)], e.prototype, "lbldate", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblcd", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblMyRank", void 0);
        __decorate([c(cc.Label)],e.prototype,"lblMyScore",void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
