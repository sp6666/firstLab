var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/ShaderUtils"),
    r = require("../../Initializer"),
    a = require("../../utils/UIUtils"),
    guideItem = require("../guide/GuideItem"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nodeLock = null;
            e.nodeGold = null;
            e.lblGold = null;
            e.url = null;
            e.lblName = null;
            e.img = null;
            e.img2 = null;
            e.btn = null;
            e.itemUrl = null;
            e.nodeGoldImg = null;
            e.nodeSelect = null;
            e.propimg = null;
            e.lblProp = null;
            e.lblOut = null;
            e.nodeProp = null;
            e.nodeRemove = null;
            e.tag1 = null;
            e.tag2 = null;
            e.nodePvpInfo = null;
            e.nodePveInfo = null;
            e.isGuideID = false;
            return e;
        }
        Object.defineProperty(e.prototype, "select", {
            set: function(t) {
                var e = this._data;
                this.nodeSelect.active = t && (null == e || 0 != e.id);
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btn);
        };
        e.prototype.setGuideId = function() {
            var t = this.node.getComponent(guideItem.default),
                e = this._data;

            if(t && e)
            {
                r.playerProxy.clothePartCount += 1;
                t.key = r.playerProxy.clothePartCount + "";
            }
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                if(this.isGuideID)
                {
                    this.setGuideId();
                }
                var e = r.playerProxy.isUnlockCloth(t.id);
                l.shaderUtils.setImageGray(this.img, !e);
                l.shaderUtils.setImageGray(this.img2, !e);
                this.lblName.string = t.name;
                this.nodeRemove && (this.nodeRemove.active = !1);
                this.lblOut && (this.lblOut.string = t.text);
                if (0 == t.id) {
                    this.url.url = "";
                    this.nodeRemove.active = !0;
                    this.nodeProp.active = this.nodeLock.active = this.nodeGoldImg.active = this.nodeGold.active = this.itemUrl.node.active = !1;
                    return;
                }
                this.nodeProp.active = t.prop && t.prop.length > 0;
                if (t.prop && t.prop.length > 0)
                    if (1 == t.prop_type) {
                        this.lblProp.string = "+" + t.prop[0].value;
                        this.propimg.url = a.uiHelps.getLangSp(t.prop[0].prop);
                    } else {
                        this.lblProp.string = "+" + t.prop[0].value / 100 + "%";
                        this.propimg.url = a.uiHelps.getClotheProImg(
                            t.prop_type,
                            t.prop[0].prop
                        );
                    }
                var o = t.money.itemid;
                this.lblOut && (this.lblOut.node.active = null == o);
                this.nodeGold.active = !e && 2 == t.unlock;
                this.nodeLock.active = !e && 1 == t.unlock;
                this.nodeGold.active =
                    null != this.lblOut || this.nodeGold.active;
                this.lblGold.string = t.money.count ? t.money.count + "" : "";
                this.itemUrl.node.active = o && 1 != o;
                this.nodeGoldImg.active = 1 == o;
                this.itemUrl.node.active &&
                    (this.itemUrl.url = a.uiHelps.getItemSlot(o));
                var i = t.model.split("|");
                this.url.url = a.uiHelps.getRolePart(i[0]);
                
                var tagInfo = t.tag.concat();
                tagInfo.sort(function(a, b) {
                    return b.score - a.score;
                });
                if(t.pvpType == 1) {
                    this.tag1.url = a.uiHelps.getTag(tagInfo[0].tag);
                    this.tag2.url = a.uiHelps.getTag(tagInfo[1].tag);
                    this.nodePvpInfo.active = false;
                    this.nodePveInfo.active = true;
                }
            }
        };
        
        __decorate([_(cc.Node)], e.prototype, "nodeLock", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeGold", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblGold", void 0);
        __decorate([_(n.default)], e.prototype, "url", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Sprite)], e.prototype, "img", void 0);
        __decorate([_(cc.Sprite)], e.prototype, "img2", void 0);
        __decorate([_(cc.Button)], e.prototype, "btn", void 0);
        __decorate([_(n.default)], e.prototype, "itemUrl", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeGoldImg", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeSelect", void 0);
        __decorate([_(n.default)], e.prototype, "propimg", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblProp", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblOut", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeProp", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeRemove", void 0);
        __decorate([_(n.default)], e.prototype, "tag1", void 0);
        __decorate([_(n.default)], e.prototype, "tag2", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodePvpInfo", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodePveInfo", void 0);
        __decorate([_], e.prototype, "isGuideID", void 0);
        
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
