var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../models/TimeProxy"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../item/ItemSlotUI"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblGold = null;
            e.res = 1;
            e.paramKey = "";
            e.item = null;
            e.nodeRes = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.res = n.stringUtil.isBlank(this.paramKey)
                ? this.res
                : n.utils.getParamInt(this.paramKey);
            this.nodeRes &&
                (this.nodeRes.active = 1 == this.res || null == this.item);
            this.item && (this.item.node.active = 1 != this.res);
            this.item &&
                (this.item.data = {
                    id: this.res,
                    kind: 1
                });
            this.onUpdateGold();
            1 == this.res
                ? facade.subscribe(
                      l.playerProxy.PLAYER_USER_UPDATE,
                      this.onUpdateGold,
                      this
                  )
                : facade.subscribe(
                      l.bagProxy.UPDATE_BAG_ITEM,
                      this.onUpdateGold,
                      this
                  );
        };
        e.prototype.onClickItem = function() {
            n.utils.openPrefabView("ItemInfo", !1, {
                id: this.res
            });
        };
        e.prototype.onUpdateGold = function() {
            this.lblGold.string = n.utils.formatMoney(
                l.bagProxy.getItemCount(this.res)
            );
        };
        e.prototype.onClickOpen = function() {
            1 == this.res
                ? i.funUtils.openView(i.funUtils.recharge.id)
                : l.shopProxy.isHaveItem(this.res) &&
                  i.funUtils.openView(i.funUtils.shopping.id, {
                      id: this.res
                  });
        };
        __decorate([c(cc.Label)], e.prototype, "lblGold", void 0);
        __decorate([c], e.prototype, "res", void 0);
        __decorate([c], e.prototype, "paramKey", void 0);
        __decorate([c(r.default)], e.prototype, "item", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeRes", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
