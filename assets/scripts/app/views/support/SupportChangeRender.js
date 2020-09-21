var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../Initializer"),
    r = require("../../utils/Utils"),
    a = require("../../component/SelectMax"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.slot = null;
            e.lblName = null;
            e.lblcost = null;
            e.lbllimit = null;
            e.silderCount = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_item, t.items.id);
                this.lblName.string = e.name;
                this.lblcost.string = i18n.t("JIULOU_COST_SCORE", {
                    d: t.need
                });
                this.lbllimit.string = i18n.t("BOSS_DUI_HUAN_CI_SHU", {
                    d: t.limit
                });
                this.silderCount.max = t.limit;
                this.silderCount.curValue = 1;
                this.slot.data = e;
            }
        };
        e.prototype.onClickChange = function() {
            var t = this._data;
            0 != t.limit
                ? l.supportProxy.myChangeScore <
                  t.need * this.silderCount.curValue
                    ? r.alertUtil.alert18n("BOITE_EXCHANGE_SCORE_SHORT")
                    : l.supportProxy.sendChangeId(
                          t.id,
                          this.silderCount.curValue
                      )
                : r.alertUtil.alert18n("CLUB_EXCHANGE_GOODS_MAX");
        };
        __decorate([_(n.default)], e.prototype, "slot", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblcost", void 0);
        __decorate([_(cc.Label)], e.prototype, "lbllimit", void 0);
        __decorate([_(a.default)], e.prototype, "silderCount", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
