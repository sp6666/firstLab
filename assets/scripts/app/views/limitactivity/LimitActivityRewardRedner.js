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
    _ = (function(t) {
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
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = n.limitActivityProxy.curSelectData,
                    o =
                        e.cons >= t.need
                            ? "LIMIT_NEED_VALUE_1"
                            : "LIMIT_NEED_VALUE_2";
                if (e.cfg.info.id == n.limitActivityProxy.LEI_TIAN_RECHARGE) {
                    this.lblCount.string = i18n.t(o, {
                        name: e.cfg.info.title,
                        have: l.utils.formatMoney(e.cons),
                        need: l.utils.formatMoney(t.need)
                    });
                    this.lblIndex.string = i18n.t(
                        "LIMIT_LEI_TIAN_RECHARGE_TITLE",
                        {
                            num: t.day,
                            value: t.need
                        }
                    );
                    this.lblCount.string = i18n.t("LIMIT_LEI_TIAN_DAY_TXT", {
                        num: t.rachargeDay ? t.rachargeDay : 0,
                        need: t.day
                    });
                    this.btnGet.interactable =
                        t.id == e.rwd + 1 && t.rachargeDay >= t.day;
                    this.btnGet.node.active = !(t.id <= e.rwd);
                } else {
                    this.lblIndex.string = i18n.t("LIMIT_REWARD_NUMBER", {
                        value: t.id
                    });
                    this.lblCount.string = i18n.t(o, {
                        name: e.cfg.info.title,
                        have: l.utils.formatMoney(e.cons),
                        need: l.utils.formatMoney(t.need)
                    });
                    e.cfg.info.type == n.limitActivityProxy.RECHARGE_TYPE &&
                        (this.lblCount.string += i18n.t("COMMON_CASH"));
                    this.btnGet.interactable =
                        t.id == e.rwd + 1 && e.cons >= t.need;
                    this.btnGet.node.active = !(t.id <= e.rwd);
                }
                this.list.data = t.items;
                this.btnYLQ.active = t.id <= e.rwd;
            }
        };
        e.prototype.setWidthHeigth = function(t, e) {
            this.node.height = e;
            this.itemBg.height = e;
            this.bottom.y = -(e - 250);
        };
        e.prototype.onClickGet = function() {
            n.limitActivityProxy.sendGetActivityReward(
                n.limitActivityProxy.curSelectData.cfg.info.id
            );
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
