var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = require("../../component/SelectMax"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nodeLimit = null;
            e.itemSlot = null;
            e.itemCost = null;
            e.lblCount = null;
            e.lblTime = null;
            e.lblNum = null;
            e.nodeGold = null;
            e.lblGold = null;
            e.nodeHC = null;
            e.selectMax = null;
            return e;
        }
        e.prototype.onClickHeCheng = function() {
            var t = this._data,
                e =
                    this.selectMax && this.selectMax.node.active
                        ? this.selectMax.curValue
                        : 1;
            if (t) {
                if (0 != t.totonum && t.times < e) {
                    l.alertUtil.alert(i18n.t("BAG_COMPOSE_COUNT_LIMIT"));
                    return;
                }
                for (var o = 0; o < t.need.length; o++) {
                    var i = t.need[o];
                    if (r.bagProxy.getItemCount(i.id) < i.count * e) {
                        l.alertUtil.alertItemLimit(i.id);
                        t.onHeCheng = 0;
                        return;
                    }
                }

                if(t.need.length == 1 && (t.onHeCheng == undefined || t.onHeCheng != 1))
                {
                    //这里只考虑1种物品合成1种
                    var n = r.bagProxy.getCanHechengItem(t.itemid);
                    if(n)
                    {
                        l.utils.openPrefabView("bag/BagHecheng", false, n);
                    }
                    else
                    {
                        r.bagProxy.sendCompose(t.itemid, e);
                    }
                }
                else
                {
                    t.onHeCheng = 0;
                    r.bagProxy.sendCompose(t.itemid, e);
                }
            }
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.itemSlot.data = {
                    id: t.itemid
                };
                this.nodeLimit.active = 0 != t.outtime;
                this.lblTime.string = l.timeUtil.getDateDiff(t.outtime);
                this.lblCount.string =
                    0 != t.totonum
                        ? i18n.t("BAG_REMAIN_COUNT", {
                              c: t.times,
                              t: t.totonum
                          })
                        : "";
                this.itemCost.data = t.need[0];
                var e = t.need[0],
                    o = r.bagProxy.getItemCount(e.id),
                    i = 99;
                i = Math.floor(o / e.count) < i ? Math.floor(o / e.count) : i;
                this.lblNum.string = i18n.t("COMMON_NUM", {
                    f: o,
                    s: e.count
                });
                this.nodeHC.active = 1 == t.need.length;
                this.nodeGold.active = t.need.length > 1;
                this.nodeGold.active &&
                    (this.lblGold.string = t.need[1].count + "");
                0 != t.totonum && (i = t.times < i ? t.times : i);
            }
        };
        __decorate([_(cc.Node)], e.prototype, "nodeLimit", void 0);
        __decorate([_(n.default)], e.prototype, "itemSlot", void 0);
        __decorate([_(n.default)], e.prototype, "itemCost", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblNum", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeGold", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblGold", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeHC", void 0);
        __decorate([_(a.default)], e.prototype, "selectMax", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
