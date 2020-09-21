var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/Utils"),
    a = require("../../models/BagProxy"),
    s = require("../item/ItemSlotUI"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.price = null;
            e.unSale = null;
            e.giftName = null;
            e.limitNum = null;
            e.time = null;
            e.giftBox = null;
            e.boxNode = null;
            e.timeNode = null;
            e.limitNode = null;
            e.btn = null;
            return e;
        }
        e.prototype.showData = function () {
            var t = this._data;
            if (t) {
                this.price.string = i18n.t("HD_TYPE8_PRICE", {
                    money: t.sign + t.present
                });
                this.limitNum.string = t.limit + "";
                this.unSale.string = i18n.t("HD_TYPE8_UNSALE", {
                    money: t.sign + t.prime
                });
                this.giftName.string = t.name;
                this.giftBox.data =
                    t.items[0].kind == a.DataType.CLOTHE ?
                    t.items[0] :
                    localcache.getItem(localdb.table_item, t.icon);
                this.boxNode.scale =
                    t.items[0].kind == a.DataType.CLOTHE ? 0.8 : 1;
                this.btn.interactable = t.limit > 0;
                l.uiUtils.countDown(
                    t.end,
                    this.time,
                    null,
                    !0,
                    "HD_TYPE8_PRICE_TIME_LIMIT"
                );
                this.limitNode.active = this.timeNode.active =
                    t.end - r.timeUtil.second <= 31536e3;
            }
        };
        e.prototype.onclickBuy = function () {
            var t = this._data;
            if (t) {
                if (0 != t.islimit && t.limit <= 0) {
                    r.alertUtil.alert18n("HD_TYPE8_DONT_SHOPING");
                    return;
                }
                if (n.mergePurchaseProxy.limitBuy) {
                    r.alertUtil.alert18n("HD_TYPE8_SHOPING_WAIT");
                    return;
                }
                if (t.end <= r.timeUtil.second) {
                    r.alertUtil.alert18n("HD_TYPE8_SHOPING_TIME_OVER");
                    return;
                }
                if (t.items[0].kind == a.DataType.CLOTHE) {
                    for (
                        var e = !1, o = n.mailProxy.mailList, i = 0; i < o.length; i++
                    )
                        if (0 == o[i].rts && o[i].items)
                            for (var l = 0; l < o[i].items.length; l++)
                                o[i].items[l] &&
                                o[i].items[l].kind == a.DataType.CLOTHE &&
                                t.items[0].id == o[i].items[l].id &&
                                (e = !0);
                    if (n.playerProxy.isUnlockCloth(t.items[0].id) || e) {
                        r.alertUtil.alert18n("USER_CLOTHE_DUPLICATE");
                        return;
                    }
                }
                t.isMerge = true;
                r.utils.openPrefabView("purchase/PurchaseGiftShow", !1, t);
            }
        };
        __decorate([d(cc.Label)], e.prototype, "price", void 0);
        __decorate([d(cc.Label)], e.prototype, "unSale", void 0);
        __decorate([d(cc.Label)], e.prototype, "giftName", void 0);
        __decorate([d(cc.Label)], e.prototype, "limitNum", void 0);
        __decorate([d(cc.Label)], e.prototype, "time", void 0);
        __decorate([d(s.default)], e.prototype, "giftBox", void 0);
        __decorate([d(cc.Node)], e.prototype, "boxNode", void 0);
        __decorate([d(cc.Node)], e.prototype, "timeNode", void 0);
        __decorate([d(cc.Node)], e.prototype, "limitNode", void 0);
        __decorate([d(cc.Button)], e.prototype, "btn", void 0);
        return (e = __decorate([_], e));
    })(i.default);
o.default = u;