var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblcontent = null;
            return e;
        }
        e.prototype.onLoad = function() {
            for (
                var t = this.node.openParam,
                    e = localcache.getGroup(localdb.table_tips, "type", t.type),
                    o = "",
                    n = 0;
                n < e.length;
                n++
            ) {
                o +=
                    (i.stringUtil.isBlank(e[n].title) ? "" : e[n].title) + "\n";
                for (var l = e[n].des.split("|"), r = 0; r < l.length; r++) {
                    o += l[r] + "\n";
                    r == l.length - 1 && (o += "\n");
                }
            }
            this.lblcontent.string = o;
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([r(cc.Label)], e.prototype, "lblcontent", void 0);
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
