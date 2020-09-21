var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
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
            e.lblTxt = null;
            e.icon = null;
            e.effect = null;
            e.btnShow = null;
            e.btn = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = l.continuityRechargeProxy.data;
            this._curData = t;
            var e = this._data;
            if (e) {
                var o = localcache.getItem(localdb.table_item, e.icon + "");
                this.lblTxt.string = i18n.t("CONTINUITY_RECHARGE_XU_RI", {
                    num: n.utils.formatMoney(e.need)
                });
                this.icon.data = o;
                this.effect.active = t.cons >= e.need && 0 == e.get;
                this.btnShow.interactable = this.btn.interactable = 0 == e.get;
                this.icon.setGray(0 != e.get);
            }
        };
        e.prototype.onClickGetItem = function() {
            var t = this.data,
                e = this._curData;
            t &&
                (e.cons >= t.need
                    ? l.continuityRechargeProxy.sendGetDailyReward(t.dc)
                    : n.utils.openPrefabView(
                          "continuityrecharge/ContinuityRechargeItemView",
                          !1,
                          t
                      ));
        };
        __decorate([c(cc.Label)], e.prototype, "lblTxt", void 0);
        __decorate([c(r.default)], e.prototype, "icon", void 0);
        __decorate([c(cc.Node)], e.prototype, "effect", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnShow", void 0);
        __decorate([c(cc.Button)], e.prototype, "btn", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
