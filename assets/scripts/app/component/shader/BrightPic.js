var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/ShaderUtils"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.width = 0.05;
            e.strength = 0.01;
            e.offset = 0.2;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.getComponent(cc.Component);
            t &&
                i.shaderUtils.setBright(
                    t,
                    this.width,
                    this.strength,
                    this.offset
                );
        };
        __decorate(
            [
                r({
                    tooltip: "流光的宽度"
                })
            ],
            e.prototype,
            "width",
            void 0
        );
        __decorate(
            [
                r({
                    tooltip: "增强亮度"
                })
            ],
            e.prototype,
            "strength",
            void 0
        );
        __decorate(
            [
                r({
                    tooltip: "流光的倾斜程度"
                })
            ],
            e.prototype,
            "offset",
            void 0
        );
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
