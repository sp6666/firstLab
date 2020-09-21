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
            return e;
        }
        e.prototype.onLoad = function() {
            var t = l.clothePveProxy.info.info;
            this.lbldate.string =
                n.timeUtil.format(t.sTime, "MM-dd") +
                i18n.t("COMMON_ZHI") +
                n.timeUtil.format(t.eTime, "MM-dd");
            this.list.data = l.clothePveProxy.info.rank;
            this.lblMyRank.string =
                l.clothePveProxy.myscore.rid > 0
                    ? l.clothePveProxy.myscore.rid + ""
                    : i18n.t("RAKN_UNRANK");
            r.uiUtils.countDown(t.eTime, this.lblcd);
        };
        e.prototype.onClickRank = function() {
            var t = {};
            t.rank = l.clothePveProxy.myscore.rid;
            t.value = l.clothePveProxy.myscore.score;
            n.utils.openPrefabView("RankCommon", null, {
                rankType: l.rankProxy.CLOTHE_PVE_RANK,
                list: l.clothePveProxy.ranklist,
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
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
