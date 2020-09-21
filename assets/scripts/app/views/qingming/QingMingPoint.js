var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.yellowEvent = null;
            e.redEvent = null;
            e.yellowNor = null;
            e.redNor = null;
            e.end = null;
            e.begin = null;
            return e;
        }
        e.prototype.showData = function() {};
        __decorate([r(cc.Sprite)], e.prototype, "yellowEvent", void 0);
        __decorate([r(cc.Sprite)], e.prototype, "redEvent", void 0);
        __decorate([r(cc.Sprite)], e.prototype, "yellowNor", void 0);
        __decorate([r(cc.Sprite)], e.prototype, "redNor", void 0);
        __decorate([r(cc.Sprite)], e.prototype, "end", void 0);
        __decorate([r(cc.Sprite)], e.prototype, "begin", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
