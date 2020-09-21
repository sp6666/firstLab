var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Config"),
    l = require("../../Initializer"),
    r = require("../../utils/Utils"),
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
                var t = localcache.getList(localdb.table_userjob),
                    e = [],
                    o = 0;
                o < t.length;
                o++
            )
                t[o].id != l.playerProxy.userData.job &&
                    (n.Config.DEBUG ||
                        null == t[o].display ||
                        0 == t[o].display.length ||
                        -1 != t[o].display.indexOf(n.Config.pf)) &&
                    e.push(t[o]);
            this.list.data = e;
            facade.subscribe("USER_JOB_CHANGE_CLOST", this.onClickClost, this);
        };
        e.prototype.onClickClost = function() {
            r.utils.closeView(this);
        };
        __decorate([c(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
