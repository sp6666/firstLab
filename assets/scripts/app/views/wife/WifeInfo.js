var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/JiBanShow"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblTxt = null;
            e.luckImg = null;
            e.lblJiBan = null;
            e.iconArr = [];
            e.roleImg = null;
            e.icon_1 = null;
            e.lblhuoqu = null;
            e.lblTitle = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("UPDATE_WIFE_JB", this.onWifeJb, this);
            this.onWifeJb();
        };
        e.prototype.onWifeJb = function() {
            var t = this.node.openParam;
            if (t) {
                this.lblName.string = t.wname2;
                var e = t.info2.split("|");
                this.lblTxt.string = e.length > 1 ? e[0] + e[1] : e[0];
                var o = r.jibanProxy.getWifeJbLv(t.wid).level % 1e3;
                this.luckImg.setValue(5, o);
                this.icon_1.spriteFrame = this.iconArr[t.type - 1];
                this.roleImg.url = a.uiHelps.getWifeSmallBody(t.res);
                var i = r.jibanProxy.getWifeNextJb(o),
                    n = r.jibanProxy.getWifeJB(t.wid);
                this.lblJiBan.string = i18n.t("COMMON_NUM", {
                    f: n,
                    s: i ? i.yoke + "" : "5000"
                });
                this.lblhuoqu.string = t.unlock;
                var l = r.wifeProxy.getWifeData(t.wid);
                this.lblTitle.string = l
                    ? i18n.t("WIFE_WEI_YI_JIE_SHI")
                    : i18n.t("WIFE_WEI_JIE_SHI");
            }
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        e.prototype.onClickGift = function() {
            var t = this.node.openParam;
            r.wifeProxy.wifeGiftId = t.wid;
            l.utils.openPrefabView("wife/GiftView");
        };
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTxt", void 0);
        __decorate([_(i.default)], e.prototype, "luckImg", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblJiBan", void 0);
        __decorate([_([cc.SpriteFrame])], e.prototype, "iconArr", void 0);
        __decorate([_(n.default)], e.prototype, "roleImg", void 0);
        __decorate([_(cc.Sprite)], e.prototype, "icon_1", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblhuoqu", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTitle", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
