var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.yellowEvent = null;
            e.redEvent = null;
            e.yellowNor = null;
            e.redNor = null;
            e.end = null;
            e.begin = null;
            e.city = null;
            e.cityUrl = null;
            e.cityName = null;
            return e;
        }
        e.prototype.showData = function() {};
        __decorate([a(cc.Sprite)], e.prototype, "yellowEvent", void 0);
        __decorate([a(cc.Sprite)], e.prototype, "redEvent", void 0);
        __decorate([a(cc.Sprite)], e.prototype, "yellowNor", void 0);
        __decorate([a(cc.Sprite)], e.prototype, "redNor", void 0);
        __decorate([a(cc.Sprite)], e.prototype, "end", void 0);
        __decorate([a(cc.Sprite)], e.prototype, "begin", void 0);
        __decorate([a(cc.Node)], e.prototype, "city", void 0);
        __decorate([a(n.default)], e.prototype, "cityUrl", void 0);
        __decorate([a(cc.Label)], e.prototype, "cityName", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
