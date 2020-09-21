var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/UIUtils"),
    l = require("../item/ItemSlotUI"),
    r = require("../../Initializer"),
    a = require("../../component/SelectMax"),
    s = require("../../utils/Utils"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblxiangou = null;
            e.lblname = null;
            e.lblprice = null;
            e.lbldes = null;
            e.itemSlot = null;
            e.silderCount = null;
            e.iconArr = [];
            e.icon = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_item, t.items.id);
                this.lblname.string = e.name;
                this.lblprice.string = t.need.count + "";
                this.lbldes.string = e.explain;
                var o = new n.ItemSlotData();
                o.itemid = t.items.id;
                this.itemSlot.data = o;
                this.lblxiangou.string = i18n.t("SHOP_LIMIT_COUNT", {
                    c: t.limit
                });
                this.silderCount.max = t.limit;
                this.silderCount.curValue = 1;
                this.icon.spriteFrame = this.iconArr[1 == t.need.id ? 0 : 1];
            }
        };
        e.prototype.onClickBuy = function() {
            var t = this._data;
            if (t) {
                var e = this.silderCount.curValue
                    ? this.silderCount.curValue
                    : 1;
                if (t.limit > 0) {
                    if(this.silderCount.curValue > t.limit) {
                        s.alertUtil.alert18n("SHOP_BUY_NUM_GT_MAX");
                        return;
                    }
                    if (1 == t.need.id) {
                        if (r.playerProxy.userData.cash < t.need.count * e) {
                            s.alertUtil.alertItemLimit(t.need.id);
                            return;
                        }
                    } else if (
                        3 == t.need.id &&
                        r.playerProxy.userData.food < t.need.count * e
                    ) {
                        s.alertUtil.alertItemLimit(t.need.id);
                        return;
                    }
                    r.supportProxy.sendBuyItem(t.id, e);
                } else s.alertUtil.alert18n("SHOP_BUY_NUM_GT_MAX");
            }
        };
        __decorate([d(cc.Label)], e.prototype, "lblxiangou", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblname", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblprice", void 0);
        __decorate([d(cc.Label)], e.prototype, "lbldes", void 0);
        __decorate([d(l.default)], e.prototype, "itemSlot", void 0);
        __decorate([d(a.default)], e.prototype, "silderCount", void 0);
        __decorate([d([cc.SpriteFrame])], e.prototype, "iconArr", void 0);
        __decorate([d(cc.Sprite)], e.prototype, "icon", void 0);
        return (e = __decorate([_], e));
    })(i.default);
o.default = u;
