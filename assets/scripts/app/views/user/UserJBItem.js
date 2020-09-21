var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblContext = null;
            e.bg = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.bg.color = 3 == t.type ? l.utils.GRAY : l.utils.WHITE;
                switch (t.type) {
                    case 1:
                        var e = localcache.getItem(localdb.table_hero, t.id);
                        this.lblContext.string =
                            i18n.t("SERVANT_JIBAN_HERO", {
                                n: e.name
                            }) + t.count;
                        break;

                    case 2:
                        this.lblContext.string =
                            i18n.t("SERVANT_JIBAN_WIFE", {
                                n: n.playerProxy.getWifeName(t.id)
                            }) + t.count;
                        break;

                    case 3:
                        e = localcache.getItem(localdb.table_hero, t.id);
                        this.lblContext.string =
                            i18n.t("SERVANT_HERO_SW", {
                                n: e.name
                            }) + t.count;
                }
            }
        };
        __decorate([s(cc.Label)], e.prototype, "lblContext", void 0);
        __decorate([s(cc.Node)], e.prototype, "bg", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
