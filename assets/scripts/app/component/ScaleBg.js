var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Config"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.isFitWidth = !1;
            return e;
        }
        e.prototype.onLoad = function() {
            if (
                1 == this.node.scaleY &&
                i.Config.showHeight > this.node.height
            ) {
                var t = i.Config.showHeight / this.node.height;
                if (this.isFitWidth) {
                    this.node.width = this.node.width * t;
                    for (var e = this.node.children, o = 0; o < e.length; o++)
                        e[o].scaleX = e[o].scaleY = t;
                } else this.node.scaleY = this.node.scaleX = t;
            }
        };
        __decorate(
            [
                r({
                    tooltip:
                        "是否适配高宽，因为资源不足用放大处理，但是放大对scroll会有问题"
                })
            ],
            e.prototype,
            "isFitWidth",
            void 0
        );
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
