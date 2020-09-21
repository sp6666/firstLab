var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/Utils"),
    l = require("../item/ItemSlotUI"),
    r = require("../../component/LabelShadow"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblCount = null;
            e.nodeLimit = null;
            e.lblCost = null;
            e.ItemSlotUI = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblName.string = t.name;
                this.lblCost.string = t.need + "";
                this.nodeLimit.active = 1 == t.islimit;
                this.lblCount.string = i18n.t("SHOP_LIMIT_COUNT", {
                    c: t.limit
                });
                this.ItemSlotUI.data = t.items[0];
            }
        };
        e.prototype.onClickBuy = function() {
            n.utils.openPrefabView("shopping/ShopGiftBuy", !1, this._data);
        };
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(r.default)], e.prototype, "lblCount", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeLimit", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([c(l.default)], e.prototype, "ItemSlotUI", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
