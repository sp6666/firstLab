var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./TaofaItem"),
    n = require("../../Initializer"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblWave = null;
            e.items = [];
            e.notFind = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.lblWave.string = n.taofaProxy.playerInfo.gid + "";
            this.notFind.active =
                null ==
                localcache.getItem(
                    localdb.table_taofaChaper,
                    n.taofaProxy.playerInfo.gid + 1
                );
        };
        __decorate([a(cc.Label)], e.prototype, "lblWave", void 0);
        __decorate([a([i.default])], e.prototype, "items", void 0);
        __decorate([a(cc.Node)], e.prototype, "notFind", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
