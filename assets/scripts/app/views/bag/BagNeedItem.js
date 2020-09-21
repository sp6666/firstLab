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
            e.lblCount = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = r.bagProxy.getItemCount(t.id);
                this.itemSlot.data = t;
                this.lblCount.string = i18n.t("COMMON_NUM", {
                    f: e,
                    s: t.count
                });
                this.lblCount.node.color =
                    e >= t.count ? l.utils.GREEN : l.utils.RED;
            }
        };
        __decorate([c(n.default)], e.prototype, "itemSlot", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCount", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
