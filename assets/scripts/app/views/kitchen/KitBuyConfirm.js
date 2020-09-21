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
            e.lblCount = null;
            e.silder = null;
            e.item = null;
            e._shop = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this._shop = this.node.openParam;
            if (this._shop) {
                this.item.data = {
                    id: this._shop.itemid
                };
                var t = n.playerProxy.userData.food,
                    e = this;
                this.silder.changeHandler = function() {
                    e._shop &&
                        (e.lblCount.string = l.utils.formatMoney(
                            e._shop.cost * e.silder.curValue
                        ));
                };
                this.silder.max = Math.floor(t / this._shop.cost);
            }
        };
        e.prototype.onClickBuy = function() {
            if (this._shop.level > n.playerProxy.userData.level) {
                var t = localcache.getItem(
                    localdb.table_officer,
                    this._shop.level
                );
                l.alertUtil.alert("KITCHEN_BUY_LEVEL_LIMIT", {
                    n: t ? t.name : ""
                });
            } else if (
                this._shop.cost * this.silder.curValue >
                n.playerProxy.userData.food
            )
                l.alertUtil.alertItemLimit(3);
            else {
                n.kitchenProxy.sendBuyItem(this._shop.id, this.silder.curValue);
                this.onClickClost();
            }
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this);
        };
        __decorate([c(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([c(r.default)], e.prototype, "silder", void 0);
        __decorate([c(i.default)], e.prototype, "item", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
