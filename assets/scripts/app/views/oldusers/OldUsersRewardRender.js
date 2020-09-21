var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../component/List"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblIndex = null;
            e.lblCount = null;
            e.btnYLQ = null;
            e.btnGet = null;
            e.list = null;
            e.itemBg = null;
            e.bottom = null;
            return e;
        }
        e.prototype.showData = function () {
            var t = this._data;
            if (t) {
                var e = n.oldUsersProxy.regression,
                    o =
                    e.cons >= t.need ?
                    "LIMIT_NEED_VALUE_1" :
                    "LIMIT_NEED_VALUE_2";
                this.lblCount.string = i18n.t(o, {
                    name: i18n.t('LIMIT_LEI_CHARGE_TXT'),
                    have: l.utils.formatMoney(e.cons),
                    need: l.utils.formatMoney(t.need)
                });


                this.lblIndex.string = i18n.t("LIMIT_REWARD_NUMBER", {
                    value: t.id
                });
                this.lblCount.string += i18n.t("COMMON_CASH");
                this.btnGet.interactable = e.cons >= t.need && e.rwd == t.id - 1;

                this.list.data = t.items;
                this.btnYLQ.active = e.rwd >= t.id;

                this.btnGet.node.active = !this.btnYLQ.active;
            }
        };
        e.prototype.setWidthHeigth = function (t, e) {
            this.node.height = e;
            this.itemBg.height = e;
            this.bottom.y = -(e - 250);
        };
        e.prototype.onClickGet = function () {
            n.oldUsersProxy.sendOrderRwd(this._data.id);
        };
        __decorate([c(cc.Label)], e.prototype, "lblIndex", void 0);
        __decorate([c(cc.RichText)], e.prototype, "lblCount", void 0);
        __decorate([c(cc.Node)], e.prototype, "btnYLQ", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnGet", void 0);
        __decorate([c(r.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Node)], e.prototype, "itemBg", void 0);
        __decorate([c(cc.Node)], e.prototype, "bottom", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;