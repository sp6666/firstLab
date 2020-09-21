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
            e.lblRank = null;
            e.lblTotal = null;
            e.btns = [];
            e.lblRwd = null;
            e.lblPaihang = null;
            e.selectImg = null;
            e.norColor = null;
            e.selColor = null;
            e.rwdImg = null;
            e.rankImg = null;
            e.rwdList = null;
            e.raknList = null;
            e.rwdNode = null;
            e.rankNode = null;
            e.lblTitle = null;
            e.lblRankTitle = null;
            e.btnRe = null;
            e.lblRe = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                l.guoliPorxy.GUO_LI_RANK_DATA,
                this.onRankData,
                this
            );
            facade.subscribe(l.guoliPorxy.GUO_LI_MY_RANK, this.onMyRank, this);
            facade.subscribe(
                l.guoliPorxy.GUO_LI_RREWARDS_DATA,
                this.onRewards,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            this.onTimer();
            this.schedule(this.onTimer, 1);
            var t = this.node.openParam.id;
            l.guoliPorxy.lookType = t;
            l.guoliPorxy.sendLookRank(t);
            this.onClickTabs(null, "0");
            this.lblTitle.string =
                0 != t
                    ? i18n.t("GUO_LI_TITLE_" + t) +
                      i18n.t("GUO_LI_TODAY_REWARD")
                    : i18n.t("GUO_LI_TODAY_REWARD");
            this.lblRankTitle.string = i18n.t("GUO_LI_JIN_RI_LEI_XING", {
                name: i18n.t("GUO_LI_TEXT_" + l.guoliPorxy.lookType)
            });
        };
        e.prototype.onClickTabs = function(t, e) {
            for (var o = 0; o < this.btns.length; o++)
                this.btns[o].interactable = o != parseInt(e);
            this.lblRwd.node.color = 0 == e ? this.selColor : this.norColor;
            this.lblPaihang.node.color = 1 == e ? this.selColor : this.norColor;
            this.rankNode.active = "1" == e;
            this.rwdNode.active = "0" == e;
            this.rwdImg.spriteFrame = "0" == e ? this.selectImg : null;
            this.rankImg.spriteFrame = "1" == e ? this.selectImg : null;
        };
        e.prototype.onRankData = function() {
            this.raknList.data = l.guoliPorxy.ranks;
            this.onTimer();
        };
        e.prototype.onMyRank = function() {
            if (l.guoliPorxy.myRank) {
                this.lblRank.string =
                    i18n.t("GUO_LI_JIN_RI") +
                    (0 == l.guoliPorxy.myRank.myScorerank
                        ? i18n.t("RAKN_UNRANK")
                        : l.guoliPorxy.myRank.myScorerank);
                this.lblTotal.string =
                    i18n.t("GUO_LI_JIN_RI_LEI_XING", {
                        name: i18n.t("GUO_LI_TEXT_" + l.guoliPorxy.lookType)
                    }) + l.guoliPorxy.myRank.myScore;
            }
        };
        e.prototype.onRewards = function() {
            this.rwdList.data = l.guoliPorxy.rewards;
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
            facade.send("GUO_LI_CLOSE_ALL");
        };
        e.prototype.onTimer = function() {
            var t = n.timeUtil.second - l.rankProxy.lastTime;
            t >= 60 && (this.btnRe.interactable = !0);
            this.btnRe.interactable = t >= 60;
            this.lblRe.string =
                t >= 60
                    ? i18n.t("COMMON_REFRESH")
                    : i18n.t("FLOWER_SHENG_YU_SHI_JIAN", {
                          num: 60 - t
                      });
        };
        e.prototype.onClickRe = function() {
            l.guoliPorxy.sendRefreshRank(l.guoliPorxy.lookType);
        };
        __decorate([s(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTotal", void 0);
        __decorate([s([cc.Button])], e.prototype, "btns", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblRwd", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblPaihang", void 0);
        __decorate([s(cc.SpriteFrame)], e.prototype, "selectImg", void 0);
        __decorate([s(cc.Color)], e.prototype, "norColor", void 0);
        __decorate([s(cc.Color)], e.prototype, "selColor", void 0);
        __decorate([s(cc.Sprite)], e.prototype, "rwdImg", void 0);
        __decorate([s(cc.Sprite)], e.prototype, "rankImg", void 0);
        __decorate([s(i.default)], e.prototype, "rwdList", void 0);
        __decorate([s(i.default)], e.prototype, "raknList", void 0);
        __decorate([s(cc.Node)], e.prototype, "rwdNode", void 0);
        __decorate([s(cc.Node)], e.prototype, "rankNode", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblRankTitle", void 0);
        __decorate([s(cc.Button)], e.prototype, "btnRe", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblRe", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
