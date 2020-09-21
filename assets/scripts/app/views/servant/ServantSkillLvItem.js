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
            e.lblQu = null;
            return e;
        }
        e.prototype.showData = function() {};
        __decorate([r(cc.Label)], e.prototype, "lblQu", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
