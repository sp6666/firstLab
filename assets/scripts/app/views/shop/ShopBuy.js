var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../item/ItemSlotUI"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../component/SelectMax"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblDes = null;
            e.silderCount = null;
            e.item = null;
            e.lblPrice = null;
            e.lblLimit = null;
            e.shop = null;
            e.count = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            this.shop = this.node.openParam;
            if (null != this.shop.needCount) {
                this.count = this.shop.needCount;
                this.shop = this.shop.buy;
            }
            facade.subscribe(
                n.shopProxy.UPDATE_SHOP_LIST,
                this.updateShow,
                this
            );
            this.updateShow();
        };
        e.prototype.updateShow = function() {
            if (this.shop) {
                for (var t = 0; t < n.shopProxy.list.length; t++)
                    if (this.shop.id == n.shopProxy.list[t].id) {
                        this.shop = n.shopProxy.list[t];
                        break;
                    }
                var e = localcache.getItem(
                        localdb.table_item,
                        this.shop.item.id
                    ),
                    o = Math.floor(
                        n.playerProxy.userData.cash / this.shop.need
                    );
                o =
                    1 == this.shop.islimit
                        ? this.shop.limit > o
                            ? o
                            : this.shop.limit
                        : o;
                this.lblLimit.node.active = 1 == this.shop.islimit;
                this.lblLimit.string = i18n.t("SHOP_LIMIT_COUNT", {
                    c: this.shop.limit
                });
                this.lblPrice.string = this.shop.need + "";
                this.item.data = this.shop.item;
                this.lblDes.string = e.explain;
                this.silderCount.node.active = o > 1 || this.count > 1;
                var i = this;
                this.silderCount.changeHandler = function() {
                    var t = i.shop.need * i.silderCount.curValue;
                    i.lblPrice.string = t + "";
                };
                this.silderCount.curValue = this.count;
                this.silderCount.node.active && (this.silderCount.max = o);
            }
        };
        e.prototype.onClickBuy = function() {
            var t = this.shop;
            if (t) {
                var e = this.silderCount.node.active
                    ? this.silderCount.curValue
                    : 1;
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
                if(1 == t.islimit && this.silderCount.curValue > t.limit) {
                    l.alertUtil.alert18n("HD_TYPE8_EXCEED_LIMIT");
                    return;
                }
                if (t.need * e > n.playerProxy.userData.cash) {
                    l.alertUtil.alertItemLimit(1);
                    return;
                }
                if (0 == e) return;
                n.shopProxy.sendBuyLimit(t.id, e, 0 != this.count);
                this.onClickClost();
            }
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this);
        };
        __decorate([c(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([c(r.default)], e.prototype, "silderCount", void 0);
        __decorate([c(i.default)], e.prototype, "item", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblPrice", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblLimit", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
