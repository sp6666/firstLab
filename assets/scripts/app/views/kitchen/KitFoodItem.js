var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../Initializer"),
    r = require("../../utils/Utils"),
    a = require("../../utils/ShaderUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nodeType = null;
            e.lblType = null;
            e.item = null;
            e.lblN0 = null;
            e.nodeFind = null;
            e.btn = null;
            e.nodeBg = null;
            e.itemSlot = null;
            return e;
        }
        e.prototype.onLoad = function() {
            null == this.itemSlot &&
                (this.itemSlot = this.item.imgSlot.node.getComponent(
                    cc.Sprite
                ));
            this.addBtnEvent(this.btn);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = l.kitchenProxy.hasFood(t.id);
                this.nodeBg.color = e ? r.utils.WHITE : r.utils.GRAY;
                this.item.data = {
                    id: t.itemid
                };
                this.nodeType.active = !1;
                this.lblN0.string = t.id + "";
                this.itemSlot && a.shaderUtils.setImageGray(this.itemSlot, !e);
                this.item.colorFrame.node.active = e;
                this.nodeFind.active = !1;
            }
        };
        __decorate([_(cc.Node)], e.prototype, "nodeType", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblType", void 0);
        __decorate([_(n.default)], e.prototype, "item", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblN0", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeFind", void 0);
        __decorate([_(cc.Button)], e.prototype, "btn", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeBg", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
