var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function() {
            l.servantProxy.getServantList().sort(function(t, e) {
                return t.aep.e1 + t.aep.e2 + t.aep.e3 + t.aep.e4 <
                    e.aep.e1 + e.aep.e2 + e.aep.e3 + e.aep.e4
                    ? -1
                    : 1;
            });
            this.list.data = l.servantProxy.getServantList();
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
