var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("./GuoliTodayRankRender"),
    a = require("../rank/RankItem"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.btns = [];
            e.lblRwd = null;
            e.lblXiangqing = null;
            e.selectImg = null;
            e.norColor = null;
            e.selColor = null;
            e.rwdImg = null;
            e.rankImg = null;
            e.rwdList = null;
            e.rwdNode = null;
            e.myRwdNode = null;
            e.rankArr = [];
            e.rankList = null;
            e.rankNode = null;
            e.btnRe = null;
            e.lblRe = null;
            e.lblMyRank = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                l.guoliPorxy.GUO_LI_RREWARDS_DATA,
                this.onRewards,
                this
            );
            facade.subscribe(l.guoliPorxy.GUO_LI_RANK_DATA, this.onRanks, this);
            facade.subscribe(l.guoliPorxy.GUO_LI_MY_RANK, this.onMyRank, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            this.onClickTabs(null, "0");
            l.guoliPorxy.sendLookRank(9);
            this.onTimer();
            this.schedule(this.onTimer, 1);
        };
        e.prototype.onClickTabs = function(t, e) {
            for (var o = 0; o < this.btns.length; o++)
                this.btns[o].interactable = o != parseInt(e);
            this.lblRwd.node.color = 0 == e ? this.selColor : this.norColor;
            this.lblXiangqing.node.color =
                1 == e ? this.selColor : this.norColor;
            this.rankNode.active = "1" == e;
            this.rwdNode.active = "0" == e;
            this.rwdImg.spriteFrame = "0" == e ? this.selectImg : null;
            this.rankImg.spriteFrame = "1" == e ? this.selectImg : null;
            this.rwdNode.active = "0" == e;
            this.rankNode.active = "1" == e;
        };
        e.prototype.onRewards = function() {
            this.rwdList.data = l.guoliPorxy.rewards;
        };
        e.prototype.onRanks = function() {
            this.rankList.data = l.guoliPorxy.ranks;
            this.onTimer();
        };
        e.prototype.onMyRank = function() {
            // this.myRwdNode.data = l.guoliPorxy.myRank;

            if(l.guoliPorxy.myRank){
                this.lblMyRank.string = i18n.t("RAKN_MY_TIP") + ":" + l.guoliPorxy.myRank.myScorerank;
            }
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
            l.guoliPorxy.sendRefreshRank(9);
        };
        __decorate([_([cc.Button])], e.prototype, "btns", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblRwd", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblXiangqing", void 0);
        __decorate([_(cc.SpriteFrame)], e.prototype, "selectImg", void 0);
        __decorate([_(cc.Color)], e.prototype, "norColor", void 0);
        __decorate([_(cc.Color)], e.prototype, "selColor", void 0);
        __decorate([_(cc.Sprite)], e.prototype, "rwdImg", void 0);
        __decorate([_(cc.Sprite)], e.prototype, "rankImg", void 0);
        __decorate([_(i.default)], e.prototype, "rwdList", void 0);
        __decorate([_(cc.Node)], e.prototype, "rwdNode", void 0);
        __decorate([_(r.default)], e.prototype, "myRwdNode", void 0);
        __decorate([_([a.default])], e.prototype, "rankArr", void 0);
        __decorate([_(i.default)], e.prototype, "rankList", void 0);
        __decorate([_(cc.Node)], e.prototype, "rankNode", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnRe", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblRe", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblMyRank", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
