var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemSlot = null;
            e.lblCost = null;
            e.nodeLock = null;
            e.lblLock = null;
            e.btn = null;
            e.btnBg = null;
            return e;
        }
        e.prototype.onClickBuy = function() {
            var t = this._data;
            t && l.utils.openPrefabView("kitchen/KitBuyConfirm", !1, t);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.itemSlot.data = {
                    id: t.itemid
                };
                this.lblCost.string = l.utils.formatMoney(t.cost);
                this.nodeLock.active = r.playerProxy.userData.level < t.level;
                var e = localcache.getItem(localdb.table_officer, t.level);
                this.lblLock.string = i18n.t("KIT_FOOD_LOCK", {
                    n: e ? e.name : ""
                });
                this.btnBg.interactable = this.btn.node.active = !this.nodeLock
                    .active;
            }
        };
        __decorate([c(n.default)], e.prototype, "itemSlot", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeLock", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblLock", void 0);
        __decorate([c(cc.Button)], e.prototype, "btn", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnBg", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
