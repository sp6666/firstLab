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
            e.nodeUnwife = null;
            return e;
        }
        e.prototype.onLoad = function() {
            for (var t = [], e = 0; e < l.wifeProxy.wifeList.length; e++) {
                for (
                    var o = l.wifeProxy.wifeList[e], i = !1, n = 0;
                    n < l.kitchenProxy.list.length;
                    n++
                ) {
                    if (l.kitchenProxy.list[n].wid == o.id) {
                        i = !0;
                        break;
                    }
                }
                i || t.push(o);
            }
            this.nodeUnwife.active = 0 == t.length;
            this.list.data = t;
        };
        e.prototype.onClickSelect = function(t, e) {
            var o = e ? e.data : null;
            o && facade.send("KITCHEN_SELECT_WIFE", o.id);
            this.onClickClost();
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeUnwife", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
