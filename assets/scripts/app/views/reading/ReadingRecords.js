var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblDes = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = n.playerProxy.getKindIdName(t.itemid.kind, t.itemid.id),
                    o = localcache.getItem(localdb.table_heropve, t.itemid.id);
                this.lblDes.string = i18n.t("READING_DAY_BIG_RWD", {
                    name: t.name,
                    type: o ? i18n.t("READING_STAR_" + o.star) : "",
                    name2: e
                });
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblDes", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
