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
            facade.subscribe("UNION_OPEN_COPY_RESULT", this.onUpdateData, this);
            this.onUpdateData();
        };
        e.prototype.onUpdateData = function() {
            for (
                var t = [],
                    e = localcache.getList(localdb.table_unionBoss),
                    o = 0;
                o < e.length;
                o++
            )
                e[o].level <= n.unionProxy.clubInfo.level && t.push(e[o]);
            this.list.data = t;
        };
        e.prototype.eventClose = function() {
            l.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
