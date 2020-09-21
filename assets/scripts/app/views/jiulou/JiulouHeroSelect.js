var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.heroList = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.heroList.data = n.jiulouProxy.getYhHeroList();
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "heroList", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
