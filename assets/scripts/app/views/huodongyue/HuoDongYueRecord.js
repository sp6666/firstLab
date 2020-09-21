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
                var rwdName = "";
                if(t.itemid == 0) {
                    e = localcache.getItem(localdb.table_userClothe, 4005);
                    rwdName = "GIRLS_DAY_BIG_RWD";
                }else {
                    e = localcache.getItem(localdb.table_usersuit, 53);
                    rwdName = "HUODONGYUE_BIG_RWD_TAOZHUANG";
                }
                
                var suitName = "";
                if(e != null) {
                    suitName =  e.name;
                }
                this.lblDes.string = i18n.t(rwdName, {
                    name: t.name,
                    name2: suitName
                });
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblDes", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
