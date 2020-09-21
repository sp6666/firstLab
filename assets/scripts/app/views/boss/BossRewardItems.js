var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../utils/UIUtils"),
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
            var t = this.node.openParam;
            if (t) {
                for (var e = [], o = 0; o < t.length; o++) {
                    var i = t[o],
                        n = new l.ItemSlotData();
                    n.id = i.id;
                    n.count = i.count;
                    e.push(n);
                }
                this.list.data = e;
                this.list.node.x = -this.list.node.width / 2;
            }
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
