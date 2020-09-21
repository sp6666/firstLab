var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/Utils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.boss = null;
            e.lblWuli = null;
            e.lblName = null;
            e.nodeLeft = null;
            e.nodeRight = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_hero, t.id);
                this.boss.url = l.uiHelps.getServantSmallSpine(t.id);
                this.lblWuli &&
                    (this.lblWuli.string = r.utils.formatMoney(t.aep.e1));
                this.lblName && (this.lblName.string = e.name);
            }
        };
        __decorate([c(n.default)], e.prototype, "boss", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblWuli", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeLeft", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeRight", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
