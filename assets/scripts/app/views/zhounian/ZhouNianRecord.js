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
                //var e = n.playerProxy.getKindIdName(t.itemid.kind, t.itemid.id);
                var e = null;
                if(t.itemid == 0) {
                    e = localcache.getItem(localdb.table_userClothe, 87);
                }else {
                    e = localcache.getItem(localdb.table_usersuit, 37);
                }
                
                var suitName = "";
                if(e != null) {
                    suitName =  e.name;
                }
                this.lblDes.string = i18n.t("GIRLS_DAY_BIG_RWD", {
                    name: t.name,
                    name2: suitName
                });
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblDes", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
