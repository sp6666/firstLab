var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/UrlLoad"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblShenFen = null;
            e.lblLv = null;
            e.lblShuJi = null;
            e.lblTiBa = null;
            e.lblZhiWEI = null;
            e.roleImg = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = l.servantProxy.getHeroData(l.servantProxy.curSelectId);
            if (t) {
                var e = localcache.getItem(localdb.table_nobility, t.senior);
                this.lblName.string = e.name;
                var o = localcache.getItem(
                    localdb.table_nobility,
                    t.senior - 1
                );
                if (o) {
                    this.lblShenFen.string = o.name + " → " + e.name;
                    this.lblLv.string = o.max_level + " → " + e.max_level;
                    this.lblShuJi.string = o.maxeplv + " → " + e.maxeplv;
                    this.lblTiBa.string = i18n.t("COMMON_SJJY") + "+" + o.zzexp;
                }
                this.roleImg.url = r.uiHelps.getServantSpine(t.id);
            }
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblShenFen", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblShuJi", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTiBa", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblZhiWEI", void 0);
        __decorate([c(i.default)], e.prototype, "roleImg", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
