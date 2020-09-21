var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../item/ItemSlotUI"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblCost = null;
            e.lblDes = null;
            e.ItemSlotUI = null;
            e.nodeBtn = null;
            e.nodeGeted = null;
            e._curItem = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            this._curItem = t;
            this.ItemSlotUI.data = t.items[0];
            this.lblCost.string = t.need + "";
            var e = localcache.getItem(localdb.table_item, t.items[0].id),
                o = e ? e.explain.split("|") : "";
            this.lblDes.string = o.length > 1 ? o[1] : e ? e.explain : "";
            this.nodeBtn.active = 0 == this._curItem.buy;
            this.nodeGeted.active = 1 == this._curItem.buy;
        };
        e.prototype.onClickBuy = function() {
            if (this._curItem) {
                if (l.playerProxy.userData.cash < this._curItem.need) {
                    n.alertUtil.alertItemLimit(1);
                    return;
                }
                l.limitActivityProxy.sendGetActivityReward(
                    l.limitActivityProxy.DAYDAY_ID,
                    this._curItem.id
                );
            }
            this.onClickClost();
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
        };
        __decorate([s(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([s(i.default)], e.prototype, "ItemSlotUI", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeBtn", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeGeted", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
