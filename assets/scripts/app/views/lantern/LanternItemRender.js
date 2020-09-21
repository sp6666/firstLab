var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../Initializer"),
    r = require("../../utils/Utils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemSlot = null;
            e.dark = null;
            e.light = null;
            e.eff = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.dark.active = null == t.items;
                this.light.active = null != t.items;
                this.eff.active = null != t.items;
                this.itemSlot.node.active = null != t.items;
                t.items && (this.itemSlot.data = t.items);
            }
        };
        e.prototype.onClickLight = function() {
            var t = this._data;
            if (t) {
                if (t.items) return;
                if (l.lanternProxy.data.light <= 0) {
                    r.alertUtil.alert18n("LAN_TERN_LIMIT_COUNT");
                    return;
                }
                if (12 == t.did && !this.isCanLight()) {
                    r.alertUtil.alert18n("LAN_TERN_BIG_LIMIT_TXT");
                    return;
                }
                l.lanternProxy.sendLightLantern(t.did);
            }
        };
        e.prototype.isCanLight = function() {
            for (var t = 0; t < l.lanternProxy.data.draw.length; t++)
                if (
                    12 != l.lanternProxy.data.draw[t].did &&
                    null == l.lanternProxy.data.draw[t].items
                )
                    return !1;
            return !0;
        };
        __decorate([c(n.default)], e.prototype, "itemSlot", void 0);
        __decorate([c(cc.Node)], e.prototype, "dark", void 0);
        __decorate([c(cc.Node)], e.prototype, "light", void 0);
        __decorate([c(cc.Node)], e.prototype, "eff", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
