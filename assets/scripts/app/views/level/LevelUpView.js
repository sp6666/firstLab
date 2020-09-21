var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../models/TimeProxy"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function() {
            for (
                var t = localcache.getList(localdb.table_levelup),
                    e = [],
                    o = 0;
                o < t.length;
                o++
            ) {
                var i = localcache.getItem(
                    localdb.table_iconOpen,
                    t[o].iconopenid
                );
                l.funUtils.isOpen(i) &&
                    r.playerProxy.userData.level >= t[o].lv &&
                    e.push(t[o]);
            }
            this.list.data = e;
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([c(n.default)], e.prototype, "list", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
