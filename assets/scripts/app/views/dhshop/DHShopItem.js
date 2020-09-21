var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../utils/Utils"),
    r = require("../../component/LabelShadow"),
    a = require("../../utils/ShaderUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemSlot = null;
            e.cost = null;
            e.nodeLimit = null;
            e.lblLimit = null;
            e.bg = null;
            e.bg1 = null;
            return e;
        }
        e.prototype.onClickBuy = function() {
            var t = this._data;
            t && l.utils.openPrefabView("limitactivity/DHShopBuy", !1, t);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.itemSlot.data = t.items[1];
                this.cost.data = t.items[0];
                this.nodeLimit.active = 0 != t.count;
                if (1 == t.items[0].count) {
                    this.cost.nodeCount && (this.cost.nodeCount.active = !0);
                    this.cost.lblcount && (this.cost.lblcount.string = "1");
                }
                this.lblLimit.string = i18n.t("SHOP_LIMIT_COUNT", {
                    c: t.count - t.buy
                });
                var e = t.count - t.buy <= 0 && 0 != t.count;
                this.bg && a.shaderUtils.setImageGray(this.bg, e);
                this.bg1 && a.shaderUtils.setImageGray(this.bg1, e);
            }
        };
        __decorate([_(n.default)], e.prototype, "itemSlot", void 0);
        __decorate([_(n.default)], e.prototype, "cost", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeLimit", void 0);
        __decorate([_(r.default)], e.prototype, "lblLimit", void 0);
        __decorate([_(cc.Sprite)], e.prototype, "bg", void 0);
        __decorate([_(cc.Sprite)], e.prototype, "bg1", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
