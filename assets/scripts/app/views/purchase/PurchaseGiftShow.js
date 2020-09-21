var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../Config"),
    a = require("../../utils/ApiUtils"),
    s = require("../../models/BagProxy"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTitle = null;
            e.lblPrice = null;
            e.lblLimit = null;
            e.btnBuy = null;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function () {
            var t = this.node.openParam;
            this._curData = t;
            if (t) {
                this.lblTitle.string = t.name;
                this.lblPrice.string = t.sign + t.present;
                this.lblLimit.string =
                    0 != t.islimit ?
                    i18n.t("LEVEL_GIFT_XIAN_TXT_2", {
                        num: t.limit
                    }) :
                    "";
                this.btnBuy.interactable = !(
                    (0 != t.islimit && t.limit <= 0) ||
                    t.end <= l.timeUtil.second
                );
                this.list.data = t.items;
            }
        };
        e.prototype.onClickClose = function () {
            l.utils.closeView(this);
        };
        e.prototype.onClickBuy = function () {
            var t = this._curData;
            if (t) {
                var proxy = n.purchaseProxy;
                if (t.isMerge) {
                    proxy = n.mergePurchaseProxy;
                }
                if (0 != t.islimit && t.limit <= 0) {
                    l.alertUtil.alert18n("HD_TYPE8_DONT_SHOPING");
                    return;
                }
                if (proxy.limitBuy) {
                    l.alertUtil.alert18n("HD_TYPE8_SHOPING_WAIT");
                    return;
                }
                if (t.end <= l.timeUtil.second) {
                    l.alertUtil.alert18n("HD_TYPE8_SHOPING_TIME_OVER");
                    return;
                }
                if (t.items[0].kind == s.DataType.CLOTHE) {
                    for (
                        var e = !1, o = n.mailProxy.mailList, i = 0; i < o.length; i++
                    )
                        if (0 == o[i].rts && o[i].items)
                            for (var c = 0; c < o[i].items.length; c++)
                                o[i].items[c] &&
                                o[i].items[c].kind == s.DataType.CLOTHE &&
                                t.items[0].id == o[i].items[c].id &&
                                (e = !0);
                    if (n.playerProxy.isUnlockCloth(t.items[0].id) || e) {
                        l.alertUtil.alert18n("USER_CLOTHE_DUPLICATE");
                        return;
                    }
                }
                var _ = 10 * t.grade + 1e6 + 1e4 * t.id;
                proxy.setGiftNum(t.id, -1);
                proxy.limitBuy = !0;
                a.apiUtils.recharge(
                    n.playerProxy.userData.uid,
                    r.Config.serId,
                    _,
                    t.grade,
                    i18n.t("CHAOZHI_LIBAO_TIP"),
                    0
                );
            }
            this.onClickClose();
        };
        __decorate([d(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblPrice", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblLimit", void 0);
        __decorate([d(cc.Button)], e.prototype, "btnBuy", void 0);
        __decorate([d(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;