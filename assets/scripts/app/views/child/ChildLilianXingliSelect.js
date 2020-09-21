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
            return e;
        }
        e.prototype.onLoad = function() {
            for (
                var t = localcache.getList(localdb.table_practiceItem),
                    e = [],
                    o = 0;
                o < t.length;
                o++
            )
                0 == t[o].itemid
                    ? e.push(t[o])
                    : n.bagProxy.getItemCount(t[o].itemid) > 0 && e.push(t[o]);
            this.list.data = e;
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
