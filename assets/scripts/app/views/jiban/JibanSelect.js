var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../models/TimeProxy"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.wifeList = null;
            e.servantList = null;
            e.btnWife = null;
            e.btnHero = null;
            e.lblWife = null;
            e.lblHero = null;
            e.norColor = null;
            e.selColor = null;
            e.imgWife = null;
            e.imgHero = null;
            e.selectFrame = null;
            e.wifeNode = null;
            e.servantNode = null;
            e.lblTxt = null;
            e._curSelect = 1;
            e._heroList = null;
            e._wifeList = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            t && t.select
                ? this.onTabSelect(null, t.select)
                : this.onTabSelect(null, 1);
            facade.subscribe(l.jibanProxy.UPDATE_JIBAN, this.updateList, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClost, this);
            l.playerProxy.userData.level < 15
                ? (this.lblTxt.string = i18n.t("WISHING_WEI_KAI_QI"))
                : (this.lblTxt.string = i18n.t("WISHING_YI_KAI_QI"));
            r.funUtils.isOpenFun(r.funUtils.wishingTree) &&
                facade.send("DOWNLOAD_SOUND", {
                    type: 3,
                    param: r.funUtils.wishingTree.id
                });
        };
        e.prototype.onTabSelect = function(t, e) {
            var o = parseInt(e);
            this._curSelect = o;
            this.btnWife.interactable = 2 != this._curSelect;
            this.btnHero.interactable = 1 != this._curSelect;
            this.lblWife.node.color =
                2 == this._curSelect ? this.selColor : this.norColor;
            this.lblHero.node.color =
                1 == this._curSelect ? this.selColor : this.norColor;
            this.imgHero.spriteFrame =
                1 == this._curSelect ? this.selectFrame : null;
            this.imgWife.spriteFrame =
                2 == this._curSelect ? this.selectFrame : null;
            this.wifeNode.active = 2 == this._curSelect;
            this.servantNode.active = 1 == this._curSelect;
            this.lblTxt.node.active = 1 == this._curSelect;
            this.updateList();
        };
        e.prototype.updateList = function() {
            if (1 == this._curSelect) {
                null == this._heroList &&
                    (this._heroList = l.jibanProxy.getJibanFirst(
                        this._curSelect
                    ));
                this.servantList.data = this._heroList;
            } else if (2 == this._curSelect) {
                null == this._wifeList &&
                    (this._wifeList = l.jibanProxy.getJibanFirst(
                        this._curSelect
                    ));
                this.wifeList.data = this._wifeList;
            }
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this, !0);
            facade.send(l.guideProxy.UPDATE_TRIGGER_GUIDE, {type: 11, value: l.taskProxy.mainTask.id});
        };
        e.prototype.onClickOpen = function(t, e) {
            if (e && e.data) {
                var o = e.data;
                if (o) {
                    var i = {};
                    if (2 == o.type) {
                        i.wifeid = o.roleid;
                        n.utils.openPrefabView("jiban/JibanView", !1, i);
                    } else if (1 == o.type) {
                        i.heroid = o.roleid;
                        n.utils.openPrefabView("jiban/JibanDetailView", !1, i);
                    }
                }
            }
        };
        e.prototype.onClickTxt = function() {
            if (l.playerProxy.userData.level >= 15) {
                n.utils.closeView(this, !0);
                r.funUtils.openView(r.funUtils.wishingTree.id);
            }
        };
        __decorate([c(i.default)], e.prototype, "wifeList", void 0);
        __decorate([c(i.default)], e.prototype, "servantList", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnWife", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnHero", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblWife", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblHero", void 0);
        __decorate([c(cc.Color)], e.prototype, "norColor", void 0);
        __decorate([c(cc.Color)], e.prototype, "selColor", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "imgWife", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "imgHero", void 0);
        __decorate([c(cc.SpriteFrame)], e.prototype, "selectFrame", void 0);
        __decorate([c(cc.Node)], e.prototype, "wifeNode", void 0);
        __decorate([c(cc.Node)], e.prototype, "servantNode", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTxt", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
