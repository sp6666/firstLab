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
            e.bg = null;
            return e;
        }
        e.prototype.showData = function(data) {
            var t = data;
            if (t) {
                //var e = t.have;
                
                //this.bg && a.shaderUtils.setImageGray(this.bg, !e);
                if(!t.have) {
                    a.shaderUtils.setNodeGray(this.node);
                }
            }
        };
        __decorate([_(cc.Sprite)], e.prototype, "bg", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
