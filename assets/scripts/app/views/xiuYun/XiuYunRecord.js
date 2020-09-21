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
    s = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblDes = null;



            return e;
        }
        e.prototype.showData = function () {
            var t = this._data;

            this.persons = localcache.getList(localdb.table_xiuyun_person);

            for (var servant of this.persons) {
                if (servant.hid === t.hid) {
                    break;
                }
            }

            if (t) {
                //var e = n.playerProxy.getKindIdName(t.itemid.kind, t.itemid.id);

                if (typeof (t.score) != "number") {

                    var c = localcache.getItem(localdb.table_item, 1420);

                    this.lblDes.string = i18n.t("XIUYUN_DAY_CANDY_RWD", {
                        name: t.name,
                        name2: servant.name,
                        name3: c.name
                    });
                } else {
                    this.lblDes.string = i18n.t("XIUYUN_DAY_BIG_RWD", {
                        name: t.name,
                        name2: servant.name,
                        d: t.score
                    });
                }
            }
        };
        __decorate([a(cc.RichText)], e.prototype, "lblDes", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;