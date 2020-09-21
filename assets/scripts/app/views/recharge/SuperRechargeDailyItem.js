var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = require("../../utils/Utils"),
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
            e.btnGo = null;
            e.btnGet = null;
            e.list = null;
            e.itemBg = null;
            e.bottom = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblIndex.string = i18n.t("LIMIT_SUPER_RECHARGE_DAYS", {
                    day: t.id
                });
                this.lblCount.string = i18n.t("LIMIT_SUPER_RECHARGE_DAILY", {
                    num: l.limitActivityProxy.superRecharge.cons,
                    need: t.need
                });
                this.btnGet.node.active =
                    0 == t.get &&
                    l.limitActivityProxy.superRecharge.cons >= t.need;
                this.btnYLQ.active = 1 == t.get;
                this.btnGo.active =
                    0 == t.get &&
                    l.limitActivityProxy.superRecharge.cons < t.need;
                this.list.data = t.items;
            }
        };
        e.prototype.onClickRwd = function() {
            var t = this._data;
            l.limitActivityProxy.sendGetSuperRechargeRwd(t.id);
        };
        e.prototype.onClickGo = function() {
            r.utils.closeNameView("limitactivity/SuperRecharge");
            r.utils.openPrefabView("welfare/RechargeView");
        };
        __decorate([c(cc.Label)], e.prototype, "lblIndex", void 0);
        __decorate([c(cc.RichText)], e.prototype, "lblCount", void 0);
        __decorate([c(cc.Node)], e.prototype, "btnYLQ", void 0);
        __decorate([c(cc.Node)], e.prototype, "btnGo", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnGet", void 0);
        __decorate([c(n.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Node)], e.prototype, "itemBg", void 0);
        __decorate([c(cc.Node)], e.prototype, "bottom", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
