var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/List"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lsit = null;
            e.bg = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                for (
                    var e = localcache.getGroup(
                            localdb.table_midPve,
                            "bmap",
                            t.id
                        ),
                        o = [],
                        i = 0;
                    i < e.length;
                    i++
                )
                    o.push(e[i]);
                o.sort(function(t, e) {
                    return t.id - e.id;
                });
                o.push(t);
                this.lsit.data = o;
                this.node.height = this.bg.height =
                    -this.lsit.node.y + this.lsit.node.height + 82;
                this.bg.y = this.bg.height;
                this.bg.stopAllActions();
                this.bg.runAction(cc.moveTo(0.3, this.bg.x, 0));
            }
        };
        __decorate([a(n.default)], e.prototype, "lsit", void 0);
        __decorate([a(cc.Node)], e.prototype, "bg", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
