var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./RenderListItem"),
    n = require("../views/item/ItemSlotUI"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblCost = null;
            e.lblCount = null;
            e.itemSlot = null;
            e.button = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.button);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_item, t.items.id);
                this.lblName.string = e ? e.name : "";
                this.itemSlot.data = t.items;
                this.lblCost.string = i18n.t("LUCKY_JI_FEN_TXT", {
                    num: t.need
                });
                this.lblCount.string = t.is_limit
                    ? i18n.t("BOSS_DUI_HUAN_CI_SHU", {
                          d: t.limit
                      })
                    : i18n.t("LUCKY_BU_XIAN_CI_SHU");
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([a(n.default)], e.prototype, "itemSlot", void 0);
        __decorate([a(cc.Button)], e.prototype, "button", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
