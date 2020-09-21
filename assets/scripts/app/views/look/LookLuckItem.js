var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../item/ItemSlotUI"),
    a = require("../../formula"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblCostName = null;
            e.lblCost = null;
            e.lblLuck = null;
            e.nodeZhenzai = null;
            e.nodeZhuanyun = null;
            e.itemSlot = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e =
                    localcache.getItem(
                        localdb.table_vip,
                        n.playerProxy.userData.vip
                    ).free_zy > n.lookProxy.zhenzai.used
                        ? i18n.t("COMMON_FREE")
                        : this.getCost();
                this.itemSlot.data = {
                    id: t.itemId
                };
                this.lblName.string = i18n.t("LOOK_ZHEN_ZAI_NAME" + t.type);
                this.lblCostName.string = i18n.t("LOOK_ZHEN_ZAI_COST" + t.type);
                var o = n.lookProxy.zhenzai.num + 1,
                    i = a.formula.city_lucky(
                        n.playerProxy.userEp["e" + t.itemId] +
                            n.jingyingProxy.getWeipaiAdd(t.itemId),
                        o
                    );
                this.lblCost.string = (3 == t.type ? e : i) + "";
                this.nodeZhenzai.active = 3 != t.type;
                this.nodeZhuanyun.active = 3 == t.type;
                this.lblLuck.string = i18n.t("LOOK_LUCK_TITLE") + "+" + t.add;
            }
        };
        e.prototype.getCost = function() {
            var t = this._data;
            if (t) {
                if (3 != t.type) return t.cost;
                if (
                    localcache.getItem(
                        localdb.table_vip,
                        n.playerProxy.userData.vip
                    ).free_zy > n.lookProxy.zhenzai.used
                )
                    return 0;
                for (
                    var e = l.utils.getParamStrs("look_cost_gold"),
                        o = e[0][1],
                        i = n.lookProxy.recover.num,
                        r = 0;
                    r < e.length;
                    r++
                )
                    if (i < parseInt(e[r][0]) || 0 == parseInt(e[r][0])) {
                        o = e[r][1];
                        break;
                    }
                return parseInt(o);
            }
            return 0;
        };
        e.prototype.onClickZhenzai = function() {
            var t = this._data;
            if (t) {
                var e = n.lookProxy.zhenzai.num + 1,
                    o = n.bagProxy.getItemCount(t.itemId),
                    i = a.formula.city_lucky(
                        n.playerProxy.userEp["e" + t.itemId] +
                            n.jingyingProxy.getWeipaiAdd(t.itemId),
                        e
                    );
                if (3 != t.type && o < i) {
                    l.alertUtil.alertItemLimit(t.itemId);
                    return;
                }
                if (3 == t.type && o < parseInt(this.getCost() + "")) {
                    l.alertUtil.alertItemLimit(t.itemId);
                    return;
                }
                n.lookProxy.sendZzHand(t.type);
            }
        };
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCostName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblLuck", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeZhenzai", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeZhuanyun", void 0);
        __decorate([_(r.default)], e.prototype, "itemSlot", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
