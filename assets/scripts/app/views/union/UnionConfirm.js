var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = cc._decorator,
    l = n.ccclass,
    r = (n.property,
    (function(t) {
        __extends(e, t);
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        e.prototype.onLoad = function() {};
        e.prototype.eventClose = function() {
            i.utils.closeView(this);
        };
        return (e = __decorate([l], e));
    })(cc.Component));
o.default = r;
