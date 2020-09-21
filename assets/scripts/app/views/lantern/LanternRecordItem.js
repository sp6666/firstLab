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
            e.lblCount = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_item, t.itemid.id);
                this.lblCount.string = i18n.t("LAN_TERN_BIG_REWARD_RECORD", {
                    name1: t.name,
                    name2: e ? e.name : "",
                    num: t.itemid.count
                });
            }
        };
        __decorate([r(cc.Label)], e.prototype, "lblCount", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
