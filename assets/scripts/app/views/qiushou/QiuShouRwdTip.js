var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.nodeBg = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.node.setSiblingIndex(100);
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this);
        };
        __decorate([c(cc.Node)], e.prototype, "nodeBg", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
