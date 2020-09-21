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
            e.lblInfo = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_hero, t.hid);
                this.lblInfo.string = i18n.t("JIU_LOU_HERO_JOIN", {
                    role: t.name,
                    name: e.name,
                    value: t.ep
                });
            }
        };
        __decorate([r(cc.Label)], e.prototype, "lblInfo", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
