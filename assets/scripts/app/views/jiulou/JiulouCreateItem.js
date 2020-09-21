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
            e.lblName = null;
            e.lblCount1 = null;
            e.lblCount2 = null;
            e.item1 = null;
            e.item2 = null;
            e.toggle = null;
            e.lblCount = null;
            e.cost = null;
            e.lblcost = null;
            return e;
        }
        e.prototype.onClickOpen = function() {
            var t = this._data;
            if (t) {
                if (1 == t.id) {
                    if (
                        n.utils.getParamInt("jiulou_nor_count") -
                            l.jiulouProxy.yhType.count <=
                            0 &&
                        !this.isEnough(t)
                    )
                        return;
                } else if (!this.isEnough(t)) return;
                var e = l.jiulouProxy.selectFood[0]
                        ? l.jiulouProxy.selectFood[0].id
                        : 0,
                    o = l.jiulouProxy.selectFood[1]
                        ? l.jiulouProxy.selectFood[1].id
                        : 0,
                    i = l.jiulouProxy.selectFood[2]
                        ? l.jiulouProxy.selectFood[2].id
                        : 0;
                l.jiulouProxy.sendYhHold(
                    t.id,
                    this.toggle && this.toggle.isChecked ? 1 : 0,
                    e,
                    o,
                    i
                );
                n.utils.closeNameView("jiulou/JiulouCreate");
                n.utils.openPrefabView("jiulou/JiulouDinnce");
                l.jiulouProxy.selectFood = [];
            }
        };
        e.prototype.isEnough = function(t) {
            if (2 == t.pay.length) {
                var e = t.pay[0],
                    o = t.pay[1],
                    i = l.bagProxy.getItemCount(e.id),
                    r = l.bagProxy.getItemCount(o.id);
                if (i < e.count) {
                    n.alertUtil.alertItemLimit(e.id);
                    return !1;
                }
                if (r < o.count) {
                    n.alertUtil.alertItemLimit(o.id);
                    return !1;
                }
                return !0;
            }
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblName.string = i18n.t("JIULOU_CREATE_ROLE_COUNT", {
                    n: t.name,
                    c: t.xiwei
                });
                if (2 == t.pay.length) {
                    var e =
                        n.utils.getParamInt("jiulou_nor_count") -
                        l.jiulouProxy.yhType.count;
                    if (1 == t.id && e > 0) return;
                    var o = t.pay[0],
                        i = t.pay[1];
                    this.item1.data = o;
                    this.item2.data = i;
                    var r = l.bagProxy.getItemCount(o.id),
                        a = l.bagProxy.getItemCount(i.id);
                    this.lblCount1.string = i18n.t("COMMON_NEED", {
                        f: n.utils.formatMoney(r),
                        s: o.count
                    });
                    this.lblCount2.string = i18n.t("COMMON_NEED", {
                        f: n.utils.formatMoney(a),
                        s: i.count
                    });
                }
            }
        };
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCount1", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCount2", void 0);
        __decorate([c(r.default)], e.prototype, "item1", void 0);
        __decorate([c(r.default)], e.prototype, "item2", void 0);
        __decorate([c(cc.Toggle)], e.prototype, "toggle", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([c(r.default)], e.prototype, "cost", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblcost", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
