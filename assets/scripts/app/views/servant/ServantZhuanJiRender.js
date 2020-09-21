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
            e.lblNum = null;
            e.lblLv = null;
            e.lblTxt = null;
            e.zjNode = null;
            e.proNode = null;
            e.lblPro = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            this.zjNode.active = !t.active;
            var e = localcache.getItem(localdb.table_heroinfo, t.heroId);
            this.lblTxt.string = t.active ? e["yoke" + t.jb] : "";
            var o = i18n.t("COMMON_HANZI").split("|");
            this.lblNum.string =
                i18n.t("SERVANT_ZHUAN_JI") + o[parseInt(t.jb) - 1];
            this.lblLv.string = i18n.t("SERVANT_JI_BAN_ZHUAN_JI", {
                value: t.jb
            });
            t.active, (this.proNode.x = 235);
            n.jibanProxy.getHeroJbLv(t.heroId);
            var i =
                    1e3 *
                        localcache.getItem(localdb.table_hero, t.heroId).star +
                    t.jb,
                l = localcache.getItem(localdb.table_yoke, i);
            this.lblPro.string = "+" + l.prop / 100 + "%";
            this.proNode.active = l.level > 1;
        };
        __decorate([a(cc.Label)], e.prototype, "lblNum", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblTxt", void 0);
        __decorate([a(cc.Node)], e.prototype, "zjNode", void 0);
        __decorate([a(cc.Node)], e.prototype, "proNode", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblPro", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
