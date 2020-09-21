var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/UIUtils"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.list2 = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            if (t) {
                this.list.data = n.uiUtils.getRwdItem(t.rwd_end);
                this.list2.data = n.uiUtils.getRwdItem(t.rwd);
                this.list.node.x = -this.list.node.width / 2;
                this.list2.node.x = -this.list2.node.width / 2;
            }
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(i.default)], e.prototype, "list2", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
