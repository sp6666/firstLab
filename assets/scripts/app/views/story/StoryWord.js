var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.scrollView = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            this.list.data = t;
            this.scrollView.scrollToBottom();
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
        };
        __decorate([a(i.default)], e.prototype, "list", void 0);
        __decorate([a(cc.ScrollView)], e.prototype, "scrollView", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
