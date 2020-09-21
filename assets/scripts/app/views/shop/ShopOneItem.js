var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../utils/Utils"),
    r = require("../../component/LabelShadow"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.item = null;
            e.lblPrice = null;
            e.lblCount = null;
            e.nodeLimit = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.nodeLimit.active = 1 == t.islimit;
                this.lblCount.string = i18n.t("SHOP_LIMIT_COUNT", {
                    c: t.limit
                });
                this.lblPrice.string = t.need + "";
                this.item.data = t.item;
            }
        };
        e.prototype.onClickBuy = function() {
            l.utils.openPrefabView("shopping/ShopBuy", !1, this._data);
        };
        __decorate([c(n.default)], e.prototype, "item", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblPrice", void 0);
        __decorate([c(r.default)], e.prototype, "lblCount", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeLimit", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
