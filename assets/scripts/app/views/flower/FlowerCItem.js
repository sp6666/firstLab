var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = require("../../models/TimeProxy"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblDes = null;
            e.lblPrg = null;
            e.prg = null;
            e.url = null;
            e.btn = null;
            e.nodeOver = null;
            return e;
        }
        e.prototype.onClickGo = function() {
            var t = this.data;
            t && a.funUtils.openView(t.funid);
        };
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                var e = l.flowerProxy.getPoint(t.id);
                this.lblDes.string = t.msg;
                var o = e ? e.cur : 0;
                this.lblPrg.string = i18n.t("COMMON_NUM", {
                    f: o,
                    s: t.set
                });
                var i = localcache.getItem(localdb.table_iconOpen, t.funid);
                this.nodeOver.active = 1 == t.type && o >= t.set;
                this.btn.node.active =
                    i && a.funUtils.isOpen(i) && !this.nodeOver.active;
                var n = o / t.set;
                n = n > 1 ? 1 : n;
                this.prg.progress = n;
                this.url.url = r.uiHelps.getAchieveIcon(t.icon);
            }
        };
        __decorate([_(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblPrg", void 0);
        __decorate([_(cc.ProgressBar)], e.prototype, "prg", void 0);
        __decorate([_(n.default)], e.prototype, "url", void 0);
        __decorate([_(cc.Button)], e.prototype, "btn", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeOver", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
