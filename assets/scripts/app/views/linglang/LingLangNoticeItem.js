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
                var e = null;
                if(t.items.kind == 95) {
                    e = localcache.getItem(localdb.table_userClothe, t.items.id);
                    this.lblDes.string = i18n.t("LINGLANG_NOTICE2",{index : t.periods_num, name: t.sev_name + " " + t.name, itemName : e.name});
                }else {
                    e = localcache.getItem(localdb.table_item, t.items.id);
                    this.lblDes.string = i18n.t("LINGLANG_NOTICE1",{index : t.periods_num, name: t.sev_name + " " + t.name, itemName : e.name, num : t.items.num});
                }
            }
        };
        __decorate([r(cc.Label)], e.prototype, "lblDes", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;