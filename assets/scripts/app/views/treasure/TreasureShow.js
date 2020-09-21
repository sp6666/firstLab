var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/UrlLoad"),
    n = require("../../utils/Utils"),
    l = require("../../utils/ApiUtils"),
    r = require("../../utils/UIUtils"),
    a = require("../item/ItemSlotUI"),
    s = require("../../Initializer"),
    c = require("../../utils/ShaderUtils"),
    _ = require("../../component/List"),
    d = cc._decorator,
    u = d.ccclass,
    p = d.property,
    h = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.bg = null;
            e.lblName = null;
            e.lblDes = null;
            e.lblGroup = null;
            e.nodeLeft = null;
            e.nodeRight = null;
            e.itemSlot = null;
            e.lblCount = null;
            e.nodeUp = null;
            e.ndoeFind = null;
            e.lblScore = null;
            e.list = null;
            e.nodeUnlock = null;
            e.curindex = 0;
            e.curGroup = null;
            e.maxIndex = 0;
            e.tresSprite = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.curGroup = this.node.openParam;
            this.maxIndex = this.curGroup.items.length - 1;
            this.lblGroup.string =
                this.curGroup && this.curGroup.data
                    ? this.curGroup.data.name
                    : "";
            for (var t = 0; t < this.curGroup.items.length; t++)
                if (this.curGroup.data.photo == this.curGroup.items[t].id) {
                    this.curindex = t;
                    break;
                }
            this.updateShow();
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onMoveLeft, this);
            facade.subscribe("UI_TOUCH_MOVE_RIGHT", this.onMoveRight, this);
            facade.subscribe(s.bagProxy.UPDATE_BAG_ITEM, this.updateShow, this);
            r.uiUtils.scaleRepeat(this.nodeRight, 0.95, 1.05);
            r.uiUtils.scaleRepeat(this.nodeLeft, 0.95, 1.05);
        };
        e.prototype.updateShow = function() {
            var t = this.curGroup.items[this.curindex];
            this.bg.url = r.uiHelps.getTreasure(t.data.phot);
            null == this.tresSprite &&
                (this.tresSprite = this.bg.node.getComponent(cc.Sprite));
            c.shaderUtils.setImageGray(this.tresSprite, 1 != t.rwd);
            this.ndoeFind.active = this.nodeUp.active = !1;
            var e = s.bagProxy.getItemCount(t.data.itemid);
            if (e > 0) {
                this.nodeUp.active = !0;
                this.itemSlot.data = {
                    id: t.data.itemid
                };
                this.lblCount.string = i18n.t("COMMON_NUM", {
                    f: e,
                    s: 1
                });
            } else {
                this.ndoeFind.active = !0;
                e = s.bagProxy.getItemCount(t.data.tagid);
                this.itemSlot.data = {
                    id: t.data.tagid
                };
                this.lblCount.string = i18n.t("COMMON_NUM", {
                    f: e,
                    s: t.data.tagnum
                });
            }
            this.lblName.string = t.data.name;
            this.lblDes.string = t.data.text;
            this.nodeUnlock.active = 1 == t.rwd;
            this.list.data = 1 == t.rwd ? t.data.tworeward : t.data.reward;
            this.list.node.x = this.lblScore.node.x - this.list.node.width;
            this.lblScore.string = i18n.t("TREASURE_SCORE_ADD", {
                v: 1 == t.rwd ? t.data.twopoints : t.data.points
            });
        };
        e.prototype.onClickTrun = function(t, e) {
            var o = parseInt(e);
            this.curindex += o;
            this.curindex = this.curindex < 0 ? this.maxIndex : this.curindex;
            this.curindex = this.curindex > this.maxIndex ? 0 : this.curindex;
            this.updateShow();
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
            n.utils.closeNameView("treasure/TreasureView");
        };
        e.prototype.onClickBack = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickShare = function() {
            cc.sys.isNative
                ? l.apiUtils.share_game("treasure")
                : n.alertUtil.alert18n("TREASURE_SHARE_LIMIT");
        };
        e.prototype.onClickUp = function() {
            var t = this.curGroup.items[this.curindex];
            s.bagProxy.getItemCount(t.data.itemid) < 1
                ? n.alertUtil.alertItemLimit(t.data.itemid)
                : s.treasureProxy.sendTreasure(t.id);
        };
        e.prototype.onClickClip = function() {
            var t = this.curGroup.items[this.curindex];
            s.bagProxy.getItemCount(t.data.tagid) < t.data.tagnum
                ? n.alertUtil.alertItemLimit(t.data.tagid)
                : s.treasureProxy.sendClipTrea(t.id);
        };
        e.prototype.onMoveLeft = function() {
            this.onClickTrun(null, -1);
        };
        e.prototype.onMoveRight = function() {
            this.onClickTrun(null, 1);
        };
        e.prototype.onClickReward = function() {};
        __decorate([p(i.default)], e.prototype, "bg", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblGroup", void 0);
        __decorate([p(cc.Node)], e.prototype, "nodeLeft", void 0);
        __decorate([p(cc.Node)], e.prototype, "nodeRight", void 0);
        __decorate([p(a.default)], e.prototype, "itemSlot", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([p(cc.Node)], e.prototype, "nodeUp", void 0);
        __decorate([p(cc.Node)], e.prototype, "ndoeFind", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([p(_.default)], e.prototype, "list", void 0);
        __decorate([p(cc.Node)], e.prototype, "nodeUnlock", void 0);
        return (e = __decorate([u], e));
    })(cc.Component);
o.default = h;
