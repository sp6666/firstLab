var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.starList = null;
            return e;
        }
        e.prototype.onLoad = function() {};
        e.prototype.setValue = function(t) {
            for (var e = [], o = 0; o < t; o++) {
                e.push({});
            }
            this.starList.data = e;
        };
        __decorate([r(i.default)], e.prototype, "starList", void 0);
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
