var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./UrlLoad"),
    n = require("../Config"),
    l = cc._decorator,
    r = l.ccclass,
    a = (l.property,
    (function(t) {
        __extends(e, t);
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        e.prototype.onLoad = function() {
            if ("" != n.Config.share_meta_url) {
                var t = this.node.getComponent(i.default);
                null == t && (t = this.node.addComponent(i.default));
                t.url = n.Config.share_meta_url;
            }
        };
        return (e = __decorate([r], e));
    })(cc.Component));
o.default = a;
