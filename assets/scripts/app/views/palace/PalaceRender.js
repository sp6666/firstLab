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
            e.nameImg = null;
            e.bg = null;
            return e;
        }
        e.prototype.showData = function() {
            this._data;
        };
        __decorate([a(n.default)], e.prototype, "nameImg", void 0);
        __decorate([a(cc.Sprite)], e.prototype, "bg", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
