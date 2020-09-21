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
    c = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblCurScore = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(l.fineFoodProxy.FINE_FOOD_MY_RID, this.updateMyScore, this);
            var t = Math.ceil(l.fineFoodProxy.data.rwd[0].member.length / 6),
                e = 80 * t + 10 * (t - 1) + 65;
            this.list.setWidthHeight(550, e);
            this.list.data = l.fineFoodProxy.data.rwd;
            l.fineFoodProxy.sendLookRank();
            this.updateMyScore();
        };
        e.prototype.onClickRank = function () {
            n.utils.openPrefabView("finefood/FineFoodRankView");
        };
        e.prototype.updateMyScore = function () {
            var t = l.fineFoodProxy.myRid ? l.fineFoodProxy.myRid.score : 0;
            this.lblCurScore.string = i18n.t("FINE_FOOD_SHOP_SCORE_CURRENT", {
                num: t
            });
        };
        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblCurScore", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;