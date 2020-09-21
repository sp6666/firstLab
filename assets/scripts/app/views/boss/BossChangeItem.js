var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/UIUtils"),
    l = require("../item/ItemSlotUI"),
    r = require("../../Initializer"),
    a = require("../../utils/Utils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblCost = null;
            e.lblCount = null;
            e.itemSlot = null;
            e.buyCount = 0;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = new n.ItemSlotData();
                e.id = t.itemid;
                this.itemSlot.data = e;
                var o = localcache.getItem(localdb.table_item, t.itemid);
                this.lblName.string = o.name;
                this.buyCount = t.buymax - r.bossPorxy.getBuyCount(t.id);
                this.lblCost.string = i18n.t("BOSS_SCORE_TXT", {
                    value: t["score" + this.buyCount]
                });
                this.lblCount.string = i18n.t("BOSS_DUI_HUAN_CI_SHU", {
                    d: this.buyCount
                });
            }
        };
        e.prototype.onClickBuy = function() {
            var t = this._data;
            if (this.buyCount <= 0)
                a.alertUtil.alert18n("JINGYING_COUNT_LIMIT");
            else {
                var e = t["score" + this.buyCount];
                r.bossPorxy.shop.score < e
                    ? a.alertUtil.alert18n("BOSS_HAO_GAN_BU_ZU")
                    : r.bossPorxy.sendShopBuyShopBuy(t.id);
            }
        };
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([_(l.default)], e.prototype, "itemSlot", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
