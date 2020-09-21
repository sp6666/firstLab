var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/List"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.bg = null;
            e.btnYlq = null;
            e.btnGet = null;
            e.lblDc = null;
            e.lblScore = null;
            e.bottom = null;
            e.list = null;
            return e;
        }
        e.prototype.showData = function() {};
        __decorate([a(cc.Node)], e.prototype, "bg", void 0);
        __decorate([a(cc.Node)], e.prototype, "btnYlq", void 0);
        __decorate([a(cc.Button)], e.prototype, "btnGet", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblDc", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([a(cc.Node)], e.prototype, "bottom", void 0);
        __decorate([a(n.default)], e.prototype, "list", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
