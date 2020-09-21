var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../views/item/ItemSlotUI"),
    a = require("../../utils/ShaderUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemSlot = null;
            e.bg = null;
            e.bg1 = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                if(this.itemSlot) this.itemSlot.data = t;
                var e = !t.have;
                this.bg && a.shaderUtils.setImageGray(this.bg, e);
                this.bg1 && a.shaderUtils.setImageGray(this.bg1, e);
            }
        };
        __decorate([_(n.default)], e.prototype, "itemSlot", void 0);
        __decorate([_(cc.Sprite)], e.prototype, "bg", void 0);
        __decorate([_(cc.Sprite)], e.prototype, "bg1", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
