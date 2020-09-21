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
            e.maxHeight = 1280;
            e.maxWidth = 720;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.getComponent(cc.Widget);
            i.Config.showHeight =
                this.maxHeight > cc.winSize.height
                    ? cc.winSize.height
                    : this.maxHeight;
            if (t) {
                var e = cc.winSize;
                if (e.height > this.maxHeight) {
                    var o = (e.height - this.maxHeight) / 2;
                    t.top = t.bottom = o;
                    for (
                        var n = this.node.getComponentsInChildren(cc.Widget),
                            l = 0;
                        l < n.length;
                        l++
                    ) {
                        n[l].bottom = n[l].bottom;
                        n[l].top = n[l].top;
                    }
                }
            }
        };
        __decorate(
            [
                r({
                    tooltip:
                        "是否适配高度，最大显示高度超出部分将由部分资源取代"
                })
            ],
            e.prototype,
            "maxHeight",
            void 0
        );
        __decorate(
            [
                r({
                    tooltip: "是否适配宽度"
                })
            ],
            e.prototype,
            "maxWidth",
            void 0
        );
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
