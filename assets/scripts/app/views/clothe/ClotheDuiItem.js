var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../component/SelectMax"),
    r = require("../../Initializer"),
    a = require("../../utils/Utils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.item = null;
            e.itemCost = null;
            e.silder = null;
            e.lblCount = null;
            e.lblCost = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this;
            this.silder.changeHandler = function() {
                var e = t.data;
                if (e) {
                    var o = t.silder.node.active ? t.silder.curValue : 1;
                    t.lblCost.string = o * e.items[0].count + "";
                }
            };
        };
        e.prototype.onClickDui = function() {
            var t = this.data;
            if (t) {
                var e = this.silder.node.active ? this.silder.curValue : 1;
                if (e > t.count - t.buy) {
                    a.alertUtil.alert18n("CLUB_EXCHANGE_GOODS_MAX");
                    return;
                }
                if (
                    r.bagProxy.getItemCount(t.items[0].id) <
                    t.items[0].count * e
                ) {
                    a.alertUtil.alertItemLimit(t.items[0].id);
                    return;
                }
                r.clothePveProxy.sendRwd(1e4 * e + t.id);
            }
        };
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                this.itemCost.data = t.items[0];
                this.item.data = t.items[1];
                this.lblCount.string = i18n.t("BOSS_DUI_HUAN_CI_SHU", {
                    d: t.count - t.buy
                });
                this.silder.max = t.count - t.buy;
                this.silder.node.active = t.count - t.buy > 1;
                this.silder.curValue =
                    this.silder.max > this.silder.curValue
                        ? this.silder.curValue
                        : this.silder.max;
            }
        };
        __decorate([_(n.default)], e.prototype, "item", void 0);
        __decorate([_(n.default)], e.prototype, "itemCost", void 0);
        __decorate([_(l.default)], e.prototype, "silder", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCost", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
