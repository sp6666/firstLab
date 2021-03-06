var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/Utils"),
    a = require("../../Initializer"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.price = [];
            e.unSale = [];
            e.sale = [];
            e.unSaleNode = [];
            e.priceNode = [];
            e.giftName = null;
            e.limitNum = null;
            e.giftBox = null;
            e.btn = null;
            e.nodeBtn = null;
            e.vipNode = null;
            e.vipLabel = null;
            return e;
        }
        e.prototype.showData = function () {
            var t = this._data;
            if (t) {
                if (t.isclothe) {
                    var e = localcache
                        .getItem(localdb.table_userClothe, t.icon)
                        .model.split("|");
                    this.giftBox.url = l.uiHelps.getRolePart(e[0]);
                } else this.giftBox.url = l.uiHelps.getItemSlot(t.icon);

                if (t.vip) {
                    this.vipNode.active = true;
                    this.vipLabel.string = i18n.t("COMMON_VIP_NAME", {
                        v: t.vip
                    });
                } else {
                    this.vipNode.active = false;
                }

                this.giftName.string = t.name;
                this.limitNum.string = t.limit + "";
                this.btn.interactable = t.limit > 0;
                this.nodeBtn.interactable = t.limit > 0;
                switch (t.type) {
                    case 0:
                        this.unSale[0].string = i18n.t("HD_TYPE8_UNSALE", {
                            money: t.sign + t.prime
                        });
                        break;

                    case 1:
                        this.unSale[1].string = t.prime + "";
                        this.price[0].string = t.present + "";
                        break;

                    case 2:
                        this.unSale[2].string = i18n.t("HD_TYPE8_UNSALE", {
                            money: t.sign + t.prime
                        });
                        this.price[1].string = t.sign + t.present + "";
                }
                for (var o = 0; o < this.unSaleNode.length; o++)
                    this.unSaleNode[o].active = o == t.type;
                for (o = 0; o < this.priceNode.length; o++)
                    this.priceNode[o].active = o == t.type;
                for (o = 0; o < this.sale.length; o++) {
                    var i = ((t.prime - t.present) / t.prime) * 100;
                    this.sale[o].string = i18n.t("HD_TYPE8_SALE", {
                        num: i.toFixed(0)
                    });
                }
            }
        };
        e.prototype.onclickBuy = function () {
            var t = this._data;
            switch (t.type) {
                case 0:
                    0 == t.type && t.limit > 0 && a.oldUsersProxy.sendCashBuy(t.id);
                    break;

                default:
                    if (0 != t.islimit && t.limit <= 0) {
                        r.alertUtil.alert18n("HD_TYPE8_DONT_SHOPING");
                        return;
                    }

                    r.utils.openPrefabView("oldusers/OldUsersDailyGiftShow", !1, t);
                    break;
            }
        };
        __decorate([_(cc.Label)], e.prototype, "vipLabel", void 0);
        __decorate([_(cc.Node)], e.prototype, "vipNode", void 0);

        __decorate([_([cc.Label])], e.prototype, "price", void 0);
        __decorate([_([cc.Label])], e.prototype, "unSale", void 0);
        __decorate([_([cc.Label])], e.prototype, "sale", void 0);
        __decorate([_([cc.Node])], e.prototype, "unSaleNode", void 0);
        __decorate([_([cc.Node])], e.prototype, "priceNode", void 0);
        __decorate([_(cc.Label)], e.prototype, "giftName", void 0);
        __decorate([_(cc.Label)], e.prototype, "limitNum", void 0);
        __decorate([_(n.default)], e.prototype, "giftBox", void 0);
        __decorate([_(cc.Button)], e.prototype, "btn", void 0);
        __decorate([_(cc.Button)], e.prototype, "nodeBtn", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;