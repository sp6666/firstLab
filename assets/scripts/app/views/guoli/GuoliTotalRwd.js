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
            e.lblTodat = null;
            e.lblTotal = null;
            e.btns = [];
            e.lblRwd = null;
            e.lblXiangqing = null;
            e.selectImg = null;
            e.norColor = null;
            e.selColor = null;
            e.rwdImg = null;
            e.xqImg = null;
            e.rwdList = null;
            e.rwdNode = null;
            e.xqList = null;
            e.xqNode = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                l.guoliPorxy.GUO_LI_DATA_UPDATE,
                this.onShowRewards,
                this
            );
            this.lblTodat.string =
                i18n.t("GUO_LI_JIN_RI_GUO_LI") + l.guoliPorxy.data.daygl;
            this.lblTotal.string =
                i18n.t("GUO_LI_ZONG_GUO_LI_TXT") +
                Math.floor(l.guoliPorxy.data.allgl);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            this.onClickTabs(null, "0");
        };
        e.prototype.onClickTabs = function(t, e) {
            for (var o = 0; o < this.btns.length; o++)
                this.btns[o].interactable = o != parseInt(e);
            this.lblRwd.node.color = 0 == e ? this.selColor : this.norColor;
            this.lblXiangqing.node.color =
                1 == e ? this.selColor : this.norColor;
            "0" == e ? this.onShowRewards() : "1" == e && this.onShowXq();
            this.rwdImg.spriteFrame = "0" == e ? this.selectImg : null;
            this.xqImg.spriteFrame = "1" == e ? this.selectImg : null;
            this.rwdNode.active = "0" == e;
            this.xqNode.active = "1" == e;
        };
        e.prototype.onShowRewards = function() {
            this.rwdList.data = l.guoliPorxy.data.score.sort(function(t, e) {
                var o = 0 == t.get && l.guoliPorxy.data.allgl >= t.need ? 0 : 1,
                    i = 0 == e.get && l.guoliPorxy.data.allgl >= e.need ? 0 : 1;
                return o != i ? o - i : t.get - e.get;
            });
        };
        e.prototype.onShowXq = function() {
            this.xqList.data = l.guoliPorxy.rule;
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
            facade.send("GUO_LI_CLOSE_ALL");
        };
        __decorate([s(cc.Label)], e.prototype, "lblTodat", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTotal", void 0);
        __decorate([s([cc.Button])], e.prototype, "btns", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblRwd", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblXiangqing", void 0);
        __decorate([s(cc.SpriteFrame)], e.prototype, "selectImg", void 0);
        __decorate([s(cc.Color)], e.prototype, "norColor", void 0);
        __decorate([s(cc.Color)], e.prototype, "selColor", void 0);
        __decorate([s(cc.Sprite)], e.prototype, "rwdImg", void 0);
        __decorate([s(cc.Sprite)], e.prototype, "xqImg", void 0);
        __decorate([s(i.default)], e.prototype, "rwdList", void 0);
        __decorate([s(cc.Node)], e.prototype, "rwdNode", void 0);
        __decorate([s(i.default)], e.prototype, "xqList", void 0);
        __decorate([s(cc.Node)], e.prototype, "xqNode", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
