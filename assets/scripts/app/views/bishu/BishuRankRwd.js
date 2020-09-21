var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblCurScore = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                l.bishuProxy.BISHU_MY_RID,
                this.updateMyScore,
                this
            );
            var t = Math.ceil(l.bishuProxy.cfg.rwd[0].member.length / 6),
                e = 80 * t + 10 * (t - 1) + 65;
            this.list.setWidthHeight(550, e);
            this.list.data = l.bishuProxy.cfg.rwd;
            l.bishuProxy.sendLookRank();
            this.updateMyScore();
        };
        e.prototype.onClickRank = function() {
            n.utils.openPrefabView("bishu/BishuRankView");
        };
        e.prototype.updateMyScore = function() {
            var t = l.bishuProxy.myRid ? l.bishuProxy.myRid.score : 0;
            this.lblCurScore.string = i18n.t("BISHU_SCORE_CURRENT", {
                num: t
            });
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblCurScore", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
