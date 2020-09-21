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
            e.lblcontent = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_hero, t.pkID),
                    o = localcache.getItem(localdb.table_item, t.itemid),
                    i = 0;
                switch (t.itemid) {
                    case 1100:
                        i = 10;
                        break;

                    case 1101:
                        i = 20;
                        break;

                    case 1102:
                        i = 50;
                        break;

                    case 1103:
                        i = 100;
                }
                this.lblcontent.string = i18n.t("SUPPORT_RECORD_TXT", {
                    name1: t.name,
                    name2: e.name,
                    name3: o.name,
                    name4: e.name,
                    value: i
                });
            }
        };
        __decorate([r(cc.RichText)], e.prototype, "lblcontent", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
