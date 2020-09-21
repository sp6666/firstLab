var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../component/UrlLoad"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblCost = null;
            e.nodeGold = null;
            e.item = null;
            e.curList = [];
            return e;
        }
        e.prototype.onLoad = function() {
            this.curList = this.node.openParam;
            this.list.data = this.curList;
            this.onUpdateCost();
            facade.subscribe(
                l.playerProxy.PLAYER_CLOTH_UPDATE,
                this.updateShow,
                this
            );
            facade.subscribe("SHOP_BUY_ITEM_ID", this.onShopBuy, this);
        };
        e.prototype.getCost = function() {
            for (var t = {}, e = 0; e < this.curList.length; e++) {
                var o = this.curList[e];
                switch (o.unlock) {
                    case 1:
                    case 2:
                        null != o.money.itemid &&
                            (t[o.money.itemid] = t[o.money.itemid]
                                ? t[o.money.itemid] + o.money.count
                                : o.money.count);
                }
            }
            return t;
        };
        e.prototype.onClickDelete = function(t, e) {
            var o = e.data,
                i = this.curList.indexOf(o);
            -1 != i && this.curList.splice(i, 1);
            this.list.data = this.curList;
            this.onUpdateCost();
        };
        e.prototype.onUpdateCost = function() {
            var t = this.getCost(),
                e = t[1] ? t[1] : 0,
                o = n.utils.getParamInt("clother_item");
            this.nodeGold.active = e > 0;
            this.item.node.active = e <= 0;
            this.item.url = a.uiHelps.getItemSlot(o);
            this.lblCost.string = e > 0 ? e : t[o + ""] ? t[o + ""] : 0;
        };
        e.prototype.onShopBuy = function() {};
        e.prototype.onBuy = function() {
            var t = this.getCost();
            for (var e in t) {
                if (l.bagProxy.getItemCount(parseInt(e)) < t[e]) {
                    n.alertUtil.alertItemLimit(e);
                    return;
                }
            }
            0 == this.curList.length && this.onClickClost();
            for (var o = 0; o < this.curList.length; o++) {
                var i = this.curList[o];
                (1 != i.unlock && 2 != i.unlock) ||
                    l.playerProxy.sendUnlockCloth(i.id);
            }
        };
        e.prototype.updateShow = function() {
            for (var t = [], e = 0; e < this.curList.length; e++)
                l.playerProxy.isUnlockCloth(this.curList[e].id) ||
                    t.push(this.curList[e]);
            this.curList = t;
            if (0 != t.length) {
                this.list.data = t;
                this.onUpdateCost();
            } else this.onClickClost();
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
        };
        __decorate([_(i.default)], e.prototype, "list", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeGold", void 0);
        __decorate([_(r.default)], e.prototype, "item", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
