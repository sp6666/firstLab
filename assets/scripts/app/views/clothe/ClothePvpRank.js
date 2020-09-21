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
            e.list = null;
            e.lbldate = null;
            e.lblcd = null;
            e.lblMyRank = null;
            e.nodeRank = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = l.clothePveProxy.pvpinfo.info;
            this.lbldate.string =
                n.timeUtil.format(t.sTime, "MM-dd") +
                i18n.t("COMMON_ZHI") +
                n.timeUtil.format(t.eTime, "MM-dd");
            this.list.data = l.clothePveProxy.pvpinfo.rank;
            this.lblMyRank.string =
                l.clothePveProxy.pvpMyscore.rid > 0
                    ? l.clothePveProxy.pvpMyscore.rid + ""
                    : i18n.t("RAKN_UNRANK");
            r.uiUtils.countDown(t.eTime, this.lblcd);
            var e = t.sTime + 3600 * l.clothePveProxy.pvpinfo.start_time;
            this.nodeRank.active = n.timeUtil.second >= e;
            this.nodeRank.active ||
                (this.lblMyRank.string = i18n.t("RAKN_UNRANK"));
        };
        e.prototype.onClickRank = function() {
            var t = {};
            t.rank = l.clothePveProxy.pvpMyscore.rid;
            t.value = l.clothePveProxy.pvpMyscore.score;
            n.utils.openPrefabView("RankCommon", null, {
                rankType: l.rankProxy.CLOTHE_PVP_RANK,
                list: l.clothePveProxy.pvpRankList,
                mine: t
            });
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
        };
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Label)], e.prototype, "lbldate", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblcd", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblMyRank", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeRank", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
