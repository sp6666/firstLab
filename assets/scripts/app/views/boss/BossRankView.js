var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblRank = null;
            e.lblScore = null;
            e.lblLastKill = null;
            e.scoreList = null;
            e.killList = null;
            e.rankNode = null;
            e.scoreNode = null;
            e.killNode = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.scoreList.data = n.bossPorxy.scoreRank;
            this.killList.data = n.bossPorxy.g2dKill;
            this.lblName.string =
                i18n.t("COMMON_NAME") + "：" + n.playerProxy.userData.name;
            this.lblRank.string =
                i18n.t("RANK_RANK_TIP") +
                "：" +
                n.bossPorxy.myScore.myScorerank;
            this.lblScore.string =
                i18n.t("COMMON_SCORE") + "：" + n.bossPorxy.myScore.myScore;
        };
        e.prototype.onClickTab = function(t, e) {
            var o = parseInt(e);
            this.rankNode.active = this.scoreNode.active = 1 == o;
            this.lblLastKill.node.active = this.killNode.active = 2 == o;
            if (1 == o) {
                this.scoreList.data = n.bossPorxy.scoreRank;
                this.lblName.string =
                    i18n.t("COMMON_NAME") + "：" + n.playerProxy.userData.name;
                this.lblRank.string =
                    i18n.t("RANK_RANK_TIP") +
                    "：" +
                    n.bossPorxy.myScore.myScorerank;
                this.lblScore.string =
                    i18n.t("COMMON_SCORE") + "：" + n.bossPorxy.myScore.myScore;
            } else 2 == o && (this.killList.data = n.bossPorxy.g2dKill);
        };
        e.prototype.onClickRank = function() {
            n.bossPorxy.sendG2dHitRank();
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblLastKill", void 0);
        __decorate([s(i.default)], e.prototype, "scoreList", void 0);
        __decorate([s(i.default)], e.prototype, "killList", void 0);
        __decorate([s(cc.Node)], e.prototype, "rankNode", void 0);
        __decorate([s(cc.Node)], e.prototype, "scoreNode", void 0);
        __decorate([s(cc.Node)], e.prototype, "killNode", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
