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
            facade.subscribe(
                l.flowerProxy.UPDATE_FLOWER_BASE,
                this.onUpdateShow,
                this
            );
            this.onUpdateShow();
        };
        e.prototype.onUpdateShow = function() {
            for (
                var t = localcache.getList(localdb.table_flowerRain),
                    e = [],
                    o = {},
                    i = 0;
                i < t.length;
                i++
            ) {
                var n = t[i];
                e.push(n);
                var r = l.flowerProxy.getPoint(n.id),
                    a = r ? r.cur : 0;
                o[n.id] = 1 == n.type ? (a >= n.set ? 2 : 0) : 1;
            }
            e.sort(function(t, e) {
                var i = o[t.id],
                    n = o[e.id];
                return i == n ? t.id - e.id : i - n;
            });
            this.list.data = e;
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
