var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./UrlLoad"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.urllogo = null;
            return e;
        }
        e.prototype.onLoad = function() {};
        __decorate([r(i.default)], e.prototype, "urllogo", void 0);
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
