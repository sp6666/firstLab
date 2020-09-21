var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblLimit = null;
            e.lblName = null;
            e.lblCost = null;
            e.list = null;
            e.shop = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.shop = this.node.openParam;
            facade.subscribe(
                n.shopProxy.UPDATE_SHOP_LIMIT,
                this.updateShow,
                this
            );
            this.updateShow();
        };
        e.prototype.updateShow = function() {
            if (this.shop) {
                for (var t = 0; t < n.shopProxy.giftList.list.length; t++)
                    if (this.shop.id == n.shopProxy.giftList.list[t].id) {
                        this.shop = n.shopProxy.giftList.list[t];
                        break;
                    }
                this.lblName.string = this.shop.name;
                this.lblCost.string = this.shop.need + "";
                this.lblLimit.node.active = 1 == this.shop.islimit;
                this.lblLimit.string = i18n.t("SHOP_LIMIT_COUNT", {
                    c: this.shop.limit
                });
                this.list.data = this.shop.items;
            }
        };
        e.prototype.onClickBuy = function() {
            var t = this.shop;
            if (t) {
                if (t.vip > n.playerProxy.userData.vip) {
                    l.alertUtil.alert("SHOP_BUY_VIP_LIMIT", {
                        v: t.vip
                    });
                    return;
                }
                if (1 == t.islimit && 0 == t.limit) {
                    l.alertUtil.alert18n("SHOP_BUY_COUNT_LIMIT");
                    return;
                }
                if (t.need > n.playerProxy.userData.cash) {
                    l.alertUtil.alertItemLimit(1);
                    return;
                }
                n.shopProxy.sendBuyGift(t.id);
            }
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this);
        };
        __decorate([s(cc.Label)], e.prototype, "lblLimit", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
