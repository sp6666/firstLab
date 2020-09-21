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
            return e;
        }
        e.prototype.onLoad = function() {
            for (
                var t = localcache.getGroup(
                        localdb.table_userClothe,
                        "part",
                        6
                    ),
                    e = [],
                    o = 0;
                o < t.length;
                o++
            )
                t[o].pet_type > 0 && e.push(t[o]);
            this.list.data = e;
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([a(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
