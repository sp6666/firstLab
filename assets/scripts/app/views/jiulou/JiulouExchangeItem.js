var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/Utils"),
    l = require("../item/ItemSlotUI"),
    r = require("../../utils/UIUtils"),
    a = require("../../Initializer"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblScore = null;
            e.lblZhe = null;
            e.lblName = null;
            e.lblCount = null;
            e.itemSlot = null;
            e.costScore = 0;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_item, t.good.id);
                this.lblName.string = e.name;
                var o = a.jiulouProxy.getShopCount(t.id);
                this.costScore = Math.floor(t.cost * Math.pow(1.2, o));
                this.lblScore.string = i18n.t("JIULOU_COST_SCORE", {
                    d: this.costScore
                });
                var i = new r.ItemSlotData();
                i.id = e.id;
                this.itemSlot.data = i;
            }
        };
        e.prototype.onClickExchange = function() {
            var t = this._data;
            if (t) {
                if (this.costScore > a.jiulouProxy.shop.score) {
                    n.alertUtil.alert(i18n.t("JIULOU_SCORE_LIMIT"));
                    return;
                }
                a.jiulouProxy.sendShoChange(t.id);
            }
        };
        __decorate([_(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblZhe", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([_(l.default)], e.prototype, "itemSlot", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
