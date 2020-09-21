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
            e.listView = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            if (t.yjxo) {
                this.listView.data = t.yjxo;
                var e = this;
                this.listView.selectHandle = function() {
                    n.utils.closeView(e);
                };
            }
            l.timeProxy.floatReward();
        };
        e.prototype.onClickClsoe = function() {
            n.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "listView", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
