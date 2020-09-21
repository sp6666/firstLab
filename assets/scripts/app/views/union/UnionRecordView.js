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
            e.list = null;
            e.tipNode = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.list.data = n.unionProxy.heroLog;
            this.tipNode.active =
                null == n.unionProxy.heroLog ||
                0 == n.unionProxy.heroLog.length;
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Node)], e.prototype, "tipNode", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
