var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblDes = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                var e = localcache.getItem(localdb.table_item, t.item.id);
                0 == t.type
                    ? (this.lblDes.string = i18n.t("SPELL_SEND_CARD", {
                          name: t.name,
                          item: e ? e.name : ""
                      }))
                    : 1 == t.type &&
                      (this.lblDes.string = i18n.t("SPELL_GET_CARD", {
                          name: t.name,
                          item: e ? e.name : ""
                      }));
            }
        };
        __decorate([r(cc.Label)], e.prototype, "lblDes", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
