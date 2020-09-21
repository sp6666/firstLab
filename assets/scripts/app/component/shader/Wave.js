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
            e.angle = 15;
            e.motion = 0.02;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.getComponent(cc.Component);
            t && i.shaderUtils.setWaveVH(t, this.angle, this.motion);
        };
        __decorate(
            [
                r({
                    tooltip: "角度"
                })
            ],
            e.prototype,
            "angle",
            void 0
        );
        __decorate(
            [
                r({
                    tooltip: "速度"
                })
            ],
            e.prototype,
            "motion",
            void 0
        );
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
